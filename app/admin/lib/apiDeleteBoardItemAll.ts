import { callAPI, HTTPMETHOD } from '@/lib/util/callApi';
import { getAccessToken } from '@/lib/util/tokenClass';

interface apiDeleteBoardItemAllProps {
    idArray: string[];
    apiUrl: string;
    callFn?: () => void;
}


const apiDeleteBoardItemAll = async ({
    idArray,
    apiUrl,
    callFn,
}: apiDeleteBoardItemAllProps): Promise<boolean> => {
    if (idArray.length < 1) {
        alert('삭제할 항목이 없습니다.');
        return false;
    }
    if (!apiUrl || apiUrl === '') {
        alert('API URL이 설정되지 않았습니다.');
        return false;

    }
    if (typeof callFn !== 'function') {
        console.warn('callFn is not a function, proceeding without callback.');
        return false;
    }
    const token = getAccessToken();
    if (token === '') {
        alert('로그인 해주세요.');
        return false;

    }

    let allSucceeded = true;
    const failedIds: string[] = [];

    for (const id of idArray) { // idArray를 순회하며 각 id를 삭제합니다.
        try {
            const res = await callAPI(HTTPMETHOD.DELETE, {}, apiUrl + id, token);
            if (!res) { // API 응답이 성공을 나타내지 않는 경우
                allSucceeded = false;
                failedIds.push(id);
            }
        } catch (e: any) {
            allSucceeded = false;
            failedIds.push(id);
            console.error(`Failed to delete item ${id}:`, e);
            // 각 실패마다 알림창을 띄우지 않고, 실패한 ID를 수집합니다.
        }
    }

    if (allSucceeded) {
        // alert('모든 항목이 삭제되었습니다.'); // 모든 항목 삭제 성공 시 이 알림을 사용할 수 있습니다.
        callFn && callFn();

    } else {

        alert(
            '처리 중 문제가 발생하였습니다.\n반복될 경우, 관리자에게 문의하여 주세요.',
        );
        callFn && callFn(); // 일부 실패하더라도 목록을 새로고침하기 위해 콜백을 호출할 수 있습니다.
    }
    return allSucceeded;

};

export default apiDeleteBoardItemAll;
