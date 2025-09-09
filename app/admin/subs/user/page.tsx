'use client';
import AdmListBox from '@/app/admin/components/design/AdmListBox';
import AdmListSrchBar, { T_AdmListSrchParam } from '@/app/admin/components/design/AdmListSrchBar';
import AdmListTable from '@/app/admin/components/design/AdmListTable';
import AdmListTableBodyRow from '@/app/admin/components/design/AdmListTableBodyRow';
import AdmListTableHeadRow, { AdmListTableCellProps } from '@/app/admin/components/design/AdmListTableHeadRow';
import AdmListTableTop, { AdmListTableTopTitle } from '@/app/admin/components/design/AdmListTableTop';
import { AdmListTop, AdmListTopItem, AdmListTopItemLabel, AdmListTopItemLine, AdmListTopItemValue, AdmListTopItemValueBox, AdmListTopPurple, AdmListTopSemibold } from '@/app/admin/components/design/AdmListTop';
import AdmPageTop from '@/app/admin/components/design/AdmPageTop';
import AdmQuestionHoverIcon from '@/app/admin/components/design/AdmQuestionHoverIcon';
import AdmWrapper from '@/app/admin/components/design/AdmWrapper';
import Pagination from '@/app/admin/components/paging/Pagination';
import listDataToTableList from '@/app/admin/lib/listDataToTableList';
import { callAPI, HTTPMETHOD } from '@/lib/util/callApi';
import { getAccessToken } from '@/lib/util/tokenClass';
import dayjs from 'dayjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, useCallback, useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { basicThemeColors } from '../../assets/theme';
import AdmSubsUserPopup from './AdmSubsUserPopup';

const API_URL_DELETE = '/api/admin/schedule/'; // Define the API URL for deletion
const API_URL_LIST = '/api/admin/subscription'; // Define the API URL for listing
const API_URL_GETLIST = '/admin/subs/user'; // Define the API URL for getting the list
const URL_LIST = '/admin/subs/user'; // Define the URL for listing in the admin board
const URL_VIEW = '/admin/subs/user/view?id='; // Define the API URL for editing
const ITEMS_PER_PAGE = 10; // Define the number of items per page

const subscriptionDatas = [
    {
        type: 'monthly',
        title: 'JISOO Chat 구독권',
        originalPrice: 4500,
        price: 3500,
        descList: ['지수와 채팅'],
        skus: ['jisoo.sub.month'],
        billingPeriod: 'P1M',
    },
];

const AdminBoardSchedulePage: FC = () => {
    const styles = {
        bodyBoxHeadAppleButton: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '4px 8px',
            backgroundColor: '#000',
            color: '#fff',
            borderRadius: '4px',
            border: `1px solid ${basicThemeColors.black}`,
            cursor: 'pointer',
            fontWeight: '600',
        },
        bodyBoxHeadGoogleButton: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '4px 8px',
            backgroundColor: '#fff',
            color: basicThemeColors.gray500,
            border: `1px solid ${basicThemeColors.gray500}`,
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: '600',
        },
    }
    const router = useRouter();
    const searchParams = useSearchParams(); // Next.js hook for URL search parameters
    const [tableStructure, setTableStructure] = useState<AdmListTableCellProps[]>([]);
    const [bdList, setBdList] = useState<AdmListTableCellProps[][]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [page, setPage] = useState(1);

    // only for subscription dashboard
    const [dashboard, setDashboard] = useState<any>({
        todaySubscription: '',
        todayUser: '',
        totalSubscription: '',
        totalUser: '',
    });
    const callDashboard = async () => {
        try {

            const token = getAccessToken();
            if (token === '') {
                alert('로그인 해주세요.');
                return;
            }

            const url = `${API_URL_LIST}/dashboard`;
            const result: any = await callAPI(HTTPMETHOD.GET, {}, url, token);

            setDashboard({
                todaySubscription: result.data.todaySubscription,
                todayUser: result.data.todayUser,
                totalSubscription: result.data.totalSubscription,
                totalUser: result.data.totalUser,
            })

        } catch (e) {
            if (e === null) return;
            alert(
                '처리 중 문제가 발생하였습니다.\n반복될 경우, 관리자에게 문의하여 주세요.',
            );
        }
    }

    // #region detailPopup ==============================
    const ApiGetDetailPopupData = async (id: string) => {
        console.log(id)
        try {
            const token = getAccessToken();
            if (token === '') {
                alert('로그인 해주세요.');
                return;
            }
            const url = `/api/admin/subscription/detail/${id}`;
            const result: any = await callAPI(HTTPMETHOD.GET, {}, url, token);
            setDetailPopupData(result.data);
            setDetailPopupStatus('success');
        } catch (e: any) {
            if (e === null) return;
            if (e.response.data.code === 1408) {
                setDetailPopupStatus('nodata');
                return;
            }
            setDetailPopupStatus('error');
        }
    }
    const [isDetailPopupOpen, setIsDetailPopupOpen] = useState(false); // State to control the detail popup visibility
    const [dettailPopupStatus, setDetailPopupStatus] = useState<'loading' | 'success' | 'error' | 'closed' | 'nodata' | ''>('closed'); // State to control the detail popup status
    const [detailPopupData, setDetailPopupData] = useState<any>(null); // State to hold the detail popup data
    const detailPopupClose = () => {
        setIsDetailPopupOpen(false);
        setDetailPopupStatus('closed');
    };
    const detailPopupOpen = (id: string) => {
        if (dettailPopupStatus === 'loading') return;
        if (!id) return;
        ApiGetDetailPopupData(id)
        setIsDetailPopupOpen(true);
        setDetailPopupStatus('loading');
    }
    // #endregion detailPopup ==============================

    // Define search types for AdmListSrchBar
    const srchTypes: T_AdmListSrchParam[] = [
        { size: '100%', inputType: 'search', paramKey: 'search', label: '검색어', placeholder: '제목 또는 내용으로 검색' },
        { size: '50%', inputType: 'datePatrolStart', paramKey: 'startDate', label: '공개예정일', placeholder: 'YYYY-MM-DD' },
        { size: '50%', inputType: 'datePatrolEnd', paramKey: 'endDate', label: '공개예정일', placeholder: 'YYYY-MM-DD', notInRow: true },
        {
            size: '50%', inputType: 'select', paramKey: 'status', label: '상태', placeholder: '상태 선택', selectOptions: [
                { label: '전체', value: 'all' },
                { label: '구독중', value: 'ACTIVE' },
                { label: '만료됨', value: 'EXPIRED' },
                { label: '갱신취소', value: 'CANCELLED' },
                { label: '환불', value: 'REFUNDED' },
            ],
            defaultValue: ''
        },
        {
            size: '100%', inputType: 'select', paramKey: 'storeType', label: '플랫폼', placeholder: '플랫폼 선택', selectOptions: [
                { label: '전체', value: 'all' },
                { label: '애플 스토어', value: 'APP_STORE' },
                { label: '구글 스토어', value: 'PLAY_STORE' },
            ],
            defaultValue: ''
        },
        // {
        //     size: '50%', inputType: 'select', paramKey: 'planType', label: '구독상품', placeholder: '카테고리 선택', selectOptions: [
        //         { label: '전체', value: 'all' },
        //         { label: '월간 플랜', value: 'MONTHLY' },
        //         { label: '연간 플랜', value: 'YEARLY' },
        //     ],
        //     defaultValue: ''
        // },
    ];

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

    // #region 검색 후에 다시 url받아서 검색조건 인풋값들 유지하기 ==============================
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
    // #endregion 검색 후에 다시 url받아서 검색조건 인풋값들 유지하기 ===========================

    const callListBySearch = async () => {
        const token = getAccessToken();
        if (token === '') {
            alert('로그인 해주세요.');
            return;
        }
        callDashboard()
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
                { id: '', value: '닉네임', size: '150px', cellKey: 'name', lineClamp: 2 },
                { id: '', value: '아이디', size: '100%', cellKey: 'email' },
                { id: '', value: '상태', size: '93px', cellKey: 'currentStatus' },
                { id: '', value: '누적구독횟수', size: '100px', cellKey: 'subscriptionDurationMonths' },
                { id: '', value: '플랫폼', size: '85px', cellKey: 'storeType' },
                { id: '', value: '구독 상품명', size: '220px', cellKey: 'productName', lineClamp: 2 },

                { id: '', value: '구독 시작일', size: '180px', cellKey: 'subscriptionStart' },
                { id: '', value: '최근 결제일', size: '180px', cellKey: 'subscriptionLatest' },
                { id: '', value: '만료일', size: '180px', cellKey: 'subscriptionEnd' },
                { id: '', value: '다음결제일(자동갱신시)', size: '180px', cellKey: 'subscriptionNext' },
                { id: '', value: '관리', size: '100px', cellKey: 'ctrl' },
            ];
            const data: any[] = [];
            result.data.data.map((item: any) => {
                item &&
                    data.push({
                        ...item,
                        id: item.user.id ? item.user.id : '',
                        name: item.user.name ? item.user.name : '',
                        email: item.user.email ? item.user.email : '',
                        subscriptionDurationMonths: item.subscriptionDurationMonths ? item.subscriptionDurationMonths + '개월' : '-',
                        productName: item.plan.name ? item.plan.name : '-',
                        currentStatus:
                            item.status === 'ACTIVE'
                                ? '구독중'
                                : item.status === 'EXPIRED'
                                    ? '만료됨'
                                    : item.status === 'CANCELLED'
                                        ? '갱신취소'
                                        : item.status === 'REFUNDED'
                                            ? '환불'
                                            : '알수없음',
                        storeType: item.storeType === "PLAY_STORE" ? 'Google' : 'Apple',

                        // subscriptionStart: item.subscriptionPeriods[0].startDate ? dayjs(item.subscriptionPeriods[0].startDate).format('YYYY.MM.DD HH:mm') : '-',
                        // subscriptionEnd: item.subscriptionPeriods[item.subscriptionPeriods.length - 1].endDate ? dayjs(item.subscriptionPeriods[item.subscriptionPeriods.length - 1].endDate).format('YYYY.MM.DD HH:mm') : '-',
                        // subscriptionLatest: item.lastSubscriptionDate ? dayjs(item.lastSubscriptionDate).format('YYYY.MM.DD HH:mm') : '',
                        // subscriptionNext: item.subscriptionPeriods[item.subscriptionPeriods.length - 1].nextPaymentDate ? dayjs(item.subscriptionPeriods[item.subscriptionPeriods.length - 1].nextPaymentDate).format('YYYY.MM.DD HH:mm') : '-',
                        subscriptionStart: item.startDate ? dayjs(item.startDate).format('YYYY.MM.DD HH:mm') : '-',
                        subscriptionEnd: item.endDate ? dayjs(item.endDate).format('YYYY.MM.DD HH:mm') : '-',
                        subscriptionLatest: item.purchaseDate ? dayjs(item.purchaseDate).format('YYYY.MM.DD HH:mm') : '',
                        subscriptionNext: item.nextPaymentDate ? dayjs(item.nextPaymentDate).format('YYYY.MM.DD HH:mm') : '-',
                    });
            });
            setTableStructure(tableStructureData);
            const tableData = listDataToTableList(data, tableStructureData);
            setBdList(tableData);
            setTotalItems(result.data.meta.total);
        } catch (e: any) {
            console.log(e)
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


    return (
        <>
            <AdmWrapper>
                <AdmPageTop title={`구독자 관리`} />
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
                    title={'구독자 조회'}
                    srchTypes={srchTypes}
                    initialSearchValues={getInitialSearchValues()}
                />
                <AdmListBox>
                    <>

                        <AdmListTableTop
                            LeftComponents={<AdmListTableTopTitle title={'구독자 목록'} />}
                            RightComponent={
                                <>
                                    <button style={styles.bodyBoxHeadGoogleButton} onClick={() => window.open('https://play.google.com/console/u/0/developers', '_blank')}>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <rect width="16" height="16" fill="white" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M14.7194 8.1602C14.7194 7.66388 14.6748 7.18665 14.5921 6.72852H8V9.43599H11.7669C11.6047 10.3109 11.1115 11.0522 10.3702 11.5485V13.3047H12.6323C13.9558 12.0862 14.7194 10.2918 14.7194 8.1602Z" fill="#4285F4" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M7.99901 14.9976C9.88884 14.9976 11.4732 14.3708 12.6313 13.3018L10.3692 11.5456C9.74249 11.9656 8.94074 12.2138 7.99901 12.2138C6.176 12.2138 4.63296 10.9825 4.08256 9.32812H1.74414V11.1416C2.89585 13.4291 5.2629 14.9976 7.99901 14.9976Z" fill="#34A853" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M4.08485 9.32967C3.94486 8.9097 3.86532 8.46111 3.86532 7.99979C3.86532 7.53847 3.94486 7.08987 4.08485 6.66991V4.85645H1.74643C1.27238 5.80136 1.00195 6.87035 1.00195 7.99979C1.00195 9.12923 1.27238 10.1982 1.74643 11.1431L4.08485 9.32967Z" fill="#FBBC05" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M7.99901 3.78481C9.02665 3.78481 9.94929 4.13796 10.6747 4.83153L12.6822 2.82399C11.4701 1.69455 9.88566 1.00098 7.99901 1.00098C5.2629 1.00098 2.89585 2.56947 1.74414 4.85698L4.08256 6.67045C4.63296 5.01606 6.176 3.78481 7.99901 3.78481Z" fill="#EA4335" />
                                        </svg>
                                        <p>Google 구독 관리</p>
                                    </button>
                                    <button style={styles.bodyBoxHeadAppleButton} onClick={() => window.open('https://appstoreconnect.apple.com/apps', '_blank')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M13.7485 11.9103C13.5331 12.3994 13.278 12.8496 12.9826 13.2635C12.5798 13.8278 12.25 14.2185 11.9959 14.4354C11.6019 14.7914 11.1798 14.9737 10.7278 14.9841C10.4033 14.9841 10.012 14.8934 9.5565 14.7093C9.09949 14.5261 8.6795 14.4354 8.29547 14.4354C7.89272 14.4354 7.46077 14.5261 6.99874 14.7093C6.53601 14.8934 6.16324 14.9893 5.87824 14.9988C5.44479 15.0169 5.01275 14.8294 4.5815 14.4354C4.30626 14.1994 3.96198 13.795 3.54955 13.2221C3.10705 12.6102 2.74325 11.9007 2.45824 11.0919C2.15301 10.2182 2 9.37218 2 8.55312C2 7.61489 2.2063 6.80568 2.61952 6.12756C2.94428 5.58288 3.37632 5.15321 3.91705 4.83779C4.45778 4.52236 5.04203 4.36163 5.67123 4.35134C6.01551 4.35134 6.46698 4.456 7.02802 4.66167C7.58748 4.86803 7.94671 4.97268 8.10421 4.97268C8.22196 4.97268 8.62102 4.85032 9.29752 4.60636C9.93727 4.38012 10.4772 4.28645 10.9195 4.32335C12.1181 4.4184 13.0186 4.88272 13.6175 5.71924C12.5455 6.35752 12.0152 7.2515 12.0258 8.39834C12.0355 9.29164 12.3652 10.035 13.0133 10.6252C13.3071 10.8992 13.6351 11.1109 14 11.2613C13.9209 11.4868 13.8373 11.7028 13.7485 11.9103ZM10.9996 1.28008C10.9996 1.98024 10.7393 2.63398 10.2204 3.23907C9.59431 3.95841 8.83699 4.37407 8.01574 4.30848C8.00528 4.22448 7.99921 4.13608 7.99921 4.04318C7.99921 3.37103 8.29697 2.65169 8.82574 2.06354C9.08973 1.76574 9.42547 1.51813 9.83263 1.32061C10.2389 1.12603 10.6232 1.01843 10.9846 1C10.9952 1.0936 10.9996 1.18721 10.9996 1.28007V1.28008Z" fill="white" />
                                        </svg>
                                        <p>Apple 구독 관리</p>
                                    </button>
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
                                                    viewItem={detailPopupOpen}
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
                isDetailPopupOpen &&
                <AdmSubsUserPopup data={detailPopupData} status={dettailPopupStatus} close={detailPopupClose} statusChange={setDetailPopupStatus} />
            }
        </>
    );
};

export default AdminBoardSchedulePage;
