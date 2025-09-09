'use client'

import { callAPI, HTTPMETHOD } from '@/lib/util/callApi';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ScreenLayout from './components/ScreenLayout';
import './components/screenComponents.css';
import { useScreenLanguageStore } from './store/screenLanguageStore';

type faqCategory = {
    active: boolean,
    key: string,
    kor: string,
    eng: string,
    count?: number;
}
type faqItem = {
    category: {
        id: number,
        name: string,
        nameEn: string,
    },
    content: string,
    contentLanguage: any,
    id: number,
    isRemoved: boolean,
    order: number,
    regDate: string,
    removeDate: string | null,
    title: string,
    titleLanguage: any,
    updateDate: string,
    open: boolean,
    hidden: boolean,
}

const Page: React.FC = () => {

    const router = useRouter()
    const { language } = useScreenLanguageStore();
    // #region API =====================================================
    const [appNoticeList, setAppNoticeList] = useState<any[]>([])
    const [faqCategory, setFaqCategory] = useState<faqCategory[]>([])
    const [faqList, setFaqList] = useState<faqItem[]>([
    ])
    const APIGetFaqList = async () => {
        try {
            const url = '/api/cs/faq';
            const response: any = await callAPI(HTTPMETHOD.GET, {}, url, '');
            return response;
        } catch (error) {
            throw error;
        }
    }
    const APIGetAppNoticeList = async () => {
        try {
            const url = '/api/cs/notice?page=1&limit=3';
            const response: any = await callAPI(HTTPMETHOD.GET, {}, url, '');
            return response;
        } catch (error) {
            throw error;
        }
    }
    useEffect(() => {
        APIGetFaqList().then((res: any) => {
            // 카테고리 리스트 복사(중복일 경우 지우기, id가 1일 경우 지우기:비공개용id)
            const categoryList: faqCategory[] = res.data.data.map((item: any, idx: number) => ({
                active: idx === 0,
                key: item.category.id,
                kor: item.category.name,
                eng: item.category.nameEn,
                count: 0,
            })).filter((item: any, idx: number, self: any) =>
                idx === self.findIndex((t: any) => t.key === item.key) && item.key !== 1
            )
            setFaqCategory(categoryList)

            // 첫번쨰 카테고리의 아이템 가져오고...
            const firstCategoryId = categoryList[0].key

            // FAQ 리스트 복사
            const copyFaqList: faqItem[] = res.data.data.map((item: any) => ({
                ...item,
                categoryId: item.category.id,
                open: false,
                hidden: firstCategoryId !== item.category.id,
            }))
            setFaqList(copyFaqList)

            // 첫번째 카테고리와 동일한 FAQ아이템의 개수로 초기값 세팅
            const firstCategoryFaqCount = copyFaqList.filter(item => (item.category.id) === Number(firstCategoryId)).length
            setFaqCount(firstCategoryFaqCount)
        })
        APIGetAppNoticeList().then((res: any) => {
            setAppNoticeList(res.data.data)
        })
    }, []);
    // #endregion API ==================================================
    // #region FAQ =====================================================
    const [faqCount, setFaqCount] = useState<number | null>()
    const changeFaqCategory = (cate: any) => {
        const newFaqCategory = faqCategory
        const updatedCategory = newFaqCategory.map(item => ({
            ...item,
            active: item.key === cate.key
        }));
        setFaqCategory(updatedCategory);
        const newFaqList = faqList
        const updatedItem = newFaqList.map(i => ({
            ...i,
            hidden: i.category.id !== cate.key,
            open: false,
        }));
        setFaqList(updatedItem);
        // 선택한 카테고리와 동일한 FAQ아이템의 개수 구하기
        const selectedCategoryFaqCount = updatedItem.filter(item => (item.category.id) === Number(cate.key)).length
        setFaqCount(selectedCategoryFaqCount)
    }
    const handleChangeFaqItem = (item: any) => {
        const newFaqList = faqList
        const updatedItem = newFaqList.map(i => ({

            ...i,
            open: i.id === item.id ? !i.open : false
        }));
        setFaqList(updatedItem);
    }
    // #endregion FAQ =====================================================

    return (
        <ScreenLayout>
            <div className="screenWrap">
                <div className="notice">

                    <div className='noticeTop'>
                        <div>{language === 'KOR' ? '공지사항' : 'Notice'}</div>
                        <button onClick={() => router.push('/screen/notice')} className='noticeBack'>
                            <p>{language === 'KOR' ? '더보기' : 'More'}</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M6.96967 4.46967C7.26256 4.17678 7.73732 4.17678 8.03022 4.46967L13.0302 9.46967C13.3231 9.76256 13.3231 10.2373 13.0302 10.5302L8.03022 15.5302C7.73732 15.8231 7.26256 15.8231 6.96967 15.5302C6.67678 15.2373 6.67678 14.7626 6.96967 14.4697L11.4394 9.99994L6.96967 5.53022C6.67678 5.23732 6.67678 4.76256 6.96967 4.46967Z" fill="#7D828C" />
                            </svg>
                        </button>
                    </div>
                    <div className="noticeList">
                        {
                            appNoticeList.map((item, idx) => (
                                <div onClick={() => router.push('/screen/notice/view?id=' + item.id)} className="noticeItem" key={idx}>
                                    <div className="noticeItemTitle">{language === 'KOR' ? item.title : item.titleLanguage.en}</div>
                                    <div className="noticeItemDate">{dayjs(item.regDate).format('YYYY.MM.DD')}</div>
                                </div>
                            ))
                        }
                    </div>

                </div>

                <div className="faq">
                    <div className="faqTop">
                        <div className="faqTopTitle">{language === 'KOR' ? '무엇을 도와드릴까요?' : 'What can we help you with?'}</div>
                        <div className="faqTopCategory">
                            {
                                faqCategory.map((cate, idx) =>
                                    <div className={"faqTopCategoryItem" + (cate.active ? ' active' : '')}
                                        key={idx}
                                        onClick={() => changeFaqCategory(cate)}
                                    >
                                        {language === 'KOR' ? cate.kor : cate.eng}
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="faqTopCount">{language === 'KOR' ? '검색결과' : 'Search results'} {faqCount}</div>
                    <div className="faqList">
                        {
                            faqList.map((item, i) =>
                                !item.hidden &&
                                <div className={"faqItem" + (!item.open ? ' close' : '')}
                                    key={i}
                                    onClick={() => handleChangeFaqItem(item)}
                                >
                                    <div className="faqItemTop">
                                        <div className="faqItemTitle">
                                            <span>Q.</span>
                                            <p>{language === 'KOR' ? item.title : item.titleLanguage.en}</p>
                                        </div>
                                        <div className="faqItemArrow">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path d="M14.4697 6.96967C14.7626 6.67678 15.2373 6.67678 15.5302 6.96967C15.8231 7.26256 15.8231 7.73732 15.5302 8.03022L10.5302 13.0302C10.2373 13.3231 9.76256 13.3231 9.46967 13.0302L4.46967 8.03022C4.17678 7.73732 4.17678 7.26256 4.46967 6.96967C4.76256 6.67678 5.23732 6.67678 5.53022 6.96967L9.99994 11.4394L14.4697 6.96967Z" fill="#6B7280" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="faqItemCont">
                                        <div className="faqItemContIcon">A.</div>
                                        <div className="faqItemContText">{language === 'KOR' ? item.content : item.contentLanguage.en}</div>
                                    </div>
                                </div>
                            )
                        }
                    </div >
                </div >

                <div className='inq'>
                    <div className="inqTop">
                        <div className="inqTopTitle">{language === 'KOR' ? '문제를 해결하지 못했나요?' : 'Did you not find the solution?'}</div>
                    </div>
                    <button className="inqGo" onClick={() => router.push('/screen/inquiry')}>
                        <div className="inqGoIcon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                                <path d="M5.91699 11.334C5.91699 11.0909 5.82024 10.8574 5.64844 10.6855C5.47653 10.5136 5.24311 10.417 5 10.417H3.25V13.834C3.25009 14.0769 3.34682 14.3096 3.51855 14.4814C3.69046 14.6534 3.92388 14.75 4.16699 14.75H5C5.24311 14.75 5.47653 14.6534 5.64844 14.4814C5.82007 14.3096 5.91691 14.0768 5.91699 13.834V11.334ZM7.41699 13.834C7.41691 14.4748 7.16212 15.0898 6.70898 15.543C6.25579 15.9961 5.64086 16.25 5 16.25H4.16699C3.52621 16.25 2.91119 15.996 2.45801 15.543C2.00487 15.0898 1.75009 14.4748 1.75 13.834V9.66699C1.75 8.58359 1.96333 7.5107 2.37793 6.50977C2.79253 5.50885 3.39995 4.59908 4.16602 3.83301C4.93209 3.06694 5.84186 2.45952 6.84277 2.04492C7.84371 1.63032 8.91659 1.41699 10 1.41699C11.0834 1.41699 12.1563 1.63032 13.1572 2.04492C14.1581 2.45952 15.0679 3.06694 15.834 3.83301C16.6001 4.59908 17.2075 5.50885 17.6221 6.50977C18.0367 7.5107 18.25 8.58359 18.25 9.66699V13.834C18.2499 14.4748 17.9951 15.0898 17.542 15.543C17.0888 15.996 16.4738 16.25 15.833 16.25H15C14.3591 16.25 13.7442 15.9961 13.291 15.543C12.8379 15.0898 12.5831 14.4748 12.583 13.834V11.334C12.583 10.6931 12.8379 10.0782 13.291 9.625C13.7442 9.17179 14.3591 8.91699 15 8.91699H16.707C16.6367 8.28815 16.4794 7.67089 16.2363 7.08398C15.8971 6.26504 15.4002 5.52035 14.7734 4.89355C14.1466 4.26676 13.402 3.76988 12.583 3.43066C11.7641 3.09148 10.8864 2.91699 10 2.91699C9.11363 2.91699 8.2359 3.09148 7.41699 3.43066C6.59804 3.76988 5.85336 4.26676 5.22656 4.89355C4.59977 5.52035 4.10289 6.26504 3.76367 7.08398C3.52058 7.67089 3.36329 8.28815 3.29297 8.91699H5C5.64094 8.91699 6.25577 9.17179 6.70898 9.625C7.1621 10.0782 7.41699 10.6931 7.41699 11.334V13.834ZM14.083 13.834C14.0831 14.0768 14.1799 14.3096 14.3516 14.4814C14.5235 14.6534 14.7569 14.75 15 14.75H15.833C16.0761 14.75 16.3095 14.6534 16.4814 14.4814C16.6532 14.3096 16.7499 14.0769 16.75 13.834V10.417H15C14.7569 10.417 14.5235 10.5136 14.3516 10.6855C14.1798 10.8574 14.083 11.0909 14.083 11.334V13.834Z" fill="white" />
                                <path d="M16.75 15.5V13.833C16.75 13.4188 17.0858 13.083 17.5 13.083C17.9142 13.083 18.25 13.4188 18.25 13.833V15.5C18.2499 16.5829 17.8194 17.621 17.0537 18.3867C16.288 19.1524 15.2498 19.5829 14.167 19.583H10C9.58579 19.583 9.25 19.2472 9.25 18.833C9.25 18.4188 9.58579 18.083 10 18.083H14.167C14.852 18.0829 15.5088 17.8106 15.9932 17.3262C16.4776 16.8418 16.7499 16.185 16.75 15.5Z" fill="white" />
                            </svg>
                        </div>
                        <div className="inqGoText">
                            <div className="inqGoText01">{language === 'KOR' ? '문의하기' : 'Inquiry'}</div>
                            <div className="inqGoText02">{language === 'KOR' ? '메일로 답변 받을 수 있어요' : 'You can receive an answer by email'}</div>
                        </div>
                    </button>
                </div>
            </div>
        </ScreenLayout >
    )
}

export default Page;