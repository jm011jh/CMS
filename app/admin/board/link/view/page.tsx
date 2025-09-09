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
type T_BOARD_LINK_POST = {
    category: string;
    order: number | string;
    title: string;
    link: string;
    linkUs: string;
    linkJp: string;
    linkCn: string;
    files: I_PROCESSED_FILE[];
};
const S3_IMAGE_PATH: T_UPLOAD_DIRECTORY = 'link/img';
const API_URL_GET = '/api/admin/link/detail/';
const API_URL = '/api/admin/link';
const BOARD_URL = '/admin/board/link';

const AdminBoardLinkViewPage: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const viewId = searchParams.get('id');
    const [viewTableObject, setViewTableObject] = useState<
        AdmViewMakeTableObjectType[]
    >([
        {
            placeholder: '노출순위를 입력해주세요.',
            inputKey: 'order',
            label: '노출순위 *',
            value: '0',
            isFirst: true,
            isLast: false,
            inputType: 'text',
            desc: '숫자가 높을수록 상위, 숫자가 낮을수록 하위입니다.',
            required: true,
            onlyNumber: true,
            requireOptions: {
                maxLength: 999
            }
        },
        {
            placeholder: '외부링크 유형을 입력하세요.',
            inputKey: 'category',
            label: '카테고리 *',
            value: '',
            isFirst: true,
            isLast: false,
            inputType: 'select',
            selectOptions: [
                { value: 'MINI_ALBUM', label: '미니앨범' },
                { value: 'SNS', label: 'SNS' }
            ],
            required: true,
        },
        {
            placeholder: '제목을 입력하세요.',
            inputKey: 'title',
            label: '제목 *',
            value: '',
            isFirst: false,
            isLast: false,
            inputType: 'text',
            required: true,
        },

        {
            placeholder: '링크를 입력해주세요.',
            inputKey: 'link',
            label: '링크(KR) *',
            value: '',
            isFirst: false,
            isLast: false,
            inputType: 'text',
            required: true,
        },

        {
            placeholder: '링크를 입력해주세요.',
            inputKey: 'linkUs',
            label: '링크(EN)',
            value: '',
            isFirst: false,
            isLast: false,
            inputType: 'text',
        },
        {
            placeholder: '10mb이하의 00 X 00px jpg, png 형식의 파일만 등록됩니다.',
            inputKey: 'files',
            label: '이미지',
            value: [],
            isFirst: false,
            isLast: false,
            inputType: 'images',
            maxLength: 1, // 최대 이미지 개수 설정
        }
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
                data: T_BOARD_LINK_POST;
                message: string;
            } = await callAPI(HTTPMETHOD.GET, {}, url, token)

            updateValue('order', result.data.order || 0, setViewTableObject);
            updateValue('category', result.data.category || '', setViewTableObject);
            updateValue('title', result.data.title || '', setViewTableObject);
            updateValue('link', result.data.link || '', setViewTableObject);
            updateValue('linkUs', result.data.linkUs || '', setViewTableObject);
            updateValue('files', result.data.files || '', setViewTableObject);


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

    // #region delete item =================================================================
    const API_URL_DELETE = '/api/admin/link/'; // Define the API URL for deletion
    const { showPopup } = useConfirmPopupStore()
    const deleteItem = () => {
        if (viewId) {
            showPopup({
                title: <p>삭제 전 확인해주세요</p>,
                desc: <p>삭제된 정보는 사용자에게 노출되지 않으며<br />복구가 불가능합니다.<br />정말 삭제하시겠습니까?</p>,
                onConfirm: () => {
                    showLoading();
                    apiDeleteBoardItem(viewId, API_URL_DELETE).finally(() => {
                        hideLoading();
                        alert('삭제되었습니다.')
                        router.back();
                    });
                    // 팝업에서 "확인"을 눌렀을 때의 동작
                },
                onCancel: () => {
                    // 팝업에서 "취소"를 눌렀을 때 (팝업이 닫히는 것 외 추가 동작 필요시)
                }
            });
        }
    };
    // #endregion delete item ==============================================================
    return (
        <AdmWrapper>
            <AdmPageTop title={`외부링크 ${viewId == null ? '등록' : '수정'}하기`} depth1={'외부링크 관리'} depth2={`외부링크 ${viewId == null ? '등록' : '수정'}하기`} />
            <AdmViewBox>
                <>
                    <AdmViewMakeTable
                        values={viewTableObject}
                        setValues={setViewTableObject}
                    />
                    <AdmViewNavBar
                        mode={viewId !== null ? 'edit' : 'save'}
                        save={save}
                        edit={edit}
                        onDelete={viewId ? deleteItem : undefined}
                        onCancelConfirm={() => router.push(BOARD_URL)}
                    />
                </>
            </AdmViewBox>
        </AdmWrapper>
    );
}

export default AdminBoardLinkViewPage;