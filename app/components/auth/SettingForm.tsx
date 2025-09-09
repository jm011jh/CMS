'use client'

import { callAPI, HTTPMETHOD } from "@/lib/util/callApi";
import { getAccessToken, removeToken } from "@/lib/util/tokenClass";
import { useRouter } from "next/navigation";
// import { useState } from "react";
interface IUserInfo {
    password: string;
    confirmPassword: string;
}

const SettingForm = () => {
    const router = useRouter();
    const logout = () => {
        if( confirm("정말 로그아웃 하시겠습니까?") ){
            removeToken();
            router.push("/");
        }
    }
    const dltAccount = async () => {
        try{
            if( confirm("정말 탈퇴 하시겠습니까? 모든 정보는 30일 후 삭제 예정입니다.") ){
                const token = getAccessToken();
                const url = "/api/mypage/request/del";
                const payload = {
                    email: "test@test.test",
                    password: "test1234",
                    confirmPassword: "test1234"
                }
                const result = await callAPI(HTTPMETHOD.POST, payload, url, token);
                alert("성공적으로 탈퇴 신청되었습니다.");
                removeToken();
                router.push("/");
            }
        } catch (e: any) {
            alert("처리 중 문제가 발생하였습니다.\n반복될 경우, 관리자에게 문의하여 주세요.");
        }

    }

    return (
        <div className="setting__cont">
            <div className="setting__figlist">
            <div className="setting__fig">
                <div className="setting__tit">Account</div>
                <div className="setting__list">
                    <div className="setting__item">
                        <div className="setting__key">Name</div>
                        <div className="setting__val">user_name</div>
                    </div>
                    <div className="setting__item">
                        <div className="setting__key">Email</div>
                        <div className="setting__val">user_email</div>
                    </div>
                </div>
            </div>
            <div className="setting__fig">
                <div className="setting__tit">Theme</div>
                <div className="setting__list">
                    <div className="setting__item">
                        <div className="setting__key">Theme</div>
                        <div className="setting__val primary">Dark</div>
                    </div>
                </div>
            </div>
            <div className="setting__fig">
                <div className="setting__tit">Language</div>
                <div className="setting__list">
                    <div className="setting__item">
                        <div className="setting__key">Applanguage</div>
                        <div className="setting__val primary">English</div>
                    </div>
                </div>
            </div>
            <div className="setting__fig">
                <div className="setting__tit">Account</div>
                <div className="setting__list">
                    <div className="setting__item cursor-pointer" onClick={logout}>
                        <div className="setting__val red">Logout</div>
                        <span className="arr"></span>
                    </div>
                    <div className="setting__item cursor-pointer" onClick={dltAccount}>
                        <div className="setting__key">Delete Account</div>
                        <span className="arr"></span>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default SettingForm;