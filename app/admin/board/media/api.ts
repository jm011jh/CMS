import { callAPI, HTTPMETHOD } from '@/lib/util/callApi';
import { getAccessToken } from '@/lib/util/tokenClass';

export const getMediaList = async (queryParams: string) => {
  const token = getAccessToken();
  if (!token) {
    throw new Error('로그인이 필요합니다.');
  }
  try {
    const response: any = await callAPI(HTTPMETHOD.GET, {}, `/api/admin/media?${queryParams}`, token);
    return response.data;
  } catch (error) {
    console.error('Error fetching media list:', error);
    throw new Error('미디어 목록을 불러오는 중 오류가 발생했습니다.');
  }
};
