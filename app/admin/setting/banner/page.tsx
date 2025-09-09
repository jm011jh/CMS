'use client';

import AdmListBox from '@/app/admin/components/design/AdmListBox';
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
import dayjs from 'dayjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react'; // Added useCallback
import { useConfirmPopupStore } from '../../store/confirmPopupStore';

const API_URL_DELETE = '/api/admin/banner/'; // Define the API URL for deletion
const API_URL_LIST = '/api/admin/banner'; // Define the API URL for listing
const API_URL_GETLIST = '/admin/board/banner'; // Define the API URL for getting the list
const URL_LIST = '/admin/setting/banner'; // Define the URL for listing in the admin board
const URL_VIEW = '/admin/setting/banner/view?id='; // Define the API URL for editing
const ITEMS_PER_PAGE = 10; // Define the number of items per page

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
        { size: '50%', inputType: 'datePatrolStart', paramKey: 'startDate', label: '공개예정일', placeholder: 'YYYY-MM-DD' },
        { size: '50%', inputType: 'datePatrolEnd', paramKey: 'endDate', label: '공개예정일', placeholder: 'YYYY-MM-DD', notInRow: true },
        {
            size: '50%', inputType: 'select', paramKey: 'category', label: '카테고리', placeholder: '카테고리 선택', selectOptions: [
                { label: '전체', value: 'all' },
                { label: '일반', value: '일반' },
                { label: '이벤트', value: '이벤트' },
                { label: '시스템', value: '시스템' },
                { label: '기타', value: '기타' }
            ],
            defaultValue: ''
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

            const tableStructureData: AdmListTableCellProps[] = [
                { id: '', value: '노출순서', size: '140px', cellKey: 'order' },
                { id: '', value: '썸네일', size: '120px', cellKey: 'thumb', },
                { id: '', value: '제목', size: '100%', cellKey: 'title', align: 'left' },
                { id: '', value: '공개예정일', size: '200px', cellKey: 'openDate' },
                { id: '', value: '게시종료일', size: '200px', cellKey: 'endDate' },
                { id: '', value: '관리', size: '140px', cellKey: 'ctrl' },
            ];
            const data: any[] = [];
            result.data.data.map((item: any) => {
                data.push({
                    ...item,
                    openDate: item.openDate ? dayjs(item.openDate).format('YYYY.MM.DD HH:mm') : '-',
                    endDate: item.endDate ? dayjs(item.endDate).format('YYYY.MM.DD HH:mm') : '-',
                    thumb: item.files.length > 0 ? <img src={item.files[0].fileUrl} alt="" style={{ display: 'block', width: '32px', height: '32px', margin: 'auto', borderRadius: '6px' }} /> : '',
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
    const [srchTxt, setSrchTxt] = useState<string>('');


    useEffect(() => {
        const newUrl = new URL(window.location.href);
        const page = parseInt(newUrl.searchParams.get('page') ?? '1');

        setPage(page);
        callListBySearch();

    }, [searchParams]);

    return (
        <AdmWrapper>
            <AdmPageTop title={`메인 배너 관리`} />
            {/* <AdmListSrchBar
                srchTypes={srchTypes}
                
                initialSearchValues={getInitialSearchValues()}
            /> */}
            <AdmListBox>
                <>
                    <AdmListTableTop
                        LeftComponents={<AdmListTableTopTitle title={'메인 배너 목록'} />}
                        RightComponent={
                            <>
                                {/* <AdmListTableTopGoToCategoryButton onClick={() => alert('카테고리 관리 준비중')} /> */}
                                <AdmListTableTopGoToWriteButton onClick={() => router.push(`${URL_LIST}/view`)} />
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
                                                deleteItem={deleteItem}
                                                editItem={editItem}
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
    );
};

export default AdminBoardNoticePage;
