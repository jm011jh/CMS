import { callAPI, HTTPMETHOD } from "@/lib/util/callApi";
import { getAccessToken } from "@/lib/util/tokenClass";

const API_URL_DELETE = '/api/admin/cs/notice/'; // Define the API URL for deletion
const API_URL_LIST = '/api/admin/live/history'; // Define the API URL for listing
const URL_LIST = '/admin/live/history'; // Define the URL for listing in the admin board
const URL_VIEW = '/admin/live/history/view?id='; // Define the API URL for editing
const ITEMS_PER_PAGE = 10; // Define the number of items per page

export { API_URL_DELETE, API_URL_LIST, ITEMS_PER_PAGE, URL_LIST, URL_VIEW };

export const getLiveHistoryList = async (queryParams: string) => {
    const token = getAccessToken();
    if (!token) {
        throw new Error('로그인이 필요합니다.');
    }
    try {
        const response: any = await callAPI(HTTPMETHOD.GET, {}, `/api/admin/lives?${queryParams}`, token);
        return response.data;
    } catch (error) {
        console.error('Error fetching live history list:', error);
        throw new Error('라이브 히스토리 목록을 불러오는 중 오류가 발생했습니다.');
    }
};

export const getLiveExcelFile = async (id: string) => {
    const token = getAccessToken();
    if (!token) {
        throw new Error('로그인이 필요합니다.');
    }
    try {
        const response: any = await callAPI(HTTPMETHOD.GET, {}, `/api/admin/${id}/export/excel`, token);
        return response;
    } catch (error) {
        console.error('Error fetching live history Excel file:', error);
        throw new Error('라이브 히스토리 채팅내역을 불러오는 중 오류가 발생했습니다.');
    }
};

export const getLiveHistoryList2 = async (queryParams: string) => {
    const token = getAccessToken();
    if (!token) {
        throw new Error('로그인이 필요합니다.');
    }
    try {
        const response: any = await callAPI(HTTPMETHOD.GET, {}, `/api/lives?${queryParams}`, token);
        return response.data;
    } catch (error) {
        console.error('Error fetching live history list:', error);
        throw new Error('라이브 히스토리 목록을 불러오는 중 오류가 발생했습니다.');
    }
}

export const deleteLiveItem = async (id: string) => {
    const token = getAccessToken();
    if (!token) {
        throw new Error('로그인이 필요합니다.');
    }
    try {
        const response: any = await callAPI(HTTPMETHOD.DELETE, {}, `/api/lives/${id}`, token);
        return response.data;
    } catch (error) {
        console.error('Error deleting live item:', error);
        throw new Error('라이브 아이템을 삭제하는 중 오류가 발생했습니다.');
    }
}