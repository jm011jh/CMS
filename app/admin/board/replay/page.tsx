'use client';

import AdmButton from '@/app/admin/components/design/AdmButton';
import AdmListBox from '@/app/admin/components/design/AdmListBox';
import AdmListSrchBar, { T_AdmListSrchParam } from '@/app/admin/components/design/AdmListSrchBar'; // Corrected path if needed
import AdmListTable from '@/app/admin/components/design/AdmListTable';
import AdmListTableBodyRow from '@/app/admin/components/design/AdmListTableBodyRow';
import AdmListTableHeadRow, { AdmListTableCellProps } from '@/app/admin/components/design/AdmListTableHeadRow';
import AdmListTableTop, { AdmListTableTopGoToWriteButton, AdmListTableTopTitle } from '@/app/admin/components/design/AdmListTableTop';
import AdmPageTop from '@/app/admin/components/design/AdmPageTop';
import AdmWrapper from '@/app/admin/components/design/AdmWrapper';
import Pagination from '@/app/admin/components/paging/Pagination';
import listDataToTableList from '@/app/admin/lib/listDataToTableList';
import useLoadingScreenStore from '@/app/admin/store/loadingScreenStore';
import HeicThumbnail from '@/app/components/HeicThumbnail';
import { callAPI, HTTPMETHOD } from '@/lib/util/callApi';
import { getAccessToken } from '@/lib/util/tokenClass';
import dayjs from 'dayjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react'; // Added useCallback
import apiDeleteBoardItem from '../../lib/apiDeleteBoardItem';
import apiDeleteBoardItemAll from '../../lib/apiDeleteBoardItemAll';
import { isVideoFile, videoExtensions } from '../../lib/VideoFileFunction';
import { useConfirmPopupStore } from '../../store/confirmPopupStore';
import { useReplayInfoStore } from '../../store/replayInfoStore';
import { useToast } from '../../store/useToastStore';
import AdmReplyUpdatePopup from './component/AdmReplyUpdatePopup';

const API_URL_DELETE = '/api/admin/live-archive/'; // Define the API URL for deletion
const API_URL_LIST = '/api/admin/live-archive'; // Define the API URL for listing
const URL_VIEW = '/admin/board/replay/view'; // Define the API URL for editing
const ITEMS_PER_PAGE = 10; // Define the number of items per page

const AdminBoardReplyPage: React.FC = () => {
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
        const target = bdList.find(item => item[0].originalDataRow.id === id)?.[0].originalDataRow;
        console.log(target)
        useReplayInfoStore.getState().setData({ ...target }); // Reset replay URL before editing
        router.push(`${URL_VIEW}?id=${id}`);
    };

    // Define search types for AdmListSrchBar
    const srchTypes: T_AdmListSrchParam[] = [
        // {
        //   size: '100%', inputType: 'srchType', paramKey: 'searchType', label: '검색 타입', placeholder: '전체',
        //   selectOptions: [
        //     { label: '전체', value: 'all' },
        //     { label: '제목', value: 'title' },
        //     { label: '내용', value: 'content' },
        //   ],
        //   notInRow: true
        // },
        { size: '100%', inputType: 'search', paramKey: 'search', label: '검색어', placeholder: '제목 또는 내용으로 검색' },
        { size: '100%', inputType: 'datePatrolStart', paramKey: 'startDate', label: '공개예정일', placeholder: 'YYYY-MM-DD' },
        { size: '100%', inputType: 'datePatrolEnd', paramKey: 'endDate', label: '공개예정일', placeholder: 'YYYY-MM-DD', notInRow: true },
        // {
        //     size: '50%', inputType: 'select', paramKey: 'category', label: '카테고리', placeholder: '전체', selectOptions: [
        //         { label: '전체', value: 'all' },
        //         { label: '일반', value: 'basic' },
        //         { label: '이벤트', value: 'event' },
        //         { label: '시스템', value: 'system' },
        //         { label: '기타', value: 'etc' }
        //     ],
        //     defaultValue: ''
        // },
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
                { id: '', value: 'ID', size: '120px', cellKey: 'id' },
                { id: '', value: '공개그룹', size: '160px', cellKey: 'viewerTypeText' },
                { id: '', value: '썸네일', size: '120px', cellKey: 'thumbnail' },
                { id: '', value: '제목', size: '100%', cellKey: 'title', align: 'left' },
                { id: '', value: '좋아요', size: '100px', cellKey: 'likeCount' },
                { id: '', value: '조회수', size: '100px', cellKey: 'playCount' },
                { id: '', value: '공개 예정일', size: '200px', cellKey: 'openDate' },
                { id: '', value: '작성일', size: '200px', cellKey: 'regDate' },
                { id: '', value: '관리', size: '140px', cellKey: 'ctrl' },
            ];
            const data: any[] = [];
            result.data.data.map((item: any) => {
                data.push({
                    ...item,
                    viewerTypeText: item.viewerType === 'ALL_USERS' ? '전체' : item.viewerType === 'SUBSCRIBERS' ? '구독자용' : '기타',
                    // thumbnail: (item.thumbnailImage && item.thumbnailImage.fileUrl != '') ? <img src={`${item.thumbnailImage ? item.thumbnailImage?.fileUrl : ''}`} height='34px'></img> : '',
                    thumbnail: (item.thumbnailImage && item.thumbnailImage.fileUrl != '')
                        ? <div style={{ width: '23px', height: '23px', position: 'relative', margin: 'auto' }}><HeicThumbnail fileUrl={item.thumbnailImage.fileUrl} fileName={item.thumbnailImage.fileName} sizes="100%" objectFit={'cover'} /></div>
                        : '', openGroup: item.viewerType == 'ALL_USERS' ? '전체' : '구독자용',
                    openDate: item.replayPublishDate ? dayjs(item.replayPublishDate).format('YYYY.MM.DD HH:mm') : '-',
                    regDate: dayjs(item.regDate).format('YYYY.MM.DD HH:mm'),
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

    const [isDetailPopupOpen, setIsDetailPopupOpen] = useState(false);

    const detailPopupClose = () => {
        setIsDetailPopupOpen(false);
    }

    const handleAdd = () => {
        setIsDetailPopupOpen(true);
    }

    const { addToast } = useToast();

    const handleSave = (data: any) => {
        //data.videoUrl가 비어있지 않고, url이 유효한 경우에만 넘어감
        if (!data.videoUrl || !data.videoUrl.startsWith('http')) {
            addToast('유효한 VOD URL을 입력해주세요.', 3000, 'error');
            return;
        }

        if (!isVideoFile(data.videoUrl)) {
            addToast(<p>지원하지 않는 비디오 파일 형식입니다. <br />(지원가능 - {videoExtensions.join(', ')})</p>, 3000, 'error');
            return;
        }

        detailPopupClose();
        console.log("data", data)
        useReplayInfoStore.getState().setData({ replayUrl: data.videoUrl, newReplayUrl: data.newVideoUrl });
        router.push(URL_VIEW);
    }

    // #endregion select tableRowItem and DeleteAll ============================================================
    return (
        <AdmWrapper>
            <AdmPageTop title={`다시보기 VOD 관리`} />
            <AdmListSrchBar
                srchTypes={srchTypes}
                initialSearchValues={getInitialSearchValues()}
            />
            <AdmListBox>
                <>
                    <AdmListTableTop
                        LeftComponents={
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <AdmListTableTopTitle title={'VOD 목록'} />
                                <AdmButton size={'small'} color='secondaryFill' onClick={deleteItemAll} disabled={selected.filter(id => id !== 'all').length === 0} style={{ padding: '0 12px' }}>선택 삭제</AdmButton>
                            </div>
                        } RightComponent={
                            <>
                                <AdmListTableTopGoToWriteButton onClick={handleAdd} />
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
                                    {
                                        bdList.length == 0 &&
                                        <>
                                            <div style={{ height: '48px', border: '0px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>다시보기 VOD 내역이 없습니다.</div>
                                        </>
                                    }
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
            {
                isDetailPopupOpen &&
                <AdmReplyUpdatePopup data={null} close={detailPopupClose} handleSave={handleSave} />
            }
        </AdmWrapper>
    );
};

export default AdminBoardReplyPage;
