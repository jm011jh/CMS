import { removeToken } from "@/lib/util/tokenClass";

export const Logout = () => {
    if (typeof window === 'undefined') return;

    // 토큰 제거
    removeToken();

    // 로그아웃 후 리다이렉트
    window.location.href = '/login';
}