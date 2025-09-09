'use client'

import Link from "next/link";
import { InputPw, InputText } from "../form/Input";
import { useState } from "react";
interface IUserInfo {
    password: string;
    confirmPassword: string;
}

const SettingPwForm = () => {

    const [userInfo, setUserInfo] = useState<IUserInfo>({
        password: "",
        confirmPassword: ""
    })

    const handleUserForm = (e: any) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        });
    }
    const ValidationUserForm = (newUserInfo : IUserInfo) => {
        // value check
        if(newUserInfo.password === ""){
            alert("Password is required");
            return false;
        }
        if(newUserInfo.confirmPassword === ""){
            alert("Confirm password is required");
            return false;
        }
        if(newUserInfo.password !== newUserInfo.confirmPassword){
            alert("Passwords do not match");
            return false;
        }
        return true;
    }
    const submitUserForm = () => {
        const newUserInfo : IUserInfo = {
            password: "",
            confirmPassword: ""
        }
        newUserInfo.password = userInfo.password;
        newUserInfo.confirmPassword = userInfo.confirmPassword;
        const isValid = ValidationUserForm(newUserInfo);
        if(isValid){
            const payload = {
                password: newUserInfo.password,
            }
            console.log(payload);
        }
    }

    return (
        <>
        <div className="findPwFormTitle">
            <h1 className="h1">Password Setting</h1>
            <h4 className="h4">Please enter your new password.</h4>
        </div>
            <form className="findPwForm">
                <div className="formGroupList">
                    <div className="formGroup">
                        <div className="formGroupLabel">Password <span className="formGroupLabelRequired">*</span></div>
                        <div className="formGroupInput">
                            <InputPw size="large" id="password" name="password" value={userInfo.password} onChange={e => handleUserForm(e)} placeholder="Enter your password"></InputPw>
                        </div>
                        <div className="form__alert">
                            <div className="form__alertRequired">Must be at least 8 characters.</div>
                        </div>
                    </div>
                    <div className="formGroup">
                        <div className="formGroupLabel">Confirm Password <span className="formGroupLabelRequired">*</span></div>
                        <div className="formGroupInput">
                            <InputPw size="large" id="confirmPassword" name="confirmPassword" value={userInfo.confirmPassword} onChange={e => handleUserForm(e)} placeholder="Confirm your password"></InputPw>
                        </div>
                        <div className="form__alert">
                            <div className="form__alertRequired">Must be same as password.</div>
                        </div>
                    </div>
                </div>
                <div className="findPwSubmit formSubmit">
                    <div className="primaryButton" role="button" onClick={submitUserForm}>Password Update</div>
                </div>
                <div className="findPwBack">
                    Back To <Link href="/">Sign in</Link>
                </div>
            </form>
        </>
    )
}

export default SettingPwForm;