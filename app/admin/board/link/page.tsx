'use client';

import AdmButton from '@/app/admin/components/design/AdmButton';
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
import SafeImage from '@/app/components/SafeImage';
import dayjs from 'dayjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, useCallback, useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import apiDeleteBoardItemAll from '../../lib/apiDeleteBoardItemAll';
import { useConfirmPopupStore } from '../../store/confirmPopupStore';
import { getLinkList } from './api';
import { API_URL_DELETE, ITEMS_PER_PAGE, URL_LIST, URL_VIEW } from './constants';

const AdminBoardLinkPage: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tableStructure, setTableStructure] = useState<AdmListTableCellProps[]>([]);
  const [bdList, setBdList] = useState<AdmListTableCellProps[][]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<string[]>([]);

  const { showLoading, hideLoading } = useLoadingScreenStore();
  const { showPopup } = useConfirmPopupStore();

  const callListBySearch = useCallback(async (currentPage: number) => {
    showLoading();
    try {
      const queryParams = new URLSearchParams(window.location.search);
      queryParams.set('page', currentPage.toString());
      queryParams.set('limit', ITEMS_PER_PAGE.toString());

      const result = await getLinkList(queryParams.toString());

      const tableStructureData: AdmListTableCellProps[] = [
        { id: '', value: '', size: '48px', cellKey: 'checkbox' },
        { id: '', value: '노출순서', size: '140px', cellKey: 'order' },
        { id: '', value: '카테고리', size: '200px', cellKey: 'category' },
        { id: '', value: '썸네일', size: '120px', cellKey: 'thumb', },
        { id: '', value: '제목', size: '100%', cellKey: 'title', align: 'left' },
        { id: '', value: '작성일', size: '200px', cellKey: 'regDate' },
        { id: '', value: '관리', size: '140px', cellKey: 'ctrl' },
      ];

      const customData = result.data.map((item: any) => ({
        ...item,
        category: item.category,
        like: numberChangeToKM(item.like),
        thumb: item.files.length > 0 ? <SafeImage src={item.files[0].fileUrl} alt="" style={{ display: 'block', width: '32px', height: '32px', margin: 'auto', borderRadius: '6px' }} width={32} height={32} /> : '',
        scheduleDate: dayjs(item.scheduleDate).format('YYYY.MM.DD HH:mm'),
        openDate: dayjs(item.openDate).format('YYYY.MM.DD HH:mm'),
        regDate: dayjs(item.regDate).format('YYYY.MM.DD HH:mm'),
      }));

      setTableStructure(tableStructureData);
      const tableData = listDataToTableList(customData, tableStructureData);
      setBdList(tableData);
      setTotalItems(result.meta.total);
    } catch (error) {
      console.error('Error fetching list:', error);
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
      <AdmPageTop title={`외부링크 관리`} />
      <AdmListBox>
        <>
          <AdmListTableTop
            LeftComponents={
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <AdmListTableTopTitle title={'외부링크 목록'} />
                <AdmButton size={'small'} color='secondaryFill' onClick={deleteItemAll} disabled={selected.filter(id => id !== 'all').length === 0} style={{ padding: '0 12px' }}>선택 삭제</AdmButton>
              </div>
            }
            RightComponent={
              <>
                {/* <AdmListTableTopGoToCategoryButton /> */}
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

export default AdminBoardLinkPage;