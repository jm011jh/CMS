'use client';

import AdmPageExplnation from '@/app/admin/components/design/AdmPageExplnation';
import AdmPageTop from '@/app/admin/components/design/AdmPageTop';
import AdmViewBox from '@/app/admin/components/design/AdmViewBox';
import AdmViewMakeTable from '@/app/admin/components/design/AdmViewMakeTable';
import AdmViewNavBar from '@/app/admin/components/design/AdmViewNavBar';
import AdmViewTableTitle, { AdmViewTableTitleText } from '@/app/admin/components/design/AdmViewTableTitle';
import AdmWrapper from '@/app/admin/components/design/AdmWrapper';
import updateDisabled from '@/app/admin/lib/updateDisabled';
import updateIsHidden from '@/app/admin/lib/updateIsHidden';
import updateValue from '@/app/admin/lib/updateValue';
import validationCheckToken from '@/app/admin/lib/validationCheckToken';
import { T_UPLOAD_DIRECTORY } from '@/app/admin/lib/viewDataFilesUpload';
import handleSubmit from '@/app/admin/lib/viewDataHandleSubmit';
import { useConfirmPopupStore } from '@/app/admin/store/confirmPopupStore';
import useLoadingScreenStore from '@/app/admin/store/loadingScreenStore';
import { AdmViewMakeTableObjectType } from '@/app/admin/type';
import { callAPI, HTTPMETHOD } from '@/lib/util/callApi';
import { getAccessToken } from '@/lib/util/tokenClass';
import dayjs from 'dayjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

const S3_IMAGE_PATH: T_UPLOAD_DIRECTORY = 'notice/img';
const API_URL_GET = '/api/admin/cs/inquiry/detail/';
const API_URL = '/api/admin/cs/inquiry';
const BOARD_URL = '/admin/customer_service/inquiries';

const AdminInquiriesViewPage: React.FC = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const viewId = searchParams.get('id');
    const [viewTableObject, setViewTableObject] = useState<
        AdmViewMakeTableObjectType[]
    >([
        {
            placeholder: ' ',
            inputKey: 'email',
            label: '이메일',
            value: '',
            isFirst: true,
            isLast: true,
            inputType: 'text',
            disabled: true,
            notInPayload: true,
        },
    ]);
    const [viewTableObject2, setViewTableObject2] = useState<
        AdmViewMakeTableObjectType[]
    >([
        {
            placeholder: ' ',
            inputKey: 'regDate',
            label: '작성 일자',
            value: '',
            isFirst: true,
            isLast: false,
            inputType: 'text',
            disabled: true,
            notInPayload: true,
        },
        {
            placeholder: ' ',
            inputKey: 'title',
            label: '제목',
            value: '',
            isFirst: false,
            isLast: false,
            inputType: 'text',
            required: true,
            requireOptions: {
                maxLength: 100
            },
            disabled: true,
            notInPayload: true,
        },
        {
            placeholder: ' ',
            inputKey: 'content',
            label: '내용',
            value: '',
            isFirst: false,
            isLast: false,
            inputType: 'textarea',
            disabled: true,
            notInPayload: true,
        },
        {
            placeholder: '10mb이하의 00 X 00px jpg, png 형식의 파일만 등록됩니다.',
            inputKey: 'files',
            label: '이미지',
            value: [] as any,
            isFirst: false,
            isLast: true,
            inputType: 'images',
            disabled: true,
            notInPayload: true,
        },
    ]);
    const [viewTableObject3, setViewTableObject3] = useState<
        AdmViewMakeTableObjectType[]
    >([
        {
            placeholder: ' ',
            inputKey: 'id',
            label: 'ID',
            value: '',
            isFirst: true,
            isLast: false,
            inputType: 'text',
            required: true,
            requireOptions: {
                maxLength: 100
            },
            isHidden: true,
            disabled: true,
            notInPayload: false,
        },
        {
            placeholder: '답변을 입력해주세요.',
            inputKey: 'replyDate',
            label: '답변 일자',
            value: '',
            isFirst: true,
            isLast: false,
            inputType: 'text',
            disabled: true,
            notInPayload: true,
            isHidden: true,
        },
        {
            placeholder: '답변을 입력해주세요.',
            inputKey: 'reply',
            label: '답변 *',
            value: '',
            isFirst: false,
            isLast: true,
            inputType: 'textarea',
            required: true,
            requireOptions: {
                maxLength: 3000
            },
            disabled: false,
        },
        {
            placeholder: '답변 언어를 선택해주세요.',
            inputKey: 'uiLang',
            label: '답변 언어',
            value: '',
            isFirst: false,
            isLast: true,
            inputType: 'select',
            selectOptions: [
                { label: '한국어', value: 'ko' },
                { label: '영어', value: 'en' },
                // { label: '중국어 - 간체', value: 'zh-CN' },
                // { label: '중국어 - 번체', value: 'zh-TW' },
                // { label: '일본어', value: 'ja' },
                // { label: '스페인어', value: 'es' },
                // { label: '프랑스어', value: 'fr' },
                // { label: '독일어', value: 'de' },
                // { label: '러시아어', value: 'ru' },
                // { label: '포르투갈어', value: 'pt' },
                // { label: '이탈리아어', value: 'it' },
                // { label: '베트남어', value: 'vi' },
                // { label: '태국어', value: 'th' },
                // { label: '인도네시아어', value: 'id' },
                // { label: '힌디어', value: 'hi' },
            ],
        },
    ]);

    // #region API ======================================================================

    const [replied, setReplied] = useState<boolean>(false);

    const callView = async () => {

        const token = getAccessToken();
        if (!validationCheckToken(token)) {
            alert('로그인 해주세요.');
            return;
        }

        try {

            const url = `${API_URL_GET}${viewId}`;
            const result: any = await callAPI(HTTPMETHOD.GET, {}, url, token)
            return result;

        } catch (e: any) {
            throw e;
        }
    };

    useEffect(() => {
        if (viewId) {
            callView()
                .then((result) => {
                    console.log(result.data)
                    updateValue('email', result.data.email || '', setViewTableObject);
                    updateValue('regDate', dayjs(result.data.regDate).format('YYYY.MM.DD HH:mm') || '', setViewTableObject2);
                    updateValue('title', result.data.title || '', setViewTableObject2);
                    updateValue('content', result.data.content || '', setViewTableObject2);
                    updateValue('files', result.data.files?.filter((item: any) => item.fileType == 'IMG') || [], setViewTableObject2);
                    updateValue('id', result.data.id || '', setViewTableObject3);
                    updateValue('uiLang', result.data.uiLang || '', setViewTableObject3);
                    updateValue('reply', result.data.reply || '', setViewTableObject3);
                    updateValue('replyDate', dayjs(result.data.replyDate).format('YYYY.MM.DD HH:mm') || '', setViewTableObject3);
                    updateIsHidden('replyDate', !result.data.reply, setViewTableObject3);
                    if (result.data.reply) {
                        updateDisabled('reply', true, setViewTableObject3);
                        updateIsHidden('uiLang', true, setViewTableObject3);
                        setReplied(true);
                    }

                }).catch((e) => {
                    alert('정보를 불러오는 데 실패했습니다.');
                })
        }
    }, [viewId]);

    // #endregion API ===================================================================

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { showPopup } = useConfirmPopupStore()
    const { showLoading, hideLoading } = useLoadingScreenStore();
    const edit = async (event?: FormEvent) => {

        showPopup({
            title: <p></p>,
            desc: <p>
                답변은 사용자 메일로 즉시 발송됩니다.<br />
                발송 완료 후 회수 및 수정이 불가능합니다.<br />
                답변을 보낼까요?</p>,
            onConfirm: async () => {
                showLoading();
                if (event) event.preventDefault();
                if (isLoading) return; // 중복 제출 방지
                setIsLoading(true);
                showLoading();
                await handleSubmit('edit', router, viewId, viewTableObject3, S3_IMAGE_PATH, API_URL)
                    .then(() => {
                        completePopupOpen()
                    })
                    .catch((error) => {
                        alert(`답변 전송 중 오류가 발생했습니다: ${error instanceof Error ? error.message : String(error)}`);
                    }).finally(() => {
                        setIsLoading(false);
                        hideLoading();
                    })
                // 팝업에서 "확인"을 눌렀을 때의 동작
            },
            onCancel: () => {
                // 팝업에서 "취소"를 눌렀을 때 (팝업이 닫히는 것 외 추가 동작 필요시)
            }
        });

    };

    const completePopupOpen = () => {
        setIsLoading(true);
        showLoading();
        showPopup({
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M22.1816 6.62628C22.572 6.23583 23.2051 6.23597 23.5956 6.62628C23.9862 7.01681 23.9862 7.64982 23.5956 8.04034L11.3743 20.263C10.9839 20.6534 10.3508 20.6531 9.96021 20.263L4.40422 14.707C4.0137 14.3165 4.0137 13.6835 4.40422 13.2929C4.77036 12.9268 5.34999 12.9035 5.74276 13.2239L5.81828 13.2929L10.6659 18.1406L22.1816 6.62628Z" fill="#ADAAC7" />
            </svg>,
            title: <p>답변 발송 완료</p>,
            desc: <p>문의 메일이 발송되었습니다.</p>,
            onConfirm: () => {
                router.back()
            },
            hideCancelButton: true // 취소 버튼 숨김
        });
    }
    const onCancelConfirm = () => {
        router.push(BOARD_URL)
    }
    return (
        <AdmWrapper>
            <AdmPageTop title={`문의사항 ${viewId == null ? '등록하기' : '상세보기'}`} depth1={'문의사항 관리'} depth2={`문의사항 ${viewId == null ? '등록' : '수정'}하기`} />
            <AdmViewBox>
                <>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                            <AdmViewTableTitle>
                                <AdmViewTableTitleText title={'회원정보'} />
                            </AdmViewTableTitle>
                            <AdmViewMakeTable
                                values={viewTableObject}
                                setValues={setViewTableObject}
                            />
                        </div>
                        <div>
                            <AdmViewTableTitle>
                                <AdmViewTableTitleText title={'문의내역'} />
                            </AdmViewTableTitle>
                            <AdmViewMakeTable
                                values={viewTableObject2}
                                setValues={setViewTableObject2}
                            />
                        </div>
                        <div>
                            <AdmViewTableTitle>
                                <AdmViewTableTitleText title={'답변'} />
                            </AdmViewTableTitle>
                            <AdmPageExplnation
                                theme={'blue'}
                                titleBlack={
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '8px' }}>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <g clipPath="url(#clip0_3675_25471)">
                                                <path d="M18.5 10C18.5 5.30558 14.6944 1.5 10 1.5C5.30558 1.5 1.5 5.30558 1.5 10C1.5 14.6944 5.30558 18.5 10 18.5V20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20V18.5C14.6944 18.5 18.5 14.6944 18.5 10Z" fill="#2E5AAC" />
                                                <path d="M9.25 10V6C9.25 5.58579 9.58579 5.25 10 5.25C10.4142 5.25 10.75 5.58579 10.75 6V10C10.75 10.4142 10.4142 10.75 10 10.75C9.58579 10.75 9.25 10.4142 9.25 10Z" fill="#2E5AAC" />
                                                <path d="M10.0098 13.25C10.424 13.25 10.7598 13.5858 10.7598 14C10.7598 14.4142 10.424 14.75 10.0098 14.75H10C9.58579 14.75 9.25 14.4142 9.25 14C9.25 13.5858 9.58579 13.25 10 13.25H10.0098Z" fill="#2E5AAC" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_3675_25471">
                                                    <rect width="20" height="20" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                }
                                titleRed={'답변은 사용자의 메일로 발송되며, 발송완료 후 회수/수정이 불가능합니다.'}
                            />
                            <AdmViewMakeTable
                                values={viewTableObject3}
                                setValues={setViewTableObject3}
                            />
                        </div>
                    </div>
                    <AdmViewNavBar
                        mode={replied ? 'view' : 'edit'}
                        editTitle={replied ? undefined : '답변 보내기'}
                        edit={replied ? undefined : edit}
                        onCancelConfirm={replied ? undefined : onCancelConfirm}
                        onGoBack={() => router.push(BOARD_URL)}
                    />
                </>
            </AdmViewBox>
        </AdmWrapper>
    );
}

export default AdminInquiriesViewPage;