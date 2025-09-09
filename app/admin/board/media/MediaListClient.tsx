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
import apiDeleteBoardItem from '@/app/admin/lib/apiDeleteBoardItem';
import listDataToTableList from '@/app/admin/lib/listDataToTableList';
import numberChangeToKM from '@/app/admin/lib/numberChangeToKM';
import { useConfirmPopupStore } from '@/app/admin/store/confirmPopupStore';
import useLoadingScreenStore from '@/app/admin/store/loadingScreenStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, useMemo, useState } from 'react';
import apiDeleteBoardItemAll from '../../lib/apiDeleteBoardItemAll';
import { getMediaList } from './api';
import { API_URL_DELETE, ITEMS_PER_PAGE, URL_LIST, URL_VIEW } from './constants';

// 테이블 구조는 렌더링과 상관없는 상수이므로 컴포넌트 밖으로 이동합니다.
const tableStructure: AdmListTableCellProps[] = [
  { id: '', value: '', size: '48px', cellKey: 'checkbox' },
  { id: '', value: 'ID', size: '120px', cellKey: 'id' },
  { id: '', value: '제목', size: '100%', cellKey: 'title', align: 'left' },
  { id: '', value: '좋아요', size: '100px', cellKey: 'like' },
  { id: '', value: '공개 예정일', size: '200px', cellKey: 'openDate' },
  { id: '', value: '작성일', size: '200px', cellKey: 'regDate' },
  { id: '', value: '관리', size: '140px', cellKey: 'ctrl' },
];

const AdminBoardMediaPageClient: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') ?? '1');
  const [selected, setSelected] = useState<string[]>([]);

  const { showLoading, hideLoading } = useLoadingScreenStore();
  const { showPopup } = useConfirmPopupStore();
  const queryClient = useQueryClient();

  const srchTypes: T_AdmListSrchParam[] = [
    { size: '100%', inputType: 'search', paramKey: 'search', label: '검색어', placeholder: '제목 또는 내용으로 검색' },
    { size: '100%', inputType: 'datePatrolStart', paramKey: 'startDate', label: '공개예정일', placeholder: 'YYYY-MM-DD' },
    { size: '100%', inputType: 'datePatrolEnd', paramKey: 'endDate', label: '공개예정일', placeholder: 'YYYY-MM-DD', notInRow: true },
  ];

  const { data: mediaQueryResult, isFetching } = useQuery({
    queryKey: ['mediaList', searchParams.toString()],
    queryFn: () => {
      const queryParams = new URLSearchParams(searchParams.toString());
      queryParams.set('page', page.toString());
      queryParams.set('limit', ITEMS_PER_PAGE.toString());
      return getMediaList(queryParams.toString());
    },
  });

  const { bdList, totalItems } = useMemo(() => {
    if (!mediaQueryResult?.data) {
      return { bdList: [], totalItems: 0 };
    }

    const customData = mediaQueryResult.data.map((item: any) => ({
      ...item,
      like: numberChangeToKM(item.like),
      openDate: dayjs(item.openDate).format('YYYY.MM.DD HH:mm'),
      regDate: dayjs(item.regDate).format('YYYY.MM.DD HH:mm'),
    }));

    const tableData = listDataToTableList(customData, tableStructure);
    return { bdList: tableData, totalItems: mediaQueryResult.meta.total };
  }, [mediaQueryResult]);

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiDeleteBoardItem(id, API_URL_DELETE),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mediaList'] });
      alert('삭제되었습니다.');
    },
    onError: () => {
      alert('삭제 중 오류가 발생했습니다.');
    },
    onSettled: () => {
      hideLoading();
    }
  });

  const deleteItem = (id: string) => {
    showPopup({
      title: <p>삭제 전 확인해주세요</p>,
      desc: <p>삭제된 정보는 사용자에게 노출되지 않으며<br />복구가 불가능합니다.<br />정말 삭제하시겠습니까?</p>,
      onConfirm: () => {
        showLoading();
        deleteMutation.mutate(id);
      },
    });
  };

  const deleteAllMutation = useMutation({
    mutationFn: (ids: string[]) => apiDeleteBoardItemAll({ idArray: ids, apiUrl: API_URL_DELETE }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mediaList'] });
      setSelected([]);
      alert('삭제되었습니다.');
    },
    onError: () => {
      alert('처리 중 문제가 발생하였습니다.');
    },
    onSettled: () => {
      hideLoading();
    }
  });

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
        deleteAllMutation.mutate(idsToDelete);
      },
    });
  };

  const editItem = (id: string) => {
    router.push(`${URL_VIEW}${id}`);
  };

  return (
    <AdmWrapper>
      <AdmPageTop title={`미디어 관리`} />
      <AdmListSrchBar
        srchTypes={srchTypes}
        initialSearchValues={Object.fromEntries(searchParams.entries())}
      />
      <AdmListBox>
        <>
          <AdmListTableTop
            LeftComponents={
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <AdmListTableTopTitle title={'미디어 목록'} />
                <AdmButton size={'small'} color='secondaryFill' onClick={deleteItemAll} disabled={selected.filter(id => id !== 'all').length === 0} style={{ padding: '0 12px' }}>선택 삭제</AdmButton>
              </div>
            }
            RightComponent={
              <>
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
                  {isFetching ? (
                    <div>로딩 중...</div>
                  ) : bdList.length > 0 ? (
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
                    ))
                  ) : (
                    <div>데이터가 없습니다.</div>
                  )}
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

export default AdminBoardMediaPageClient;