import CryptoJS from "crypto-js";
import { jwtDecode } from "jwt-decode";
const PRIVATE_KEY = process.env.NEXT_PUBLIC_USER_PRIVATE_KEY ?? "empty_dlwldnpq!@#";
const AUTH_NAME = "__x1e2h_";

interface tokenObj {
    accessToken: string,
    refreshToken: string
}

const getToken = (): tokenObj => {
    //가져오기
    let temp = localStorage.getItem(AUTH_NAME);
    if (temp == null) {
        temp = sessionStorage.getItem(AUTH_NAME);
    }

    if (temp != null) {
        //복호화
        try {
            const bytes = CryptoJS.AES.decrypt(temp, PRIVATE_KEY)
            const res = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            return res
        } catch (e: any) {
            return { accessToken: "", refreshToken: "" }
        }
    } else {
        return { accessToken: "", refreshToken: "" }
    }
}


export const getAccessToken = () => {
    const temp = getToken();
    return temp.accessToken;
}

export const getRefreshToken = () => {
    const temp = getToken();
    return temp.refreshToken;
}

export const setToken = (data: object, keep: boolean) => {
    //암호화
    const temp = CryptoJS.AES.encrypt(JSON.stringify(data), PRIVATE_KEY).toString();

    //저장
    removeToken();
    if (keep) {
        localStorage.setItem(AUTH_NAME, temp);
    } else {
        sessionStorage.setItem(AUTH_NAME, temp);
    }
}

export const removeToken = () => {
    localStorage.removeItem(AUTH_NAME);
    sessionStorage.removeItem(AUTH_NAME);
}

/**
 * token의 타입을 가져온다.
 * localStorage
 * sessionStorage
 * empty
 */
export const getTokenType = () => {
    let temp = localStorage.getItem(AUTH_NAME);
    if (temp != null) {
        return "localStorage";
    } else {
        temp = sessionStorage.getItem(AUTH_NAME);
        if (temp != null) {
            return "sessionStorage";
        } else {
            return "empty";
        }
    }
}

// push token
const PUSH_TOKEN_AUTH_NAME = "COSS_PUSH_TOKEN";
export const getPushTokenValue = (): string => {
    try {
        const temp = localStorage.getItem(PUSH_TOKEN_AUTH_NAME);

        if (temp != null) {
            return temp;
        } else {
            return "";
        }
    } catch (e) {
        return ""
    }
}

export const setPushTokenValue = (data: string) => {
    localStorage.setItem(PUSH_TOKEN_AUTH_NAME, data);
}

/**
    * 관리자 권한이 있는지 확인
    * 일반 사용자 권한이 있는 경우 false, 관리자 권한이 있는 경우 true
    * type G : 일반 사용자
    * type J : 아티스트
    * type A : 관리자
    * 
    * @param token - JWT 토큰
    * @returns boolean - true: 관리자 권한 있음, false: 일반 사용자 권한 있음
 */
export const checkAdminAuth = (token: string): boolean => {
    if (!token) return false;

    try {
        const payload: { type: string } = jwtDecode(token);
        // type 'G'가 아니면 관리자 또는 아티스트로 간주
        return payload.type !== 'G';
    } catch (e) {
        console.error("Token validation error:", e);
        return false;
    }
}

/**
 * 토큰이 만료되었는지 확인
 * 
 * @param token - JWT 토큰
 * @param time - 토큰의 유효 기간 (밀리초 단위)
 * @returns boolean - true: 만료됨, false: 유효함
 */
export const checkTokenExpired = (token: string, time: number): boolean => {
    if (!token) return true;

    try {
        const payload: { iat: number } = jwtDecode(token);

        // 'iat' 클레임이 없으면 유효하다고 간주 (또는 정책에 따라 처리)
        if (typeof payload.iat !== 'number') {
            return false;
        }

        const expirationTime = (payload.iat * 1000) + time;
        return Date.now() > expirationTime;

    } catch (e) {
        console.error("Token validation error:", e);
        return true; // 오류 발생 시 만료된 것으로 간주
    }
}