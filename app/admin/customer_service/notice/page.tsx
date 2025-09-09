'use client';
import AdmListBox from '@/app/admin/components/design/AdmListBox';
import AdmListTable from '@/app/admin/components/design/AdmListTable';
import AdmListTableBodyRow from '@/app/admin/components/design/AdmListTableBodyRow';
import AdmListTableHeadRow, { AdmListTableCellProps } from '@/app/admin/components/design/AdmListTableHeadRow';
import AdmListTableTop, { AdmListTableTopGoToWriteButton, AdmListTableTopTitle } from '@/app/admin/components/design/AdmListTableTop';
import AdmPageTop from '@/app/admin/components/design/AdmPageTop';
import AdmWrapper from '@/app/admin/components/design/AdmWrapper';
import Pagination from '@/app/admin/components/paging/Pagination';
import apiDeleteBoardItem from '@/app/admin/lib/apiDeleteBoardItem';
import listDataToTableList from '@/app/admin/lib/listDataToTableList';
import numberChangeToKM from '@/app/admin/lib/numberChangeToKM';
import useLoadingScreenStore from '@/app/admin/store/loadingScreenStore';
import { callAPI, HTTPMETHOD } from '@/lib/util/callApi';
import { getAccessToken } from '@/lib/util/tokenClass';
import dayjs from 'dayjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, useCallback, useEffect, useState } from 'react';
import { basicThemeColors } from '../../assets/theme';
import AdmButton from '../../components/design/AdmButton';
import AdmListSrchBar, { T_AdmListSrchParam } from '../../components/design/AdmListSrchBar';
import apiDeleteBoardItemAll from '../../lib/apiDeleteBoardItemAll';
import { useConfirmPopupStore } from '../../store/confirmPopupStore';

const API_URL_DELETE = '/api/admin/cs/notice/'; // Define the API URL for deletion
const API_URL_LIST = '/api/cs/notice'; // Define the API URL for listing
// const API_URL_GETLIST = '/admin/cs/notice'; // Define the API URL for getting the list
const URL_LIST = '/admin/customer_service/notice'; // Define the URL for listing in the admin board
const URL_VIEW = '/admin/customer_service/notice/view?id='; // Define the API URL for editing
const ITEMS_PER_PAGE = 10; // Define the number of items per page

const AdminAppNoticePage: FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
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
    const editItem = async (id: string) => {
        router.push(`${URL_VIEW}${id}`);
    };

    // Define search types for AdmListSrchBar
    const srchTypes: T_AdmListSrchParam[] = [
        { size: '100%', inputType: 'search', paramKey: 'search', label: '검색어', placeholder: '제목 또는 내용으로 검색' },
        { size: '100%', inputType: 'datePatrolStart', paramKey: 'startDate', label: '작성기간', placeholder: 'YYYY-MM-DD' },
        { size: '100%', inputType: 'datePatrolEnd', paramKey: 'endDate', label: '작성기간', placeholder: 'YYYY-MM-DD', notInRow: true },
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
                { id: '', value: '', size: '48px', cellKey: 'checkbox' },
                { id: '', value: 'ID', size: '80px', cellKey: 'id' },
                { id: '', value: '제목', size: '100%', cellKey: 'title', align: 'left' },
                { id: '', value: '작성일', size: '200px', cellKey: 'regDate' },
                { id: '', value: '관리', size: '140px', cellKey: 'ctrl' },
            ];
            const data: any[] = [];
            result.data.data.map((item: any) => {
                data.push({
                    ...item,
                    like: numberChangeToKM(item.like),
                    openDate: dayjs(item.openDate).format('YYYY.MM.DD HH:mm'),
                    regDate: dayjs(item.regDate).format('YYYY.MM.DD HH:mm'),
                });
            });
            setTableStructure(tableStructureData);
            const tableData = listDataToTableList(data, tableStructureData);
            setBdList(tableData);
            setTotalItems(result.data.meta.total);
        } catch (e: any) {
            if (e === null) return;
            alert(
                '처리 중 문제가 발생하였습니다.\n반복될 경우, 관리자에게 문의하여 주세요.',
            );
        }
    };
    const [srchTxt, setSrchTxt] = useState<string>('');


    useEffect(() => {
        const newUrl = new URL(window.location.href);
        const page = parseInt(newUrl.searchParams.get('page') ?? '1');

        setPage(page);
        callListBySearch();

    }, [searchParams]);

    // #region select tableRowItem and DeleteAll ==================================================================
    const [selected, setSelected] = useState<string[]>([]);
    const deleteItemAll = () => {
        const idsToDelete = selected.filter(id => id !== 'all');
        if (idsToDelete.length === 0) {
            alert('삭제할 항목을 선택해주세요.');
            return;
        }
        showPopup({
            title: <p>선택 항목 삭제</p>,
            desc: <p>선택된 {idsToDelete.length}개의 항목을 정말 삭제하시겠습니까?<br />삭제된 정보는 복구가 불가능합니다.</p>,
            onConfirm: () => {
                showLoading();
                apiDeleteBoardItemAll({
                    idArray: idsToDelete,
                    apiUrl: API_URL_DELETE,
                    callFn: () => {
                        callListBySearch();
                        setSelected([]);
                    }
                })
                    .then((res: boolean) => {
                        alert(res ? '삭제되었습니다.' : '처리 중 문제가 발생하였습니다.\n반복될 경우, 관리자에게 문의하여 주세요.')
                    })
                    .catch((e: any) => {
                        alert('처리 중 문제가 발생하였습니다.\n반복될 경우, 관리자에게 문의하여 주세요.')
                    })
                    .finally(() => {
                        hideLoading();
                    });
            },
        });
    }
    // #endregion select tableRowItem and DeleteAll ============================================================

    return (
        <AdmWrapper>
            <AdmPageTop title={`앱 공지사항 관리`} right={<div style={{ color: basicThemeColors.gray500, fontSize: '12px', fontWeight: 700, cursor: 'pointer', width: '92px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `solid 1px ${basicThemeColors.gray500}`, borderRadius: '4px' }} onClick={() => router.push('/screen')}>이용안내 접속</div>} />
            <AdmListSrchBar
                srchTypes={srchTypes}

                initialSearchValues={getInitialSearchValues()}
            />
            <AdmListBox>
                <>

                    <AdmListTableTop
                        LeftComponents={<div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <AdmListTableTopTitle title={'앱 공지사항 목록'} />
                            <AdmButton size={'small'} color='secondaryFill' onClick={deleteItemAll} disabled={selected.filter(id => id !== 'all').length === 0} style={{ padding: '0 12px' }}>선택 삭제</AdmButton>
                        </div>}
                        RightComponent={
                            <>
                                <AdmListTableTopGoToWriteButton onClick={() => router.push('/admin/customer_service/notice/view')} />
                            </>
                        }
                    />
                    <div className="adm--box-scrollWrap">
                        <div className="adm--box-scrollCont" style={{ width: '100%' }}>
                            <AdmListTable>
                                <>
                                    <AdmListTableHeadRow
                                        structure={tableStructure}
                                        selectedAllItem={bdList.map((item: any) => item[0]?.originalDataRow.id.toString())}
                                        selected={selected}
                                        setSelected={setSelected} />
                                    {bdList.length > 0 &&
                                        bdList.map((data: any, idx: number) => (
                                            <AdmListTableBodyRow
                                                selected={selected}
                                                setSelected={setSelected}
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

export default AdminAppNoticePage;
