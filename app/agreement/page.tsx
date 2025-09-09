"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { callAPI, HTTPMETHOD } from "@/lib/util/callApi";

//quill css
/*
import "quill/dist/quill.snow.css";

    <div className="ql-container ql-snow">
        <div className="ql-editor" dangerouslySetInnerHTML={{ __html: contents }}></div>
    </div>
*/
import "quill/dist/quill.snow.css";

interface AgreementContent {
    [key: string]: {
        title_kr: string;
        title_en?: string;
        content_kr: React.ReactNode | any;
        content_en?: React.ReactNode | any;
    };
}


export default function AgreementPage() {

    const router = useRouter();
    const searchParams = useSearchParams();

    const [showBackBtn, setShowBackBtn] = useState<boolean>(true);

    const handleBack = () => {
        router.back();
    }

    const [contents, setContents] = useState<string>("");

    const id = searchParams.get('id');
    const lang = searchParams.get('lang');
    // const type = searchParams.get('type');

    const callDetailById = async (id: string) => {

        let type = "SERVICE_TERMS";
        if (id == "1") {
            type = "SERVICE_TERMS"
        } else if (id == "2") {
            type = "PRIVACY_POLICY"
        } else {
            type = "PRIVACY_POLICY"
        }

        const url = `/api/terms/detail/type/${type}`;
        try {
            const result: any = await callAPI(HTTPMETHOD.GET, {}, url, "");
            return result;
        }
        catch (e: any) {
            console.log(e);
            alert(
                '처리 중 문제가 발생하였습니다.\n반복될 경우, 관리자에게 문의하여 주세요.',
            );
            return null;
        }
    };

    const callListBySearch = async () => {


        try {
            // const url = `/api/terms/`;
            // const result: any = await callAPI(HTTPMETHOD.GET, {}, url, "");

            // console.log(result);

            // const target = result.data.find((item: any) => item.type === id);
            // if (!target) {
            //     alert("해당 약관이 존재하지 않습니다.");
            //     return;
            // }

            const detail = await callDetailById(id ?? '');
            if (!detail) {
                alert("약관 내용을 불러오는 데 실패했습니다.");
                return;
            }

            console.log(detail);

            if (lang === 'en') {
                setContents(detail.data.contentUs ?? '');
            } else if (lang === 'cn') {
                setContents(detail.data.contentCn ?? '');
            }
            else if (lang === 'tw') {
                setContents(detail.data.contentTw ?? '');
            } else {
                setContents(detail.data.content ?? '');
            }

        } catch (e: any) {
            console.log(e);
            alert(
                '처리 중 문제가 발생하였습니다.\n반복될 경우, 관리자에게 문의하여 주세요.',
            );
        }
    };

    useEffect(() => {
        callListBySearch();
    }, []);

    return (
        <div className="signup__cont agreement">
            <div className="signup__top">
                <div className="signup__title"></div>
                {showBackBtn && <div className="signup__back" onClick={handleBack}><img src="/image/icon_close_black.png" alt="back" /></div>}
            </div>
            <div style={{ padding: "20px", all: "unset" }}>
                <div className="ql-container ql-snow">
                    <div className="ql-editor" dangerouslySetInnerHTML={{ __html: contents }}></div>
                </div>
            </div>
        </div>
    );
}
