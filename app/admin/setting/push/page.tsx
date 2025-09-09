'use client';

import AdmButton from '@/app/admin/components/design/AdmButton';
import AdmListBox from '@/app/admin/components/design/AdmListBox';
import AdmListSrchBar, { T_AdmListSrchParam } from '@/app/admin/components/design/AdmListSrchBar'; // Corrected path if needed
import AdmListTable from '@/app/admin/components/design/AdmListTable';
import AdmListTableBodyRow from '@/app/admin/components/design/AdmListTableBodyRow';
import AdmListTableHeadRow, { AdmListTableCellProps } from '@/app/admin/components/design/AdmListTableHeadRow';
import AdmListTableTop, { AdmListTableTopGoToWriteButton, AdmListTableTopTitle } from '@/app/admin/components/design/AdmListTableTop';
import AdmPageExplnation from '@/app/admin/components/design/AdmPageExplnation';
import AdmPageTop from '@/app/admin/components/design/AdmPageTop';
import AdmWrapper from '@/app/admin/components/design/AdmWrapper';
import Pagination from '@/app/admin/components/paging/Pagination';
import apiDeleteBoardItem from '@/app/admin/lib/apiDeleteBoardItem';
import listDataToTableList from '@/app/admin/lib/listDataToTableList';
import { useConfirmPopupStore } from '@/app/admin/store/confirmPopupStore';
import useLoadingScreenStore from '@/app/admin/store/loadingScreenStore';
import { getAccessToken } from '@/lib/util/tokenClass';
import dayjs from 'dayjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react'; // Added useCallback
import { ApiGetAlreadyPushList, ApiGetWaitingPushList } from './api';
import AdmPushReservationPop from './components/AdmPushReservationPop';

const API_URL_DELETE = '/api/admin/push/'; // Define the API URL for deletion
const API_URL_LIST = '/api/admin/push'; // Define the API URL for listing
const API_URL_GETLIST = '/admin/setting/push'; // Define the API URL for getting the list
const URL_LIST = '/admin/setting/push'; // Define the URL for listing in the admin board
const URL_VIEW = '/admin/setting/push/view?id='; // Define the API URL for editing
const ITEMS_PER_PAGE = 10; // Define the number of items per page

enum PUSH_TYPE {
    OFFICIAL = 'OFFICIAL',
    SUB_OFFICIAL = 'SUB_OFFICIAL',
    SYSTEM = 'SYSTEM',
    MESSENGER = 'MESSENGER',
    POST = 'POST',
    LETTER = 'LETTER',
    LIVE = 'LIVE',
    SUB_LIVE = 'SUB_LIVE',
}

const AdminBoardNoticePage: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams(); // Next.js hook for URL search parameters
    const [tableStructure, setTableStructure] = useState<AdmListTableCellProps[]>([]);
    const [bdList, setBdList] = useState<AdmListTableCellProps[][]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [page, setPage] = useState(1);

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
        { size: '100%', inputType: 'search', paramKey: 'search', label: '검색어', placeholder: '제목 또는 내용으로 검색' },
        { size: '100%', inputType: 'datePatrolStart', paramKey: 'startDate', label: '푸시발송', placeholder: 'YYYY-MM-DD' },
        { size: '100%', inputType: 'datePatrolEnd', paramKey: 'endDate', label: '푸시발송', placeholder: 'YYYY-MM-DD', notInRow: true },
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

        router.push(`${API_URL_GETLIST}?${newSearchParams.toString()}`);
    };

    const callListBySearch = async () => {
        const token = getAccessToken();
        if (token === '') {
            alert('로그인 해주세요.');
            return;
        }
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
            const result: any = await ApiGetAlreadyPushList(queryParams, token);

            const tableStructureData: AdmListTableCellProps[] = [
                { id: '', value: '발송 그룹', size: '120px', cellKey: 'pushType', lineClamp: 3, cellHeight: '64px' }, // [ OFFICIAL, SUB_OFFICIAL, POST, LETTER, MESSENGER, LIVE, SUB_LIVE ]
                { id: '', value: '제목', size: '100%', cellKey: 'title', align: 'left', cellHeight: '64px' },
                { id: '', value: '내용', size: '100%', cellKey: 'content', align: 'left', lineClamp: 2, cellHeight: '64px' },
                { id: '', value: '푸시 발송 시간', size: '200px', cellKey: 'regDate', cellHeight: '64px' },
                { id: '', value: '링크', size: '200px', cellKey: 'link', cellHeight: '64px' },
            ];
            const data: any[] = [];
            result.data.data.map((item: any) => {
                data.push({
                    ...item,
                    link: item.link ? item.link : '-',
                    title: item.title ? item.title : '-',
                    content: item.content ? item.content : '-',
                    openDate: item.openDate ? dayjs(item.openDate).format('YYYY.MM.DD HH:mm') : '-',
                    regDate: dayjs(item.regDate).format('YYYY.MM.DD HH:mm'),
                    // pushType: item.type === 'OFFICIAL' ? '전체회원' : item.type === 'SUB_OFFICIAL' ? '구독회원' : '전체회원(시스템)'
                    pushType:
                        item.type === PUSH_TYPE.OFFICIAL ? '전체회원'
                            : item.type === PUSH_TYPE.SUB_OFFICIAL ? '구독회원'
                                : item.type === PUSH_TYPE.SYSTEM ? '전체회원(시스템)'
                                    : item.type === PUSH_TYPE.MESSENGER ? '메신저'
                                        : item.type === PUSH_TYPE.POST ? '포스트'
                                            : item.type === PUSH_TYPE.LETTER ? '레터'
                                                : item.type === PUSH_TYPE.LIVE ? '라이브'
                                                    : item.type === PUSH_TYPE.SUB_LIVE ? '구독 라이브'
                                                        : '-'
                });
            });

            setTableStructure(tableStructureData);
            const tableData = listDataToTableList(data, tableStructureData);
            setBdList(tableData);
            setTotalItems(result.data.meta.total);
        } catch (e: any) {
            console.error("Error fetching list:", e);
            alert(
                '처리 중 문제가 발생하였습니다.\n반복될 경우, 관리자에게 문의하여 주세요.',
            );
        }
    }; // Added srchTypes to dependencies

    useEffect(() => {
        const newUrl = new URL(window.location.href);
        const page = parseInt(newUrl.searchParams.get('page') ?? '1');

        setPage(page);
        callListBySearch();

    }, [searchParams]);

    // #region 푸시예약내역 팝업 ===============================================
    const [pushReservationPop, setPushReservationPop] = useState(false);
    const [pushReservationData, setPushReservationData] = useState<any[]>([]);
    const [pushReservationStatus, setPushReservationStatus] = useState<'loading' | 'success' | 'error' | 'closed' | ''>('closed');
    const openPushReservationPop = () => {
        setPushReservationPop(true);
        setPushReservationStatus('loading');
        ApiGetWaitingPushList(new URLSearchParams())
            .then((res) => {
                setPushReservationData(res.data.data);
                setPushReservationStatus('success');
            }).catch(() => {
                setPushReservationStatus('error');
            });
    }
    const closePushReservationPop = () => {
        setPushReservationPop(false);
        setPushReservationStatus('closed');
    }
    // #endregion 푸시예약내역 팝업 ============================================
    return (
        <>

            <AdmWrapper>
                <AdmPageTop title={`푸시 알림 관리`} />
                <AdmListSrchBar
                    srchTypes={srchTypes}
                    initialSearchValues={getInitialSearchValues()}
                />
                <AdmListBox>
                    <>
                        <AdmListTableTop
                            LeftComponents={<AdmListTableTopTitle title={'푸시 발송 내역'} />}
                            RightComponent={
                                <>
                                    <AdmButton color={'gray500Fill'} size={'large'} onClick={openPushReservationPop}>푸시예약내역보기</AdmButton>
                                    <AdmListTableTopGoToWriteButton onClick={() => router.push(`${URL_LIST}/view`)} buttonText='푸시발송하기' />
                                </>
                            }
                        />
                        <AdmPageExplnation titleRed={'사용자에게 발송된 푸시 내역을 확인하실 수 있습니다.'} />

                        <div className="adm--box-scrollWrap">
                            <div className="adm--box-scrollCont" style={{ width: '100%' }}>
                                <AdmListTable>
                                    <>
                                        <AdmListTableHeadRow structure={tableStructure} />
                                        {bdList.length > 0 &&
                                            bdList.map((data: any, idx: number) => (
                                                <AdmListTableBodyRow
                                                    cellHeight='64px'
                                                    key={idx}
                                                    structure={data}
                                                    viewItem={editItem}
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

            {pushReservationPop &&
                <AdmPushReservationPop close={closePushReservationPop} status={pushReservationStatus} statusChange={setPushReservationStatus} data={pushReservationData} />
            }

        </>
    );
};

export default AdminBoardNoticePage;
