'use client';
import AdmListBox from '@/app/admin/components/design/AdmListBox';
import AdmListTable from '@/app/admin/components/design/AdmListTable';
import AdmListTableBodyRow from '@/app/admin/components/design/AdmListTableBodyRow';
import AdmListTableHeadRow, { AdmListTableCellProps } from '@/app/admin/components/design/AdmListTableHeadRow';
import AdmListTableTop, { AdmListTableTopTitle } from '@/app/admin/components/design/AdmListTableTop';
import AdmPageTop from '@/app/admin/components/design/AdmPageTop';
import AdmWrapper from '@/app/admin/components/design/AdmWrapper';
import Pagination from '@/app/admin/components/paging/Pagination';
import listDataToTableList from '@/app/admin/lib/listDataToTableList';
import useLoadingScreenStore from '@/app/admin/store/loadingScreenStore';
import { callAPI, HTTPMETHOD } from '@/lib/util/callApi';
import { getAccessToken } from '@/lib/util/tokenClass';
import dayjs from 'dayjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import AdmButton from '../../components/design/AdmButton';
import { useConfirmPopupStore } from '../../store/confirmPopupStore';
import { useToastStore } from '../../store/useToastStore';

const API_URL_DELETE = '/api/admin/splash/'; // 사용자 삭제 API URL로 수정
const API_URL_LIST = '/api/admin/media'; // Define the API URL for listing
const API_URL_GETLIST = '/admin/image_setting/splash'; // Define the API URL for getting the list
const URL_LIST = '/admin/image_setting/splash'; // Define the URL for listing in the admin board
const URL_VIEW = '/admin/image_setting/splash/view?id='; // Define the API URL for editing
const ITEMS_PER_PAGE = 10; // Define the number of items per page


const AdminArtistInfoPage: FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams(); // Next.js hook for URL search parameters
    const [tableStructure, setTableStructure] = useState<AdmListTableCellProps[]>([]);
    const [bdList, setBdList] = useState<AdmListTableCellProps[][]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [page, setPage] = useState(1);
    const [orgData, setOrgData] = useState<any[]>([]);

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
                // { id: '', value: '', size: '48px', cellKey: 'checkbox' },
                { id: '', value: '변경일시', size: '180px', cellKey: 'regDate' },
                { id: '', value: '썸네일', size: '120px', cellKey: 'thumbnail' },
                { id: '', value: '설명', size: '100%', cellKey: 'title' },
                { id: '', value: '관리', size: '140px', cellKey: 'ctrl' },
            ];
            const data: any[] = [];
            if (result?.data?.data && Array.isArray(result.data.data)) {
                result.data.data.forEach((item: any) => {

                    data.push({
                        ...item,
                        regDate: dayjs(item.updatedAt).format('YYYY-MM-DD HH:mm'),
                        thumbnail: item.files?.[0]?.fileUrl ? (
                            <img
                                src={item.files[0].fileUrl}
                                alt="Thumbnail"
                                style={{ width: '100%', height: '42px', borderRadius: '8px', objectFit: 'contain' }}
                            />
                        ) : (
                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span>썸네일 없음</span>
                            </div>
                        ),
                    });
                })

                setTableStructure(tableStructureData);
                const tableData = listDataToTableList(data, tableStructureData);
                setBdList(tableData);
                setTotalItems(result.data.meta.total);

                setOrgData(result.data.data);
            }
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

    const handleEditClick = async (id: string) => {
        router.push(`${URL_VIEW}${id}`);
    };


    const { showPopup } = useConfirmPopupStore();
    const handleDeleteClick = (id: string) => {
        showPopup({
            title: '스플래쉬 이미지 삭제',
            desc: '정말로 스플래쉬 이미지를 삭제하시겠습니까?\n삭제된 스플래쉬 이미지는 복구할 수 없습니다.',
            onConfirm: () => {
                //스플래쉬 삭제
                handleDelete(id)
            },
            onCancel: () => {
                return false;
            }
        });
    };

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { showLoading, hideLoading } = useLoadingScreenStore();

    const handleDelete = async (id: string) => {

        if (isLoading) return; // 중복 제출 방지
        setIsLoading(true);
        showLoading();

        try {
            if (!id || id === '') {
                alert('삭제할 대상이 없습니다.');
                return;
            }
            const token = getAccessToken();
            if (token === '') {
                alert('로그인 해주세요.');
                return;
            }

            alert('준비중입니다. 잠시만 기다려 주세요.');

            // // API 호출
            // const res = await callAPI(HTTPMETHOD.DELETE, {}, `${API_URL_DELETE}${id}`, token);
            // if (res) {
            //     alert('삭제가 완료되었습니다.');
            //     callListBySearch();
            // }
            // return true;

        } catch (e: any) {
            if (e === null) return;
            alert(
                '처리 중 문제가 발생하였습니다.\n반복될 경우, 관리자에게 문의하여 주세요.',
            );
            return false;
        } finally {
            setIsLoading(false);
            hideLoading();
        }
    }

    const { addToast } = useToastStore();

    const handleAddClick = () => {
        router.push(`${URL_VIEW}`);
    };

    return (
        <>
            <AdmWrapper>
                <AdmPageTop title={`스플래쉬 이미지 관리`} />

                <AdmListBox>
                    <>

                        <AdmListTableTop
                            LeftComponents={<AdmListTableTopTitle title={'스플래쉬 이미지 목록'} />}
                            RightComponent={
                                <>
                                    <AdmButton size={'large'} color='primaryFill' onClick={handleAddClick} style={{ gap: '8px', fontWeight: '600' }}>+ 등록하기</AdmButton>
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
                                        // selected={selected}
                                        // setSelected={setSelected}
                                        />
                                        {bdList.length > 0 &&
                                            bdList.map((data: any, idx: number) => (
                                                <AdmListTableBodyRow
                                                    // selected={selected}
                                                    // setSelected={setSelected}
                                                    key={idx}
                                                    structure={data}
                                                    editItem={handleEditClick}
                                                    deleteItem={handleDeleteClick}
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
            {/* {
                showEditPopup && (
                    <AdmArtistEditPopup
                        status='success'
                        data={popupData}
                        close={() => setShowEditPopup(false)}
                        handleSave={handleSave}
                    />
                )
            }
            {
                showAddPopup && (
                    <AdmArtistAddPopup
                        status='success'
                        close={() => setShowAddPopup(false)}
                        handleSave={handleAdd}
                    />
                )
            } */}
        </>
    );
};

export default AdminArtistInfoPage;
