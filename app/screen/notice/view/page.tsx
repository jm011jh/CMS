'use client'

import { callAPI, HTTPMETHOD } from "@/lib/util/callApi";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ScreenLayout from "../../components/ScreenLayout";
import '../../components/screenComponents.css';
import { useScreenLanguageStore } from '../../store/screenLanguageStore';

import "quill/dist/quill.snow.css";

type noticeItem = {
    id: number,
    content: string,
    contentLanguage: any,
    isRemoved: boolean,
    order: number,
    regDate: string,
    removeDate: string | null,
    title: string,
    titleLanguage: any,
}

const Page: React.FC = () => {

    const params = useSearchParams();
    const id = params.get('id');
    const { language } = useScreenLanguageStore();
    // #region API =====================================================
    const [noticeItem, setNoticeItem] = useState<noticeItem | null>(null);
    const APIGetAppNoticeList = async () => {
        try {
            const url = '/api/cs/notice?page=1&limit=9999';
            const response: any = await callAPI(HTTPMETHOD.GET, {}, url, '');
            return response;
        } catch (error) {
            throw error;
        }
    }
    useEffect(() => {
        APIGetAppNoticeList().then((res: any) => {
            // 전체 리스트 중 id와 동일한 아이템 찾기
            const noticeItem = res.data.data.find((item: any) => item.id === Number(id));
            setNoticeItem(noticeItem)
        })
    }, [])

    // #endregion API ==================================================

    return (
        <ScreenLayout logoType={language === 'KOR' ? '공지사항' : 'Notice'}>
            <div className="notice">
                <div className="noticeViewTop">
                    <div className="noticeViewTitle">{language === 'KOR' ? noticeItem?.title : noticeItem?.titleLanguage.en}</div>
                    <div className="noticeViewDate">{dayjs(noticeItem?.regDate).format('YYYY.MM.DD')}</div>
                </div>
                <div className="noticeViewCont" dangerouslySetInnerHTML={{ __html: language === 'KOR' ? noticeItem?.content : noticeItem?.contentLanguage.en || '' }}>

                </div>
            </div>
        </ScreenLayout>
    )
}

export default Page;