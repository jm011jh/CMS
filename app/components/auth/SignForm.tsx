'use client'

import { userRegion } from "@/lib/inputoptionvalue";
import { callAPI, HTTPMETHOD } from "@/lib/util/callApi";
import Link from "next/link";
import { useEffect, useState } from "react";
import { InputCheck, InputPw, InputSelect, InputText } from "../form/Input";
interface IUserInfo {
    name1: string;
    name2: string;
    email: string;
    password: string;
    confirmPassword: string;
    address0: string;
    address1: string;
    address2: string;
}
interface InewUserInfo {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    address: string;
}

const SignForm = () => {

    const [isAgreement01, setIsAgreement01] = useState<boolean>(false);
    const [isAgreement02, setIsAgreement02] = useState<boolean>(false);
    const [isAgreement03, setIsAgreement03] = useState<boolean>(false);

    const [isAgreementAll, setIsAgreementAll] = useState<boolean>(false);
    const handleAgreementAll = (e: any) => {
        setIsAgreementAll(e);
        setIsAgreement01(e);
        setIsAgreement02(e);
        setIsAgreement03(e);
    }
    const handleAgreement01 = (e: any) => {
        setIsAgreement01(e);
    }
    const handleAgreement02 = (e: any) => {
        setIsAgreement02(e);
    }
    const handleAgreement03 = (e: any) => {
        setIsAgreement03(e);
    }
    useEffect(() => {
        setIsAgreementAll(isAgreement01 && isAgreement02 && isAgreement03);
    }, [isAgreement01, isAgreement02, isAgreement03]);
    // ==============================================================================

    const [optUserRegion, setoptUserRegion] = useState<any[]>([...userRegion])
    const [userInfo, setUserInfo] = useState<IUserInfo>({
        name1: "seong",
        name2: "jaemin",
        email: "jm011jh@gmail.com",
        password: "Tjdwoals92!",
        confirmPassword: "Tjdwoals92!",
        address0: "KR",
        address1: "Seoul",
        address2: "Gwangjin-gu",
    })

    const handleUserForm = (e: any) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        });
    }
    const ValidationUserForm = (newUserInfo: InewUserInfo) => {
        // value check
        if (newUserInfo.name === "") {
            alert("Name is required");
            return false;
        }
        if (newUserInfo.email === "") {
            alert("Email is required");
            return false;
        }
        if (newUserInfo.password === "") {
            alert("Password is required");
            return false;
        }
        if (newUserInfo.address === "") {
            alert("Address is required");
            return false;
        }
        // password check
        if (newUserInfo.password.length < 8) {
            alert("Password must be at least 8 characters");
            return false;
        }
        if (newUserInfo.password !== newUserInfo.confirmPassword) {
            alert("Password and Confirm Password must be same");
            return false;
        }
        if (!isAgreement02 && !isAgreement03) {
            alert("You must agree to the terms of service");
            return false;
        }
        return true;
    }
    const submitUserForm = async () => {
        const newUserInfo: InewUserInfo = {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            address: "",
        }
        newUserInfo.name = userInfo.name1 + " " + userInfo.name2;
        newUserInfo.email = userInfo.email;
        newUserInfo.password = userInfo.password;
        newUserInfo.confirmPassword = userInfo.confirmPassword;
        newUserInfo.address = userInfo.address0 + " " + userInfo.address1 + " " + userInfo.address2;
        const isValid = ValidationUserForm(newUserInfo);

        try {
            let payload = {};
            if (isValid) {
                payload = {
                    name: newUserInfo.name,
                    email: newUserInfo.email,
                    password: newUserInfo.password,
                    address: newUserInfo.address,
                }
                console.log(payload);
            }
            const response = await callAPI(HTTPMETHOD.POST, payload, "/api/auth/sign-up", "");
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="form__groupList">
                <div className="form__group">
                    <div className="form__label">Name <span className="form__labelRequired">*</span></div>
                    <div className="form__input grid2">
                        <InputText size="large" id="name1" name="name1" value={userInfo.name1} onChange={e => handleUserForm(e)} placeholder="Enter your name" />
                        <InputText size="large" id="name2" name="name2" value={userInfo.name2} onChange={e => handleUserForm(e)} placeholder="Enter your name" />
                    </div>
                </div>
                <div className="form__group">
                    <div className="form__label">Email <span className="form__labelRequired">*</span></div>
                    <div className="form__input">
                        <InputText size="large" id="email" name="email" value={userInfo.email} onChange={e => handleUserForm(e)} placeholder="Enter your email"></InputText>
                    </div>
                </div>
                <div className="form__group">
                    <div className="form__label">Password <span className="form__labelRequired">*</span></div>
                    <div className="form__input">
                        <InputPw size="large" id="password" name="password" value={userInfo.password} onChange={e => handleUserForm(e)} placeholder='Create your password' />
                    </div>
                    <div className="form__alert">
                        <div className="form__alertRequired">Must be at least 8 characters.</div>
                    </div>
                </div>
                <div className="form__group">
                    <div className="form__label">Confirm Password <span className="form__labelRequired">*</span></div>
                    <div className="form__input">
                        <InputPw size="large" id="confirmPassword" name="confirmPassword" value={userInfo.confirmPassword} onChange={e => handleUserForm(e)} placeholder='Confirm your password' />
                    </div>
                    <div className="form__alert">
                        <div className="form__alertRequired">Must be at least 8 characters.</div>
                    </div>
                </div>
                <div className="form__group">
                    <div className="form__label">Address <span className="form__labelRequired">*</span></div>
                    <div className="form__input address">
                        <InputSelect size="large" name="address0" id="address0" placeholder="Selecet Country / Region" options={optUserRegion} value={userInfo.address0} onChange={e => handleUserForm(e)}></InputSelect>
                        <InputText size="large" id="address1" name="address1" value={userInfo.address1} onChange={e => handleUserForm(e)} placeholder="Address" />
                        <InputText size="large" id="address2" name="address2" value={userInfo.address2} onChange={e => handleUserForm(e)} placeholder="Address (optioonal)" />
                    </div>
                </div>
            </div>
            <div className="form__agreement">
                <div className="form__agreement_item all">
                    <InputCheck size="small" id="agreement0" name="agreement0" checked={isAgreementAll} onChange={e => handleAgreementAll(e)}></InputCheck>
                    <label htmlFor="agreement0" className="form__label">약관에 전체 동의(선택사항 포함)</label>
                </div>
                <div className="form__agreement_line"></div>
                <div className="form__agreement_item">
                    <InputCheck size="small" id="agreement01" name="agreement01" checked={isAgreement01} onChange={e => handleAgreement01(e)}></InputCheck>
                    <div className="form__agreement_itemlabel">
                        <label htmlFor="agreement01" className="form__label"><span className="primary">(필수)</span> 서비스 이용약관</label>
                        <Link href="/agreement?id=1"><img src="/image/icon_next_gray.png" alt="link" /></Link>
                    </div>
                </div>
                <div className="form__agreement_item">
                    <InputCheck size="small" id="agreement02" name="agreement02" checked={isAgreement02} onChange={e => handleAgreement02(e)}></InputCheck>
                    <div className="form__agreement_itemlabel">
                        <label htmlFor="agreement02" className="form__label"><span className="primary">(필수)</span> 개인정보수집및이용동의</label>
                        <Link href="/agreement?id=2"><img src="/image/icon_next_gray.png" alt="link" /></Link>
                    </div>
                </div>
                <div className="form__agreement_item optional">
                    <InputCheck size="small" id="agreement03" name="agreement03" checked={isAgreement03} onChange={e => handleAgreement03(e)}></InputCheck>
                    <div className="form__agreement_itemlabel">
                        <label htmlFor="agreement03" className="form__label">(선택) 광고성정보수신동의</label>
                        <Link href="/agreement?id=3"><img src="/image/icon_next_gray.png" alt="link" /></Link>
                    </div>
                </div>
            </div>
            <div className="form__submit">
                <div className="btn primary large pointer" role="button" onClick={submitUserForm}>Create account</div>
            </div>
        </>

    )
}

export default SignForm;