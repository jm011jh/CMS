'use client'

import { callAPI, HTTPMETHOD } from '@/lib/util/callApi';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ScreenLayout from '../components/ScreenLayout';
import '../components/screenComponents.css';
import { useScreenLanguageStore } from '../store/screenLanguageStore';

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

    const router = useRouter()
    const { language } = useScreenLanguageStore();
    const [noticeListData, setNoticeListData] = useState<noticeItem[]>([]);
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
            setNoticeListData(res.data.data)
        })
    }, [])

    const goToDetailPage = (id: string) => {
        router.push(`/screen/notice/view?id=${id}`)
    }

    return (
        <ScreenLayout>
            <div className="screenWrap">
                <div className="notice">

                    <div className="noticeList">
                        <div className="noticeListTitle">{language === 'KOR' ? '공지사항' : 'Notice'}</div>
                        {
                            noticeListData.map((item, idx) => (
                                <div className="noticeItem" key={idx} onClick={() => goToDetailPage(item.id.toString())}>
                                    <div className="noticeItemTitle">{language === 'KOR' ? item.title : item.titleLanguage.en}</div>
                                    <div className="noticeItemDate">{dayjs(item.regDate).format('YYYY.MM.DD')}</div>
                                </div>
                            ))
                        }
                    </div>

                </div>
            </div>
        </ScreenLayout >
    )
}

export default Page;