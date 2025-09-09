import { callAPI, HTTPMETHOD } from '@/lib/util/callApi';
import { getAccessToken } from '@/lib/util/tokenClass';

export const getReportList = async (queryParams: string) => {
    const token = getAccessToken();
    if (!token) {
        throw new Error('로그인이 필요합니다.');
    }
    try {
        const response: any = await callAPI(HTTPMETHOD.GET, {}, `/api/admin/reports?${queryParams}`, token);
        return response;
    } catch (error) {
        console.error('Error fetching report list:', error);
        throw new Error('신고 목록을 불러오는 중 오류가 발생했습니다.');
    }
};

export const patchReportDismiss = async (id: string) => {
    const token = getAccessToken();
    if (!token) {
        throw new Error('로그인이 필요합니다.');
    }
    try {
        const response: any = await callAPI(HTTPMETHOD.PATCH, {}, `/api/admin/reports/${id}/dismiss`, token);
        return response;
    } catch (error) {
        console.error('Error dismissing report:', error);
        throw new Error('신고를 무시하는 중 오류가 발생했습니다.');
    }
}

export const patchReportRestore = async (id: string) => {
    const token = getAccessToken();
    if (!token) {
        throw new Error('로그인이 필요합니다.');
    }
    try {
        const response: any = await callAPI(HTTPMETHOD.PATCH, {}, `/api/admin/reports/${id}/restore`, token);
        return response;
    } catch (error) {
        console.error('Error restoring report:', error);
        throw new Error('신고를 복구하는 중 오류가 발생했습니다.');
    }
}

export const postReportUserRestrict = async (id: string, params: any) => {
    const token = getAccessToken();
    if (!token) {
        throw new Error('로그인이 필요합니다.');
    }
    try {
        const response: any = await callAPI(HTTPMETHOD.POST, params, `/api/admin/user/${id}/user-restriction`, token);
        return response;
    } catch (error) {
        console.error('Error reporting user:', error);
        throw new Error('신고를 하는 중 오류가 발생했습니다.');
    }
}

export const getReportUserRestrict = async (id: string) => {
    const token = getAccessToken();
    if (!token) {
        throw new Error('로그인이 필요합니다.');
    }
    try {
        const response: any = await callAPI(HTTPMETHOD.GET, {}, `/api/admin/user/${id}/user-restriction`, token);
        return response;
    } catch (error) {
        console.error('Error getting report user restriction:', error);
        throw new Error('신고 유저 제한 정보를 가져오는 중 오류가 발생했습니다.');
    }
}