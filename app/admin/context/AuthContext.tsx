import { checkAdminAuth, checkTokenExpired, getAccessToken } from '@/lib/util/tokenClass';
import { usePathname } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';
import { Logout } from '../lib/Logout';

type AuthStatus = 'standby' | 'ok' | 'no';

const AuthContext = createContext<AuthStatus>('standby');

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isLogin, setIsLogin] = useState<AuthStatus>('standby');

    const pathname = usePathname();

    const authGuard = async () => {
        const token = getAccessToken();

        if (token) {
            const auth = checkAdminAuth(token);
            const isExpired = checkTokenExpired(token, 6 * 60 * 60 * 1000); // 6시간 후 만료

            if (auth && !isExpired) {
                // 토큰이 유효하고 관리자 권한이 있는 경우)
                setIsLogin('ok');
            } else if (isExpired) {
                // 토큰이 만료된 경우
                alert("관리자 권한이 만료되었습니다. 다시 로그인해주세요.");
                setIsLogin('no');
                // removeToken();
                // router.push('/login');
                Logout();
            } else {
                // 토큰이 유효하지만 관리자 권한이 없는 경우
                alert("관리자 권한이 없는 사용자입니다.");
                setIsLogin('no');
                // removeToken();
                // router.push('/login');
                Logout();

            }
        } else {
            setIsLogin('no');
            // removeToken();
            // router.push('/login');

            Logout();

        }
    }

    useEffect(() => {
        authGuard();
    }, []);

    useEffect(() => {
        // pathname이 변경될 때마다 authGuard를 호출
        if (pathname) {
            authGuard();
        }
    }, [pathname]);

    return (
        <AuthContext.Provider value={isLogin}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext); 