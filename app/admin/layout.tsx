"use client"

import '@/app/globals.css'
import './assets/styles/admin.css'
import './assets/styles/adminComp.css'

import ConfirmPopupProvider from '@/app/admin/provider/ConfirmPopupProvider'
import ReactQueryProvider from '@/app/admin/provider/ReactQueryProvider'
import { ToastProvider } from '@/app/admin/provider/ToastProvider'
import LoadingScreen from './components/card/LoadingScreen'
import AdminLayout from './components/layout/AdminLayout'
import { AuthProvider, useAuth } from './context/AuthContext'


function AdminAppManager({ childrenPage }: { childrenPage: React.ReactElement }) {

    const isLogin = useAuth();
    if (isLogin === "standby") {
        return null; // 또는 로딩 스피너 표시
    }

    if (isLogin === "ok") {
        return (
            <>
                <AdminLayout>
                    {childrenPage}
                </AdminLayout>
                <LoadingScreen />
                <ConfirmPopupProvider />
                <ToastProvider />
            </>
        );
    }

    if (isLogin === "no") {
        // TODO: 로그인 페이지로 리디렉션하는 로직 구현
        return null; // 또는 리디렉션 컴포넌트
    }

    return null; // 그 외 상태에 대한 폴백
}

export default function Layout({
    children,
}: {
    children: React.ReactElement
}) {

    return (
        <AuthProvider>
            <ReactQueryProvider>
                <AdminAppManager childrenPage={children} />
            </ReactQueryProvider>
        </AuthProvider>
    )
}