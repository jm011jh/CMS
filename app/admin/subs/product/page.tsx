'use client';

import { T_AdmListSrchParam } from '@/app/admin/components/design/AdmListSrchBar'; // Corrected path if needed
import AdmListTable from '@/app/admin/components/design/AdmListTable';
import AdmListTableBodyRow from '@/app/admin/components/design/AdmListTableBodyRow';
import AdmListTableHeadRow, { AdmListTableCellProps } from '@/app/admin/components/design/AdmListTableHeadRow';
import AdmListTableTop, { AdmListTableTopGoToWriteButton, AdmListTableTopTitle } from '@/app/admin/components/design/AdmListTableTop';
import AdmPageTop from '@/app/admin/components/design/AdmPageTop';
import AdmWrapper from '@/app/admin/components/design/AdmWrapper';
import Pagination from '@/app/admin/components/paging/Pagination';
import apiDeleteBoardItem from '@/app/admin/lib/apiDeleteBoardItem';
import listDataToTableList from '@/app/admin/lib/listDataToTableList';
import useLoadingScreenStore from '@/app/admin/store/loadingScreenStore';
import { callAPI, HTTPMETHOD } from '@/lib/util/callApi';
import { getAccessToken } from '@/lib/util/tokenClass';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react'; // Added useCallback
import { useConfirmPopupStore } from '../../store/confirmPopupStore';

const API_URL_DELETE = '/api/admin/subs/'; // Define the API URL for deletion
const API_URL_LIST = '/api/admin/subscription-plan/plans'; // Define the API URL for listing
const API_URL_GETLIST = '/admin/subs/product'; // Define the API URL for getting the list
const URL_LIST = '/admin/subs/product'; // Define the URL for listing in the admin board
const URL_VIEW = '/admin/subs/product/view'; // Define the API URL for editing
const ITEMS_PER_PAGE = 10; // Define the number of items per page

const AdminSubsProductPage: React.FC = () => {
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
        router.push(`${URL_VIEW}?id=${id}`);
    };

    // Define search types for AdmListSrchBar
    const srchTypes: T_AdmListSrchParam[] = [
        { size: '100%', inputType: 'search', paramKey: 'search', label: '검색어', placeholder: '제목 또는 내용으로 검색' },
        { size: '50%', inputType: 'datePatrolStart', paramKey: 'startDate', label: '공개예정일', placeholder: 'YYYY-MM-DD' },
        { size: '50%', inputType: 'datePatrolEnd', paramKey: 'endDate', label: '공개예정일', placeholder: 'YYYY-MM-DD', notInRow: true },
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
        const url = `${API_URL_LIST}?${queryParams.toString()}`;

        try {
            const result: any = await callAPI(HTTPMETHOD.GET, {}, url, token);

            // const result: any = {
            //     data: {
            //         data: [
            //             { id: '1', title: '상품 1', storeName: '스토어 1', authName: '권한 1', status: '공개', payMonth: '9,900', payYear: '99,000' },
            //             { id: '2', title: '상품 2', storeName: '스토어 2', authName: '권한 2', status: '구독자전용', payMonth: '9,900', payYear: '-' },
            //             { id: '3', title: '상품 3', storeName: '스토어 3', authName: '권한 3', status: '예정', payMonth: '9,900', payYear: '-' },
            //         ],
            //         meta: {
            //             total: 3,
            //             page: page,
            //             limit: 20,
            //         }
            //     }
            // };

            const tableStructureData: AdmListTableCellProps[] = [
                { id: '', value: 'AOS 제품 ID', size: '200px', cellKey: 'playStoreProductId' },
                { id: '', value: 'IOS 제품 ID', size: '200px', cellKey: 'appStoreProductId' },
                { id: '', value: '상품명', size: '100%', cellKey: 'name' },
                { id: '', value: '공개여부', size: '120px', cellKey: 'isActive' },
                // { id: '', value: '결제 방식', size: '120px', cellKey: 'planType' },
                { id: '', value: '금액', size: '120px', cellKey: 'price' },
                { id: '', value: '관리', size: '120px', cellKey: 'ctrl' },
            ];
            const data: any[] = [];
            result.data.data.map((item: any, idx: number) => {
                data.push({
                    ...item,
                    isActive: item.isActive === true ? '공개' : '비공개',
                    planType: item.planType === 'MONTHLY' ? '월간' : item.planType === 'YEARLY' ? '연간' : '',
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
    };

    const pageHandler = (num: number) => {
        if (num <= 0) {
            num = 1;
        }
        // setPage(num);
        router.push(`${URL_LIST}?page=${num}`);
    };

    useEffect(() => {
        const newUrl = new URL(window.location.href);
        const page = parseInt(newUrl.searchParams.get('page') ?? '1');

        setPage(page);
        callListBySearch();

    }, [searchParams]);

    return (
        <AdmWrapper>
            <AdmPageTop title={`구독 상품 관리`} />
            <>
                <AdmListTableTop
                    LeftComponents={<AdmListTableTopTitle title={'구독 상품 목록'} />}
                    RightComponent={
                        <>
                            <AdmListTableTopGoToWriteButton onClick={() => { router.push(`${URL_VIEW}`) }} />
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
                                        <AdmListTableBodyRow
                                            key={idx}
                                            structure={data}
                                            editItem={editItem}
                                            isLast={idx === bdList.length - 1}
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
        </AdmWrapper >
    );
};

export default AdminSubsProductPage;
