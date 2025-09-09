'use client';
import AdmListBox from '@/app/admin/components/design/AdmListBox';
import AdmListTable from '@/app/admin/components/design/AdmListTable';
import AdmListTableHeadRow, { AdmListTableCellProps } from '@/app/admin/components/design/AdmListTableHeadRow';
import AdmListTableTop, { AdmListTableTopTitle } from '@/app/admin/components/design/AdmListTableTop';
import AdmPageTop from '@/app/admin/components/design/AdmPageTop';
import AdmWrapper from '@/app/admin/components/design/AdmWrapper';
import listDataToTableList from '@/app/admin/lib/listDataToTableList';
import { callAPI, HTTPMETHOD } from '@/lib/util/callApi';
import { getAccessToken } from '@/lib/util/tokenClass';
import dayjs from 'dayjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, useCallback, useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { T_AdmListSrchParam } from '../../components/design/AdmListSrchBar';
import useLoadingScreenStore from '../../store/loadingScreenStore';
import { useToast } from '../../store/useToastStore';
import CustomListTableBodyRow from '../term/component/CustomListTableBodyRow';
import CustomPageExplnationMultiLines from '../term/component/CustomPageExplnationMultiLines';
import AdmSubsUpdatePopup from './component/AdmSubsUpdatePopup';


const AdminSettingUpdatePage: FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [tableStructure, setTableStructure] = useState<AdmListTableCellProps[]>(
        [
            { id: '', value: '플랫폼', size: '100%', cellKey: 'platform' },
            { id: '', value: '앱 이름', size: '100%', cellKey: 'appName' },
            { id: '', value: '최신 배포 버전', size: '100%', cellKey: 'lastestVersion', },
            { id: '', value: '강제 업데이트', size: '100%', cellKey: 'isForce' },
            { id: '', value: '배포 일시', size: '100%', cellKey: 'updateDate' },
            { id: '', value: '관리', size: '100%', cellKey: 'ctrl' },
        ]
    );

    const [orginalData, setOriginalData] = useState<any[]>([]);
    const [bdList, setBdList] = useState<AdmListTableCellProps[][]>([]);

    // Define search types for AdmListSrchBar
    const srchTypes: T_AdmListSrchParam[] = [
        { size: '100%', inputType: 'search', paramKey: 'search', label: '검색어', placeholder: '제목 또는 내용으로 검색' },
        { size: '50%', inputType: 'datePatrolStart', paramKey: 'startDate', label: '공개예정일', placeholder: 'YYYY-MM-DD' },
        { size: '50%', inputType: 'datePatrolEnd', paramKey: 'endDate', label: '공개예정일', placeholder: 'YYYY-MM-DD', notInRow: true },
        {
            size: '50%', inputType: 'select', paramKey: 'category', label: '카테고리', placeholder: '카테고리 선택', selectOptions: [
                { label: '전체', value: 'all' },
                { label: '일반', value: '일반' },
                { label: '이벤트', value: '이벤트' },
                { label: '시스템', value: '시스템' },
                { label: '기타', value: '기타' }
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

    const callListBySearch = async (type: string) => {
        const token = getAccessToken();
        if (token === '') {
            alert('로그인 해주세요.');
            return;
        }
        const url = `/api/updates/${type}`;

        try {
            const result: any = await callAPI(HTTPMETHOD.GET, {}, url, token);


            //orginalData를 업데이트
            setOriginalData((prev) => [...prev, result.data]);

            //bdList를 업데이트
            const data: any[] = [];
            data.push(
                {
                    ...result.data,
                    id: `AOS_${result.data.appType}`,
                    platformText: '안드로이드',
                    platform: <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '10px', justifyContent: 'center', padding: '13px' }}>
                        <img src='/image/icon_google.png' alt='Android Icon' style={{ width: '34px', height: '34px' }} />
                        안드로이드
                    </div>,
                    appName: result.data.appType == 'ARTIST' ? 'JISOO ARTIST' : 'JISOO',
                    lastestVersion: result.data.androidVersion,
                    isForce: result.data.isForceUpdateAndroid,
                    updateDate: dayjs(result.data.updateDate).format('YYYY-MM-DD HH:mm'),
                }
            );
            data.push(
                {
                    ...result.data,
                    id: `IOS_${result.data.appType}`,
                    platformText: 'iOS',
                    platform: <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '10px', justifyContent: 'center', padding: '13px' }}>
                        <img src='/image/icon_apple.png' alt='iOS Icon' style={{ width: '34px', height: '34px' }} />
                        iOS
                    </div>,
                    appName: result.data.appType == 'ARTIST' ? 'JISOO ARTIST' : 'JISOO',
                    lastestVersion: result.data.iosVersion,
                    isForce: result.data.isForceUpdateIos,
                    updateDate: dayjs(result.data.updateDate).format('YYYY-MM-DD HH:mm'),
                }
            );


            setTableStructure(tableStructure);
            const tableData = listDataToTableList(data, tableStructure);

            setBdList((prev) => [...prev, ...tableData]);
        } catch (e: any) {
            if (e === null) return;
            if (e.response && e.response.data && e.response.data.code === 1409) {
                console.log('등록된 앱 업데이트가 없습니다.')
                return;
            }
            alert(
                '처리 중 문제가 발생하였습니다.\n반복될 경우, 관리자에게 문의하여 주세요.',
            );
        }
    };

    useEffect(() => {

        callListBySearch('artist').then(() => {
            // After fetching user updates, fetch artist updates
            callListBySearch('user');
        });

    }, [searchParams]);


    /* popup 관련 */


    const [isDetailPopupOpen, setIsDetailPopupOpen] = useState<boolean>(false);
    const [detailPopupData, setDetailPopupData] = useState<any>({});

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { showLoading, hideLoading } = useLoadingScreenStore();

    const editItem = async (id: string) => {
        const item = bdList.find((item: any) => item[0].originalDataRow.id === id);
        if (item) {
            setDetailPopupData({
                ...item[0].originalDataRow
            });

            setIsDetailPopupOpen(true);
        }
    };

    const detailPopupClose = () => {
        setIsDetailPopupOpen(false);
    }

    const { addToast } = useToast();

    const handleSave = async (data: any) => {
        const token = getAccessToken();
        if (token === '') {
            alert('로그인 해주세요.');
            return;
        }

        //버전 체크
        if (data.changeVersion && data.changeVersion !== '') {
            if (parseInt(data.lastestVersion.replace(/\./g, ''), 10) > parseInt(data.changeVersion.replace(/\./g, ''), 10)) {
                // activeToastPopup('출시버전을 확인해주세요. 현재버전보다 낮은 버전을 출시할 수 없습니다.', 'red');
                addToast('출시버전을 확인해주세요. 현재버전보다 낮은 버전을 출시할 수 없습니다.', 3000, 'error');
                return;
            }
        }

        if (isLoading) return; // 중복 제출 방지
        setIsLoading(true);
        showLoading();

        // 플렛폼에 따라 분기 처리
        let parmas = {
            "iosVersion": data.iosVersion,
            "isForceUpdateIos": data.isForceUpdateIos,
            "androidVersion": data.androidVersion,
            "isForceUpdateAndroid": data.isForceUpdateAndroid,
            "appType": data.appType
        }

        if (data.id.startsWith('AOS_')) {
            if (data.changeVersion) {
                parmas.androidVersion = data.changeVersion;
            }
            parmas.isForceUpdateAndroid = data.isForce;
        } else {
            if (data.changeVersion) {
                parmas.iosVersion = data.changeVersion;
            }
            parmas.isForceUpdateIos = data.isForce;
        }


        const url = `/api/admin/updates`;
        try {
            await callAPI(HTTPMETHOD.POST, parmas, url, token);
            alert('업데이트 되었습니다.');

            setIsLoading(false);
            hideLoading();

            detailPopupClose();
            // Refresh the list after saving
            setBdList([]);
            callListBySearch('artist').then(() => {
                // After fetching user updates, fetch artist updates
                callListBySearch('user');
            });
        } catch (e: any) {
            alert('저장 중 문제가 발생하였습니다. 다시 시도해주세요.');

            setIsLoading(false);
            hideLoading();
        }
    };

    return (
        <AdmWrapper>
            <AdmPageTop title={`앱 업데이트 관리`} />
            <AdmListBox>
                <>
                    <div className="adm--box-scrollWrap">
                        <div className="adm--box-scrollCont" style={{ width: '100%' }}>
                            <AdmListTableTop
                                LeftComponents={<AdmListTableTopTitle title={'앱 업데이트 목록'} />}
                                marginTop='0px'
                            // RightComponent={
                            //     <>
                            //         <AdmListTableTopGoToCategoryButton />
                            //         <AdmListTableTopGoToWriteButton onClick={() => router.push('/admin/board/link/view')} />
                            //     </>
                            // }
                            />
                            <CustomPageExplnationMultiLines
                                titleRed={'스토어에 버전이 완료되지 않은 상태에서 업데이트 알림을 보낼 경우, 사용자 앱 이용이 제한될 수 있습니다.<br/>반드시 최신 버전이 스토어에 노출된 것을 확인한 후 안내해주세요.'}
                            />
                            <AdmListTable>
                                <>
                                    <AdmListTableHeadRow structure={tableStructure} />
                                    {bdList.length > 0 &&
                                        bdList.map((data: any, idx: number) => (
                                            <CustomListTableBodyRow
                                                key={idx}
                                                structure={data}
                                                editItem={editItem}
                                                cellHeight={'91px'}
                                            />
                                        ))}
                                    {bdList.length === 0 && (
                                        <div style={{ width: '100%', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>
                                            등록된 앱 업데이트가 없습니다.
                                        </div>
                                    )}
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
            </AdmListBox>
            {
                isDetailPopupOpen &&
                <AdmSubsUpdatePopup data={detailPopupData} close={detailPopupClose} handleSave={handleSave} />
            }
        </AdmWrapper>
    );
};

export default AdminSettingUpdatePage;
