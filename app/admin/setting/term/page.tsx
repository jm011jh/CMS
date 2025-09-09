'use client';

import { callAPI, HTTPMETHOD } from '@/lib/util/callApi';
import { getAccessToken } from '@/lib/util/tokenClass';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import AdminBox from '../../components/card/AdminBox';
import AdmListTable from '../../components/design/AdmListTable';
import AdmListTableHeadRow, { AdmListTableCellProps } from '../../components/design/AdmListTableHeadRow';
import AdmListTableTop, { AdmListTableTopTitle } from '../../components/design/AdmListTableTop';
import AdmPageTop from '../../components/design/AdmPageTop';
import AdmWrapper from '../../components/design/AdmWrapper';
import listDataToTableList from '../../lib/listDataToTableList';
import CustomListTableBodyRow from './component/CustomListTableBodyRow';
import CustomPageExplnationBlue from './component/CustomPageExplnationBlue';
import { TermType } from './component/termType';

export default function AdminSettingTermPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [checkAll, setCheckAll] = useState(false);
    const [checkList, setCheckList] = useState([] as any);

    const [bdList1, setBdList1] = useState<any[]>([]);
    const [bdList2, setBdList2] = useState<any[]>([]);

    const [tableStructure1, setTableStructure1] = useState<AdmListTableCellProps[]>(
        [
            { id: '', value: '항목명', size: '300px', cellKey: 'type' },
            { id: '', value: '필수선택여부', size: '115px', cellKey: 'required' },
            { id: '', value: '국문', size: '100%', cellKey: 'content' },
            { id: '', value: '영문', size: '100%', cellKey: 'contentUs' },
            { id: '', value: '중국(간체)', size: '100%', cellKey: 'contentCn' },
            { id: '', value: '중국(번체)', size: '100%', cellKey: 'contentTw' },
        ],
    );

    const [tableStructure2, setTableStructure2] = useState<AdmListTableCellProps[]>(
        [
            { id: '', value: '항목명', size: '300px', cellKey: 'type' },
            { id: '', value: '국문', size: '100%', cellKey: 'content' },
            { id: '', value: '영문', size: '100%', cellKey: 'contentUs' },
            { id: '', value: '중국(간체)', size: '100%', cellKey: 'contentCn' },
            { id: '', value: '중국(번체)', size: '100%', cellKey: 'contentTw' },
        ],
    );

    // const delItem = async (item: any) => {
    //     if (!confirm('삭제 하시겠습니까?')) {
    //         return;
    //     }

    //     const token = getAccessToken();
    //     if (token === '') {
    //         alert('로그인 해주세요.');
    //         return;
    //     }

    //     try {
    //         const result = await callAPI(
    //             HTTPMETHOD.DELETE,
    //             {},
    //             `/api/admin/terms/${item.id}`,
    //             token,
    //         );

    //         alert('삭제되었습니다.');

    //         callListBySearch();
    //     } catch (e: any) {
    //         alert(
    //             '처리 중 문제가 발생하였습니다.\n반복될 경우, 관리자에게 문의하여 주세요.',
    //         );
    //     }
    // };

    const callListBySearch = async () => {
        const token = getAccessToken();
        if (token === '') {
            alert('로그인 해주세요.');
            return;
        }

        //query에서 list에서 필요한 값 가져옴
        const newUrl = new URL(window.location.href);
        const l_page = parseInt(newUrl.searchParams.get('page') ?? '1');
        // setPage(l_page);
        const l_srch = newUrl.searchParams.get('srch') ?? '';
        // setSrchTxt(l_srch);

        const query_page = l_page;
        const query_search = l_srch ? '&email=' + l_srch : '';

        const query = `?order=DESC&page=${query_page}${query_search}`;
        const url = `/api/admin/terms${query}`;

        try {
            const result: any = await callAPI(HTTPMETHOD.GET, {}, url, token);

            let make = result.data.map((item: any) => {
                return {
                    ...item,
                    type: TermType[item.type as keyof typeof TermType] || item.type, // Convert enum value to label
                    required: item.type != 'MARKETING_CONSENT' ? '필수' : '선택',
                };
            });

            let termsList01 = make.filter(
                (item: any) => item.type !== TermType.OPEN_SOURCE_LICENSE && item.type !== TermType.REFUND_POLICY && item.type !== TermType.PAID_SERVICE_TERMS
            );
            let termsList02 = make.filter(
                (item: any) => item.type === TermType.OPEN_SOURCE_LICENSE || item.type === TermType.PAID_SERVICE_TERMS || item.type === TermType.REFUND_POLICY,
            );

            const desiredOrder = [
                TermType.SERVICE_TERMS,
                TermType.PRIVACY_POLICY,
                TermType.SERVICE_OPERATION_POLICY,
                TermType.YOUTH_PROTECTION_POLICY,
                TermType.MARKETING_CONSENT,
                TermType.OPEN_SOURCE_LICENSE,
                TermType.PAID_SERVICE_TERMS,
            ];

            termsList01.sort((a: any, b: any) => {
                const idxA = desiredOrder.indexOf(a.type);
                const idxB = desiredOrder.indexOf(b.type);
                if (idxA === -1 && idxB === -1) return 0;
                if (idxA === -1) return 1;
                if (idxB === -1) return -1;
                return idxA - idxB;
            });

            termsList02.sort((a: any, b: any) => {
                const idxA = desiredOrder.indexOf(a.type);
                const idxB = desiredOrder.indexOf(b.type);
                if (idxA === -1 && idxB === -1) return 0;
                if (idxA === -1) return 1;
                if (idxB === -1) return -1;
                return idxA - idxB;
            });

            let tableData01 = listDataToTableList(termsList01, tableStructure1);
            let tableData02 = listDataToTableList(termsList02, tableStructure2);

            setBdList1(tableData01);
            setBdList2(tableData02);
            // setBdList(result.data);
            // setTotalItems(result.data.meta.total);
        } catch (e: any) {
            console.log(e);
            alert(
                '처리 중 문제가 발생하였습니다.\n반복될 경우, 관리자에게 문의하여 주세요.',
            );
        }
    };
    const checkHandler = (id: string) => {
        if (checkList.indexOf(id) >= 0) {
            setCheckList(checkList.filter((item: any) => item != id));
        } else {
            setCheckList([...checkList, id]);
        }
    };
    // const checkAllHandler = (e: any) => {
    //     const newValue = e;
    //     if (newValue) {
    //         setCheckList(bdList.map((item: any) => item.id));
    //     } else {
    //         setCheckList([]);
    //     }

    //     setCheckAll(newValue);
    // };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            searchHandler();
        }
    };

    const [srchTxt, setSrchTxt] = useState<string>('');
    const searchHandler = () => {
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set('srch', srchTxt);
        newUrl.searchParams.set('page', '1');

        router.push(`/admin/setting/term${newUrl.search}`);
    };

    const editItem = (id: string, cellKey: string) => {
        router.push(`/admin/setting/term/view?id=${id}&cellKey=${cellKey}`);
    };

    useEffect(() => {
        const newUrl = new URL(window.location.href);
        const page = parseInt(newUrl.searchParams.get('page') ?? '1');

        // setPage(page);
        callListBySearch();

        //checklist 초기화
        setCheckAll(false);
        setCheckList([]);
    }, [searchParams]);

    return (
        <AdmWrapper>
            <AdmPageTop title={`서비스 약관 관리`} />
            <AdminBox>
                <>
                    <div className="adm--box-scrollWrap">
                        <div className="adm--box-scrollCont" style={{ width: '100%' }}>
                            <AdmListTableTop
                                LeftComponents={<AdmListTableTopTitle title={'회원가입 약관 목록'} />}
                                marginTop='0px'
                            // RightComponent={
                            //     <>
                            //         <AdmListTableTopGoToCategoryButton />
                            //         <AdmListTableTopGoToWriteButton onClick={() => router.push('/admin/board/notice/view')} />
                            //     </>
                            // }
                            />
                            <CustomPageExplnationBlue
                                titleBlack={'회원가입 약관 목록은 사용자 회원가입시 출력되는 항목입니다.'}
                            />
                            <AdmListTable>

                                <>
                                    <AdmListTableHeadRow structure={tableStructure1} />
                                    {bdList1.length > 0 &&
                                        bdList1.map((data: any, idx: number) => (
                                            <CustomListTableBodyRow
                                                key={idx}
                                                structure={data}
                                                editItem={editItem}
                                            />
                                        ))}
                                </>
                            </AdmListTable>

                            <AdmListTableTop
                                LeftComponents={<AdmListTableTopTitle title={'앱 운영정책'} />}
                            // RightComponent={
                            //     <>
                            //         <AdmListTableTopGoToCategoryButton />
                            //         <AdmListTableTopGoToWriteButton onClick={() => router.push('/admin/board/notice/view')} />
                            //     </>
                            // }
                            />
                            <CustomPageExplnationBlue
                                titleBlack={'서비스 중인 앱의 “ 설정 → 이용안내 → 운영정책 “ 에 추가될 항목입니다.'}
                            />
                            <AdmListTable>

                                <>
                                    <AdmListTableHeadRow structure={tableStructure2} />
                                    {bdList2.length > 0 &&
                                        bdList2.map((data: any, idx: number) => (
                                            <CustomListTableBodyRow
                                                key={idx}
                                                structure={data}
                                                editItem={editItem}
                                            />
                                        ))}
                                </>
                            </AdmListTable>

                            {/* <Pagination
                                totalItems={totalItems}
                                currentPage={page}
                                itemCountPerPage={ITEMS_PER_PAGE}
                            /> */}
                        </div>
                    </div>
                </>
            </AdminBox >
        </AdmWrapper >
    );
}
