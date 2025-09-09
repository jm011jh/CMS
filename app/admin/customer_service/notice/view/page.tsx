'use client';

import AdmPageTop from '@/app/admin/components/design/AdmPageTop';
import AdmViewBox from '@/app/admin/components/design/AdmViewBox';
import AdmViewMakeTable from '@/app/admin/components/design/AdmViewMakeTable';
import AdmViewNavBar from '@/app/admin/components/design/AdmViewNavBar';
import AdmWrapper from '@/app/admin/components/design/AdmWrapper';
import apiDeleteBoardItem from '@/app/admin/lib/apiDeleteBoardItem';
import updateValue from '@/app/admin/lib/updateValue';
import validationCheckToken from '@/app/admin/lib/validationCheckToken';
import { T_UPLOAD_DIRECTORY } from '@/app/admin/lib/viewDataFilesUpload';
import handleSubmit from '@/app/admin/lib/viewDataHandleSubmit';
import { useConfirmPopupStore } from '@/app/admin/store/confirmPopupStore';
import useLoadingScreenStore from '@/app/admin/store/loadingScreenStore';
import { useToast } from '@/app/admin/store/useToastStore';
import { AdmViewMakeTableObjectType, I_PROCESSED_FILE } from '@/app/admin/type';
import { callAPI, HTTPMETHOD } from '@/lib/util/callApi';
import { getAccessToken } from '@/lib/util/tokenClass';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
type T_BOARD_MEDIA_POST = {
    category: string;
    openDate: string;
    tag?: string;
    title: string;
    content: string;
    video: string;
    files: I_PROCESSED_FILE[];
};
const S3_IMAGE_PATH: T_UPLOAD_DIRECTORY = 'media/img';
const API_URL_GET = '/api/admin/cs/notice/detail/';
const API_URL = '/api/admin/cs/notice';
const BOARD_URL = '/admin/customer_service/notice';

const AdminAppNoticeViewPage: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const viewId = searchParams.get('id');
    const [viewTableObject, setViewTableObject] = useState<
        AdmViewMakeTableObjectType[]
    >([
        {
            placeholder: '제목을 입력해주세요. / 제목 글자수 100자 내외',
            inputKey: 'title',
            label: '제목 *',
            value: '',
            isFirst: true,
            isLast: false,
            inputType: 'text',
            required: true,
            requireOptions: {
                maxLength: 100
            }
        },
        {
            placeholder: '3000자 내외 내용을 입력해주세요.',
            inputKey: 'content',
            label: '내용 *',
            value: '',
            isFirst: false,
            isLast: false,
            // inputType: 'textarea',
            inputType: 'editorImage',
            required: true,
            requireOptions: {
                maxLength: 3000
            }
        },
        // {
        //     placeholder: '10mb이하의 jpg, png 형식의 파일만 등록됩니다.  (가로형 16:9 / 세로형 3:4 비율 권장)',
        //     inputKey: 'files',
        //     label: '이미지',
        //     value: [] as any, // API response for files might need casting or specific typing
        //     isFirst: false,
        //     isLast: false,
        //     inputType: 'images',
        //     maxLength: 1,
        // },
        {
            placeholder: '유튜브 영상 아이디를 입력해주세요.',
            inputKey: 'video',
            label: '동영상',
            value: '',
            isFirst: false,
            isLast: true,
            inputType: 'text',
            containConstructedValue: 'https://www.youtube.com/watch?v=', // 동영상 URL은 필수 입력값이 아님
        },
    ]);
    useEffect(() => {
        if (viewId) {
            callView();
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
                data: T_BOARD_MEDIA_POST;
                message: string;
            } = await callAPI(HTTPMETHOD.GET, {}, url, token)
            updateValue('category', result.data.category || '', setViewTableObject);
            updateValue('title', result.data.title || '', setViewTableObject);
            updateValue('content', result.data.content || '', setViewTableObject);
            updateValue('video', result.data.video || '', setViewTableObject);

        } catch (e: any) {
            console.error("Error fetching notice details:", e);
            alert('정보를 불러오는 데 실패했습니다.');
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

        await handleSubmit('save', router, viewId, viewTableObject, S3_IMAGE_PATH, API_URL, BOARD_URL)
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

        await handleSubmit('edit', router, viewId, viewTableObject, S3_IMAGE_PATH, API_URL, BOARD_URL)
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

    const API_URL_DELETE = 'deleteUrl'; // Define the API URL for deletion
    const { showPopup } = useConfirmPopupStore()
    const deleteItem = () => {
        if (!viewId) return;
        showPopup({
            title: <p>삭제 전 확인해주세요</p>,
            desc: <p>삭제된 정보는 사용자에게 노출되지 않으며<br />복구가 불가능합니다.<br />정말 삭제하시겠습니까?</p>,
            onConfirm: () => {
                showLoading();
                apiDeleteBoardItem(viewId, API_URL_DELETE, () => { }).finally(() => {
                    hideLoading();
                });
                // 팝업에서 "확인"을 눌렀을 때의 동작
            },
            onCancel: () => {
                // 팝업에서 "취소"를 눌렀을 때 (팝업이 닫히는 것 외 추가 동작 필요시)
            }
        });
    };

    return (
        <AdmWrapper>
            <AdmPageTop title={`앱 공지사항 ${viewId == null ? '등록' : '수정'}하기`} depth1={'앱 공지사항 관리'} depth2={`앱 공지사항 ${viewId == null ? '등록' : '수정'}하기`} />
            <AdmViewBox>
                <>
                    {/* <AdmPageExplnation titleRed={'공개 예정일에 맞추어 푸시알림이 자동으로 발송됩니다.'} /> */}
                    <AdmViewMakeTable
                        values={viewTableObject}
                        setValues={setViewTableObject}
                    />

                    < AdmViewNavBar
                        mode={viewId !== null ? 'edit' : 'save'}
                        save={save}
                        edit={edit}
                        onDelete={viewId !== null ? deleteItem : undefined}
                        onCancelConfirm={() => router.push(BOARD_URL)}
                    />
                </>
            </AdmViewBox>
        </AdmWrapper>
    );
}

export default AdminAppNoticeViewPage;