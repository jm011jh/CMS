import { callAPI, HTTPMETHOD } from '@/lib/util/callApi';
import { getAccessToken } from '@/lib/util/tokenClass';

const apiDeleteBoardItem = async (
  id: string,
  apiUrl: string,
  callFn?: () => void,
): Promise<boolean | void> => {
  if (!id || id === '') {
    alert('삭제할 항목이 없습니다.');
    return;
  }
  if (!apiUrl || apiUrl === '') {
    alert('API URL이 설정되지 않았습니다.');
    return;
  }
  if (typeof callFn !== 'function') {
    console.warn('callFn is not a function, proceeding without callback.');
  }
  const token = getAccessToken();
  if (token === '') {
    alert('로그인 해주세요.');
    return;
  }
  try {
    const res = await callAPI(HTTPMETHOD.DELETE, {}, apiUrl + id, token);
    if (res) {
      // alert('삭제되었습니다.');
      callFn && callFn();
    }
    return true;
  } catch (e: any) {
    if (e === null) return;
    alert(
      '처리 중 문제가 발생하였습니다.\n반복될 경우, 관리자에게 문의하여 주세요.',
    );
    return false;
  }
};

export default apiDeleteBoardItem;
