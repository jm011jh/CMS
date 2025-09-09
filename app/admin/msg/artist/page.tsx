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
import apiDeleteBoardItem from '@/app/admin/lib/apiDeleteBoardItem';
import listDataToTableList from '@/app/admin/lib/listDataToTableList';
import useLoadingScreenStore from '@/app/admin/store/loadingScreenStore';
import dayjs from 'dayjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react'; // Added useCallback
import { basicThemeColors } from '../../assets/theme';
import AdmButton from '../../components/design/AdmButton';
import { AdmListTop, AdmListTopItem, AdmListTopItemLabel, AdmListTopItemLine, AdmListTopItemValue, AdmListTopItemValueBox, AdmListTopPurple, AdmListTopSemibold } from '../../components/design/AdmListTop';
import AdmQuestionHoverIcon from '../../components/design/AdmQuestionHoverIcon';
import { useConfirmPopupStore } from '../../store/confirmPopupStore';
import MsgAdmListTableBodyRow from '../user/component/MsgAdmListTableBodyRow';
import { fetchArtistMsgList, fetchDashboardData, fetchDetailPopupData } from './api';
import ReplyListPopup from './components/ReplyListPopup';
import SettingChatroomPopup from './components/SettingChatroomPopup';
import { API_URL_DELETE, ITEMS_PER_PAGE, URL_LIST, URL_VIEW } from './constants';

const AdminMsgArtistPage: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams(); // Next.js hook for URL search parameters
    const [tableStructure, setTableStructure] = useState<AdmListTableCellProps[]>([
        { id: '', value: '채팅일시', size: '220px', cellKey: 'confirmDate', align: 'left' },
        { id: '', value: '발송자', size: '220px', cellKey: 'regUserName' },
        { id: '', value: '메시지 내용', size: '100%', cellKey: 'content', align: 'left' },
        { id: '', value: '회원 발송 내역', size: '180px', cellKey: 'commentCount' },
        // { id: '', value: '첨부파일', size: '100%', cellKey: 'filesUrl' },
        // { id: '', value: '구독자 메신저 수', size: '180px', cellKey: 'commentCount' },
        // { id: '', value: '승인여부', size: '80px', cellKey: 'isConfirmed' },
        // { id: '', value: '삭제여부', size: '80px', cellKey: 'isRemoved' },
        { id: '', value: '관리', size: '120px', cellKey: 'ctrl' },
    ]);
    const [bdList, setBdList] = useState<AdmListTableCellProps[][]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [page, setPage] = useState(1);

    const [dashboard, setDashboard] = useState<any>({
        "totalChats": 0,
        "confirmedChats": 0,
        "pendingChats": 0,
        "removedChats": 0,
        "todayChats": 0,
        "weeklyChats": 0,
        "monthlyChats": 0,
        "totalComments": 0,
        "reportedComments": 0
    });

    const { showLoading, hideLoading } = useLoadingScreenStore();

    const { showPopup } = useConfirmPopupStore()
    const deleteItem = (id: string) => {
        showPopup({
            title: <p>삭제 전 확인해주세요</p>,
            desc: <p>삭제된 정보는 사용자에게 노출되지 않으며<br />복구가 불가능합니다.<br />정말 삭제하시겠습니까?</p>,
            onConfirm: () => {
                showLoading();
                apiDeleteBoardItem(id, API_URL_DELETE, callListBySearch).finally(() => {
                    hideLoading();
                });
                // 팝업에서 "확인"을 눌렀을 때의 동작
            },
            onCancel: () => {
                // 팝업에서 "취소"를 눌렀을 때 (팝업이 닫히는 것 외 추가 동작 필요시)
            }
        });
    };
    const editItem = (id: string) => {
        router.push(`${URL_VIEW}${id}`);
    };

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

    const handleSearch = (searchQuery: Record<string, string>) => {
        const newSearchParams = new URLSearchParams(window.location.search);

        // Set new search parameters
        Object.entries(searchQuery).forEach(([key, value]) => {
            if (value) {
                newSearchParams.set(key, value);
            } else {
                newSearchParams.delete(key); // Remove if value is empty
            }
        });

        // Reset page to 1 for new search
        newSearchParams.set('page', '1');

        router.push(`${URL_LIST}?${newSearchParams.toString()}`);
    };

    const callDashboard = async () => {
        try {
            const result = await fetchDashboardData();
            setDashboard({ ...result })
        } catch (e) {
            if (e === null) return;
            alert(
                '처리 중 문제가 발생하였습니다.\n반복될 경우, 관리자에게 문의하여 주세요.',
            );
        }
    }

    const callListBySearch = async () => {
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

        try {
            const result: any = await fetchArtistMsgList(queryParams);

            const data: any[] = [];
            result.data.data.map((item: any) => {
                data.push({
                    ...item,
                    confirmDate: <p style={{ textAlign: 'left', width: '100%' }}>{item.confirmDate ? dayjs(item.confirmDate).format('YYYY.MM.DD HH:mm') : '-'}</p>,
                    regUserName: <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-start', width: '100%' }}>
                        <p>{item.regUser.name}</p>
                        {
                            (item.regUser.type === "A" || item.regUser.type === "J") &&
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M5 6H11V11H5V6Z" fill="white" />
                                    <path d="M7.22683 9.186L6.1115 8.08084C6.01917 7.9885 5.91872 7.94128 5.81017 7.93917C5.70161 7.93706 5.60117 7.98212 5.50883 8.07434C5.41228 8.171 5.364 8.27423 5.364 8.384C5.364 8.49378 5.41228 8.597 5.50883 8.69367L6.855 10.0398C6.96444 10.1492 7.08839 10.2038 7.22683 10.2038C7.36528 10.2038 7.48922 10.1492 7.59867 10.0398L10.6448 6.99367C10.7328 6.90556 10.7789 6.80339 10.7832 6.68717C10.7875 6.57095 10.7414 6.46667 10.6448 6.37434C10.5525 6.28211 10.4531 6.23706 10.3467 6.23917C10.2403 6.24128 10.141 6.2885 10.0487 6.38084L7.22683 9.186ZM5.76667 14.2142L4.82817 12.6808L3.0845 12.2897C2.94606 12.2607 2.83772 12.1932 2.7595 12.0872C2.68128 11.9812 2.65117 11.8589 2.66917 11.7205L2.823 9.927L1.63717 8.60384C1.54572 8.4945 1.5 8.374 1.5 8.24234C1.5 8.11067 1.54572 7.99017 1.63717 7.88084L2.823 6.55767L2.66917 4.76417C2.65117 4.62573 2.68128 4.5035 2.7595 4.3975C2.83772 4.2915 2.94606 4.224 3.0845 4.195L4.82817 3.80384L5.76667 2.2705C5.83589 2.16117 5.93139 2.08256 6.05317 2.03467C6.17494 1.98678 6.30167 1.9885 6.43333 2.03984L8.07683 2.75134L9.72033 2.03984C9.852 1.9885 9.97872 1.98678 10.1005 2.03467C10.2223 2.08256 10.3178 2.16117 10.387 2.2705L11.3255 3.80384L13.0692 4.195C13.2076 4.224 13.3159 4.2915 13.3942 4.3975C13.4724 4.5035 13.5025 4.62573 13.4845 4.76417L13.3307 6.55767L14.5165 7.88084C14.6079 7.99017 14.6537 8.11067 14.6537 8.24234C14.6537 8.374 14.6079 8.4945 14.5165 8.60384L13.3307 9.927L13.4845 11.7205C13.5025 11.8589 13.4724 11.9812 13.3942 12.0872C13.3159 12.1932 13.2076 12.2607 13.0692 12.2897L11.3255 12.6808L10.387 14.2142C10.3178 14.3235 10.2223 14.4021 10.1005 14.45C9.97872 14.4979 9.852 14.4962 9.72033 14.4448L8.07683 13.7333L6.43333 14.4448C6.30167 14.4962 6.17494 14.4979 6.05317 14.45C5.93139 14.4021 5.83589 14.3235 5.76667 14.2142Z" fill="#2EE7D3" />
                                </svg>
                            </div>
                        }
                    </div>,
                    commentCount: item.commentCount
                        ? <div onClick={() => detailPopupOpen(item.id)} style={{ textDecoration: 'underline', cursor: 'pointer', width: "100%", textAlign: "left" }}>{item.commentCount}</div>
                        : '-',
                    content: item.content ?
                        <p style={{ textAlign: 'left', width: '100%' }}>{item.content}</p>
                        :
                        item.files.length > 0 ?
                            <div style={{ minWidth: `${64 * item.files.length}px`, display: 'flex', flexDirection: 'row', gap: '4px', width: '100%', justifyContent: 'flex-start' }}>
                                {item.files.map((file: any) => {
                                    return file.fileType == 'VIDEO' ? <video key={file.id} src={file.fileUrl} style={{ width: '60px', height: '34px' }} /> :
                                        <img key={file.id} src={file.fileUrl} style={{ width: '60px', height: '34px', objectFit: 'contain' }} />;
                                })}
                            </div>
                            : '-',
                    isConfirmed: item.isConfirmed ? '승인' : '미승인',
                    isRemoved: item.isRemoved ? '삭제됨' : '정상',
                    // filesUrl:
                    //     <div style={{ display: 'flex', flexWrap: 'wrap', padding: '4px', minHeight: '100px', height: '100%', width: '100%', overflowY: 'auto' }}>
                    //         <span>{`${item.files.length}개`}</span>
                    //         {
                    //             item.files.map((file: any) => {
                    //                 return file.fileUrl && file.fileType != 'VIDEO' ? <img key={file.id} src={file.fileUrl} style={{ maxWidth: "20%", maxHeight: "100px", margin: "1px", objectFit: 'contain' }} /> :
                    //                     file.fileUrl && file.fileType == 'VIDEO' ? <video key={file.id} src={file.fileUrl} style={{ maxWidth: "20%", maxHeight: "100px", margin: "1px" }} /> : '-';
                    //             })
                    //         }
                    //     </div>
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
    }; // Added srchTypes to dependencies
    const [srchTxt, setSrchTxt] = useState<string>('');

    useEffect(() => {
        const newUrl = new URL(window.location.href);
        const page = parseInt(newUrl.searchParams.get('page') ?? '1');

        setPage(page);
        callListBySearch();

    }, [searchParams]);


    // #region detailPopup ==============================
    const ApiGetDetailPopupData = async (id: string) => {
        console.log(id)
        try {
            const result: any = await fetchDetailPopupData(id);
            setDetailPopupData(result);
            setDetailPopupStatus('success');
        } catch (e) {
            if (e === null) return;
            setDetailPopupStatus('error');
        }
    }
    const [isDetailPopupOpen, setIsDetailPopupOpen] = useState(false); // State to control the detail popup visibility
    const [dettailPopupStatus, setDetailPopupStatus] = useState<'loading' | 'success' | 'error' | 'closed' | ''>('closed'); // State to control the detail popup status
    const [detailPopupData, setDetailPopupData] = useState<any>(null); // State to hold the detail popup data
    const detailPopupClose = () => {
        setIsDetailPopupOpen(false);
        setDetailPopupStatus('closed');
    };
    const detailPopupOpen = (id: string) => {
        if (dettailPopupStatus === 'loading') return;
        if (!id) return;
        ApiGetDetailPopupData(id)
        setIsDetailPopupOpen(true);
        setDetailPopupStatus('loading');
    }
    // #endregion detailPopup ==============================
    // #region settingChatroomPopup ==============================
    const [isSettingChatroomPopupOpen, setIsSettingChatroomPopupOpen] = useState(false);
    const settingChatroomPopupOpen = () => {
        setIsSettingChatroomPopupOpen(true);
    }
    const settingChatroomPopupClose = () => {
        setIsSettingChatroomPopupOpen(false);
    }
    // #endregion settingChatroomPopup ===========================

    return (
        <>
            <AdmWrapper>
                <AdmPageTop title={
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'space-between', width: '100%' }}>
                        <div>아티스트 발송 내역</div>
                        <AdmButton onClick={settingChatroomPopupOpen} size={'large'} style={{ backgroundColor: basicThemeColors.gray500 }}>채팅방 설정</AdmButton>
                    </div>
                } />
                <AdmListTop>
                    <AdmListTopItem>
                        <AdmListTopItemLabel>
                            <AdmListTopSemibold>메신저 현황</AdmListTopSemibold>
                            <AdmQuestionHoverIcon style={{ marginLeft: '4px' }}><p style={{ whiteSpace: 'nowrap', fontSize: '12px' }}>메신저 전체 통계 입니다.</p></AdmQuestionHoverIcon>
                        </AdmListTopItemLabel>
                        <AdmListTopItemValue>

                            <AdmListTopItemValueBox>

                                <AdmListTopSemibold>총 채팅</AdmListTopSemibold>
                                <AdmListTopPurple>{dashboard.totalChats}</AdmListTopPurple>
                                {/* <AdmListTopSemibold>명</AdmListTopSemibold> */}

                            </AdmListTopItemValueBox>
                            <AdmListTopItemValueBox>

                                <AdmListTopSemibold>승인</AdmListTopSemibold>
                                <AdmListTopPurple>{dashboard.confirmedChats}</AdmListTopPurple>
                                {/* <AdmListTopSemibold>명</AdmListTopSemibold> */}

                            </AdmListTopItemValueBox>

                            <AdmListTopItemLine />

                            <AdmListTopItemValueBox>

                                <AdmListTopSemibold>팬딩</AdmListTopSemibold>
                                <AdmListTopPurple>{dashboard.pendingChats}</AdmListTopPurple>
                                {/* <AdmListTopSemibold>명</AdmListTopSemibold> */}

                            </AdmListTopItemValueBox>


                            <AdmListTopItemValueBox>

                                <AdmListTopSemibold>삭제</AdmListTopSemibold>
                                <AdmListTopPurple>{dashboard.removedChats}</AdmListTopPurple>
                                {/* <AdmListTopSemibold>명</AdmListTopSemibold> */}

                            </AdmListTopItemValueBox>

                            <AdmListTopItemValueBox>

                                <AdmListTopSemibold>오늘</AdmListTopSemibold>
                                <AdmListTopPurple>{dashboard.todayChats}</AdmListTopPurple>
                                {/* <AdmListTopSemibold>명</AdmListTopSemibold> */}

                            </AdmListTopItemValueBox>

                            <AdmListTopItemValueBox>

                                <AdmListTopSemibold>이번주</AdmListTopSemibold>
                                <AdmListTopPurple>{dashboard.weeklyChats}</AdmListTopPurple>
                                {/* <AdmListTopSemibold>명</AdmListTopSemibold> */}

                            </AdmListTopItemValueBox>

                            <AdmListTopItemValueBox>

                                <AdmListTopSemibold>이번달</AdmListTopSemibold>
                                <AdmListTopPurple>{dashboard.monthlyChats}</AdmListTopPurple>
                                {/* <AdmListTopSemibold>명</AdmListTopSemibold> */}

                            </AdmListTopItemValueBox>

                            <AdmListTopItemValueBox>

                                <AdmListTopSemibold>총 댓글</AdmListTopSemibold>
                                <AdmListTopPurple>{dashboard.totalComments}</AdmListTopPurple>
                                {/* <AdmListTopSemibold>명</AdmListTopSemibold> */}

                            </AdmListTopItemValueBox>

                            <AdmListTopItemValueBox>

                                <AdmListTopSemibold>신고 댓글</AdmListTopSemibold>
                                <AdmListTopPurple>{dashboard.reportedComments}</AdmListTopPurple>
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
                            LeftComponents={<AdmListTableTopTitle title={'발송 내역'} />}
                            RightComponent={
                                <>
                                    <AdmButtonExcel text={'엑셀 다운로드'} url={'/api/admin/chats/export/excel'} filename={`아티스트 발송 내역-${dayjs().format("YYYY-MM-DD HH_mm_ss")}.xlsx`} />
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
                                                    // cellHeight="120px"
                                                    structure={data}
                                                    deleteItem={deleteItem}
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
                isDetailPopupOpen &&
                <ReplyListPopup router={router} data={detailPopupData} status={dettailPopupStatus} close={detailPopupClose} statusChange={setDetailPopupStatus} />
            }
            {
                isSettingChatroomPopupOpen &&
                <SettingChatroomPopup close={settingChatroomPopupClose} />
            }
        </>
    );
};

export default AdminMsgArtistPage;
