import { HTTPMETHOD } from '@/lib/util/callApi';
import { getAccessToken } from '@/lib/util/tokenClass';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// const baseUrl = 'https://api-qa.fan-platform.click'; // 본서버용
let baseUrl = "https://api-qa.fan-platform.click"; // qa 서버용
if (process.env.API_URL && process.env.API_URL != '') {
  baseUrl = process.env.API_URL; // 환경변수로 설정된 API URL 사용
}
export type T_PRESIGNED_URL_RESPONSE = {
  data: {
    data: {
      presignedUrl: string;
      cdnUrl: string;
      expiresIn: number;
    };
  };
};
export type T_RESULT_FILE = {
  fileName: string; // 파일 이름
  fileUrl: string; // CDN URL
  fileType: 'IMG' | 'PDF' | 'VIDEO' | 'UNKNOWN'; // 파일 타입
  id?: string;
};
export type T_UPLOAD_DIRECTORY =
  | undefined
  | null
  | ''
  | 'user/img'
  | 'notice/img'
  | 'media/img'
  | 'link/img'
  | 'banner/img'
  | 'chat/img'
  | 'inquiry/img'
  | 'schedule/img'
  | 'vod/video'
  | 'vod/img';

// postPresignedURL은 정상 작동
export const postPresignedURL = async (
  fileType: string,
  uploadDirectory: T_UPLOAD_DIRECTORY,
  tokenExist: boolean = true,
) => {
  const token = getAccessToken();
  if (tokenExist && token === '') {
    alert('로그인 해주세요.');
    return false;
  }

  // token이 없을 경우 guest로 요청
  let url = '/api/upload/presigned-url';
  if (!tokenExist) {
    url = '/api/upload/presigned-url/guest';
  }
  if (
    uploadDirectory !== 'user/img' &&
    uploadDirectory !== 'notice/img' &&
    uploadDirectory !== 'media/img' &&
    uploadDirectory !== 'link/img' &&
    uploadDirectory !== 'banner/img' &&
    uploadDirectory !== 'chat/img' &&
    uploadDirectory !== 'schedule/img' &&
    uploadDirectory !== 'inquiry/img' &&
    uploadDirectory !== 'vod/video' &&
    uploadDirectory !== 'vod/img'
  ) {
    alert('잘못된 업로드 디렉토리입니다.');
    return false;
  }
  if (
    fileType !== 'image/jpeg' &&
    fileType !== 'image/png' &&
    fileType !== 'image/gif' &&
    fileType !== 'video/mp4' &&
    !fileType.startsWith('video') &&
    fileType !== 'application/pdf'
  ) {
    alert('잘못된 파일 타입입니다.');
    return false;
  }
  const dataParam = {
    mimeType: fileType, // 예시로 JPEG 이미지 타입
    directory: uploadDirectory, // 업로드할 디렉토리
  };
  const headersParam = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json', // 요청 바디는 JSON 형태
    accept: 'application/json; charset=utf-8',
  };
  try {
    const config: AxiosRequestConfig = {
      method: HTTPMETHOD.POST,
      url: baseUrl + url,
      headers: headersParam,
      data: dataParam,
    };
    const response: T_PRESIGNED_URL_RESPONSE = await axios(config);
    return response;
  } catch (error) {
    console.error('Presigned URL 요청 실패:', error);
    throw error;
  }
};
const uploadFileToS3 = async (
  presignedUrl: string,
  file: File,
): Promise<AxiosResponse> => {
  try {
    const config = {
      method: HTTPMETHOD.PUT,
      url: presignedUrl,
      data: file,
      headers: {
        'Content-Type': file.type,
      },
    };
    const response = await axios(config);
    return response;
  } catch (error) {
    console.error('S3 파일 업로드 실패:', error);
    throw error;
  }
};
const viewDataImageFileOneUploadToS3 = async (
  selectedFile: File,
  uploadDirectory: T_UPLOAD_DIRECTORY,
  tokenExist: boolean = true,
) => {
  const resultFile: T_RESULT_FILE = {
    fileName: selectedFile.name,
    fileUrl: '',
    fileType:
      selectedFile.type === 'image/jpeg' ||
        selectedFile.type === 'image/png' ||
        selectedFile.type === 'image/gif'
        ? 'IMG'
        : selectedFile.type === 'application/pdf'
          ? 'PDF'
          : selectedFile.type === 'video/mp4'
            ? 'VIDEO'
            : 'UNKNOWN',
  };
  try {
    const token = getAccessToken();
    if (tokenExist && token === '') {
      alert('로그인 해주세요.');
      return false;
    }
    const presignedUrlResponse: T_PRESIGNED_URL_RESPONSE | undefined | boolean =
      await postPresignedURL(selectedFile.type, uploadDirectory, tokenExist);
    if (
      presignedUrlResponse &&
      presignedUrlResponse.data.data.cdnUrl &&
      presignedUrlResponse.data.data.presignedUrl
    ) {
      await uploadFileToS3(
        presignedUrlResponse.data.data.presignedUrl,
        selectedFile,
      );
      resultFile.fileUrl = presignedUrlResponse.data.data.cdnUrl; // CDN URL
      return resultFile;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    return error;
  }
};

export default viewDataImageFileOneUploadToS3;
