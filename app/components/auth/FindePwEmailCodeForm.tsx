'use client'

import { callAPI, HTTPMETHOD } from "@/lib/util/callApi";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { InputPw, InputText } from "../form/Input";


const SignForm = () => {

    // ==============================================================================
    const searchParams = useSearchParams();
    const router = useRouter();

    const [code, setCode] = useState<string>("");
    const [newPw, setNewPw] = useState<any>({
        newPw: "",
        newPwCheck: ""
    });
    const [email, setEmail] = useState<string>("");
    const [inputCodeError, setInputCodeError] = useState<boolean>(false);
    const [pwError, setPwError] = useState<boolean>(false);
    const [confirmPwError, setConfirmPwError] = useState<boolean>(false);
    const [letsChange, setLetsChange] = useState<boolean>(false);

    useEffect(() => {
        setEmail(searchParams.get("id") || "");
        if (searchParams.get("id") === null) {
            alert("Invalid request");
            router.push("/");
        }
    }, [searchParams]);

    const handleUserForm = (e: any) => {
        setCode(e.target.value);
    }
    const handleNewPwForm = (e: any) => {
        const { id, value } = e.target;
        setNewPw((prev: any) => ({
            ...prev,
            [id]: value
        }));
        setPwError(false);
        setConfirmPwError(false);
    }
    const ValidationUserForm = (code: string) => {
        // value check
        if (code === "") {
            setInputCodeError(true);
            return false;
        }
        setInputCodeError(false);
        return true;
    }
    const ValidationNewPwForm = (newPw: string, newPwCheck: string) => {
        if (newPw === "") {
            setPwError(true);
            return false;
        }
        if (newPw !== newPwCheck) {
            setConfirmPwError(true);
            return false;
        }
        setPwError(false);
        setConfirmPwError(false);
        return true;
    }
    const submitUserForm = async () => {
        const isValid = ValidationUserForm(code);


        try {
            let payload = {};
            if (isValid) {
                payload = {
                    code: code,
                    email: email
                }
            }
            const response: any = await callAPI(HTTPMETHOD.POST, payload, "/api/auth/code/check", "");
            if (response.code === 200) {
                setLetsChange(true);
            }
        } catch (error) {
            console.log(error);
            setInputCodeError(true);
        }
    }
    const submitNewPwForm = async () => {
        const isValid = ValidationNewPwForm(newPw.newPw, newPw.newPwCheck);
        if (!isValid) {
            return;
        }
        try {
            const payload = {
                email: email, // from parameter
                password: newPw.newPw,
                code: code
            }
            const response: any = await callAPI(HTTPMETHOD.POST, payload, "/api/auth/password/update", "");
            if (response.code === 200) {
                router.push("/auth/login");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {
                !letsChange ?
                    <>
                        <div className="form__groupList">
                            <div className="form__group">
                                <div className="form__label">Code <span className="form__labelRequired">*</span></div>
                                <div className="form__input">
                                    <InputText size="large" id="code" name="code" value={code} onChange={e => handleUserForm(e)} placeholder="Enter Your Code" error={inputCodeError}></InputText>
                                    {inputCodeError && <p className="form__error">Code is not correct</p>}
                                </div>
                            </div>
                        </div>

                        <div className="form__submit">
                            <div className="btn primary large pointer" role="button" onClick={submitUserForm}>Confirm</div>
                        </div>
                    </>
                    :
                    <>
                        <div className="form__groupList">
                            <div className="form__group">
                                <div className="form__label">Password <span className="form__labelRequired">*</span></div>
                                <div className="form__input">
                                    <InputPw size="large" id="newPw" name="newPw" value={newPw.newPw} onChange={e => handleNewPwForm(e)} placeholder="Enter New Password" error={pwError}></InputPw>
                                    {pwError && <p className="form__error">Please enter your password</p>}
                                </div>
                            </div>
                            <div className="form__group">
                                <div className="form__label">Confirm Password <span className="form__labelRequired">*</span></div>
                                <div className="form__input">
                                    <InputPw size="large" id="newPwCheck" name="newPwCheck" value={newPw.newPwCheck} onChange={e => handleNewPwForm(e)} placeholder="Confirm New Password" error={confirmPwError}></InputPw>
                                    {confirmPwError && <p className="form__error">Code is not correct</p>}
                                </div>
                            </div>
                        </div>

                        <div className="form__submit">
                            <div className="btn primary large pointer" role="button" onClick={submitNewPwForm}>Password Update</div>
                        </div>
                    </>
            }
        </>

    )
}

export default SignForm;