'use client';

import AdmButtonExcel from '@/app/admin/components/design/AdmButtonExcel';
import AdmListBox from '@/app/admin/components/design/AdmListBox';
import AdmListSrchBar, { T_AdmListSrchParam } from '@/app/admin/components/design/AdmListSrchBar'; // Corrected path if needed
import AdmListTable from '@/app/admin/components/design/AdmListTable';
import AdmListTableHeadRow, { AdmListTableCellProps } from '@/app/admin/components/design/AdmListTableHeadRow';
import AdmListTableTop, { AdmListTableTopTitle } from '@/app/admin/components/design/AdmListTableTop';
import AdmPageTop from '@/app/admin/components/design/AdmPageTop';
import AdmWrapper from '@/app/admin/components/design/AdmWrapper';
import Pagination from '@/app/admin/components/paging/Pagination';
import listDataToTableList from '@/app/admin/lib/listDataToTableList';
import useLoadingScreenStore from '@/app/admin/store/loadingScreenStore';
import { callAPI, HTTPMETHOD } from '@/lib/util/callApi';
import { convertToISO8601 } from '@/lib/util/commonUtil';
import { getAccessToken } from '@/lib/util/tokenClass';
import dayjs from 'dayjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react'; // Added useCallback
import { basicThemeColors } from '../../assets/theme';
import { AdmListTop, AdmListTopItem, AdmListTopItemLabel, AdmListTopItemLine, AdmListTopItemValue, AdmListTopItemValueBox, AdmListTopPurple, AdmListTopSemibold } from '../../components/design/AdmListTop';
import AdmQuestionHoverIcon from '../../components/design/AdmQuestionHoverIcon';
import { useConfirmPopupStore } from '../../store/confirmPopupStore';
import ArtistMsgPopup from './component/ArtistMsgPopup';
import MsgAdmListTableBodyRow from './component/MsgAdmListTableBodyRow';

const API_URL_DELETE = '/api/admin/chat-comments/'; // Define the API URL for deletion
const API_URL_REPORT = '/api/admin/chat-comments/'; // Define the API URL for deletion
const API_URL_LIST = '/api/admin/chat-comments'; // Define the API URL for listing
const URL_LIST = '/admin/msg/user'; // Define the URL for listing in the admin board
const URL_VIEW = '/admin/msg/user/view?id='; // Define the API URL for editing
const ITEMS_PER_PAGE = 10; // Define the number of items per page

const AdminMsgUserPage: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams(); // Next.js hook for URL search parameters
    const [tableStructure, setTableStructure] = useState<AdmListTableCellProps[]>([
        { id: '', value: '채팅일시', size: '200px', cellKey: 'regDate' },
        { id: '', value: '사용자 닉네임', size: '220px', cellKey: 'regUserName', align: 'left' },
        // { id: '', value: '구독여부', size: '120px', cellKey: 'regUserSub' },
        { id: '', value: '메시지 내용', size: '100%', cellKey: 'makeNode' },
        { id: '', value: '아티스트 메시지', size: '150px', cellKey: 'artistMessage' },
        { id: '', value: '신고횟수', size: '120px', cellKey: 'reportCount' },
        { id: '', value: '삭제여부', size: '120px', cellKey: 'isRemoved' },
        { id: '', value: '관리', size: '150px', cellKey: 'ctrlCustom' },
    ]);
    const [bdList, setBdList] = useState<AdmListTableCellProps[][]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [page, setPage] = useState(1);

    const [dashboard, setDashboard] = useState<any>({
        "totalComments": 0,
        "activeComments": 0,
        "removedComments": 0,
        "reportedComments": 0,
        "todayComments": 0,
        "weeklyComments": 0,
        "monthlyComments": 0
    });

    const { showLoading, hideLoading } = useLoadingScreenStore();

    const { showPopup } = useConfirmPopupStore()
    const confirmReportUser = (item: any) => {
        showPopup({
            title: <p>신고 전 확인해주세요</p>,
            desc: <p>유저를 신고 처리 하시겠습니까?</p>,
            onConfirm: () => {
                showLoading();
                apiReportUser(item);
                // 팝업에서 "확인"을 눌렀을 때의 동작
            },
            onCancel: () => {
                // 팝업에서 "취소"를 눌렀을 때 (팝업이 닫히는 것 외 추가 동작 필요시)
            }
        });
    };
    const confirmDeleteUser = (item: any) => {
        showPopup({
            title: <p>삭제 전 확인해주세요</p>,
            desc: <p>유저를 삭제 처리 하시겠습니까?</p>,
            onConfirm: () => {
                showLoading();
                apiDeleteUser(item);
            },
        });
    };
    const apiReportUser = async (target: any) => {

        try {
            if (target.isRemoved === true || target.isRemoved === '삭제됨') {
                alert('이미 삭제된 댓글입니다.');
                return;
            }

            const token = getAccessToken();
            if (token === '') {
                alert('로그인 해주세요.');
                return;
            }

            const url = `${API_URL_REPORT}${target.id}/report`;
            const params = {
                "category": "CHAT_COMMENT",
                "message": "관리자 신고",
                "eventTime": convertToISO8601(),
                "reasonType": "OTHER",
                "reportedUserId": target.regUser.id,
                "categoryId": target.id,
                "files": []
            }
            const result: any = await callAPI(HTTPMETHOD.PATCH, params, url, token);
            console.log(result)

            alert('신고가 접수되었습니다.');
            callListBySearch();

        } catch (e: any) {
            console.error("Error during editItem:", e);
            if (e.response.data.code == 400) {
                alert('처리 중 문제가 발생하였습니다.\n반복될 경우, 관리자에게 문의하여 주세요.',);
            } else {
                alert(e.response.data.message);
            }
        } finally {
            hideLoading();
        }
    };
    const apiDeleteUser = async (target: any) => {
        try {
            if (target.isRemoved === true || target.isRemoved === '삭제됨') {
                alert('이미 삭제된 댓글입니다.');
                return;
            }

            const token = getAccessToken();
            if (token === '') {
                alert('로그인 해주세요.');
                return;
            }

            const url = `${API_URL_DELETE}${target.id}`;
            const params = {
                "id": target.id,
            }
            const result: any = await callAPI(HTTPMETHOD.DELETE, params, url, token);
            console.log(result)

            alert('삭제가 완료되었습니다.');
            callListBySearch();
        }
        catch (e: any) {
            console.error("Error during editItem:", e);
            if (e.response.data.code == 400) {
                alert('처리 중 문제가 발생하였습니다.\n반복될 경우, 관리자에게 문의하여 주세요.',);
            } else {
                alert(e.response.data.message);
            }
        }
        finally {
            hideLoading();
        }
    }

    // Define search types for AdmListSrchBar
    const srchTypes: T_AdmListSrchParam[] = [
        { size: '50%', inputType: 'search', paramKey: 'search', label: '검색어', placeholder: '제목 또는 내용으로 검색' },
        { size: '50%', inputType: 'datePatrolStart', paramKey: 'startDate', label: '기간', placeholder: 'YYYY-MM-DD' },
        { size: '50%', inputType: 'datePatrolEnd', paramKey: 'endDate', label: '기간', placeholder: 'YYYY-MM-DD', notInRow: true },
    ];

    const getInitialSearchValues = useCallback(() => {
        const initial: Record<string, string> = {};
        srchTypes.forEach(type => {
            const value = searchParams.get(type.paramKey);
            if (value !== null) {
                initial[type.paramKey] = value;
            }
        });
        return initial;
    }, [searchParams, srchTypes]);

    const callDashboard = async () => {
        try {

            const token = getAccessToken();
            if (token === '') {
                alert('로그인 해주세요.');
                return;
            }

            const url = `${API_URL_LIST}/stats`;
            const result: any = await callAPI(HTTPMETHOD.GET, {}, url, token);

            setDashboard({ ...result.data })

        } catch (e) {
            if (e === null) return;
            alert(
                '처리 중 문제가 발생하였습니다.\n반복될 경우, 관리자에게 문의하여 주세요.',
            );
        }
    }

    const callListBySearch = async () => {
        const token = getAccessToken();
        if (token === '') {
            alert('로그인 해주세요.');
            return;
        }

        callDashboard();

        //query에서 list에서 필요한 값 가져옴
        const searchParams = new URLSearchParams(window.location.search);
        const page = parseInt(searchParams.get('page') ?? '1');
        setPage(page);

        // Build query parameters
        const queryParams = new URLSearchParams({
            limit: ITEMS_PER_PAGE.toString(),
            page: page.toString()
        });

        for (const [key, value] of searchParams) {
            queryParams.set(key, value)
        }
        const url = `${API_URL_LIST}?${queryParams.toString()}`;

        try {
            const result: any = await callAPI(HTTPMETHOD.GET, {}, url, token);

            const data: any[] = [];
            result.data.data.map((item: any, idx: number) => {
                data.push({
                    ...item,
                    regDate: item.regDate ? dayjs(item.regDate).format('YYYY.MM.DD HH:mm') : '-',
                    regUserName: <div onClick={() => window.open('/admin/user/info/view?id=' + item.regUser.id, '_blank')} style={{ textDecoration: 'underline', cursor: 'pointer', marginRight: 'auto' }}>{item.regUser.name}</div>,
                    makeNode: item.content ?
                        <>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', height: '100%', alignItems: 'flex-start', justifyContent: 'center' }}>
                                <div style={{ color: '#000' }}>
                                    {item.content}
                                </div>
                            </div>
                        </> : '-',
                    artistMessage: <div onClick={() => openArtistMsgPopup(item.chatContent, item.regDate)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '24px', fontSize: '12px', border: '1px solid #D1D5DB', borderRadius: '4px', color: basicThemeColors.gray400, cursor: 'pointer' }}>메시지 보기</div>,
                    isRemoved: <p style={{ textAlign: 'left', width: '100%' }}>{item.isRemoved ? '삭제됨' : '정상'}</p>,
                    ctrlCustom:
                        <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                            <button onClick={() => actionReportUser(item)} style={{ display: 'flex', width: '88px', textAlign: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: '#D23838', border: '0px solid #000', color: '#ffffff', fontWeight: '600', height: '24px', borderRadius: '4px', cursor: 'pointer' }}>신고하기</button>
                            {
                                item.isRemoved === false
                                    ? <button onClick={() => actionDeleteUser(item)} style={{ display: 'flex', width: '62px', textAlign: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000', border: '0px solid #000', color: '#ffffff', fontWeight: '600', height: '24px', borderRadius: '4px', cursor: 'pointer' }}>삭제</button>
                                    : <button style={{ display: 'flex', width: '62px', textAlign: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000', border: '0px solid #000', color: '#ffffff', fontWeight: '600', height: '24px', borderRadius: '4px', opacity: '0.3', cursor: 'default' }}>삭제</button>
                            }
                        </div>
                });
            });

            setTableStructure(tableStructure);
            const tableData = listDataToTableList(data, tableStructure);
            setBdList(tableData);
            setTotalItems(result.data.meta.total);
        } catch (e: any) {
            console.error("Error fetching list:", e);
            alert(
                '처리 중 문제가 발생하였습니다.\n반복될 경우, 관리자에게 문의하여 주세요.',
            );
        }
    };

    useEffect(() => {
        const newUrl = new URL(window.location.href);
        const page = parseInt(newUrl.searchParams.get('page') ?? '1');

        setPage(page);
        callListBySearch();

    }, [searchParams]);

    // #region ARtistMsgPopup =================================================
    const [artistMsgPopup, setArtistMsgPopup] = useState<boolean>(false);
    const [artistMsgTitle, setArtistMsgTitle] = useState<string>('');
    const [artistMsgDate, setArtistMsgDate] = useState<string>('');
    const openArtistMsgPopup = (title: string, date: string) => {
        setArtistMsgPopup(true);
        setArtistMsgTitle(title);
        setArtistMsgDate(date);
    }
    // #endregion ARtistMsgPopup ==============================================

    // #region action button ================================================
    const actionReportUser = (item: any) => {
        confirmReportUser(item);
    }
    const actionDeleteUser = (item: any) => {
        confirmDeleteUser(item);
    }
    // #endregion action button ==============================================

    return (
        <>
            <AdmWrapper>
                <AdmPageTop title={`회원 발송 내역`} />
                <AdmListTop>
                    <AdmListTopItem>
                        <AdmListTopItemLabel>
                            <AdmListTopSemibold>댓글 현황</AdmListTopSemibold>
                            <AdmQuestionHoverIcon style={{ marginLeft: '4px' }}><p style={{ whiteSpace: 'nowrap', fontSize: '12px' }}>댓글 전체 통계 입니다.</p></AdmQuestionHoverIcon>
                        </AdmListTopItemLabel>
                        <AdmListTopItemValue>

                            <AdmListTopItemValueBox>

                                <AdmListTopSemibold>총 댓글</AdmListTopSemibold>
                                <AdmListTopPurple>{dashboard.totalComments}</AdmListTopPurple>
                                {/* <AdmListTopSemibold>명</AdmListTopSemibold> */}

                            </AdmListTopItemValueBox>
                            <AdmListTopItemValueBox>

                                <AdmListTopSemibold>활성</AdmListTopSemibold>
                                <AdmListTopPurple>{dashboard.activeComments}</AdmListTopPurple>
                                {/* <AdmListTopSemibold>명</AdmListTopSemibold> */}

                            </AdmListTopItemValueBox>

                            <AdmListTopItemLine />

                            <AdmListTopItemValueBox>

                                <AdmListTopSemibold>삭제</AdmListTopSemibold>
                                <AdmListTopPurple>{dashboard.removedComments}</AdmListTopPurple>
                                {/* <AdmListTopSemibold>명</AdmListTopSemibold> */}

                            </AdmListTopItemValueBox>


                            <AdmListTopItemValueBox>

                                <AdmListTopSemibold>신고</AdmListTopSemibold>
                                <AdmListTopPurple>{dashboard.reportedComments}</AdmListTopPurple>
                                {/* <AdmListTopSemibold>명</AdmListTopSemibold> */}

                            </AdmListTopItemValueBox>

                            <AdmListTopItemValueBox>

                                <AdmListTopSemibold>오늘</AdmListTopSemibold>
                                <AdmListTopPurple>{dashboard.todayComments}</AdmListTopPurple>
                                {/* <AdmListTopSemibold>명</AdmListTopSemibold> */}

                            </AdmListTopItemValueBox>

                            <AdmListTopItemValueBox>

                                <AdmListTopSemibold>이번주</AdmListTopSemibold>
                                <AdmListTopPurple>{dashboard.weeklyComments}</AdmListTopPurple>
                                {/* <AdmListTopSemibold>명</AdmListTopSemibold> */}

                            </AdmListTopItemValueBox>

                            <AdmListTopItemValueBox>

                                <AdmListTopSemibold>이번달</AdmListTopSemibold>
                                <AdmListTopPurple>{dashboard.monthlyComments}</AdmListTopPurple>
                                {/* <AdmListTopSemibold>명</AdmListTopSemibold> */}

                            </AdmListTopItemValueBox>

                        </AdmListTopItemValue>
                    </AdmListTopItem>
                </AdmListTop>
                <AdmListSrchBar
                    srchTypes={srchTypes}

                    initialSearchValues={getInitialSearchValues()}
                />
                <AdmListBox>
                    <>
                        <AdmListTableTop
                            LeftComponents={<AdmListTableTopTitle title={'사용자 발송내역'} />}
                            RightComponent={
                                <>
                                    <AdmButtonExcel text={'엑셀 다운로드'} url={'/api/admin/chat-comments/export/excel'} filename={`사용자 발송내역-${dayjs().format("YYYY-MM-DD HH_mm_ss")}.xlsx`} />
                                </>
                            }
                        />
                        <div className="adm--box-scrollWrap">
                            <div className="adm--box-scrollCont" style={{ width: '100%' }}>
                                <AdmListTable>
                                    <>
                                        <AdmListTableHeadRow structure={tableStructure} />
                                        {bdList.length > 0 &&
                                            bdList.map((data: any, idx: number) => (
                                                <MsgAdmListTableBodyRow
                                                    key={idx}
                                                    structure={data}
                                                    isLast={idx === bdList.length - 1}
                                                />
                                            ))}
                                    </>
                                </AdmListTable>

                                <Pagination
                                    totalItems={totalItems}
                                    currentPage={page}
                                    itemCountPerPage={ITEMS_PER_PAGE}
                                />
                            </div>
                        </div>
                    </>
                </AdmListBox>
            </AdmWrapper>
            {
                artistMsgPopup &&
                <ArtistMsgPopup close={() => setArtistMsgPopup(false)} date={artistMsgDate} title={artistMsgTitle} />
            }
        </>
    );
};

export default AdminMsgUserPage;
