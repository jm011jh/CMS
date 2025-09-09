'use client';

import AdmPageExplnation from '@/app/admin/components/design/AdmPageExplnation';
import AdmPageTop from '@/app/admin/components/design/AdmPageTop';
import AdmViewBox from '@/app/admin/components/design/AdmViewBox';
import AdmViewMakeTable from '@/app/admin/components/design/AdmViewMakeTable';
import AdmViewNavBar from '@/app/admin/components/design/AdmViewNavBar';
import AdmViewTableTitle, { AdmViewTableTitleText } from '@/app/admin/components/design/AdmViewTableTitle';
import AdmWrapper from '@/app/admin/components/design/AdmWrapper';
import countryCodes from '@/app/admin/lib/countryCode';
import updateValue from '@/app/admin/lib/updateValue';
import validationCheckToken from '@/app/admin/lib/validationCheckToken';
import { T_UPLOAD_DIRECTORY } from '@/app/admin/lib/viewDataFilesUpload';
import handleSubmit from '@/app/admin/lib/viewDataHandleSubmit';
import { useConfirmPopupStore } from '@/app/admin/store/confirmPopupStore';
import useLoadingScreenStore from '@/app/admin/store/loadingScreenStore';
import { useToast } from '@/app/admin/store/useToastStore';
import AdmSubsUserPopup from '@/app/admin/subs/user/AdmSubsUserPopup';
import { AdmViewMakeTableObjectType } from '@/app/admin/type';
import AdmUserSubscriptionList from '@/app/admin/user/info/components/AdmUserSubscriptionList';
import { callAPI, HTTPMETHOD } from '@/lib/util/callApi';
import { getAccessToken } from '@/lib/util/tokenClass';
import dayjs from 'dayjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useEffect, useRef, useState } from 'react';
import AdminAddSubsPopup from '../components/AdminAddSubsPopup';
import AdminAddSubsStartPopup from '../components/AdminAddSubsStartPopup';

type T_USER = {
    name: string;
    email: string;
    region: string;
    regDate: string;
    status: string; //불량유저면 N 정상유저면 Y
    withdrawDate: string | null;
    withdrawReson: string | null;
    withdraw: string;
    restriction: any;
    adConsent: string;
};
const S3_IMAGE_PATH: T_UPLOAD_DIRECTORY = 'user/img';
const API_URL_GET = '/api/admin/user/';
const API_POST_URL = '/api/admin/user'
const BOARD_URL = '/admin/user/info';

const AdminUserInfoViewPage: React.FC = () => {


    const router = useRouter();
    const searchParams = useSearchParams();
    const viewId = searchParams.get('id');
    const userEmail = useRef<string>('');

    // 개인정보용 정보 테이블
    const [viewTableObject, setViewTableObject] = useState<
        AdmViewMakeTableObjectType[]
    >([
        {
            placeholder: '유저 불량 여부 (아니오 설정)',
            inputKey: 'status',
            label: '닉네임 *',
            value: 'Y',
            isFirst: false,
            isLast: false,
            isHidden: true,
            inputType: 'text',
        },
        {
            placeholder: '유저 타입을 선택해주세요.',
            inputKey: 'type',
            label: '유저 타입 *',
            value: 'G',
            isFirst: false,
            isLast: false,
            isHidden: true,
            inputType: 'text',
        },
        {
            placeholder: '닉네임을 입력해주세요.',
            inputKey: 'name',
            label: '닉네임 *',
            value: '',
            isFirst: true,
            isLast: false,
            required: true,
            inputType: 'text',
            desc: '영어, 숫자를 포함한 2-10자로 이루어진 닉네임을 입력해주세요.',
            requireOptions: {
                maxLength: 10,
                minLength: 2,
                pattern: '^[a-zA-Z0-9]+$', // 영어, 숫자와만 허용
            }
        },
        {
            inputKey: 'translationLang',
            label: '번역언어 *',
            value: 'ko',
            isFirst: false,
            isLast: false,
            inputType: 'text',
            isHidden: true,
        },
        {
            placeholder: '이메일을 입력해주세요.',
            inputKey: 'email',
            label: '이메일 *',
            value: '',
            isFirst: false,
            isLast: false,
            inputType: 'text',
            required: true,
        },
        {
            placeholder: '고객이 비밀번호를 분실했을 경우 대신해서 재설정할 수 있습니다.',
            inputKey: 'password',
            label: '비밀번호 *',
            value: '',
            isFirst: false,
            isLast: false,
            inputType: 'password',
            required: true,
            desc: '영문, 숫자, 특수문자 조합의 8자 이상 사용해야합니다.',
            requireOptions: {
                maxLength: 30,
                minLength: 8,
                pattern: '^[a-zA-Z0-9!@#$%^&*()_+-=]+$', // 영어, 숫자와 특수문자만 허용
            }
        },
        {
            placeholder: '고객이 비밀번호를 분실했을 경우 대신해서 재설정할 수 있습니다.',
            inputKey: 'passwordRe',
            label: '비밀번호 확인*',
            value: '',
            isFirst: false,
            isLast: false,
            inputType: 'password',
            required: true,
            notInPayload: true,
            desc: '영문, 숫자, 특수문자 조합의 8자 이상 사용해야합니다.',
            requireOptions: {
                maxLength: 30,
                minLength: 8,
                pattern: '^[a-zA-Z0-9!@#$%^&*()_+-=]+$', // 영어, 숫자와 특수문자만 허용
            }
        },
        {
            placeholder: '국적을 선택해주세요.',
            inputKey: 'region',
            label: '국적 *',
            value: '',
            isFirst: false,
            isLast: true,
            inputType: 'select',
            required: true,
            selectOptions: Object.entries(countryCodes).map(([code, name]) => ({
                label: name,
                value: code?.toUpperCase(),
            })).sort((a, b) => a.label.localeCompare(b.label)),
        },
        {
            placeholder: ' ',
            inputKey: 'regDate',
            label: '가입일 *',
            value: new Date().toISOString(),
            isFirst: false,
            isLast: true,
            inputType: 'text',
            required: true,
            disabled: true,
            notInPayload: true,
            isHidden: true,
        },
    ]);
    // 수신동의 및 개인정보 이용 동의 정보용 테이블용
    const [viewTableObject2, setViewTableObject2] = useState<
        AdmViewMakeTableObjectType[]
    >([
        {
            placeholder: '(선택) 광고성 정보 수신 동의',
            inputKey: 'adConsent',
            label: '(선택) 광고성 정보 수신 동의',
            value: 'Y',
            isFirst: false,
            isLast: true,
            inputType: 'radio',
            selectOptions: [
                { label: '동의', value: 'Y' },
                { label: '동의안함', value: 'N' },
            ]
        },
    ]);

    // 탈퇴 회원 정보용 테이블
    const [isWithdrawUser, setIsWithdrawUser] = useState<boolean>(false)
    const [viewTableObject3, setViewTableObject3] = useState<
        AdmViewMakeTableObjectType[]
    >([
        {
            placeholder: ' ',
            inputKey: 'withdrawDate',
            label: '회원탈퇴일',
            value: '',
            isFirst: true,
            isLast: false,
            inputType: 'text',
            disabled: true,
        },
        {
            placeholder: ' ',
            inputKey: 'withdrawReason',
            label: '탈퇴사유',
            value: '',
            isFirst: false,
            isLast: true,
            inputType: 'text',
            disabled: true,
        },
    ]);

    // 운영 관리 정보용 테이블
    const [viewTableObject4, setViewTableObject4] = useState<
        AdmViewMakeTableObjectType[]
    >([
        {
            placeholder: '탈퇴일',
            inputKey: 'isRestricted',
            label: '불량회원 설정여부',
            value: 'N',
            isFirst: true,
            isLast: false,
            inputType: 'radio',
            selectOptions: [
                { label: '설정안함', value: 'N' },
                { label: '설정함', value: 'Y' },
            ],
        },
        {
            placeholder: '탈퇴일',
            inputKey: 'isPenalty',
            label: '불량회원 차단 설정',
            value: [],
            isFirst: true,
            isLast: false,
            inputType: 'checkbox',
            selectOptions: [
                { label: '로그인 차단', value: 'isLoginBlocked' },
                { label: '라이브 및 채팅 등 유료 서비스 차단', value: 'isServiceBlocked' },
            ],
            disabled: true,
            notInPayload: true,
        },
        {
            placeholder: ' ',
            inputKey: 'isLoginBlocked',
            label: '로그인 차단',
            value: 'N',
            isFirst: false,
            isLast: false,
            inputType: 'text',
            descAlert: '차단 기간 미설정 시, 사용자 앱 진입이 무기한 차단됩니다.',
            isHidden: true,
        },
        {
            placeholder: ' ',
            inputKey: 'isServiceBlocked',
            label: '서비스 차단',
            value: 'N',
            isFirst: false,
            isLast: false,
            inputType: 'text',
            descAlert: '차단 기간 미설정 시, 사용자 앱 진입이 무기한 차단됩니다.',
            isHidden: true,
        },
        {
            placeholder: ' ',
            inputKey: 'endDate',
            label: '차단 기간',
            value: '',
            isFirst: false,
            isLast: false,
            inputType: 'date',
            descAlert: '차단 기간 미설정 시, 사용자 앱 진입이 무기한 차단됩니다.'
        },
        {
            placeholder: '관리자메모는 사용자에게 노출되지 않습니다.',
            inputKey: 'memo',
            label: '관리자메모',
            value: '',
            inputType: 'textarea',
            isFirst: false,
            isLast: true,
        }
    ]);

    // 탈퇴여부
    const [isWithdraw, setIsWithdraw] = useState<boolean>(false)

    // #region 불량회원 설정여부 스위치를 보는 useEffect
    useEffect(() => {
        const isRestrictedItem = viewTableObject4.find(item => item.inputKey === 'isRestricted');
        const badpenaltyItem = viewTableObject4.find(item => item.inputKey === 'isPenalty');
        const penaltyDateItem = viewTableObject4.find(item => item.inputKey === 'endDate');

        if (isRestrictedItem && badpenaltyItem && penaltyDateItem) {
            // isRestrictedItem.value가 'Y' (설정안함) 이면 badpenalty와 penaltyDate는 비활성화 (disabled: true)
            // isRestrictedItem.value가 'N' (설정함) 이면 badpenalty와 penaltyDate는 활성화 (disabled: false)
            const shouldBeDisabled = isRestrictedItem.value === 'N';

            // badpenaltyItem 또는 penaltyDateItem의 disabled 상태가 현재 shouldBeDisabled와 다를 경우에만 업데이트
            if (badpenaltyItem.disabled !== shouldBeDisabled || penaltyDateItem.disabled !== shouldBeDisabled) {
                setViewTableObject4(prevTable => {
                    return prevTable.map(item => {
                        if (item.inputKey === 'isPenalty') {
                            // 값 변경시, 기존 값 유지하도록
                            // return { ...item, disabled: shouldBeDisabled, value: shouldBeDisabled ? [] : item.value };
                            return { ...item, disabled: shouldBeDisabled, value: item.value };
                        }
                        if (item.inputKey === 'endDate') {
                            // 값 변경시, 기존 값 유지하도록
                            // return { ...item, disabled: shouldBeDisabled, value: shouldBeDisabled ? '' : item.value };
                            return { ...item, disabled: shouldBeDisabled, value: item.value };
                        }
                        return item;
                    });
                });
            }
        }
    }, [viewTableObject4])


    useEffect(() => {
        if (viewId) {
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
            callView().then(() => {
                // 유저의 구독리스트 불러오기
                ApiGetDetailPopupData(viewId)
            })

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
                data: T_USER;
                message: string;
                restriction: any;
            } = await callAPI(HTTPMETHOD.GET, {}, url, token)

            // 개인 정보
            updateValue('name', result.data.name || '', setViewTableObject);
            updateValue('email', result.data.email || '', setViewTableObject);
            updateValue('region', result.data.region || '', setViewTableObject);
            updateValue('regDate', dayjs(result.data.regDate).format('YYYY.MM.DD') || '', setViewTableObject);

            // 이메일 값 저장
            userEmail.current = result.data.email || '';

            // 수신동의
            updateValue('adConsent', result.data.adConsent || '', setViewTableObject2);

            // 탈퇴 테이블
            if (result.data.withdraw === 'Y') {
                setIsWithdrawUser(true)
            }
            updateValue('withdrawDate', dayjs(result.data.withdrawDate).format('YYYY.MM.DD HH:mm') || '', setViewTableObject3);
            updateValue('withdrawReson', result.data.withdrawReson || '', setViewTableObject3);
            setIsWithdraw(result.data.withdrawDate ? true : false)
            updateValue('status', result.data.status || '', setViewTableObject4);

            // 운영 관리 정보 테이블
            // 운영 관리 정보 - 조건이 있을때
            if (result.data.restriction) {
                const { endDate, isRestricted, isLoginBlocked, isServiceBlocked, memo } = result.data.restriction;

                const now = dayjs();
                const restrictionEnd = endDate ? dayjs(endDate) : null;
                const isRestrictionActive = restrictionEnd ? restrictionEnd.isAfter(now) : false;

                // 설정안함/ 설정함은 차단기간 확인하여,
                // 차단기간이 없으면 계속 설정함(차단된 상태)
                // 차단기간이 있고, 지났으면 설정안함(해제된 상태)
                // isRestricted: Y/N
                const isRestrictedValue = restrictionEnd === null
                    ? (isRestricted ? 'Y' : 'N')
                    : (isRestrictionActive ? 'Y' : 'N');
                updateValue('isRestricted', isRestrictedValue, setViewTableObject4);

                // 다른 옵션들은 그대로 보여주기
                // isPenalty: array
                const isPenalty: string[] = [];
                // const shouldCheckPenalty = restrictionEnd === null ? true : isRestrictionActive;
                // if (shouldCheckPenalty) {
                //     if (isLoginBlocked) isPenalty.push('isLoginBlocked');
                //     if (isServiceBlocked) isPenalty.push('isServiceBlocked');
                // }
                // updateValue('isPenalty', isRestrictionActive ? isPenalty : [], setViewTableObject4);

                // // endDate: formatted or empty
                // const endDateValue = isRestrictionActive && restrictionEnd
                //     ? endDate
                //     : '';
                // updateValue('endDate', endDateValue, setViewTableObject4);

                // // memo
                // updateValue('memo', memo || '', setViewTableObject4);

                result.data.restriction.isLoginBlocked ? isPenalty.push('isLoginBlocked') : null;
                result.data.restriction.isServiceBlocked ? isPenalty.push('isServiceBlocked') : null;
                updateValue('isPenalty', isPenalty, setViewTableObject4);
                updateValue('endDate', result.data.restriction.endDate, setViewTableObject4);
                updateValue('memo', result.data.restriction.memo || '', setViewTableObject4);
            }

        } catch (e: any) {
            console.error("Error fetching notice details:", e);
            alert('정보를 불러오는 데 실패했습니다.');
        }
    };

    const make100user = async () => {
        console.log("make100user")
        try {
            setIsLoading(true);
            showLoading();
            for (let i = 80; i < 101; i++) {
                const token = getAccessToken();
                if (!validationCheckToken(token)) {
                    alert('로그인 해주세요.');
                    return;
                }

                const url = `${API_POST_URL}`;
                const result: {
                    code: number;
                    data: T_USER;
                    message: string;
                    restriction: any;
                } = await callAPI(HTTPMETHOD.POST, {
                    "email": `test${i}@test.com`,
                    "password": "test1234@",
                    "name": `test${i}`,
                    "region": "KR",
                    "adConsent": "N",
                }, url, token)
                console.log("result", result)
            }
        } catch (e: any) {
            console.error("Error fetching notice details:", e);
            alert('정보를 불럿오는 데 실패했습니다.');
        } finally {
            setIsLoading(false);
            hideLoading();
        }
    }

    const { addToast } = useToast();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { showLoading, hideLoading } = useLoadingScreenStore();
    const save = async (event?: FormEvent) => {
        if (event) event.preventDefault();
        if (isLoading) return; // 중복 제출 방지
        setIsLoading(true);
        showLoading();
        const viewTableObject1and2 = viewTableObject.concat(viewTableObject2); // 회원등록일 경우 테이블이 두개라서 하나로 concat
        await handleSubmit('save', router, viewId, viewTableObject1and2, S3_IMAGE_PATH, API_POST_URL, BOARD_URL)
            .then(() => {
                addToast(
                    '등록이 완료됐습니다.'
                )
            })
            .catch((error) => {
                console.log("error", error)
                if (!error.code) {
                    alert(error)
                }
                if (error.code === 1010) {
                    alert('이미 존재하는 이메일입니다.');
                }
                if (error.code === 2007) {
                    alert('이미 존재하는 닉네임입니다.');
                }
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
        const viewTableAll: any = viewTableObject.concat(viewTableObject2, viewTableObject3, viewTableObject4);

        // 1. 사용자 정보 업데이트
        // isRestricted 가 N일때는 isLoginBlocked: false, isServiceBlocked:false, endDate: null로 강제 변경
        // why? 서버에서는 위 3가지 값으로 isRestricted를 판단하기 때문에, isRestricted를 N으로 설정하면
        // 위 3가지 값은 무조건 false or null로 설정해야 합니다.
        let valueClear = false;
        let processedViewTableObject = viewTableAll.map((item: any) => {
            if (item.inputKey === 'isRestricted') {
                if (item.value === 'Y') {
                    return { ...item, value: true }
                } else {
                    valueClear = true;
                    return { ...item, value: false }
                }
            }
            if (item.inputKey === 'endDate') {
                // isRestricted 가 N일때는 강제로 초기화
                if (valueClear) {
                    return { ...item, value: null }
                }
                if (item.value === '') {
                    return { ...item, value: null }
                }
                return item;
            }
            return item;
        })

        processedViewTableObject.forEach((item: any) => {
            if (item.inputKey === 'isPenalty') {
                const hasLoginBlocked = item.value.includes('isLoginBlocked');
                const hasServiceBlocked = item.value.includes('isServiceBlocked');

                processedViewTableObject.forEach((innerItem: any) => {
                    if (innerItem.inputKey === 'isLoginBlocked') {
                        // isRestricted 가 N일때는 강제로 초기화
                        if (valueClear) {
                            innerItem.value = false;
                        } else {
                            innerItem.value = hasLoginBlocked;
                        }
                    }
                    if (innerItem.inputKey === 'isServiceBlocked') {
                        // isRestricted 가 N일때는 강제로 초기화
                        if (valueClear) {
                            innerItem.value = false;
                        } else {
                            innerItem.value = hasServiceBlocked;
                        }
                    }
                });
            }
        });

        const step1 = handleSubmit('put', router, viewId, processedViewTableObject, S3_IMAGE_PATH, API_POST_URL);
        // let step2 = null;
        // // 2. 비밀번호 업데이트
        // const password = viewTableObject.find(item => item.inputKey === 'password')?.value;
        // if (password) {
        //     step2 = callAPI(HTTPMETHOD.PATCH, { password: password }, API_POST_URL + `/${viewId}/change-password`, getAccessToken());
        // }

        Promise.all([step1])
            .then(() => {
                addToast(
                    '수정이 완료됐습니다.'
                )
            })
            .catch((error) => {
                alert(`수정 중 오류가 발생했습니다: ${error instanceof Error ? error.message : String(error)}`);
            }).finally(() => {
                setIsLoading(false);
                hideLoading();
                callView();
            })

        // .then(() => {
        //     // 2. 비밀번호 업데이트
        //     const password = viewTableObject.find(item => item.inputKey === 'password')?.value;
        //     if (password) {
        //         return callAPI(HTTPMETHOD.PATCH, { password }, API_POST_URL + `/${viewId}/password`, getAccessToken());
        //     }
        //     return Promise.resolve(); // 비밀번호가 없으면 그냥 넘어감
        //     addToast()
        // })
        // .catch((error) => {
        //     alert(`수정 중 오류가 발생했습니다: ${error instanceof Error ? error.message : String(error)}`);
        // }).finally(() => {
        //     setIsLoading(false);
        //     hideLoading();
        // })
    };

    // #region 유저 구독리스트 =================================================
    const [dettailPopupStatus, setDetailPopupStatus] = useState<'loading' | 'success' | 'error' | 'closed' | ''>('success'); // State to control the detail popup status
    const [detailPopupData, setDetailPopupData] = useState<any>(null); // State to hold the detail popup data
    const ApiGetDetailPopupData = async (id: string) => {
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
        } catch (e) {
            if (e === null) return;
            setDetailPopupStatus('error');
        }
    }
    const [detailMorePopupSwitch, setDetailMorePopupSwitch] = useState<boolean>(false)
    const [detailAddSubsPopupSwitch, setDetailAddSubsPopupSwitch] = useState<boolean>(false)
    const [detailAddSubsStartPopupSwitch, setDetailAddSubsStartPopupSwitch] = useState<boolean>(false)
    const openMore = () => {
        setDetailMorePopupSwitch(true)
    }
    const openAddSubs = () => {
        setDetailAddSubsPopupSwitch(true)
    }
    const openAddSubsStart = () => {
        setDetailAddSubsStartPopupSwitch(true)
    }
    const closeMore = () => {
        setDetailMorePopupSwitch(false)
    }

    const closeAdminAddSubsPopup = () => {
        setDetailAddSubsPopupSwitch(false);
    }
    const closeAdminAddSubsStartPopup = () => {
        setDetailAddSubsStartPopupSwitch(false);
    }

    const handleSaveAdminAddSubs = async (subsType: string, subsEndDate: any) => {
        showLoading();

        try {
            if (!subsType) {
                alert('구독 타입을 선택해주세요.');
                return;
            }

            if (!subsEndDate) {
                alert('구독 종료 날짜를 선택해주세요.');
                return;
            }
            const token = getAccessToken();
            if (token === '') {
                alert('로그인 해주세요.');
                return;
            }

            const params = {
                "userId": viewId,
                "endDate": subsEndDate
            }

            if (subsType === 'membership') {

                const res = await callAPI(HTTPMETHOD.PUT, params, `/api/admin/subscription/cs/update-end-date`, token);
                if (res) {
                    alert('멤버쉽 구독 기간이 변경 되었습니다.');

                    // 유저의 구독리스트 불러오기
                    if (viewId) {
                        ApiGetDetailPopupData(viewId)
                    }
                }

            } else {

                const res = await callAPI(HTTPMETHOD.PUT, params, `/api/admin/font-subscription/cs/update-end-date`, token);
                if (res) {
                    alert('폰트 구독 기간이 변경 되었습니다.');

                    // 유저의 구독리스트 불러오기
                    if (viewId) {
                        ApiGetDetailPopupData(viewId)
                    }
                }

            }

            closeAdminAddSubsPopup();

            return true;
        } catch (e: any) {
            if (e === null) return;
            alert(
                '처리 중 문제가 발생하였습니다.\n반복될 경우, 관리자에게 문의하여 주세요.',
            );
            return false;
        } finally {
            hideLoading();
        }

    }

    const handleSaveAdminAddSubsStart = async (subsType: string, subsStartDate: any) => {
        showLoading();

        try {
            if (!subsType) {
                alert('구독 타입을 선택해주세요.');
                return;
            }

            if (!subsStartDate) {
                alert('구독 시작일을 선택해주세요.');
                return;
            }
            const token = getAccessToken();
            if (token === '') {
                alert('로그인 해주세요.');
                return;
            }

            const params = {
                "userId": viewId,
                "startDate": subsStartDate
            }

            if (subsType === 'membership') {

                const res = await callAPI(HTTPMETHOD.PUT, params, `/api/admin/subscription/cs/update-start-date`, token);
                if (res) {
                    alert('멤버쉽 구독 시작일이 변경 되었습니다.');

                    // 유저의 구독리스트 불러오기
                    if (viewId) {
                        ApiGetDetailPopupData(viewId)
                    }
                }

            } else {

                const res = await callAPI(HTTPMETHOD.PUT, params, `/api/admin/font-subscription/cs/update-start-date`, token);
                if (res) {
                    alert('폰트 구독 시작일이 변경 되었습니다.');

                    // 유저의 구독리스트 불러오기
                    if (viewId) {
                        ApiGetDetailPopupData(viewId)
                    }
                }

            }

            closeAdminAddSubsStartPopup();

            return true;
        } catch (e: any) {
            if (e === null) return;
            alert(
                '처리 중 문제가 발생하였습니다.\n반복될 경우, 관리자에게 문의하여 주세요.',
            );
            return false;
        } finally {
            hideLoading();
        }

    }

    // #endregion 유저 구독리스트 ==============================================
    // #region 유저 탈퇴 ==============================================
    const { showPopup } = useConfirmPopupStore();
    const handleCancelClick = () => {
        if (viewId) {

            showPopup({
                title: <p>사용자 탈퇴를 진행할까요?</p>,
                desc: <p>탈퇴 시 모든 개인정보 및 이용내역이 삭제되며<br />이후 복구할 수 없으며, 구독 중인 서비스가 있는지<br />확인 후 탈퇴처리해주세요.<br />정말 탈퇴처리하시겠습니까?</p>,
                onConfirm: () => {
                    withdrawUser(viewId)
                },
                onCancel: () => {
                    return false;
                }
            });
        }
    };
    const withdrawUser = async (id: string) => {
        showLoading();
        if (!id || id === '') {
            alert('삭제할 항목이 없습니다.');
            return;
        }
        const token = getAccessToken();
        if (token === '') {
            alert('로그인 해주세요.');
            return;
        }
        try {
            const res = await callAPI(HTTPMETHOD.PATCH, { reason: 'OTHER' }, `/api/admin/user/${id}/withdraw`, token);
            if (res) {
                alert('탈퇴처리 됐습니다.');
                // router.push(BOARD_URL);
                callView()
            }
            return true;
        } catch (e: any) {
            if (e === null) return;
            alert(
                '처리 중 문제가 발생하였습니다.\n반복될 경우, 관리자에게 문의하여 주세요.',
            );
            return false;
        } finally {
            hideLoading();
        }
    }
    // #endregion 유저 탈퇴 ===========================================
    return (
        <AdmWrapper>
            <AdmPageTop title={`회원 ${viewId == null ? '등록' : '수정'}하기`} depth1={'회원 관리'} depth2={`회원 ${viewId == null ? '등록' : '수정'}하기`} />
            <AdmViewBox>
                <>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>

                            <AdmViewTableTitle>
                                <AdmViewTableTitleText title={'개인정보'} />
                            </AdmViewTableTitle>
                            <AdmViewMakeTable
                                values={viewTableObject}
                                setValues={setViewTableObject}
                            />
                        </div>
                        {
                            // 탈퇴된 회원일 경우 보여주는 정보 테이블
                            isWithdrawUser &&
                            <div>

                                <AdmViewTableTitle>
                                    <AdmViewTableTitleText title={'탈퇴 회원'} />
                                </AdmViewTableTitle>
                                <AdmViewMakeTable
                                    values={viewTableObject3}
                                    setValues={setViewTableObject3}
                                />
                            </div>
                        }
                        <div>

                            <AdmViewTableTitle>
                                <AdmViewTableTitleText title={'수신동의'} />
                            </AdmViewTableTitle>
                            <AdmViewMakeTable
                                values={viewTableObject2}
                                setValues={setViewTableObject2}
                            />
                        </div>
                        {
                            viewId &&
                            <div>

                                <AdmViewTableTitle>
                                    <AdmViewTableTitleText title={'운영 관리 정보'} />
                                </AdmViewTableTitle>
                                <AdmViewMakeTable
                                    values={viewTableObject4}
                                    setValues={setViewTableObject4}
                                />
                            </div>
                        }
                        {
                            viewId &&
                            <div>
                                <div>
                                    <p style={{ fontSize: '24px', fontWeight: 600, marginBottom: '8px' }}>활동 정보</p>
                                    <AdmPageExplnation theme={'blue'} titleBlack={
                                        <div style={{
                                            width: '22px', height: '22px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '8px'
                                        }}>
                                            < svg width="21" height="20" viewBox="0 0 21 20" fill="none" >
                                                <g clipPath="url(#clip0_3784_18110)">
                                                    <path d="M18.5352 10C18.5352 5.30558 14.7296 1.5 10.0352 1.5C5.34074 1.5 1.53516 5.30558 1.53516 10C1.53516 14.6944 5.34074 18.5 10.0352 18.5V20C4.51231 20 0.0351562 15.5228 0.0351562 10C0.0351562 4.47715 4.51231 0 10.0352 0C15.558 0 20.0352 4.47715 20.0352 10C20.0352 15.5228 15.558 20 10.0352 20V18.5C14.7296 18.5 18.5352 14.6944 18.5352 10Z" fill="#2E5AAC" />
                                                    <path d="M9.28516 10V6C9.28516 5.58579 9.62094 5.25 10.0352 5.25C10.4494 5.25 10.7852 5.58579 10.7852 6V10C10.7852 10.4142 10.4494 10.75 10.0352 10.75C9.62094 10.75 9.28516 10.4142 9.28516 10Z" fill="#2E5AAC" />
                                                    <path d="M10.0449 13.25C10.4591 13.25 10.7949 13.5858 10.7949 14C10.7949 14.4142 10.4591 14.75 10.0449 14.75H10.0352C9.62094 14.75 9.28516 14.4142 9.28516 14C9.28516 13.5858 9.62094 13.25 10.0352 13.25H10.0449Z" fill="#2E5AAC" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_3784_18110">
                                                        <rect width="20" height="20" fill="white" transform="translate(0.0351562)" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </div>
                                    } titleRed={'아래 내역은 최신 5개가 출력됩니다. 자세한 정보를 확인하려면 “더보기"를 클릭해주세요.'} />
                                </div>
                                <AdmUserSubscriptionList openMore={openMore} openAddSubs={openAddSubs} openAddSubsStart={openAddSubsStart} data={detailPopupData} status={dettailPopupStatus} statusChange={setDetailPopupStatus} />
                            </div>
                        }
                        {
                            viewId &&
                            detailMorePopupSwitch &&
                            <AdmSubsUserPopup close={closeMore} data={detailPopupData} status={'success'} statusChange={setDetailPopupStatus} />
                        }
                        {
                            viewId &&
                            detailAddSubsPopupSwitch &&
                            <AdminAddSubsPopup onClose={closeAdminAddSubsPopup}
                                userName={userEmail.current || ''}
                                postAdminAddSubs={handleSaveAdminAddSubs}
                            />
                        }
                        {
                            viewId &&
                            detailAddSubsStartPopupSwitch &&
                            <AdminAddSubsStartPopup onClose={closeAdminAddSubsStartPopup}
                                userName={userEmail.current || ''}
                                postAdminAddSubsStart={handleSaveAdminAddSubsStart}
                            />
                        }
                    </div>
                    <AdmViewNavBar
                        mode={viewId !== null ? 'edit' : 'save'}
                        save={save}
                        edit={edit}
                        onCancelConfirm={() => router.push(BOARD_URL)}
                        onDelete={
                            !isWithdraw
                                ? viewId
                                    ? handleCancelClick
                                    : undefined
                                : undefined
                        }
                        deleteTitle={'회원탈퇴설정'}
                    />
                    {/* <div onClick={make100user}>회원 100명 만들기</div> */}
                </>
            </AdmViewBox >
        </AdmWrapper >
    );
}

export default AdminUserInfoViewPage;