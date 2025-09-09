"use client"

import { callLogin } from "@/lib/util/callApi";
import { checkAdminAuth, getAccessToken } from "@/lib/util/tokenClass";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { basicThemeColors } from "../admin/assets/theme";
import LoadingScreen from "../admin/components/card/LoadingScreen";
import AdmButton from "../admin/components/design/AdmButton";
import useLoadingScreenStore from "../admin/store/loadingScreenStore";
import { InputPw, InputText } from "../components/form/Input";

export default function Login() {

    const router = useRouter();
    const [loginForm, setLoginForm] = useState({ id: '', password: '' });
    const [loginStatus, setLoginStatus] = useState<'ready' | 'ok' | 'no'>('ready');
    const { showLoading, hideLoading } = useLoadingScreenStore();


    const handleInputChange = (e: any) => {
        const { name, value, code } = e.target;
        if (value.includes(" ")) return;

        setLoginForm(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleLogin = async () => {
        showLoading();
        try {
            await callLogin(loginForm.id, loginForm.password, true).then((res) => {
                setLoginStatus("ok");
                const isAdmin = checkAdminAuth(res.data.data.token.accessToken);
                if (!isAdmin) {
                    router.push("/")
                } else {
                    router.push("/admin")
                }
            })
        } catch (error) {
            setLoginStatus("no");
        } finally {
            hideLoading();
        }
    }

    useEffect(() => {
        const token = getAccessToken();
        if (token) {
            setLoginStatus("ok");
            const isAdmin = checkAdminAuth(token);
            if (isAdmin) {
                router.push("/admin")
            }
        } else {
            setLoginStatus("ready");
        }
    }, []);

    const styles: { [key: string]: React.CSSProperties } = {
        container: {
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            backgroundColor: 'rgb(244,244,248)'

        },
        card: {
            width: '100%',
            height: '100%',
            maxWidth: '358px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'stretch',
            gap: '40px'
        },
        logo: {
            display: 'block',
            width: '80%',
            maxWidth: '96px',
            margin: '0 auto',
        },
        inputList: {
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
        },
        inputBox: {
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
        },
        actionBox: {
            position: 'relative',
        },
        error: {
            color: 'red',
            fontSize: '14px',
            textAlign: 'center',
            marginTop: '24px',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            transform: 'translateY(calc(100% + 20px))',

        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <img style={styles.logo} src="/image/login_logo.png" alt="" />
                <div style={styles.inputList}>
                    <div style={styles.inputBox}>
                        <label htmlFor="adm_id">
                            <span style={{ fontSize: '14px', color: '#333' }}>이메일</span>
                            <span style={{ fontSize: '14px', color: basicThemeColors.primary.primary }}>*</span>
                        </label>
                        <InputText
                            id="adm_id"
                            name="id"
                            size="large"
                            placeholder="이메일을 입력하세요."
                            value={loginForm.id}
                            onChange={handleInputChange}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleLogin();
                                }
                            }}
                        />
                    </div>
                    <div style={styles.inputBox}>
                        <label htmlFor="adm_pw">
                            <span style={{ fontSize: '14px', color: '#333' }}>비밀번호</span>
                            <span style={{ fontSize: '14px', color: basicThemeColors.primary.primary }}>*</span>
                        </label>
                        <InputPw
                            id="adm_pw"
                            name="password"
                            size="large"
                            placeholder="비밀번호를 입력하세요"
                            value={loginForm.password}
                            onChange={handleInputChange}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleLogin();
                                }
                            }}
                        />
                    </div>
                </div>
                <div style={styles.actionBox}>
                    <AdmButton size={'xxlarge'} onClick={handleLogin} style={{ width: '100%' }}>로그인</AdmButton>
                    {
                        loginStatus == "no" && <div style={styles.error}>로그인 실패</div>
                    }
                </div>
            </div>
            <LoadingScreen />
        </div>
    )
}