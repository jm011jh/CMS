'use client';

import AdmButtonExcel from '@/app/admin/components/design/AdmButtonExcel';
import AdmListBox from '@/app/admin/components/design/AdmListBox';
import AdmListSrchBar, { T_AdmListSrchParam } from '@/app/admin/components/design/AdmListSrchBar';
import AdmListTable from '@/app/admin/components/design/AdmListTable';
import AdmListTableBodyRow from '@/app/admin/components/design/AdmListTableBodyRow';
import AdmListTableHeadRow, { AdmListTableCellProps } from '@/app/admin/components/design/AdmListTableHeadRow';
import AdmListTableTop, { AdmListTableTopGoToWriteUserButton, AdmListTableTopTitle } from '@/app/admin/components/design/AdmListTableTop';
import { AdmListTop, AdmListTopItem, AdmListTopItemLabel, AdmListTopItemLine, AdmListTopItemValue, AdmListTopItemValueBox, AdmListTopPurple, AdmListTopSemibold } from '@/app/admin/components/design/AdmListTop';
import AdmPageTop from '@/app/admin/components/design/AdmPageTop';
import AdmQuestionHoverIcon from '@/app/admin/components/design/AdmQuestionHoverIcon';
import AdmWrapper from '@/app/admin/components/design/AdmWrapper';
import Pagination from '@/app/admin/components/paging/Pagination';
import countryCodes from '@/app/admin/lib/countryCode';
import listDataToTableList from '@/app/admin/lib/listDataToTableList';
import useLoadingScreenStore from '@/app/admin/store/loadingScreenStore';
import dayjs from 'dayjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, useCallback, useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useConfirmPopupStore } from '../../store/confirmPopupStore';
import { getDashboardData, getUserList, patchAdminUserMemo, withdrawUser as withdrawUserApi } from './api';
import AdminMemoPopup from './components/AdminMemoPopup';
import { ITEMS_PER_PAGE, URL_VIEW } from './constants';

interface UserListItem {
  id: string | number;
  name?: string | null;
  email?: string | null;
  type?: 'A' | 'J' | 'U' | string | null;
  regDate?: string | null;
  userSubscriptionProduct?: string | null;
  memo?: string | null;
  postActivityCount?: number | null;
  commentActivityCount?: number | null;
  inquiryActivityCount?: number | null;
  [key: string]: any;
}

const AdminUserInfoPage: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tableStructure, setTableStructure] = useState<AdmListTableCellProps[]>([]);
  const [bdList, setBdList] = useState<AdmListTableCellProps[][]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const [dashboard, setDashboard] = useState<any>({});
  const [isMemoPopupOpen, setIsMemoPopupOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserListItem | null>(null);
  const [adminMemo, setAdminMemo] = useState<string>('');

  const { showLoading, hideLoading } = useLoadingScreenStore();
  const { showPopup } = useConfirmPopupStore();

  const srchTypes: T_AdmListSrchParam[] = [
    { size: '100%', inputType: 'search', paramKey: 'search', label: '검색어', placeholder: '제목 또는 내용으로 검색' },
    { size: '50%', inputType: 'datePatrolStart', paramKey: 'startDate', label: '가입일', placeholder: 'YYYY-MM-DD' },
    { size: '50%', inputType: 'datePatrolEnd', paramKey: 'endDate', label: '가입일', placeholder: 'YYYY-MM-DD', notInRow: true },
    {
      size: '50%', inputType: 'select', paramKey: 'region', label: '국적', placeholder: '상태 선택',
      selectOptions: [
        { label: '전체', value: 'all' },
        ...Object.entries(countryCodes)
          .map(([code, name]) => ({
            label: name,
            value: code,
          }))
          .sort((a, b) => a.label.localeCompare(b.label))
      ],
      defaultValue: '',
    },
    {
      size: '100%', inputType: 'select', paramKey: 'userType', label: '회원유형', placeholder: '플랫폼 선택', selectOptions: [
        { label: '전체', value: 'all' },
        { label: '일반회원', value: 'GENERAL' },
        { label: '불량회원', value: 'RESTRICTED' },
        { label: '탈퇴회원', value: 'WITHDRAWN' },
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

  const callListBySearch = useCallback(async (currentPage: number) => {
    showLoading();
    try {
      const queryParams = new URLSearchParams(window.location.search);
      queryParams.set('page', currentPage.toString());
      queryParams.set('limit', ITEMS_PER_PAGE.toString());

      const [userResult, dashboardResult] = await Promise.all([
        getUserList(queryParams.toString()),
        getDashboardData(),
      ]);

      setDashboard(dashboardResult);

      const tableStructureData: AdmListTableCellProps[] = [
        { id: '', value: '닉네임', size: '200px', cellKey: 'name' },
        { id: '', value: '이메일', size: '100%', cellKey: 'email' },
        { id: '', value: '가입일', size: '170px', cellKey: 'currentStatus' },
        { id: '', value: '국적', size: '180px', cellKey: 'region', align: 'left' },
        { id: '', value: '탈퇴', size: '80px', cellKey: 'isWithdraw' },
        { id: '', value: '불량', size: '80px', cellKey: 'status' },
        { id: '', value: '구독여부', size: '120px', cellKey: 'isSubscription' },
        { id: '', value: '관리자 메모', size: '120px', cellKey: 'memo' },
        { id: '', value: '관리', size: '140px', cellKey: 'ctrl' },
      ];

      const customData = userResult.data.map((item: UserListItem) => {
        let regionDisplayValue = '알수없음';
        if (item.region && typeof item.region === 'string') {
          const lowerCaseRegion = item.region.toLowerCase();
          if (countryCodes && typeof countryCodes === 'object' && Object.prototype.hasOwnProperty.call(countryCodes, lowerCaseRegion)) {
            regionDisplayValue = (countryCodes as Record<string, string>)[lowerCaseRegion];
          } else {
            regionDisplayValue = item.region;
          }
        }

        let userStatus = '-';
        if (item.restriction) {
          const { endDate, isRestricted } = item.restriction;
          const now = dayjs();
          const restrictionEnd = endDate ? dayjs(endDate) : null;
          const isRestrictionActive = restrictionEnd ? restrictionEnd.isAfter(now) : false;

          userStatus = restrictionEnd === null
            ? (isRestricted ? '불량' : '-')
            : (isRestrictionActive ? '불량' : '-');
        }

        return {
          ...item,
          currentStatus: item.regDate ? dayjs(item.regDate).format('YYYY.MM.DD HH:mm') : '정보 없음',
          region: regionDisplayValue,
          type: item.type === 'A' ? '관리자' : item.type === 'J' ? '아티스트' : '일반회원',
          isSubscription: item.subscription
            ? item.subscription.status === 'ACTIVE'
              ? <span style={{ textDecorationLine: 'underline' }}>구독중</span>
              : item.subscription.status === 'EXPIRED'
                ? <span style={{ textDecorationLine: 'underline' }}>만료됨</span>
                : item.subscription.status === 'CANCELLED'
                  ? <span style={{ textDecorationLine: 'underline' }}>갱신취소</span>
                  : item.subscription.status === 'REFUNDED'
                    ? <span style={{ textDecorationLine: 'underline' }}>환불</span>
                    : '-'
            : '-',
          memo: (
            <div onClick={() => openAdminMemoPopup(item)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', width: '22px', height: '22px', margin: 'auto' }}>
              <svg width="21" height="20" viewBox="0 0 21 20" fill="none">
                <path d="M4.20215 18.25L15.8682 18.25C16.5091 18.25 17.1239 17.9952 17.5771 17.542C18.0304 17.0888 18.2852 16.4739 18.2852 15.833L18.2852 6.66699C18.2852 6.46816 18.206 6.27736 18.0654 6.13672L13.8984 1.96973C13.7578 1.82918 13.567 1.75 13.3682 1.75L4.20215 1.75C3.56121 1.75 2.94638 2.00479 2.49316 2.45801C2.03995 2.91122 1.78516 3.52605 1.78516 4.16699L1.78516 15.833C1.78516 16.4739 2.03995 17.0888 2.49316 17.542C2.94638 17.9952 3.56121 18.25 4.20215 18.25ZM4.20215 16.75C3.95903 16.75 3.72562 16.6534 3.55371 16.4814C3.3818 16.3095 3.28516 16.0761 3.28516 15.833L3.28516 4.16699C3.28516 3.92388 3.3818 3.69046 3.55371 3.51855C3.72562 3.34665 3.95903 3.25 4.20215 3.25L13.0576 3.25L16.7852 6.97754L16.7852 15.833C16.7852 16.0761 16.6885 16.3095 16.5166 16.4814C16.3447 16.6534 16.1113 16.75 15.8682 16.75L4.20215 16.75Z" fill="#D1D5DB" />
                <path d="M14.2021 8.25L17.5352 8.25C17.9494 8.25 18.2852 7.91421 18.2852 7.5C18.2852 7.08579 17.9494 6.75 17.5352 6.75L14.2021 6.75C13.959 6.75 13.7256 6.65335 13.5537 6.48145C13.3818 6.30954 13.2852 6.07612 13.2852 5.83301L13.2852 2.5C13.2852 2.08579 12.9494 1.75 12.5352 1.75C12.1209 1.75 11.7852 2.08579 11.7852 2.5L11.7852 5.83301C11.7852 6.47395 12.04 7.08878 12.4932 7.54199C12.9464 7.9952 13.5612 8.25 14.2021 8.25Z" fill="#D1D5DB" />
              </svg>
            </div>
          ),
          isWithdraw: item.withdraw === 'Y' ? '탈퇴' : '-',
          status: userStatus,
        };
      });

      setTableStructure(tableStructureData);
      const tableData = listDataToTableList(customData, tableStructureData);
      setBdList(tableData);
      setTotalItems(userResult.meta.total);
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

  const editItem = (id: string) => {
    window.open(`${URL_VIEW}${id}`, '_blank');
  };

  const handleCancelClick = (id: string) => {
    showPopup({
      title: <p>사용자 탈퇴를 진행할까요?</p>,
      desc: <p>탈퇴 시 모든 개인정보 및 이용내역이 삭제되며<br />이후 복구할 수 없으며, 구독 중인 서비스가 있는지<br />확인 후 탈퇴처리해주세요.<br />정말 탈퇴처리하시겠습니까?</p>,
      onConfirm: async () => {
        showLoading();
        try {
          await withdrawUserApi(id);
          alert('탈퇴처리 됐습니다.');
          callListBySearch(page);
        } catch (error) {
          alert('처리 중 문제가 발생하였습니다.\n반복될 경우, 관리자에게 문의하여 주세요.');
        } finally {
          hideLoading();
        }
      },
    });
  };

  const openAdminMemoPopup = (user: UserListItem) => {

    setSelectedUser(user);
    setAdminMemo(user.restriction?.memo || '');
    setIsMemoPopupOpen(true);
  };

  const closeAdminMemoPopup = () => {
    setSelectedUser(null);
    setAdminMemo('');
    setIsMemoPopupOpen(false);
  };

  const handleSaveAdminMemo = async () => {
    try {
      if (selectedUser) {
        const payload = {
          memo: adminMemo,
          // isLoginBlocked: selectedUser.restriction ? selectedUser.restriction.isLoginBlocked : false,
          // isRestricted: selectedUser.restriction ? selectedUser.restriction.isRestricted : false,
          // isServiceBlocked: selectedUser.restriction ? selectedUser.restriction.isServiceBlocked : false,
          // endDate: selectedUser.restriction ? selectedUser.restriction.endDate : null,
        }
        await patchAdminUserMemo(selectedUser.id.toString(), payload).then(() => {
          closeAdminMemoPopup();
          callListBySearch(page);
        })
      }
    } catch (error) {
      alert('처리 중 문제가 발생하였습니다.\n반복될 경우, 관리자에게 문의하여 주세요.');
    } finally {
      hideLoading();
    }
  };


  return (
    <>
      <AdmWrapper>
        <AdmPageTop title={`회원 관리`} />
        <AdmListTop>
          <AdmListTopItem>
            <AdmListTopItemLabel>
              <AdmListTopSemibold>회원 현황</AdmListTopSemibold>
              <AdmQuestionHoverIcon style={{ marginLeft: '4px' }}><p style={{ whiteSpace: 'nowrap', fontSize: '12px' }}>오늘 기준 신규, 구독 회원 수 입니다.</p></AdmQuestionHoverIcon>
            </AdmListTopItemLabel>
            <AdmListTopItemValue>
              <AdmListTopItemValueBox>
                <AdmListTopSemibold>총 회원</AdmListTopSemibold>
                <AdmListTopPurple>{dashboard.totalUser}</AdmListTopPurple>
                <AdmListTopSemibold>명</AdmListTopSemibold>
              </AdmListTopItemValueBox>
              <AdmListTopItemValueBox>
                <AdmListTopSemibold>신규회원</AdmListTopSemibold>
                <AdmListTopPurple>{dashboard.todayUser}</AdmListTopPurple>
                <AdmListTopSemibold>명</AdmListTopSemibold>
              </AdmListTopItemValueBox>
              <AdmListTopItemLine />
              <AdmListTopItemValueBox>
                <AdmListTopSemibold>총 구독회원</AdmListTopSemibold>
                <AdmListTopPurple>{dashboard.totalSubscription}</AdmListTopPurple>
                <AdmListTopSemibold>명</AdmListTopSemibold>
              </AdmListTopItemValueBox>
              <AdmListTopItemValueBox>
                <AdmListTopSemibold>신규구독회원</AdmListTopSemibold>
                <AdmListTopPurple>{dashboard.todaySubscription}</AdmListTopPurple>
                <AdmListTopSemibold>명</AdmListTopSemibold>
              </AdmListTopItemValueBox>
            </AdmListTopItemValue>
          </AdmListTopItem>
        </AdmListTop>
        <AdmListSrchBar
          title={'회원정보 조회'}
          srchTypes={srchTypes}
          initialSearchValues={getInitialSearchValues()}
        />
        <AdmListBox>
          <>
            <AdmListTableTop
              LeftComponents={<AdmListTableTopTitle title={'회원 목록'} />}
              RightComponent={
                <>
                  <AdmListTableTopGoToWriteUserButton buttonText={'회원등록'} onClick={() => router.push('/admin/user/info/view')} />
                  <AdmButtonExcel text={'엑셀 다운로드'} url={'/api/admin/user/export/excel'} filename={`회원 목록-${dayjs().format("YYYY-MM-DD HH_mm_ss")}.xlsx`} />
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
                          withdrawItem={handleCancelClick}
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
        isMemoPopupOpen && selectedUser &&
        <AdminMemoPopup
          onClose={closeAdminMemoPopup}
          userName={selectedUser.name || ''}
          adminMemo={adminMemo}
          setAdminMemo={setAdminMemo}
          postAdminMemo={handleSaveAdminMemo}
        />
      }
    </>
  );
};

export default AdminUserInfoPage;