'use client';

import AdmPageExplnation from '@/app/admin/components/design/AdmPageExplnation';
import AdmPageTop from '@/app/admin/components/design/AdmPageTop';
import AdmViewBox from '@/app/admin/components/design/AdmViewBox';
import AdmViewMakeTable from '@/app/admin/components/design/AdmViewMakeTable';
import AdmViewNavBar from '@/app/admin/components/design/AdmViewNavBar';
import AdmWrapper from '@/app/admin/components/design/AdmWrapper';
import updateValue from '@/app/admin/lib/updateValue';
import validationCheckToken from '@/app/admin/lib/validationCheckToken';
import { T_UPLOAD_DIRECTORY } from '@/app/admin/lib/viewDataFilesUpload';
import handleSubmit from '@/app/admin/lib/viewDataHandleSubmit';
import useLoadingScreenStore from '@/app/admin/store/loadingScreenStore';
import { useToast } from '@/app/admin/store/useToastStore';
import { AdmViewMakeTableObjectType, I_PROCESSED_FILE } from '@/app/admin/type';
import { callAPI, HTTPMETHOD } from '@/lib/util/callApi';
import { getAccessToken } from '@/lib/util/tokenClass';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useEffect, useRef, useState } from 'react';

type T_BOARD_BANNER_POST = {
    category: string;
    order: number | string;
    title: string;
    link: string;
    label: string;
    content: string;
    openDate: string;
    endDate: string;
    files: I_PROCESSED_FILE[];
};
const S3_IMAGE_PATH: T_UPLOAD_DIRECTORY = 'banner/img';
const API_URL_GET = '/api/admin/banner/detail/';
const API_URL = '/api/admin/banner';
const BOARD_URL = '/admin/setting/banner';

const AdminImageSettingBannerViewPage: React.FC = () => {
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
            value: '',
            isFirst: true,
            isLast: false,
            inputType: 'text',
            desc: '숫자가 높을수록 상위, 숫자가 낮을수록 하위입니다.',
            required: true,
            requireOptions: {
                isNumber: true,
                minLength: 1,
            }
        },
        {
            placeholder: '라벨을 입력하세요.',
            inputKey: 'label',
            label: '라벨',
            value: '',
            isFirst: false,
            isLast: false,
            inputType: 'text',
            textMinLength: 1,
            textMaxLength: 10,
            requireOptions: {
                maxLength: 10,
            }
        },
        {
            placeholder: '제목을 입력하세요. / 제목 글자수 100자 이내',
            inputKey: 'title',
            label: '제목 *',
            value: '',
            isFirst: false,
            isLast: false,
            inputType: 'text',
            required: true,
            requireOptions: {
                minLength: 1,
                maxLength: 100,
            }
        },

        {
            placeholder: '5000자 이내 내용을 입력해주세요.',
            inputKey: 'content',
            label: '내용',
            value: "",
            defaultValue: " ",
            isFirst: false,
            isLast: false,
            inputType: 'textarea',
        },

        // {
        //     placeholder: '링크를 입력해주세요.',
        //     inputKey: 'link',
        //     label: '링크연결',
        //     value: '',
        //     defaultValue: null,
        //     isFirst: false,
        //     isLast: false,
        //     inputType: 'select&text',
        //     desc: "내부링크 예시 : 목록일 경우 공란, 상세일 경우 detail/1 \n 외부 링크 예시 : jisoo.fan/",
        //     selectOptions: [
        //         { label: '구독', value: 'jisoo://subscribe/' },
        //         { label: '미디어', value: 'jisoo://media/' },
        //         { label: '스케줄', value: 'jisoo://schedule/' },
        //         { label: '공지사항', value: 'jisoo://notice/' },
        //         { label: '푸시알림', value: 'jisoo://push/' },
        //         { label: '외부링크연결', value: 'https://' },
        //         { label: '링크없음', value: '' },
        //     ],
        // },
        {
            placeholder: '링크를 입력해주세요.',
            inputKey: 'link',
            label: '링크연결',
            value: '',
            isFirst: false,
            isLast: false,
            inputType: 'select&text',
            desc: "미디어 : 목록일 경우 공란, 상세일 경우 detail/1 \n 공지사항 : 목록일 경우 공란, 상세일 경우 detail/1 \n 스케줄 : 목록으로 이동 \n 외부 링크 : (예) jisoo.fan/",
            selectOptions: [
                // { label: '구독', value: 'jisoo://subscribe/' },
                // { label: '푸시알림', value: 'jisoo://push/' },
                { label: '미디어', value: 'jisoo://media/' },
                { label: '공지사항', value: 'jisoo://notice/' },
                { label: '스케줄', value: 'jisoo://schedule/' },
                { label: '외부링크연결', value: 'https://' },
            ],
        },
        {
            placeholder: '10mb이하의 jpg, png 형식의 파일만 등록됩니다.  (대표이미지 16:9 비율 권장)',
            inputKey: 'files',
            label: '썸네일 *',
            value: [],
            isFirst: false,
            isLast: false,
            inputType: 'images',
            maxLength: 1, // 최대 이미지 개수 설정
            required: true,
        },
        {
            placeholder: '공개 예정일를 입력하세요.',
            inputKey: 'openDate',
            label: '공개 예정일',
            value: null,
            isFirst: false,
            isLast: false,
            inputType: 'date',
            desc: '공개 예정일을 설정하지 않으면 즉시 등록됩니다.',
        },
        {
            placeholder: '게시 종료일를 입력하세요.',
            inputKey: 'endDate',
            label: '게시 종료일',
            value: null,
            isFirst: false,
            isLast: true,
            inputType: 'date',
            desc: '게시 종료일을 설정하지 않으면 즉시 등록됩니다.',
        },
    ]);
    useEffect(() => {
        if (viewId) {
            callView();
        }
    }, [viewId]);

    // useRef to keep track of previous link value for avoiding infinite loops
    const prevLinkValueRef = useRef<string>('');

    useEffect(() => {

        //pushType에 따라 link 필드의 값을 업데이트
        // jisoo://push/ 와 jisoo://schedule/ 링크가 선택되었을 때는 input 필드를 비활성화하고,
        // 해당 링크로 초기화합니다.
        const target = viewTableObject.find((item) => item.inputKey === 'link')?.value || '';

        // 이전 값과 현재 값이 같으면 로직 실행하지 않음 (무한 루프 방지)
        if (prevLinkValueRef.current === target.toString()) {
            return;
        }

        if (target.toString().startsWith('jisoo://push/') || target.toString().startsWith('jisoo://schedule/')) {
            // html tag 에서 id가 'link-text'인 요소를 찾아서 해당 요소의 value를 'jisoo://push/'로 설정
            document.getElementById('link-text')?.setAttribute('disabled', 'true');
            const linkTextInput = document.getElementById('link-text') as HTMLInputElement
            if (linkTextInput) {
                linkTextInput.value = '';
            }
            document.getElementById('link-text')?.setAttribute('placeholder', '');

            const clearTarget = target.toString().startsWith('jisoo://push/') ? 'jisoo://push/' : 'jisoo://schedule/';

            // clearTarget이 현재 target과 다를 때만 업데이트
            if (target !== clearTarget) {
                prevLinkValueRef.current = clearTarget; // 미리 저장하여 무한 루프 방지
                updateValue('link', clearTarget, setViewTableObject);
            }

        } else {
            document.getElementById('link-text')?.removeAttribute('disabled');
            document.getElementById('link-text')?.setAttribute('placeholder', '링크를 입력해주세요.');
        }
        prevLinkValueRef.current = target.toString(); // 현재 값을 저장

    }, [viewTableObject])

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
                data: T_BOARD_BANNER_POST;
                message: string;
            } = await callAPI(HTTPMETHOD.GET, {}, url, token)

            updateValue('order', result.data.order || 0, setViewTableObject);
            updateValue('label', result.data.label || null, setViewTableObject);
            updateValue('title', result.data.title, setViewTableObject);
            updateValue('content', result.data.content || ' ', setViewTableObject);
            updateValue('link', result.data.link, setViewTableObject);
            updateValue('files', result.data.files, setViewTableObject);
            updateValue('openDate', result.data.openDate, setViewTableObject);
            updateValue('endDate', result.data.endDate, setViewTableObject);
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
        const updatedViewTableObject = viewTableObject.map(item => {
            if (item.inputKey === 'content' && item.value === '') {
                return { ...item, value: ' ' }; // Create a new object with the updated value
            }
            return item; // Return the original object if no change is needed
        })
        await handleSubmit('save', router, viewId, updatedViewTableObject, S3_IMAGE_PATH, API_URL, BOARD_URL)
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
    return (
        <AdmWrapper>
            <AdmPageTop title={`메인 배너 ${viewId == null ? '등록' : '수정'}하기`} depth1={'메인 배너 관리'} depth2={`메인 배너 ${viewId == null ? '등록' : '수정'}하기`} />
            <AdmViewBox>
                <>
                    <AdmPageExplnation titleRed={'공개 예정일에 맞추어 푸시알림이 자동으로 발송됩니다.'} />
                    <AdmViewMakeTable
                        values={viewTableObject}
                        setValues={setViewTableObject}
                    />
                    <AdmViewNavBar
                        mode={viewId !== null ? 'edit' : 'save'}
                        save={save}
                        edit={edit}
                        onCancelConfirm={() => router.push(BOARD_URL)}
                    />
                </>
            </AdmViewBox>
        </AdmWrapper>
    );
}

export default AdminImageSettingBannerViewPage;