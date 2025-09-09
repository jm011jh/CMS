'use client';

import AdmListBox from '@/app/admin/components/design/AdmListBox';
import AdmListSrchBar, { T_AdmListSrchParam } from '@/app/admin/components/design/AdmListSrchBar'; // Corrected path if needed
import AdmListTable from '@/app/admin/components/design/AdmListTable';
import AdmListTableBodyRow from '@/app/admin/components/design/AdmListTableBodyRow';
import AdmListTableHeadRow, { AdmListTableCellProps } from '@/app/admin/components/design/AdmListTableHeadRow';
import AdmListTableTop, { AdmListTableTopTitle } from '@/app/admin/components/design/AdmListTableTop';
import AdmPageTop from '@/app/admin/components/design/AdmPageTop';
import AdmWrapper from '@/app/admin/components/design/AdmWrapper';
import Pagination from '@/app/admin/components/paging/Pagination';
import listDataToTableList from '@/app/admin/lib/listDataToTableList';
import { callAPI, HTTPMETHOD } from '@/lib/util/callApi';
import { getAccessToken } from '@/lib/util/tokenClass';
import dayjs from 'dayjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react'; // Added useCallback
import { basicThemeColors } from '../../assets/theme';

const API_URL_DELETE = '/api/admin/notice/'; // Define the API URL for deletion
const API_URL_LIST = '/api/admin/cs/inquiry'; // Define the API URL for listing
const URL_VIEW = '/admin/customer_service/inquiries/view?id='; // Define the API URL for editing
const ITEMS_PER_PAGE = 10; // Define the number of items per page

const AdminInquiriesPage: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams(); // Next.js hook for URL search parameters
    const [tableStructure, setTableStructure] = useState<AdmListTableCellProps[]>([]);
    const [bdList, setBdList] = useState<AdmListTableCellProps[][]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [page, setPage] = useState(1);
    const viewItem = (id: string) => {
        router.push(`${URL_VIEW}${id}`);
    };

    // Define search types for AdmListSrchBar
    const srchTypes: T_AdmListSrchParam[] = [
        { size: '100%', inputType: 'search', paramKey: 'search', label: '검색어', placeholder: '제목 또는 내용으로 검색' },
        { size: '50%', inputType: 'datePatrolStart', paramKey: 'startDate', label: '작성일', placeholder: 'YYYY-MM-DD' },
        { size: '50%', inputType: 'datePatrolEnd', paramKey: 'endDate', label: '작성일', placeholder: 'YYYY-MM-DD', notInRow: true },
        {
            size: '50%', inputType: 'select', paramKey: 'category', label: '유형', placeholder: '전체', selectOptions: [
                { label: '전체', value: 'all' },
                { label: '이용/불편문의', value: '이용/불편문의' },
                { label: '결제문의', value: '결제문의' },
                { label: '콘텐츠문의', value: '콘텐츠문의' },
                { label: '채팅문의', value: '채팅문의' },
                { label: 'LIVE 문의', value: 'LIVE 문의' },
                { label: '기타 문의', value: '기타 문의' },
                { label: '서포트 및 이벤트 문의', value: '서포트 및 이벤트 문의' }
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
                { id: '', value: '답변', size: '105px', cellKey: 'reply' },
                { id: '', value: '유형', size: '200px', cellKey: 'category' },
                { id: '', value: '이메일', size: '400px', cellKey: 'email', align: 'left' },
                { id: '', value: '제목', size: '100%', cellKey: 'title', align: 'left' },
                { id: '', value: '작성일', size: '200px', cellKey: 'regDate' },
                { id: '', value: '관리', size: '140px', cellKey: 'ctrl' },
            ];
            const data: any[] = [];
            for (let i = 0; i < result.data.data.length; i++) {
                const item = result.data.data[i];
                data.push({
                    ...item,
                    regDate: dayjs(item.regDate).format('YYYY.MM.DD HH:mm'),
                    reply: item.reply ? '답변완료' : '답변대기',
                    cellStyle: [
                        {
                            index: 0, // 적용시킬 셀의 인덱스...1번 셀에 적용하기 위해 0 삽입(답변 셀은 가장 첫번째 셀)
                            style: { backgroundColor: item.reply ? '' : 'rgba(255,85,85,0.19)' } // 적용시킬 스타일
                        },
                    ]
                });
            }
            setTableStructure(tableStructureData);
            const tableData = listDataToTableList(data, tableStructureData)
            setBdList(tableData)
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

    return (
        <AdmWrapper>
            <AdmPageTop title={`문의사항 관리`} right={<div style={{ color: basicThemeColors.gray500, fontSize: '12px', fontWeight: 700, cursor: 'pointer', width: '92px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `solid 1px ${basicThemeColors.gray500}`, borderRadius: '4px' }} onClick={() => router.push('/screen')}>이용안내 접속</div>} />
            <AdmListSrchBar
                srchTypes={srchTypes}
                initialSearchValues={getInitialSearchValues()}
            />
            <AdmListBox>
                <>
                    <AdmListTableTop
                        LeftComponents={<AdmListTableTopTitle title={'문의사항 목록'} />}
                        RightComponent={
                            <>
                                {/* <AdmListTableTopGoToCategoryButton buttonText='문의사항 카테고리 관리' onClick={() => alert('카테고리 관리 준비중')} /> */}
                                {/* <AdmListTableTopGoToWriteButton onClick={() => router.push(`${URL_LIST}/view`)} /> */}
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
                                                viewItem={viewItem}
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

export default AdminInquiriesPage;
