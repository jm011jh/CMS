'use client';

import AdmButton from '@/app/admin/components/design/AdmButton';
import AdmListBox from '@/app/admin/components/design/AdmListBox';
import AdmListSrchBar, { T_AdmListSrchParam } from '@/app/admin/components/design/AdmListSrchBar';
import AdmListTable from '@/app/admin/components/design/AdmListTable';
import AdmListTableBodyRow from '@/app/admin/components/design/AdmListTableBodyRow';
import AdmListTableHeadRow, { AdmListTableCellProps } from '@/app/admin/components/design/AdmListTableHeadRow';
import AdmListTableTop, { AdmListTableTopGoToWriteButton, AdmListTableTopTitle } from '@/app/admin/components/design/AdmListTableTop';
import AdmPageTop from '@/app/admin/components/design/AdmPageTop';
import AdmWrapper from '@/app/admin/components/design/AdmWrapper';
import Pagination from '@/app/admin/components/paging/Pagination';
import listDataToTableList from '@/app/admin/lib/listDataToTableList';
import useLoadingScreenStore from '@/app/admin/store/loadingScreenStore';
import dayjs from 'dayjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import apiDeleteBoardItem from '../../lib/apiDeleteBoardItem';
import apiDeleteBoardItemAll from '../../lib/apiDeleteBoardItemAll';
import { useConfirmPopupStore } from '../../store/confirmPopupStore';
import { getNoticeList } from './api';
import { API_URL_DELETE, ITEMS_PER_PAGE, URL_LIST, URL_VIEW } from './constants';

const AdminBoardNoticePage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tableStructure, setTableStructure] = useState<AdmListTableCellProps[]>([]);
  const [bdList, setBdList] = useState<AdmListTableCellProps[][]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState<number>(1);
  const [selected, setSelected] = useState<string[]>([]);

  const { showLoading, hideLoading } = useLoadingScreenStore();
  const { showPopup } = useConfirmPopupStore();

  const srchTypes: T_AdmListSrchParam[] = [
    { size: '100%', inputType: 'search', paramKey: 'search', label: '검색어', placeholder: '제목 또는 내용으로 검색' },
    { size: '100%', inputType: 'datePatrolStart', paramKey: 'startDate', label: '공개예정일', placeholder: 'YYYY-MM-DD' },
    { size: '100%', inputType: 'datePatrolEnd', paramKey: 'endDate', label: '공개예정일', placeholder: 'YYYY-MM-DD', notInRow: true },
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

  const callListBySearch = useCallback(async (currentPage: number) => {
    showLoading();
    try {
      const queryParams = new URLSearchParams(window.location.search);
      queryParams.set('page', currentPage.toString());
      queryParams.set('limit', ITEMS_PER_PAGE.toString());

      const result = await getNoticeList(queryParams.toString());

      const customData = result.data.map((item: any) => ({
        ...item,
        openDate: item.openDate ? dayjs(item.openDate).format('YYYY.MM.DD HH:mm') : '-',
        regDate: dayjs(item.regDate).format('YYYY.MM.DD HH:mm'),
      }));

      const tableStructureData: AdmListTableCellProps[] = [
        { id: '', value: '', size: '48px', cellKey: 'checkbox' },
        { id: '', value: 'ID', size: '120px', cellKey: 'id' },
        { id: '', value: '제목', size: '100%', cellKey: 'title', align: 'left' },
        { id: '', value: '공개 예정일', size: '200px', cellKey: 'openDate' },
        { id: '', value: '작성일', size: '200px', cellKey: 'regDate' },
        { id: '', value: '관리', size: '140px', cellKey: 'ctrl' },
      ];

      const tableData = listDataToTableList(customData, tableStructureData);
      setTableStructure(tableStructureData);
      setBdList(tableData);
      setTotalItems(result.meta.total);
    } catch (error) {
      console.error("Error fetching list:", error);
      alert('처리 중 문제가 발생하였습니다.\n반복될 경우, 관리자에게 문의하여 주세요.');
    } finally {
      hideLoading();
    }
  }, [showLoading, hideLoading]);

  useEffect(() => {
    const currentPage = parseInt(searchParams.get('page') ?? '1');
    setPage(currentPage);
    callListBySearch(currentPage);
  }, [searchParams, callListBySearch]);

  const deleteItem = (id: string) => {
    showPopup({
      title: <p>삭제 전 확인해주세요</p>,
      desc: <p>삭제된 정보는 사용자에게 노출되지 않으며<br />복구가 불가능합니다.<br />정말 삭제하시겠습니까?</p>,
      onConfirm: async () => {
        showLoading();
        try {
          await apiDeleteBoardItem(id, API_URL_DELETE, () => callListBySearch(page));
        } finally {
          hideLoading();
        }
      },
    });
  };

  const deleteItemAll = () => {
    const idsToDelete = selected.filter(id => id !== 'all');
    if (idsToDelete.length === 0) {
      alert('삭제할 항목을 선택해주세요.');
      return;
    }
    showPopup({
      title: <p>선택 항목 삭제</p>,
      desc: <p>선택된 {idsToDelete.length}개의 항목을 정말 삭제하시겠습니까?<br />삭제된 정보는 복구가 불가능합니다.</p>,
      onConfirm: async () => {
        showLoading();
        try {
          await apiDeleteBoardItemAll({
            idArray: idsToDelete,
            apiUrl: API_URL_DELETE,
            callFn: () => {
              callListBySearch(page);
              setSelected([]);
            }
          });
          alert('삭제되었습니다.');
        } catch (e) {
          alert('처리 중 문제가 발생하였습니다.\n반복될 경우, 관리자에게 문의하여 주세요.');
        } finally {
          hideLoading();
        }
      },
    });
  };

  const editItem = (id: string) => {
    router.push(`${URL_VIEW}${id}`);
  };

  return (
    <AdmWrapper>
      <AdmPageTop title={`공지사항 관리`} />
      <AdmListSrchBar
        srchTypes={srchTypes}
        initialSearchValues={getInitialSearchValues()}
      />
      <AdmListBox>
        <>
          <AdmListTableTop
            LeftComponents={
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <AdmListTableTopTitle title={'공지사항 목록'} />
                <AdmButton size={'small'} color='secondaryFill' onClick={deleteItemAll} disabled={selected.filter(id => id !== 'all').length === 0} style={{ padding: '0 12px' }}>선택 삭제</AdmButton>
              </div>
            }
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
                  <AdmListTableHeadRow
                    structure={tableStructure}
                    selectedAllItem={bdList.map((item: any) => item[0]?.originalDataRow.id.toString())}
                    selected={selected}
                    setSelected={setSelected}
                  />
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

export default AdminBoardNoticePage;