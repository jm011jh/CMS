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
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, useCallback, useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import CustomPageExplnationMultiLines from '../../setting/term/component/CustomPageExplnationMultiLines';
import { useConfirmPopupStore } from '../../store/confirmPopupStore';
import { useToastStore } from '../../store/useToastStore';
import { activateArtist, deleteArtist, fetchArtistList, saveArtistData } from './api';
import AdmArtistAddPopup from './component/AdmArtistAddPopup';
import AdmArtistEditPopup from './component/AdmArtistEditPopup';
import { ITEMS_PER_PAGE } from './constants';

interface UserListItem {
    id: string | number;
    name?: string | null;
    email?: string | null;
    type?: 'A' | 'J' | 'U' | string | null; // 예: 'A': 관리자, 'J': 아티스트, 'U': 일반사용자
    regDate?: string | null;
    userSubscriptionProduct?: string | null;
    adminNote?: string | null;
    postActivityCount?: number | null;
    commentActivityCount?: number | null;
    inquiryActivityCount?: number | null;
    [key: string]: any;
}

const AdminArtistInfoPage: FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams(); // Next.js hook for URL search parameters
    const [tableStructure, setTableStructure] = useState<AdmListTableCellProps[]>([]);
    const [bdList, setBdList] = useState<AdmListTableCellProps[][]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [page, setPage] = useState(1);
    const [orgData, setOrgData] = useState<any[]>([]);
    const { showLoading, hideLoading } = useLoadingScreenStore();

    const callListBySearch = useCallback(async (currentPage: number) => {
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

        try {
            const result: any = await fetchArtistList(queryParams);

            const tableStructureData: AdmListTableCellProps[] = [
                // { id: '', value: '', size: '48px', cellKey: 'checkbox' },
                { id: '', value: '유형', size: '200px', cellKey: 'type' },
                { id: '', value: '승인여부', size: '120px', cellKey: 'status' },
                { id: '', value: '닉네임', size: '240px', cellKey: 'name' },
                { id: '', value: '이메일', size: '100%', cellKey: 'email', align: 'left' },
                { id: '', value: '관리', size: '140px', cellKey: 'ctrl' },
            ];
            const customData: any[] = [];
            if (result?.data?.data && Array.isArray(result.data.data)) {
                result.data.data.forEach((item: UserListItem) => {

                    customData.push({
                        ...item
                        , type: item.type === 'A' ? '관리자(마스터)' : item.type === 'J' ? '아티스트' : '일반사용자',
                        status: item.status === 'Y' ? '승인' : '대기',
                    });
                })

                setTableStructure(tableStructureData);
                const tableData = listDataToTableList(customData, tableStructureData);
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
    }, [showLoading, hideLoading]);

    useEffect(() => {
        const currentPage = parseInt(searchParams.get('page') ?? '1');
        setPage(currentPage);
        callListBySearch(currentPage);
    }, [searchParams, callListBySearch]);

    const editItem = async (id: string) => {
        // router.push(`${URL_VIEW}${id}`);

        const data = orgData.filter((item: any) => item.id == id);

        setPopupData(data ? data[0] : null);
        setShowEditPopup(true);
    };


    const { showPopup } = useConfirmPopupStore();
    const handleAuthDropClick = (id: string) => {
        showPopup({
            title: <p>관리자에서 내보내시겠습니까?</p>,
            desc: <p>해당 계정을 관리자에서 내보내시면<br />시스템 접근이 제한됩니다.</p>,
            onConfirm: () => {
                //관리자 권한 삭제
                authDrop(id)
            },
            onCancel: () => {
                return false;
            }
        });
    };

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const authDrop = async (id: string) => {
        if (isLoading) return; // 중복 제출 방지
        setIsLoading(true);
        showLoading();

        try {
            if (!id || id === '') {
                alert('삭제할 대상이 없습니다.');
                return;
            }
            // API 호출
            const res = await deleteArtist(id);
            if (res) {
                // 성공적으로 삭제된 경우
                addToast('해당 계정을 관리자에서 내보냈습니다.');
                callListBySearch(page);
            }
            return true;

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

    const authAdd = async (id: string) => {
        if (isLoading) return; // 중복 제출 방지
        setIsLoading(true);
        showLoading();

        try {
            // API 호출
            // TODO: 관리자 초대 이메일 기능 추가 필요
            const res = await activateArtist(id);
            if (res) {
                addToast('새로운 관리자를 초대했습니다.');
                callListBySearch(page);
            }
            return true;

        } catch (e: any) {
            if (e === null) return;
            alert(
                '처리 중 문제가 발생하였습니다.\n반복될 경우, 관리자에게 문의하여 주세요.',
            );
            return false;
        } finally {
            setIsLoading(false);
            hideLoading();
            setShowAddPopup(false);
        }
    }

    const handleAuthAddClick = () => {
        // showPopup({
        //     title: <p>관리자 계정으로 초대하시겠습니까?</p>,
        //     desc: <p>해당 계정을 관리자 계정으로 초대합니다.<br />초대 후에는 관리자 권한을 취소할 수 없습니다.</p>,
        //     onConfirm: () => {
        //         //관리자 권한 추가
        //         // authAdd('yjh1411@naver.com') //237329
        //         authAdd('237329') //

        //     },
        //     onCancel: () => {
        //         return false;
        //     }
        // });
        setShowAddPopup(true);
    };


    const [selected, setSelected] = useState<string[]>([]);

    const [showEditPopup, setShowEditPopup] = useState<boolean>(false);
    const [popupData, setPopupData] = useState<any>();

    const handleSave = async (data: any) => {

        console.log('Saving data:', data);

        if (isLoading) return; // 중복 제출 방지
        setIsLoading(true);
        showLoading();

        try {
            if (data === null || data === undefined) {
                alert('수정할 데이터가 없습니다.');
                return;
            }

            const res = await saveArtistData(data);
            if (res) {
                // 성공적으로 수정된 경우
                addToast('해당 계정을 수정하였습니다.');
                callListBySearch(page);
            }
            return true;

        } catch (e: any) {
            console.error('Error saving data:', e);

            alert('처리 중 문제가 발생하였습니다.\n반복될 경우, 관리자에게 문의하여 주세요.',);
            return false;
        } finally {
            setIsLoading(false);
            hideLoading();
            setShowEditPopup(false);
        }

    };

    const [showAddPopup, setShowAddPopup] = useState<boolean>(false);

    const handleAdd = async (data: any) => {

        console.log('Adding data:', data);

        authAdd(data.id);
    }


    return (
        <>
            <AdmWrapper>
                <AdmPageTop title={`관리자/아티스트 관리`} />

                <AdmListBox>
                    <>
                        <CustomPageExplnationMultiLines
                            titleBlack={'아티스트 및 관리자 계정을 변경하기 위해서는 개발자에게 문의해주세요.'}
                        />
                        <AdmListTableTop
                            LeftComponents={<AdmListTableTopTitle title={'관리자/아티스트 목록'} />}
                            RightComponent={
                                <>
                                    {/* <AdmButton size={'large'} color='secondaryFill' onClick={() => alert('준비중 입니다.')} style={{ gap: '8px', fontWeight: '600' }}>관리자 계정 설정</AdmButton> */}
                                    {/* <AdmButton size={'large'} color='secondaryFill' onClick={() => alert('준비중 입니다.')} style={{ gap: '8px', fontWeight: '600' }}>아티스트 계정 설정</AdmButton> */}
                                    {/* <AdmButton size={'large'} color='primaryFill' onClick={handleAuthAddClick} style={{ gap: '8px', fontWeight: '600' }}>+ 관리자 초대</AdmButton> */}
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
                                                    editItem={editItem}
                                                    // withdrawItem={handleAuthDropClick}
                                                    // withdrawItemText={'내보내기'}
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
            }
        </>
    );
};

export default AdminArtistInfoPage;
