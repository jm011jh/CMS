import { callAPI, HTTPMETHOD } from "@/lib/util/callApi";
import { getAccessToken } from "@/lib/util/tokenClass";

const API_URL_OLD_PUSH_LIST = '/api/admin/push'; // Define the API URL for listing
const API_URL_WAITING_PUSH_LIST = '/api/admin/push/schedule'; // Define the API URL for listing
const API_URL_DELETE_WAITING_PUSH = '/api/admin/push/schedule/'; // Define the API URL for deletion

export const ApiGetAlreadyPushList = async (queryParams: URLSearchParams, token: string) => {
    const url = `${API_URL_OLD_PUSH_LIST}?${queryParams.toString()}`;
    const result: any = await callAPI(HTTPMETHOD.GET, {}, url, token);
    return result;
}

export const ApiGetWaitingPushList = async (queryParams: URLSearchParams) => {
    queryParams.set('limit', '100');
    const token = getAccessToken();
    const url = `${API_URL_WAITING_PUSH_LIST}?${queryParams.toString()}`;
    const result: any = await callAPI(HTTPMETHOD.GET, {}, url, token);
    return result;
}

export const ApiDeleteWaitingPush = async (id: string) => {
    const token = getAccessToken();
    const url = `${API_URL_DELETE_WAITING_PUSH}${id}`;
    const result: any = await callAPI(HTTPMETHOD.DELETE, {}, url, token);
    return result;
}