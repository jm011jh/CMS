import { callAPI, HTTPMETHOD } from '@/lib/util/callApi';
import { getAccessToken } from '@/lib/util/tokenClass';

export const getLinkList = async (queryParams: string) => {
  const token = getAccessToken();
  if (!token) {
    throw new Error('로그인이 필요합니다.');
  }
  try {
    const response: any = await callAPI(HTTPMETHOD.GET, {}, `/api/admin/link?${queryParams}`, token);
    return response.data;
  } catch (error) {
    console.error('Error fetching link list:', error);
    throw new Error('외부링크 목록을 불러오는 중 오류가 발생했습니다.');
  }
};
