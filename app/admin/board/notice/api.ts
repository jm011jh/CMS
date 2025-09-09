import { callAPI, HTTPMETHOD } from '@/lib/util/callApi';
import { getAccessToken } from '@/lib/util/tokenClass';

export const getNoticeList = async (queryParams: string) => {
  const token = getAccessToken();
  if (!token) {
    throw new Error('로그인이 필요합니다.');
  }
  try {
    const response: any = await callAPI(HTTPMETHOD.GET, {}, `/api/admin/notice?${queryParams}`, token);
    return response.data;
  } catch (error) {
    console.error('Error fetching notice list:', error);
    throw new Error('공지사항 목록을 불러오는 중 오류가 발생했습니다.');
  }
};
