import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getRefreshToken, getTokenType, removeToken, setToken } from './tokenClass';

export enum HTTPMETHOD {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  PUT = 'PUT',
}

let baseUrl = "https://api-qa.blissoolmt.com"; // main서버
// let baseUrl = "https://api.blissoolmt.com"; // prod서버
if (process.env.API_URL && process.env.API_URL != '') {
  baseUrl = process.env.API_URL; // 환경변수로 설정된 API URL 사용
}

// 1. Axios 인스턴스 생성
const apiInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. 토큰 갱신 로직을 위한 변수
let isRefreshing = false;
let failedQueue: { resolve: (value: unknown) => void, reject: (reason?: any) => void }[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// 3. 응답 인터셉터 설정
apiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 401 에러이고, 재시도한 요청이 아닐 때 -> 즉 엑세스 토큰 갱신이 필요할때
    // TODO: 테스트 케이스로 검증이 필요 (관리자는 accessToken이 만료되지 않도록 설정되어 있어서 검증 불필요한 상태)
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // 토큰 갱신이 이미 진행 중이면, 갱신이 끝날 때까지 대기
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return apiInstance(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newAccessToken = await refreshToken();
        if (newAccessToken) {
          // 토큰 갱신 성공
          apiInstance.defaults.headers.common['Authorization'] = 'Bearer ' + newAccessToken;
          originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;
          processQueue(null, newAccessToken); // 대기열에 있던 요청들 재개
          return apiInstance(originalRequest); // 원래 요청 재시도
        }
        // refreshToken() 내부에서 null을 반환하면 아래 catch 블록으로 빠지지 않으므로,
        // 여기서 명시적으로 에러를 발생시켜 로그아웃 로직을 태운다.
        throw new Error("Failed to refresh token");
      } catch (e) {
        // 토큰 갱신 실패
        processQueue(e, null);
        removeToken();
        // 필요하다면 로그인 페이지로 리디렉션
        // window.location.href = '/login';
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export async function callLogin(
  user_id: string,
  user_pw: string,
  keep: boolean,
) {
  try {
    const config: AxiosRequestConfig = {
      method: HTTPMETHOD.POST,
      url: baseUrl + '/api/auth/sign-in',
      headers: {
        authorization: `Basic ${btoa(unescape(encodeURIComponent(user_id)) + ':' + user_pw)}`,
        accept: 'application/json',
      },
    };
    const response: AxiosResponse = await axios(config);
    setToken(response.data.data.token, keep);
    return response;
  } catch (e) {
    throw e;
  }
}

export async function callAPI_download_excel(
  api: string,
  token: string,
) {
  const config: AxiosRequestConfig = {
    method: HTTPMETHOD.GET,
    url: api,
    responseType: 'arraybuffer',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response: AxiosResponse = await apiInstance(config);
  return response.data;
}

export async function callAPI<T>(
  type: HTTPMETHOD,
  data: any,
  api: string,
  token: string,
) {
  let config: AxiosRequestConfig;

  const headers: any = {
    Authorization: `Bearer ${token}`,
    accept: 'application/json; charset=utf-8',
  };

  if (data instanceof FormData) {
    headers['Content-Type'] = 'multipart/form-data';
  } else {
    headers['Content-Type'] = 'application/json';
  }

  config = {
    method: type,
    url: api,
    data: data,
    headers: headers,
  };

  const response: AxiosResponse<T> = await apiInstance(config);
  return response.data;
}

export async function refreshToken() {
  try {
    const refreshTokenValue = getRefreshToken();
    if (!refreshTokenValue) {
      throw new Error("No refresh token available");
    }

    const config: AxiosRequestConfig = {
      method: HTTPMETHOD.POST,
      url: baseUrl + '/api/auth/token/access', // 이 요청은 인터셉터를 타면 안되므로 기본 axios 사용
      headers: {
        Authorization: `Bearer ${refreshTokenValue}`,
        'Content-Type': 'application/json',
      },
    };
    const response: AxiosResponse = await axios(config);

    const newAccessToken = response.data.data.accessToken;
    const newRefreshToken = response.data.data.refreshToken; // 서버에서 새 리프레시 토큰을 주는지 확인 필요

    // 기존 토큰 저장 타입(localStorage/sessionStorage)을 유지
    const tokenType = getTokenType();
    const keep = tokenType === 'localStorage';

    setToken(
      {
        accessToken: newAccessToken,
        // 서버가 새 리프레시 토큰을 주면 그것을 사용하고, 아니면 기존 것을 계속 사용
        refreshToken: newRefreshToken || refreshTokenValue,
      },
      keep,
    );

    return newAccessToken;
  } catch (e: any) {
    removeToken(); // 토큰 갱신 실패 시 모든 토큰 제거
    return null;
  }
}