"use client"

import { callAPI, HTTPMETHOD } from "@/lib/util/callApi";
import { getAccessToken } from "@/lib/util/tokenClass";
import { useState } from "react";
import AdminPgTop from "../components/card/AdminPgTop";
import AdminBox from "../components/card/AdminBox";
import { InputText } from "@/app/components/form/Input";
import { useRouter } from "next/navigation";

export default function TempPage() {
    const router = useRouter();

    const [gEmail, setGEmail] = useState<string>("");
    const [gPw, setGPw] = useState<string>("");

    const [userInfo, setUserInfo] = useState<any>({});

    const callInit = async () => {
        const token = getAccessToken();
        if (token === "") {
            alert("로그인 해주세요.");
            return
        }

        if( gEmail == "" ){
            alert("이메일을 입력해주세요.");
            return;
        }

        try {
            const result:any = await callAPI(HTTPMETHOD.GET, {}, `/api/admin/user/${gEmail}`, token);

            setUserInfo(result.data);

            // router.push("/admin/board/news");
            // router.back();

        } catch (e: any) {
            alert("처리 중 문제가 발생하였습니다.\n반복될 경우, 관리자에게 문의하여 주세요.");
        }
    }

    const save = async () => {

        const token = getAccessToken();
        if (token === "") {
            alert("로그인 해주세요.");
            return
        }

        const params = userInfo;
        params.password = gPw;

        try {
            const result = await callAPI(HTTPMETHOD.PATCH, params, "/api/admin/user", token);
            alert("수정 되었습니다.");

            // router.push("/admin/board/news");
            // router.back();

        } catch (e: any) {
            alert("처리 중 문제가 발생하였습니다.\n반복될 경우, 관리자에게 문의하여 주세요.");
        }
    }

    return (
        <>
        <div className="adm--wrap">
            <AdminPgTop tit={`테스트 사용자 수정`}/>
            <AdminBox><>
                <div className="adm--box-fixed">
                    <div className="adm--box-tit">{`테스트 사용자 수정`}</div>
                    <div className="adm--box-fixed-r">
                        <div onClick={e => router.back()} className="btn disabled small radius">목록</div>
                        {
                            JSON.stringify(userInfo) == "{}" ?
                                <div onClick={callInit} className="btn primary small radius">불러오기</div>
                                :
                                <div onClick={save} className="btn primary small radius">수정하기</div>
                        }
                    </div>
                </div>
                <div className="adm--box-tit">사용자 정보</div>
                <div className="input-table">
                    <div className="input-table-row" data-grid="1">
                        <div className="input-table-row-th"><p>이메일</p></div>
                        <div className="input-table-row-td">
                            <InputText size="xsmall" id="email" name="email" isDisabled={JSON.stringify(userInfo) != "{}"} value={gEmail} onChange={(e:any) => setGEmail(e.target.value)}></InputText>
                        </div>
                    </div>
                    {/* <div className="input-table-row" data-grid="1">
                        <div className="input-table-row-th"><p>이름</p></div>
                        <div className="input-table-row-td">
                            <InputText size="xsmall" id="title_kr" name="title_kr" value={view?.title_kr ?? ''} placeholder={"한글제목을 입력해주세요"} onChange={e => handleViewValue(e)}></InputText>
                        </div>
                    </div>
                    <div className="input-table-row" data-grid="1">
                        <div className="input-table-row-th"><p>주소</p></div>
                        <div className="input-table-row-td">
                            <InputText size="xsmall" id="title_en" name="title_en" value={view?.title_en ?? ''} placeholder={"영문제목을 입력해주세요"} onChange={e => handleViewValue(e)}></InputText>
                        </div>
                    </div> */}
                    <div className="input-table-row" data-grid="1">
                        <div className="input-table-row-th"><p>비밀번호</p></div>
                        <div className="input-table-row-td">
                            <InputText size="xsmall" id="pw" name="pw" value={gPw} onChange={(e:any) => setGPw(e.target.value)}></InputText>
                        </div>
                    </div>

                    
                </div>
                
            </></AdminBox>
        </div>
        </>
    )
}