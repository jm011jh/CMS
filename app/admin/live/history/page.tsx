'use client';
import AdmListBox from '@/app/admin/components/design/AdmListBox';
import AdmListTable from '@/app/admin/components/design/AdmListTable';
import AdmListTableBodyRow from '@/app/admin/components/design/AdmListTableBodyRow';
import AdmListTableHeadRow, { AdmListTableCellProps } from '@/app/admin/components/design/AdmListTableHeadRow';
import AdmListTableTop, { AdmListTableTopTitle } from '@/app/admin/components/design/AdmListTableTop';
import AdmPageTop from '@/app/admin/components/design/AdmPageTop';
import AdmWrapper from '@/app/admin/components/design/AdmWrapper';
import Pagination from '@/app/admin/components/paging/Pagination';
import apiDeleteBoardItem from '@/app/admin/lib/apiDeleteBoardItem';
import listDataToTableList from '@/app/admin/lib/listDataToTableList';
import useLoadingScreenStore from '@/app/admin/store/loadingScreenStore';
import HeicThumbnail from '@/app/components/HeicThumbnail';
import { callAPI_download_excel } from '@/lib/util/callApi';
import { getAccessToken } from '@/lib/util/tokenClass';
import dayjs from 'dayjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, useCallback, useEffect, useState } from 'react';
import AdmButton from '../../components/design/AdmButton';
import AdmListSrchBar, { T_AdmListSrchParam } from '../../components/design/AdmListSrchBar';
import AdmPageExplnation from '../../components/design/AdmPageExplnation';
import apiDeleteBoardItemAll from '../../lib/apiDeleteBoardItemAll';
import dataToExcelAndDownload from '../../lib/dataToExcelAndDownload';
import { useConfirmPopupStore } from '../../store/confirmPopupStore';
import { API_URL_DELETE, deleteLiveItem, getLiveHistoryList, getLiveHistoryList2, ITEMS_PER_PAGE, URL_VIEW } from './api';


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
        { size: '100%', inputType: 'datePatrolStart', paramKey: 'startDate', label: '라이브 시작일', placeholder: 'YYYY-MM-DD' },
        { size: '100%', inputType: 'datePatrolEnd', paramKey: 'endDate', label: '라이브 시작일', placeholder: 'YYYY-MM-DD', notInRow: true },
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
        showLoading();

        try {
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
            const result: any = await getLiveHistoryList(queryParams.toString());

            const customData: any[] = result.data.map((item: any) => ({
                ...item,
                openDate: item.startDate ? dayjs(item.startDate).format('YYYY.MM.DD HH:mm') : '-',
                endDate: item.endDate ? dayjs(item.endDate).format('YYYY.MM.DD HH:mm') : '-',
                thumbnail: (item.thumbnailImage && item.thumbnailImage.fileUrl != '')
                    ? <div style={{ width: '23px', height: '23px', position: 'relative', margin: 'auto' }}><HeicThumbnail fileUrl={item.thumbnailImage.fileUrl} fileName={item.thumbnailImage.fileName} sizes="100%" objectFit={'cover'} /></div>
                    : '', openGroup: item.viewerType == 'ALL_USERS' ? '전체' : '구독자용',
                chat:
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center' }}>
                        <button
                            onClick={() => {
                                // 채팅 내역 다운로드
                                handleExcelDownloadClick(item.id, item.startDate);
                            }}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px', border: 'none', background: 'none', cursor: 'pointer' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M1.75 15.835V12.502C1.75 12.0877 2.08579 11.752 2.5 11.752C2.91421 11.752 3.25 12.0877 3.25 12.502V15.835C3.25 16.0781 3.34665 16.3115 3.51855 16.4834C3.69046 16.6553 3.92388 16.752 4.16699 16.752H15.833C16.0761 16.752 16.3095 16.6553 16.4814 16.4834C16.6534 16.3115 16.75 16.0781 16.75 15.835V12.502C16.75 12.0877 17.0858 11.752 17.5 11.752C17.9142 11.752 18.25 12.0877 18.25 12.502V15.835C18.25 16.4759 17.9952 17.0907 17.542 17.5439C17.0888 17.9972 16.4739 18.252 15.833 18.252H4.16699C3.52605 18.252 2.91122 17.9972 2.45801 17.5439C2.00479 17.0907 1.75 16.4759 1.75 15.835Z" fill="#9CA3AF" />
                                <path d="M13.6386 7.8017C13.9315 7.50886 14.4063 7.50897 14.6992 7.8017C14.9921 8.09459 14.9921 8.56935 14.6992 8.86225L10.5331 13.0292C10.2404 13.322 9.76552 13.3218 9.4726 13.0292L5.30561 8.86225C5.01271 8.56935 5.01271 8.09459 5.30561 7.8017C5.5985 7.50881 6.07326 7.50881 6.36615 7.8017L10.0019 11.4374L13.6386 7.8017Z" fill="#9CA3AF" />
                                <path d="M9.25 12.5V2.5C9.25 2.08579 9.58579 1.75 10 1.75C10.4142 1.75 10.75 2.08579 10.75 2.5V12.5C10.75 12.9142 10.4142 13.25 10 13.25C9.58579 13.25 9.25 12.9142 9.25 12.5Z" fill="#9CA3AF" />
                            </svg>
                        </button>
                    </div>,
                title: item.title || '-',
            }));

            const tableStructureData: AdmListTableCellProps[] = [
                { id: '', value: 'ID', size: '80px', cellKey: 'id' },
                { id: '', value: '공개그룹', size: '100px', cellKey: 'openGroup' },
                { id: '', value: '썸네일', size: '120px', cellKey: 'thumbnail' },
                { id: '', value: '제목', size: '100%', cellKey: 'title', align: 'left' },
                { id: '', value: '좋아요', size: '100px', cellKey: 'likeCount' },
                { id: '', value: '조회수', size: '100px', cellKey: 'maxViewerCount' },
                { id: '', value: '채팅내역', size: '100px', cellKey: 'chat' },
                { id: '', value: '라이브 시작일', size: '180px', cellKey: 'openDate' },
                { id: '', value: '라이브 종료일', size: '180px', cellKey: 'endDate' },
            ];

            const tableData = listDataToTableList(customData, tableStructureData);
            setTableStructure(tableStructureData);
            setBdList(tableData);
            setTotalItems(result.meta.total);
        } catch (e: any) {
            if (e === null) return;
            // alert('처리 중 문제가 발생하였습니다.\n반복될 경우, 관리자에게 문의하여 주세요.');
        } finally {
            hideLoading();
        }
    };

    const callExcelData = async (id: string) => {
        const token = getAccessToken();
        if (!token) {
            throw new Error('로그인이 필요합니다.');
        }
        const url = `/api/admin/lives/${id}/export/excel`;
        try {
            const response: any = await callAPI_download_excel(url, token);
            return response;
        } catch (error) {
            console.error('Error downloading user list:', error);
            throw new Error('회원 목록을 다운로드하는 중 오류가 발생했습니다.');
        }
    }

    const handleExcelDownloadClick = async (id: string, startDate: string) => {
        showLoading();
        callExcelData(id).then((res) => {
            // Access-Control-Expose-Headers에 Content-Disposition을 명시해야 Content-Disposition 헤더를 읽을 수 있습니다.
            // 지금은 안되어 있어서, 파일명을 직접 지정.
            // const disposition = res.headers.get('Content-Disposition');
            // let fileName = `download-excel-${new Date().toISOString()}.xlsx`;
            // const match = disposition && disposition.match(/filename="?([^"]+)"?/);
            // if (match && match[1]) {
            //     fileName = match[1];
            // }

            const filename = `라이브 채팅내역-${id}-${dayjs(startDate).format("YYYY-MM-DD HH_mm_ss")}.xlsx`;
            dataToExcelAndDownload(res, filename);
        }).catch((err) => {
            console.error('Error downloading user list:', err);
            alert('처리 중 문제가 발생하였습니다.\n반복될 경우, 관리자에게 문의하여 주세요.');
        }).finally(() => {
            hideLoading();
        });
    }

    useEffect(() => {
        const newUrl = new URL(window.location.href);
        const page = parseInt(newUrl.searchParams.get('page') ?? '1');

        setPage(page);
        setPage2(page);
        callListBySearch();
        callListBySearch2();

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

    // #region 진행 중인 라이브 테이블 ==================================================================
    const stopLiveItem = (id: string) => {
        showPopup({
            title: <p>강제 종료 전 확인해주세요</p>,
            desc: <p>강제 종료 시 사용자들은 더 입장할 수 없으며,<br />방송이 종료되지는 않습니다.<br />또한, 아티스트가 방송중인 방송을 강제로 종료 할 경우, 예기치 못한 문제가 발생할 수 있습니다.<br />정말 종료하시겠습니까?</p>,
            onConfirm: () => {
                showLoading();
                deleteLiveItem(id).finally(() => {
                    hideLoading();
                    callListBySearch2();
                });
                // 팝업에서 "확인"을 눌렀을 때의 동작
            },
            onCancel: () => {
                // 팝업에서 "취소"를 눌렀을 때 (팝업이 닫히는 것 외 추가 동작 필요시)
            }
        });
    };
    const [tableStructure2, setTableStructure2] = useState<AdmListTableCellProps[]>([]);
    const [bdList2, setBdList2] = useState<AdmListTableCellProps[][]>([]);
    const [totalItems2, setTotalItems2] = useState<number>(0);
    const [page2, setPage2] = useState<number>(1);

    const callListBySearch2 = async () => {
        showLoading();

        try {
            //query에서 list에서 필요한 값 가져옴
            // const searchParams = new URLSearchParams(window.location.search);
            // const page = parseInt(searchParams.get('page') ?? '1');
            setPage2(page);

            // Build query parameters
            const queryParams = new URLSearchParams({
                limit: ITEMS_PER_PAGE.toString(),
                status: 'LIVE',
            });

            // for (const [key, value] of searchParams) {
            //     queryParams.set(key, value)
            // }
            const result: any = await getLiveHistoryList2(queryParams.toString());

            const customData: any[] = result.data.map((item: any) => ({
                ...item,
                openDate: item.startDate ? dayjs(item.startDate).format('YYYY.MM.DD HH:mm') : '-',
                thumbnail: (item.thumbnailImage && item.thumbnailImage.fileUrl != '')
                    ? <div style={{ width: '23px', height: '23px', position: 'relative', margin: 'auto' }}><HeicThumbnail fileUrl={item.thumbnailImage.fileUrl} fileName={item.thumbnailImage.fileName} sizes="100%" objectFit={'cover'} /></div>
                    : '', openGroup: item.viewerType == 'ALL_USERS' ? '전체' : '구독자용',
                title: item.title || '-',
                opt:
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center' }}>
                        <AdmButton style={{ padding: '0 12px' }} size={'small'} color='danger' onClick={() => stopLiveItem(item.id)}>미 종료 방송 강제종료</AdmButton>
                    </div>
            }));

            const tableStructureData: AdmListTableCellProps[] = [
                { id: '', value: 'ID', size: '80px', cellKey: 'id' },
                { id: '', value: '공개그룹', size: '100px', cellKey: 'openGroup' },
                { id: '', value: '썸네일', size: '120px', cellKey: 'thumbnail' },
                { id: '', value: '제목', size: '100%', cellKey: 'title', align: 'left' },
                { id: '', value: '좋아요', size: '100px', cellKey: 'likeCount' },
                { id: '', value: '조회수', size: '100px', cellKey: 'maxViewerCount' },
                { id: '', value: '라이브 시작일', size: '160px', cellKey: 'openDate' },
                { id: '', value: '관리', size: '200px', cellKey: 'opt' },
            ];

            const tableData = listDataToTableList(customData, tableStructureData);
            setTableStructure2(tableStructureData);
            setBdList2(tableData);
            setTotalItems2(result.meta.total);
        } catch (e: any) {
            if (e === null) return;
            // alert('처리 중 문제가 발생하였습니다.\n반복될 경우, 관리자에게 문의하여 주세요.');
        } finally {
            hideLoading();
        }
    };

    // #endregion 진행 중인 라이브 테이블 ==================================================================

    return (
        <AdmWrapper>
            <AdmPageTop title={`라이브 히스토리 관리`} />
            <AdmListSrchBar
                srchTypes={srchTypes}

                initialSearchValues={getInitialSearchValues()}
            />
            <AdmListBox>
                <>

                    <AdmListTableTop
                        LeftComponents={<div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <AdmListTableTopTitle title={'진행 중인 라이브'} />
                        </div>}
                    />
                    <AdmPageExplnation titleRed={<p>'진행 중인 라이브를 확인할 수 있습니다. <br />방송 중 오류, 네트워크 손실 등의 이유로 정상 종료되지 않은 방송이 있다면 “미 종료 방송 강제종료” 버튼을 눌러 방송을 정상 종료시켜주세요. (해당 기능은 진행 중인 라이브를 강제 종료할 수 없습니다.)'</p>} />
                    <div className="adm--box-scrollWrap">
                        <div className="adm--box-scrollCont" style={{ width: '100%' }}>
                            <AdmListTable>
                                <>
                                    <AdmListTableHeadRow
                                        structure={tableStructure2}
                                        selectedAllItem={bdList2.map((item: any) => item[0]?.originalDataRow.id.toString())}
                                        selected={selected}
                                        setSelected={setSelected} />
                                    {bdList2.length > 0 &&
                                        bdList2.map((data: any, idx: number) => (
                                            <AdmListTableBodyRow
                                                selected={selected}
                                                setSelected={setSelected}
                                                key={idx}
                                                structure={data}
                                                isLast={idx === bdList2.length - 1}
                                            />
                                        ))}
                                    {bdList2.length === 0 &&
                                        <div style={{ textAlign: 'center', padding: '20px' }}>
                                            진행 중인 라이브가 없습니다.
                                        </div>
                                    }
                                </>
                            </AdmListTable>

                            <Pagination
                                totalItems={totalItems2}
                                currentPage={page2}
                                itemCountPerPage={ITEMS_PER_PAGE}
                            />
                        </div>
                    </div>
                    <AdmListTableTop
                        LeftComponents={<div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <AdmListTableTopTitle title={'라이브 히스토리 목록'} />
                            {/* <AdmButton size={'small'} color='secondaryFill' onClick={deleteItemAll} disabled={selected.filter(id => id !== 'all').length === 0} style={{ padding: '0 12px' }}>선택 삭제</AdmButton> */}
                        </div>}
                    // RightComponent={
                    //     <>
                    //         <AdmListTableTopGoToWriteButton onClick={() => router.push('/admin/customer_service/notice/view')} />
                    //     </>
                    // }
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
