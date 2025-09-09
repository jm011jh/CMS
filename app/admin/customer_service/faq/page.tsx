'use client';

import AdmCategoryList from '@/app/admin/components/design/AdmCategoryList';
import AdmListBox from '@/app/admin/components/design/AdmListBox';
import AdmListTable from '@/app/admin/components/design/AdmListTable';
import AdmListTableBodyRow from '@/app/admin/components/design/AdmListTableBodyRow';
import AdmListTableHeadRow, { AdmListTableCellProps } from '@/app/admin/components/design/AdmListTableHeadRow';
import AdmListTableTop, { AdmListTableTopGoToCategoryButton, AdmListTableTopGoToWriteButton, AdmListTableTopTitle } from '@/app/admin/components/design/AdmListTableTop';
import AdmPageTop from '@/app/admin/components/design/AdmPageTop';
import AdmWrapper from '@/app/admin/components/design/AdmWrapper';
import Pagination from '@/app/admin/components/paging/Pagination';
import apiDeleteBoardItem from '@/app/admin/lib/apiDeleteBoardItem';
import listDataToTableList from '@/app/admin/lib/listDataToTableList';
import { useConfirmPopupStore } from '@/app/admin/store/confirmPopupStore';
import useLoadingScreenStore from '@/app/admin/store/loadingScreenStore';
import AdmCategoryPopup from '@/app/admin/template/component/AdmCategoryPopup';
import { callAPI, HTTPMETHOD } from '@/lib/util/callApi';
import { getAccessToken } from '@/lib/util/tokenClass';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react'; // Added useCallback
import { basicThemeColors } from '../../assets/theme';

const API_URL_DELETE = '/api/admin/cs/faq/'; // Define the API URL for deletion
const API_URL_LIST = '/api/cs/faq'; // Define the API URL for listing
// const API_URL_GETLIST = '/admin/board/notice'; // Define the API URL for getting the list
const URL_LIST = '/admin/customer_service/faq'; // Define the URL for listing in the admin board
const URL_VIEW = '/admin/customer_service/faq/view?id='; // Define the API URL for editing
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

    const callListBySearch = async () => {
        const token = getAccessToken();
        if (token === '') {
            alert('로그인 해주세요.');
            return;
        }
        //query에서 list에서 필요한 값 가져옴
        const searchParams = new URLSearchParams(window.location.search);
        const page = parseInt(searchParams.get('page') ?? '1');
        const categoryId = searchParams.get('categoryId') ?? 'all';
        setPage(page);

        // Build query parameters
        const queryParams = new URLSearchParams({
            limit: ITEMS_PER_PAGE.toString(),
            page: page.toString(),
            categoryId: categoryId === 'all' ? '' : categoryId
        });

        for (const [key, value] of searchParams) {
            if (key === 'categoryId') {
                value !== 'all' ? queryParams.set('categoryId', value) : queryParams.delete('categoryId');
            } else {
                queryParams.set(key, value)
            }
        }
        const url = `${API_URL_LIST}?${queryParams.toString()}`;

        try {
            const result: any = await callAPI(HTTPMETHOD.GET, {}, url, token);

            const tableStructureData: AdmListTableCellProps[] = [
                { id: '', value: '유형', size: '200px', cellKey: 'category' },
                { id: '', value: '제목', size: '100%', cellKey: 'title', align: 'left' },
                { id: '', value: '노출 순위', size: '120px', cellKey: 'order' },
                { id: '', value: '관리', size: '140px', cellKey: 'ctrl' },
            ];
            const data: any[] = [];
            result.data.data.map((item: any) => {
                data.push({
                    ...item,
                    category: item.category.name,
                    title: item.title,
                    order: item.order,
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

        const cate = newUrl.searchParams.get('categoryId') ?? 'all';
        const selectedCategory = categoryList.find(item => item.val === cate);
        if (selectedCategory) {
            setCategoryList(prevList =>
                prevList.map(item => ({
                    ...item,
                    selected: item.val === cate
                }))
            );
        }
    }, [searchParams]);

    // #region custom category searching for FAQ page ========================================
    type categoryType = {
        selected: boolean,
        val: string,
        label: string,
    }
    const [categoryList, setCategoryList] = useState<categoryType[]>([
        { selected: true, val: 'all', label: '전체' },
    ])
    const categoryItemClick = (item: categoryType) => {
        router.push('?page=1&categoryId=' + item.val)
    }
    const APIgetCategoryList = async () => {
        const token = getAccessToken();
        const url = '/api/admin/category';
        const response: any = await callAPI(HTTPMETHOD.GET, {}, url, token);
        return response;
    }
    useEffect(() => {
        APIgetCategoryList().then((res: any) => {
            setCategoryList([{ selected: true, val: 'all', label: '전체' }, ...res.data.data.map((item: any) => ({
                selected: false,
                val: item.id.toString(),
                label: item.name,
            }))]
            )
        })
    }, [])
    // #endregion custom category searching for FAQ page ========================================
    // #region category setting Popup ========================================
    const [categorySettingPopupVisible, setCategorySettingPopupVisible] = useState(false);
    // #endregion category setting Popup =====================================

    return (
        <>
            <AdmWrapper>
                <AdmPageTop title={`FAQ 관리`} right={<div style={{ color: basicThemeColors.gray500, fontSize: '12px', fontWeight: 700, cursor: 'pointer', width: '92px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `solid 1px ${basicThemeColors.gray500}`, borderRadius: '4px' }} onClick={() => router.push('/screen')}>이용안내 접속</div>} />
                <AdmListBox>
                    <>
                        <AdmListTableTop
                            LeftComponents={<AdmListTableTopTitle title={'FAQ 목록'} />}
                            RightComponent={
                                <>
                                    <AdmListTableTopGoToCategoryButton buttonText={'FAQ 카테고리 관리'} onClick={() => setCategorySettingPopupVisible(true)} />
                                    <AdmListTableTopGoToWriteButton onClick={() => router.push(`${URL_LIST}/view`)} />
                                </>
                            }
                        />
                        <AdmCategoryList categoryArray={categoryList} clickItem={categoryItemClick} />
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
            {
                categorySettingPopupVisible &&
                <AdmCategoryPopup
                    typeProp={'FAQ'}
                    close={() => setCategorySettingPopupVisible(false)}
                />
            }
        </>
    );
};

export default AdminBoardNoticePage;
