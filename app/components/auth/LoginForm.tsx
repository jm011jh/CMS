import { callAPI, callLogin, HTTPMETHOD } from "@/lib/util/callApi";
import { validateEmail } from "@/lib/util/commonUtil";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { InputCheck, InputPw, InputText } from "../form/Input";

interface ILoginForm {
    email: string;
    password: string;
}

const LoginForm = () => {

    const router = useRouter();
    const [isRememberMe, setIsRememberMe] = useState<boolean>(false);
    const [isExistUser, setIsExistUser] = useState<boolean>(false);
    const [isLoginError, setIsLoginError] = useState<boolean>(false);
    const [isServerError, setIsServerError] = useState<boolean>(false);
    const [loginInfo, setLoginInfo] = useState<ILoginForm>({
        email: "",
        password: "",
    });
    const [showPwInput, setShowPwInput] = useState<boolean>(false);

    const handleRememberMe = (e: any) => {
        setIsRememberMe(e);
    }
    const handleUserForm = (e: any) => {
        setLoginInfo({
            ...loginInfo,
            [e.target.name]: e.target.value
        });
    }
    const checkEmailConflict = async () => {
        if (!validateEmail(loginInfo.email)) {
            alert("Invalid email format");
            return false;
        }
        try {
            const payload = { email: loginInfo.email };
            const token = ''
            const response: { code: number, message: string } = await callAPI(HTTPMETHOD.POST, payload, "/api/auth/conflict", token);
            if (response.code == 409) {
                setShowPwInput(true);
            } else {
                setShowPwInput(false);
                router.push('/signup');
            }
        } catch (error: any) {
            if (error.status == 409) {
                setShowPwInput(true);
            }
        }
    }
    const submitLoginForm = async () => {

        setIsExistUser(true);
        if (loginInfo.password.length < 8) {
            setIsLoginError(true);
        }

        try {
            const payload = {
                email: loginInfo.email,
                password: loginInfo.password,
                keep: isRememberMe
            }
            const response = await callLogin(payload.email, payload.password, payload.keep);
            if (response.status == 201) {
                router.push('/main');
            }
        } catch (error: any) {
            if (error.status == 401) {
                setIsLoginError(true);
            } else {
                alert("Server error");
            }
        }
    }

    const goToMain = () => {
        router.push('/main');
    }
    return (
        <>
            <div className="login__cont">
                <div className="login__title">
                    <div className="login__title_logo"><img src="/image/logo_jisoo.png" alt="logo" /></div>
                    <div className="login__title_txt">
                        <div className="login__title_txt01">Welcome to platform</div>
                        <div className="login__title_txt02">Entere your details below</div>
                    </div>
                </div>
                <div className="login__form">

                    <div className="form__group">
                        <div className="form__label"><p>Email</p></div>
                        <div className="form__input">
                            <InputText size="large" id="email" name="email" value={loginInfo.email} onChange={e => handleUserForm(e)} placeholder="Enter your email"></InputText>
                        </div>
                    </div>
                    {
                        showPwInput &&
                        <div className="form__group">
                            <div className="form__label"><p>Password</p></div>
                            <div className="form__input">
                                <InputPw size="large" id="password" name="password" value={loginInfo.password} onChange={e => handleUserForm(e)} placeholder="Enter your password"></InputPw>
                            </div>
                        </div>
                    }

                    <div className="form__group">
                        {/* remember me */}
                        <div className="form__check">
                            <div className="form__checkInput">
                                <InputCheck size="small" id="rememberMe" name="rememberMe" checked={isRememberMe} onChange={e => handleRememberMe(e)}></InputCheck>
                            </div>
                            <label htmlFor="rememberMe" className="form__label">Remember me for 30 days</label>
                        </div>
                    </div>

                    <div className="form__submit">
                        <div className="form__submitBtn btn large primary pointer" onClick={showPwInput ? submitLoginForm : checkEmailConflict}>Sign in</div>
                        <div className="form__submitBtn btn large primary pointer" onClick={goToMain}>go to main</div>
                    </div>

                    <div className="form__footer">
                        <div className="form__footerLink">Don&apos;t have an account? <Link href="/signup">Sign up</Link></div>
                        <Link href="/forgot" className="form__footerForgot">Forgot your password?</Link>
                    </div>

                </div>
            </div>
            {
                isLoginError &&
                <div className="pop__alert">
                    <div className="pop__alertBg" onClick={() => setIsLoginError(false)}></div>
                    <div className="pop__alertCont">
                        <div className="pop__alertIcon"><img src="/image/icon_error.png" alt="error" /></div>
                        <div className="pop__alertTxt01">Login Error!</div>
                        <div className="pop__alertTxt02">The account information you entered is<br />not verified.</div>
                        <div className="pop__alertBtn btn primary large pointer" onClick={() => setIsLoginError(false)}>Close</div>
                    </div>
                </div>
            }
            {
                isServerError &&
                <div className="pop__alert">
                    <div className="pop__alertBg" onClick={() => setIsServerError(false)}></div>
                    <div className="pop__alertCont">
                        <div className="pop__alertIcon"><img src="/image/icon_error.png" alt="error" /></div>
                        <div className="pop__alertTxt01">Server Error!</div>
                        <div className="pop__alertTxt02">Please try again later.</div>
                        <div className="pop__alertBtn btn primary large pointer" onClick={() => setIsServerError(false)}>Close</div>
                    </div>
                </div>
            }
        </>
    )
}

export default LoginForm;