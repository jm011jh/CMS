'use client';

import AdmPageExplnation from '@/app/admin/components/design/AdmPageExplnation';
import AdmPageTop from '@/app/admin/components/design/AdmPageTop';
import AdmViewBox from '@/app/admin/components/design/AdmViewBox';
import AdmViewMakeTable from '@/app/admin/components/design/AdmViewMakeTable';
import AdmViewNavBar from '@/app/admin/components/design/AdmViewNavBar';
import AdmViewTableTitle, { AdmViewTableTitleText } from '@/app/admin/components/design/AdmViewTableTitle';
import AdmWrapper from '@/app/admin/components/design/AdmWrapper';
import apiDeleteBoardItem from '@/app/admin/lib/apiDeleteBoardItem';
import updateValue from '@/app/admin/lib/updateValue';
import validationCheckToken from '@/app/admin/lib/validationCheckToken';
import { T_UPLOAD_DIRECTORY } from '@/app/admin/lib/viewDataFilesUpload';
import handleSubmit from '@/app/admin/lib/viewDataHandleSubmit';
import { useConfirmPopupStore } from '@/app/admin/store/confirmPopupStore';
import useLoadingScreenStore from '@/app/admin/store/loadingScreenStore';
import { useToast } from '@/app/admin/store/useToastStore';
import { AdmViewMakeTableObjectType } from '@/app/admin/type';
import { callAPI, HTTPMETHOD } from '@/lib/util/callApi';
import { getAccessToken } from '@/lib/util/tokenClass';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

const S3_IMAGE_PATH: T_UPLOAD_DIRECTORY = 'notice/img';
const API_URL_GET = '/api/admin/subscription-plan/plans/';
const API_POST_URL = '/api/admin/subscription-plan/plans';
const API_DELETE_URL = '/api/admin/subscription-plan/plans/';
const BOARD_URL = '/admin/subs/product';

const AdminSubsProductViewPage: React.FC = () => {


    const router = useRouter();
    const searchParams = useSearchParams();
    const viewId = searchParams.get('id');

    // 기본정보 테이블
    const [viewTableObject, setViewTableObject] = useState<
        AdmViewMakeTableObjectType[]
    >([
        {
            placeholder: '',
            inputKey: 'benefits',
            label: '상품 구분 *',
            value: 'SUBS',
            isFirst: true,
            isLast: false,
            required: true,
            inputType: 'radio',
            selectOptions: [
                { label: '콘텐츠 구독 상품', value: 'SUBS' },
                { label: '폰트 구독 상품', value: 'FONT' },
            ]
        },
        {
            placeholder: 'Google Playstore 내 구독 제품 ID를 입력해주세요.',
            inputKey: 'playStoreProductId',
            label: 'IOS 제품 ID *',
            value: '',
            isFirst: false,
            isLast: false,
            required: true,
            inputType: 'text',
        },
        {
            placeholder: 'Apple Appstore 내 구독 제품 ID를 입력해주세요.',
            inputKey: 'appStoreProductId',
            label: 'AOS 제품 ID *',
            value: '',
            isFirst: false,
            isLast: false,
            required: true,
            inputType: 'text',
        },
        {
            placeholder: '상품 명을 입력해주세요.',
            inputKey: 'name',
            label: '상품 명 *',
            value: '',
            isFirst: false,
            isLast: false,
            inputType: 'text',
            required: true,
        },
        // {
        //     placeholder: '상품 설명을 입력해주세요. / 상품 설명 글자수 300자 내외',
        //     inputKey: 'description',
        //     label: '상품 설명 *',
        //     value: '',
        //     isFirst: false,
        //     isLast: false,
        //     inputType: 'textarea',
        //     required: true,
        // },
        // {
        //     placeholder: ' ',
        //     inputKey: 'planType',
        //     label: '결제 방식 *',
        //     value: [],
        //     isFirst: false,
        //     isLast: false,
        //     inputType: 'radio',
        //     selectOptions: [
        //         { label: '월간 구독', value: 'MONTHLY' },
        //         { label: '연간 구독', value: 'YEARLY' },
        //     ],
        // },

        // 이하 숨김 처리한 테이블
        {
            isHidden: true,
            placeholder: ' ',
            inputKey: 'planType',
            label: '결제 방식 *',
            value: 'MONTHLY',
            isFirst: false,
            isLast: false,
            inputType: 'text',
        },
        {
            placeholder: '금액을 입력해주세요.',
            desc: '가격은 앱스토어에서 설정되며, 관리자확인을 위한 금액입니다.',
            inputKey: 'price',
            label: '금액',
            value: '',
            isFirst: false,
            isLast: true,
            inputType: 'text',
        },
        {
            placeholder: '기기',
            inputKey: 'os',
            label: 'device',
            value: 'ALL',
            isFirst: false,
            isLast: false,
            inputType: 'text',
            isHidden: true,
        },
    ]);
    // 수신동의 및 개인정보 이용 동의 정보용 테이블용
    const [viewTableObject2, setViewTableObject2] = useState<
        AdmViewMakeTableObjectType[]
    >([
        {
            placeholder: ' ',
            inputKey: 'isActive',
            label: '공개범위 *',
            value: 'Y',
            isFirst: true,
            isLast: true,
            inputType: 'radio',
            selectOptions: [
                { label: '공개', value: 'Y' },
                { label: '비공개', value: 'N' },
            ]
        },
        // {
        //     placeholder: ' ',
        //     inputKey: 'openDate',
        //     label: '공개 예정일',
        //     value: '',
        //     isFirst: false,
        //     isLast: true,
        //     inputType: 'date',
        //     descAlert: '공개날짜를 설정하지 않으면 즉시 등록됩니다.'
        // },
    ]);

    useEffect(() => {
        if (viewId) {
            callView();

            // 수정모드일 경우 몇몇 값은 수정불가처리
            setViewTableObject(prev =>
                prev.map(item =>
                    item.inputKey === 'email' ? { ...item, disabled: true } : item
                ).map(item =>
                    item.inputKey === 'regDate' ? { ...item, isHidden: false } : item
                ).map(item =>
                    item.inputKey === 'region' ? { ...item, isLast: false } : item
                ).map(item =>
                    item.inputKey === 'password' ? { ...item, required: false } : item
                ).map(item =>
                    item.inputKey === 'passwordRe' ? { ...item, required: false } : item
                )
            );
        }
    }, [viewId]);
    const callView = async () => {
        const token = getAccessToken();
        if (!validationCheckToken(token)) {
            alert('로그인 해주세요.');
            return;
        }

        try {
            const url = `${API_URL_GET}${viewId}`;
            const result: {
                code: number;
                data: any;
                message: string;
            } = await callAPI(HTTPMETHOD.GET, {}, url, token)

            const subscribeBenefits: string[] = []
            result.data.benefits.forEach((benefit: any) => {
                subscribeBenefits.push(benefit.type)
            })
            var subscribeType;
            if (subscribeBenefits.includes('FONT')) {
                subscribeType = 'FONT'
            } else if (
                subscribeBenefits.includes('CONTENT') &&
                subscribeBenefits.includes('MESSENGER') &&
                subscribeBenefits.includes('LIVE_CHAT') &&
                subscribeBenefits.includes('FAN_BADGE')
            ) {
                subscribeType = 'SUBS'
            }

            updateValue('playStoreProductId', result.data.playStoreProductId || '', setViewTableObject);
            updateValue('appStoreProductId', result.data.appStoreProductId || '', setViewTableObject);
            updateValue('name', result.data.name || '', setViewTableObject);
            updateValue('description', result.data.description || '', setViewTableObject);
            updateValue('planType', result.data.planType || '', setViewTableObject);
            updateValue('price', result.data.price || '', setViewTableObject);
            updateValue('isActive', result.data.isActive === true ? 'Y' : 'N', setViewTableObject2);
            updateValue('benefits', subscribeType || '', setViewTableObject);

        } catch (e: any) {
            console.error("Error fetching notice details:", e);
            // alert('정보를 불러오는 데 실패했습니다.');
            alert('아직 준비중인 기능입니다.');
        }
    };

    const { addToast } = useToast();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { showLoading, hideLoading } = useLoadingScreenStore();
    const save = async (event?: FormEvent) => {

        if (event) event.preventDefault();
        if (isLoading) return; // 중복 제출 방지

        setIsLoading(true);
        showLoading();

        const viewTableObject1and2 = viewTableObject.concat(viewTableObject2); // 회원등록일 경우 테이블이 두개라서 하나로 concat
        const updatedViewTableObject1and2 = viewTableObject1and2.map(item => {
            if (item.inputKey === 'isActive') {
                return {
                    ...item,
                    value: item.value === 'Y' ? true : false
                };
            }
            if (item.inputKey === 'price') {
                return {
                    ...item,
                    value: Number(item.value)
                }
            }
            if (item.inputKey === 'benefits') {
                return {
                    ...item,
                    value: item.value === 'SUBS' ? ['CONTENT', 'MESSENGER', 'LIVE_CHAT', 'FAN_BADGE'] : ['FONT']
                }
            }
            return item;
        });
        await handleSubmit('save', router, viewId, updatedViewTableObject1and2, S3_IMAGE_PATH, API_POST_URL, BOARD_URL)
            .then(() => {
                addToast()
            })
            .catch((error) => {
                alert(`게시글 등록 중 오류가 발생했습니다: ${error instanceof Error ? error.message : String(error)}`);
            }).finally(() => {
                setIsLoading(false);
                hideLoading();
            })
    };
    const edit = async (event?: FormEvent) => {
        if (event) event.preventDefault();
        if (isLoading) return; // 중복 제출 방지
        setIsLoading(true);
        showLoading();
        const viewTableAll = viewTableObject.concat(viewTableObject2);
        const updatedViewTableAll = viewTableAll.map(item => {
            if (item.inputKey === 'isActive') {
                return {
                    ...item,
                    value: item.value === 'Y' ? true : false
                };
            }
            if (item.inputKey === 'price') {
                return {
                    ...item,
                    value: Number(item.value)
                }
            }
            if (item.inputKey === 'benefits') {
                return {
                    ...item,
                    value: item.value === 'SUBS' ? ['CONTENT', 'MESSENGER', 'LIVE_CHAT', 'FAN_BADGE'] : ['FONT']
                }
            }
            return item;
        });
        await handleSubmit('edit', router, viewId, updatedViewTableAll, S3_IMAGE_PATH, API_POST_URL + `/${viewId}`, BOARD_URL)
            .then(() => {
                addToast()
            })
            .catch((error) => {
                alert(`게시글 등록 중 오류가 발생했습니다: ${error instanceof Error ? error.message : String(error)}`);
            }).finally(() => {
                setIsLoading(false);
                hideLoading();
            })
    };

    const { showPopup } = useConfirmPopupStore();
    const deleteItem = (id: string) => {
        showPopup({
            title: <p>삭제 전 확인해주세요</p>,
            desc: <p>삭제된 정보는 복구가 불가능합니다.<br />정말 삭제하시겠습니까?</p>,
            onConfirm: async () => {
                showLoading();
                try {
                    await apiDeleteBoardItem(id, API_DELETE_URL);
                } finally {
                    hideLoading();
                    alert('구독 상품이 삭제되었습니다.');
                    router.back();
                }
            },
        });
    };
    return (
        <AdmWrapper>
            <AdmPageTop title={`구독 상품 ${viewId == null ? '등록' : '수정'}하기`} depth1={'구독 상품 관리'} depth2={`구독 상품 ${viewId == null ? '등록' : '수정'}하기`} />
            <AdmViewBox>
                <>
                    <AdmPageExplnation titleRed={<p>상품 정보 (상품명, 금액, 상품설명 등)은 앱 스토어에 등록된 정보를 사용자에게 출력합니다. <br />제품 ID는 앱 스토어에 등록된 정보로 등록되어야하며, 상품명 및 금액은 관리자 확인을 위한 내용입니다.</p>} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>

                            <AdmViewTableTitle>
                                <AdmViewTableTitleText title={'기본정보'} />
                            </AdmViewTableTitle>
                            <AdmViewMakeTable
                                values={viewTableObject}
                                setValues={setViewTableObject}
                            />
                        </div>
                        <div>

                            <AdmViewTableTitle>
                                <AdmViewTableTitleText title={'공개상태'} />
                            </AdmViewTableTitle>
                            <AdmViewMakeTable
                                values={viewTableObject2}
                                setValues={setViewTableObject2}
                            />
                        </div>

                    </div>
                    <AdmViewNavBar
                        mode={viewId !== null ? 'edit' : 'save'}
                        save={save}
                        edit={edit}
                        onDelete={viewId ? () => deleteItem(viewId) : undefined}
                        deleteTitle={'구독 상품 삭제'}
                        onCancelConfirm={() => router.back()}
                    />
                </>
            </AdmViewBox>
        </AdmWrapper>
    );
}

export default AdminSubsProductViewPage;