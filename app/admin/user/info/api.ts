import { callAPI, HTTPMETHOD } from '@/lib/util/callApi';
import { getAccessToken } from '@/lib/util/tokenClass';

export const getUserList = async (queryParams: string) => {
  const token = getAccessToken();
  if (!token) {
    throw new Error('로그인이 필요합니다.');
  }
  try {
    const response: any = await callAPI(HTTPMETHOD.GET, {}, `/api/admin/user?${queryParams}`, token);
    return response.data;
  } catch (error) {
    console.error('Error fetching user list:', error);
    throw new Error('회원 목록을 불러오는 중 오류가 발생했습니다.');
  }
};

export const getDashboardData = async () => {
  const token = getAccessToken();
  if (!token) {
    throw new Error('로그인이 필요합니다.');
  }
  try {
    const response: any = await callAPI(HTTPMETHOD.GET, {}, '/api/admin/subscription/dashboard', token);
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw new Error('대시보드 데이터를 불러오는 중 오류가 발생했습니다.');
  }
};

export const withdrawUser = async (id: string) => {
  const token = getAccessToken();
  if (!token) {
    throw new Error('로그인이 필요합니다.');
  }
  try {
    await callAPI(HTTPMETHOD.PATCH, { reason: 'OTHER' }, `/api/admin/user/${id}/withdraw`, token);
  } catch (error) {
    console.error('Error withdrawing user:', error);
    throw new Error('회원 탈퇴 처리 중 오류가 발생했습니다.');
  }
};

export const patchAdminUserMemo = async (userId: string, payload: any) => {
  const token = getAccessToken();
  if (!token) {
    throw new Error('로그인이 필요합니다.');
  }
  try {
    // const response: any = await callAPI(HTTPMETHOD.POST, payload, `/api/admin/user/${userId}/user-restriction`, token);
    const response: any = await callAPI(HTTPMETHOD.PATCH, payload, `/api/admin/user/${userId}/memo`, token);
    return response;
  } catch (error) {
    console.error('Error posting admin memo:', error);
    throw new Error('관리자 메모 등록 중 오류가 발생했습니다.');
  }
}
