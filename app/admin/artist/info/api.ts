import { callAPI, HTTPMETHOD } from '@/lib/util/callApi';
import { getAccessToken } from '@/lib/util/tokenClass';
import viewDataImageFileOneUploadToS3 from '../../lib/viewDataFilesUpload';
import { API_URL_DELETE, API_URL_LIST } from './constants';

export const fetchArtistList = async (queryParams: URLSearchParams) => {
    const token = getAccessToken();
    if (token === '') {
        alert('로그인 해주세요.');
        return;
    }
    const url = `${API_URL_LIST}?${queryParams.toString()}`;
    const result: any = await callAPI(HTTPMETHOD.GET, {}, url, token);
    return result;
};

export const deleteArtist = async (id: string) => {
    const token = getAccessToken();
    if (token === '') {
        alert('로그인 해주세요.');
        return;
    }
    const res = await callAPI(HTTPMETHOD.DELETE, {}, `${API_URL_DELETE}${id}`, token);
    return res;
};

export const activateArtist = async (id: string) => {
    const token = getAccessToken();
    if (token === '') {
        alert('로그인 해주세요.');
        return;
    }
    const res = await callAPI(HTTPMETHOD.PATCH, {}, `${API_URL_LIST}/${id}/activate`, token);
    return res;
};

export const saveArtistData = async (data: any) => {
    const token = getAccessToken();
    if (token === '') {
        alert('로그인 해주세요.');
        return;
    }

    let backgroundImageResult = null;
    if (data.updateProfile?.backgroundImage && data.updateProfile.backgroundImage instanceof File) {
        const result = await viewDataImageFileOneUploadToS3(data.updateProfile.backgroundImage, 'user/img');
        if (!result) {
            throw new Error('배경 이미지 업로드에 실패했습니다.');
        }
        backgroundImageResult = result;
    }

    let profileImageResult = null;
    if (data.updateProfile?.profileImage && data.updateProfile.profileImage instanceof File) {
        const result = await viewDataImageFileOneUploadToS3(data.updateProfile.profileImage, 'user/img');
        if (!result) {
            throw new Error('프로필 이미지 업로드에 실패했습니다.');
        }
        profileImageResult = result;
    }

    const param = {
        ...data,
        profile: {
            ...data.profile,
            name: data.name,
            ...(backgroundImageResult ? { backgroundImage: backgroundImageResult } : {}),
            ...(profileImageResult ? { profileImage: profileImageResult } : {}),
        },
    };

    const res = await callAPI(HTTPMETHOD.PUT, param, `${API_URL_LIST}/${data.id}`, token);
    return res;
};