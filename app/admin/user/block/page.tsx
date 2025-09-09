'use client';

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
import { convertToISO8601 } from '@/lib/util/commonUtil';
import { getAccessToken } from '@/lib/util/tokenClass';
import dayjs from 'dayjs';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react'; // Added useCallback
import { useConfirmPopupStore } from '../../store/confirmPopupStore';
import { getReportList, getReportUserRestrict, patchReportDismiss, patchReportRestore, postReportUserRestrict } from './api';
import AdmUserBlockPopup from './component/AdmUserBlockPopup';
import BlockAdmListTableBodyRow from './component/BlockAdmListTableBodyRow';

enum ReasonTypeCategory {
    ILLEGAL_INFORMATION = '불법 정보',
    ABUSIVE_LANGUAGE = '욕설/비방',
    SEXUAL_CONTENT = '음란/선정성',
    COMMERCIAL_SPAM = '상업성 광고/홍보',
    PRIVACY_VIOLATION = '개인정보 노출',
    REPETITIVE_SPAM = '도배/반복',
    MALICIOUS_CODE = '악성코드/바이러스',
    REPORTED_BY_ARTIST = '아티스트가 신고',
    OTHER = '기타',
}

const API_URL_DELETE = '/api/admin/reports/'; // Define the API URL for deletion
const API_URL_REPORT = '/api/admin/reports/'; // Define the API URL for deletion
const API_URL_RESTRICT = '/api/admin/user/'; // Define the API URL for deletion
const API_URL_RESTORE = '/api/admin/reports/'; // Define the API URL for deletion
const API_URL_LIST = '/api/admin/reports'; // Define the API URL for listing
const URL_LIST = '/admin/user/block'; // Define the URL for listing in the admin board
const URL_VIEW = '/admin/user/block/view?id='; // Define the API URL for editing
const ITEMS_PER_PAGE = 10; // Define the number of items per page

const AdminUserBlockPage: React.FC = () => {

    const searchParams = useSearchParams(); // Next.js hook for URL search parameters
    const [tableStructure, setTableStructure] = useState<AdmListTableCellProps[]>([
        { id: '', value: '설정 일시', size: '126px', cellKey: 'regDate' },
        { id: '', value: '차단/신고', size: '80px', cellKey: 'reportedName' },
        { id: '', value: '신고 유형', size: '150px', cellKey: 'reasonTypeName' },
        { id: '', value: '요청자', size: '220px', cellKey: 'regUserName' },
        { id: '', value: '작성자 (차단/신고 대상)', size: '220px', cellKey: 'reportedUserName' },
        { id: '', value: '제목/내용', size: '100%', cellKey: 'makeNode' },
        // { id: '', value: '관리', size: '200px', cellKey: 'ctrl' },
        { id: '', value: '관리', size: '160px', cellKey: 'ctrlCustom' },
    ]);
    const [bdList, setBdList] = useState<AdmListTableCellProps[][]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [page, setPage] = useState(1);

    const { showLoading, hideLoading } = useLoadingScreenStore();

    // Define search types for AdmListSrchBar
    const srchTypes: T_AdmListSrchParam[] = [
        { size: '50%', inputType: 'search', paramKey: 'search', label: '검색', placeholder: '검색어를 입력해주세요.' },
        { size: '50%', inputType: 'datePatrolStart', paramKey: 'startDate', label: '기간', placeholder: 'YYYY-MM-DD' },
        { size: '50%', inputType: 'datePatrolEnd', paramKey: 'endDate', label: '기간', placeholder: 'YYYY-MM-DD', notInRow: true },
        // {
        //     size: '50%', inputType: 'select', paramKey: 'searchType01', label: '차단/신고', placeholder: '전체', selectOptions: [
        //         { value: 'all', label: '전체' },
        //         { value: 'BLOCK', label: '차단' },
        //         { value: 'REPORT', label: '신고' },
        //     ]
        // },
        {
            size: '100%', inputType: 'select', paramKey: 'reasonType', label: '신고 유형', placeholder: '전체', selectOptions: [
                { value: 'all', label: '전체' },
                { value: 'ILLEGAL_INFORMATION', label: '불법 정보' },
                { value: 'ABUSIVE_LANGUAGE', label: '욕설/비방' },
                { value: 'SEXUAL_CONTENT', label: '음란/선정성' },
                { value: 'COMMERCIAL_SPAM', label: '상업성 광고/홍보' },
                { value: 'PRIVACY_VIOLATION', label: '개인정보 노출' },
                { value: 'REPETITIVE_SPAM', label: '도배/반복' },
                { value: 'MALICIOUS_CODE', label: '악성코드/바이러스' },
                // { value: 'REPORTED_BY_ARTIST', label: '아티스트로부터 신고' },
            ]
        },
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

    const callListBySearch = async () => {
        const token = getAccessToken();
        if (token === '') {
            alert('로그인 해주세요.');
            return;
        }

        // callDashboard();

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
            const result: any = await getReportList(queryParams.toString());

            const data: any[] = [];
            result.data.data.map((item: any) => {
                data.push({
                    ...item,
                    regDate: item.eventTime ? dayjs(item.eventTime).format('YYYY.MM.DD HH:mm') : '-',
                    reportedName: item.isCompleted ? '차단' : '신고',
                    reasonTypeName: item.reasonType ? ReasonTypeCategory[item.reasonType as keyof typeof ReasonTypeCategory] : '-',
                    regUserName: item.regUser.name,
                    reportedUserName: <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <div onClick={() => window.open('/admin/user/info/view?id=' + item.reportedUser.id, '_blank')} style={{ textDecoration: 'underline', cursor: 'pointer' }}>
                            {item.reportedUser.name}
                        </div>
                    </div>,
                    makeNode: item.message ?
                        <>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%', alignItems: 'flex-start', justifyContent: 'center' }}>
                                <div style={{ textDecorationLine: 'underline', color: '#000', fontSize: '16px' }}>{item.categoryContentJson?.content ? item.categoryContentJson?.content : '-'}</div>
                                <div style={{ display: 'flex', maxWidth: '100%', wordBreak: 'break-word', alignItems: 'center', padding: '8px', gap: '8px', borderRadius: '8px', background: '#F4F4F8', fontSize: '16px', color: '#000' }}>
                                    <div style={{ width: '66px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', background: '#ffffff', fontSize: '12px', color: '#ADAAC7', border: '1px solid #ADAAC7', fontWeight: '600' }}>신고내용</div>
                                    {item.message}
                                </div>
                            </div>
                        </> : '-',
                    ctrlCustom: <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '4px' }}>

                        {
                            item.isCompleted ?
                                <>
                                    {/* 신고복구 */}
                                    <button onClick={() => reportReset(item.id)} style={{ display: 'flex', width: '88px', textAlign: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: '#2E5AAC', border: '0px solid #000', color: '#ffffff', fontWeight: '600', height: '24px', borderRadius: '4px', cursor: 'pointer' }}>신고복구</button>
                                </>
                                :
                                <>
                                    {/* 신고무시 */}
                                    <button onClick={() => reportIgnore(item.id)} style={{ display: 'flex', width: '88px', textAlign: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000', border: '0px solid #000', color: '#ffffff', fontWeight: '600', height: '24px', borderRadius: '4px', cursor: 'pointer' }}>신고무시</button>
                                    {/* 불량회원설정 */}
                                    <button onClick={() => badUserSetting(item)} style={{ display: 'flex', width: '88px', textAlign: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: '#D23838', border: '0px solid #000', color: '#ffffff', fontWeight: '600', height: '24px', borderRadius: '4px', cursor: 'pointer' }}>불량회원설정</button>
                                </>
                        }

                    </div>,
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

    useEffect(() => {
        const newUrl = new URL(window.location.href);
        const page = parseInt(newUrl.searchParams.get('page') ?? '1');

        setPage(page);
        callListBySearch();

    }, [searchParams]);

    const { showPopup } = useConfirmPopupStore(); // 스토어에서 showPopup 액션 가져오기

    // 신고무시
    const apiAdminUserDismiss = async (id: string) => {
        try {
            const result: any = await patchReportDismiss(id);
            return result;

        } catch (e) {
            console.error("Error during editItem:", e);
            throw e;
        }
    }
    const apiAdminUserDismissRestore = async (id: string) => {
        try {
            const result: any = await patchReportRestore(id);
            return result;
        } catch (e) {
            console.error("Error during editItem:", e);
            throw e;
        }
    }
    // 불량회원설정
    const apiAdminUserRestrict = async (data: any) => {
        try {
            const token = getAccessToken();
            if (token === '') {
                alert('로그인 해주세요.');
                return;
            }

            const params: any = {
                "isRestricted": data.isRestricted === 'Y' ? true : false,
                "isLoginBlocked": data.isRestricted === 'Y' ? data.isLoginBlocked : false,
                "isServiceBlocked": data.isRestricted === 'Y' ? data.isServiceBlocked : false,
                "memo": data.memo || ''
            }
            if (data.endDate && data.isRestricted === 'Y') {
                params['endDate'] = convertToISO8601(data['endDate']);
            }
            const result: any = await postReportUserRestrict(data.reportedUser.id, params);
            return result;

        } catch (e) {
            throw e;
        }
    }
    // 불량회원 정보 가져오기
    const apiAdminUserRestrictInfo = async (id: string) => {
        try {
            const result: any = await getReportUserRestrict(id);
            console.log(result)
            return result;

        } catch (e) {
            throw e;
        }
    }
    // 신고무시
    const reportIgnore = async (id: string) => {
        showPopup({
            onConfirm: () => {
                apiAdminUserDismiss(id)
                    .then(() => {
                        callListBySearch();
                        alert('신고가 무시 처리 되었습니다.');
                    })
                    .catch((e) => {
                        alert('처리 중 문제가 발생하였습니다.\n반복될 경우, 관리자에게 문의하여 주세요.',);
                    })
            },
            title: <p>신고무시</p>,
            desc: <p>선택한 항목을 신고 내역에서만 삭제하고<br />원본 게시물/댓글은 유지됩니다.</p>,
        });
    }
    // 신고무시 복구
    const reportReset = async (id: string) => {
        showPopup({
            onConfirm: () => {
                apiAdminUserDismissRestore(id)
                    .then(() => {
                        callListBySearch();
                        alert('신고무시가 복구 처리 되었습니다.');
                    })
                    .catch((e) => {
                        alert('처리 중 문제가 발생하였습니다.\n반복될 경우, 관리자에게 문의하여 주세요.',);
                    })
            },
            title: <p>신고복구</p>,
            desc: <p>선택한 항목을 복구합니다.</p>,
        });
    }


    const badUserSetting = (item: any) => {
        apiAdminUserRestrictInfo(item.reportedUser.id)
            .then((res: any) => {
                if (res.data === null) {
                    item.isRestricted = 'N';
                    item.endDate = '';
                    item.isLoginBlocked = false;
                    item.isServiceBlocked = false;
                    item.memo = '';
                    setBlockTargetData(item);
                    setIsBlockPopupOpen(true);
                } else {
                    item.isRestricted = res.data.isRestricted ? 'Y' : 'N';
                    item.endDate = res.data.endDate || '';
                    item.isLoginBlocked = res.data.isLoginBlocked || false;
                    item.isServiceBlocked = res.data.isServiceBlocked || false;
                    item.memo = res.data.memo || '';
                    setBlockTargetData(item);
                    setIsBlockPopupOpen(true);
                }
            })
            .catch((e) => {
                alert('처리 중 문제가 발생하였습니다.\n반복될 경우, 관리자에게 문의하여 주세요.',);
            })
    }

    const [isBlockPopupOpen, setIsBlockPopupOpen] = useState(false);
    const [blockTargetData, setBlockTargetData] = useState<any>(null);

    const handleBlockUserSave = (data: any) => {
        apiAdminUserRestrict(data)
            .then(() => {
                callListBySearch();
                alert('저장되었습니다.');
                setIsBlockPopupOpen(false);
            })
            .catch((e) => {
                alert('처리 중 문제가 발생하였습니다.\n반복될 경우, 관리자에게 문의하여 주세요.',);
            })
    };

    return (
        <>
            <AdmWrapper>
                <AdmPageTop title={`차단/신고 관리`} />

                <AdmListSrchBar
                    srchTypes={srchTypes}
                    initialSearchValues={getInitialSearchValues()}
                />
                <AdmListBox>
                    <>
                        <div className="adm--box-scrollWrap">
                            <div className="adm--box-scrollCont" style={{ width: '100%' }}>
                                <AdmListTableTop
                                    LeftComponents={<AdmListTableTopTitle title={'차단/신고 목록'} />}
                                // RightComponent={
                                //     <>
                                //         <AdmListTableTopGoToWriteButton onClick={() => router.push(`${URL_LIST}/view`)} />
                                //     </>
                                // }
                                />
                                <AdmListTable>
                                    <>
                                        <AdmListTableHeadRow structure={tableStructure} />
                                        {bdList.length > 0 &&
                                            bdList.map((data: any, idx: number) => (
                                                <BlockAdmListTableBodyRow
                                                    key={idx}
                                                    structure={data}
                                                    cellHeight='97px'
                                                />
                                            ))}
                                    </>
                                </AdmListTable>

                                <Pagination
                                    totalItems={totalItems}
                                    currentPage={page}
                                    itemCountPerPage={ITEMS_PER_PAGE} // This should ideally come from a constant or config
                                />
                            </div>
                        </div>
                    </>
                </AdmListBox>
            </AdmWrapper >
            {
                isBlockPopupOpen &&
                <AdmUserBlockPopup
                    data={blockTargetData} // Data for the popup, should be set when opening the popup
                    status={'success'} // Set the initial status of the popup
                    close={() => setIsBlockPopupOpen(false)} // Function to close the popup
                    handleSave={handleBlockUserSave}
                />
            }
        </>
    );
};

export default AdminUserBlockPage;
