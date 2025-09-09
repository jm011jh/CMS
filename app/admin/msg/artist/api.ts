import { callAPI, HTTPMETHOD } from '@/lib/util/callApi';
import { getAccessToken } from '@/lib/util/tokenClass';
import { API_URL_LIST, ITEMS_PER_PAGE } from './constants';

export const fetchDashboardData = async () => {
    const token = getAccessToken();
    if (token === '') {
        alert('로그인 해주세요.');
        return;
    }
    const url = `${API_URL_LIST}/stats`;
    const result: any = await callAPI(HTTPMETHOD.GET, {}, url, token);
    return result.data;
};

export const fetchArtistMsgList = async (queryParams: URLSearchParams) => {
    const token = getAccessToken();
    if (token === '') {
        alert('로그인 해주세요.');
        return;
    }
    const url = `${API_URL_LIST}?${queryParams.toString()}`;
    const result: any = await callAPI(HTTPMETHOD.GET, {}, url, token);
    return result;
};

export const fetchDetailPopupData = async (id: string) => {
    const token = getAccessToken();
    if (token === '') {
        alert('로그인 해주세요.');
        return;
    }
    const url = `/api/admin/chat-comments`;
    const result: any = await callAPI(HTTPMETHOD.GET, {}, `${url}?chatId=${id}&limit=${ITEMS_PER_PAGE}`, token);
    return result.data;
};
