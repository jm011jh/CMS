'use client'

import Link from "next/link";
import { InputText } from "../form/Input";
import { useState } from "react";
interface IUserInfo {
    email: string;
}

const FindPwForm = () => {

    const [userInfo, setUserInfo] = useState<IUserInfo>({
        email: "",
    })

    const handleUserForm = (e: any) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        });
    }
    const ValidationUserForm = (newUserInfo : IUserInfo) => {
        // value check
        if(newUserInfo.email === ""){
            alert("Email is required");
            return false;
        }
        return true;
    }
    const submitUserForm = () => {
        const newUserInfo : IUserInfo = {
            email: "",
        }
        newUserInfo.email = userInfo.email;
        const isValid = ValidationUserForm(newUserInfo);
        if(isValid){
            const payload = {
                email: newUserInfo.email,
            }
            console.log(payload);
        }
    }

    return (
        <>
        <div className="findPwFormTitle">
            <h1 className="h1">Find Password</h1>
            <h4 className="h4">Please enter your username or email address. <br/>You will recevie an email message with <br/>instructions on how to reset your password.</h4>
        </div>
            <form className="findPwForm">
                <div className="formGroupList">
                    <div className="formGroup">
                        <div className="formGroupLabel">Email <span className="formGroupLabelRequired">*</span></div>
                        <div className="formGroupInput">
                            <InputText size="large" id="email" name="email" value={userInfo.email} onChange={e => handleUserForm(e)} placeholder="Enter your email"></InputText>
                        </div>
                    </div>
                </div>
                <div className="findPwSubmit formSubmit">
                    <div className="primaryButton" role="button" onClick={submitUserForm}>Get New Password</div>
                </div>
                <div className="findPwBack">
                    Back To <Link href="/">Sign in</Link>
                </div>
            </form>
        </>
    )
}

export default FindPwForm;