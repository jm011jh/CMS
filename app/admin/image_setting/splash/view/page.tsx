'use client';

import { basicThemeColors } from '@/app/admin/assets/theme';
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
import { FormEvent, useEffect, useMemo, useState } from 'react';

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
const API_URL_GET = '/api/admin/splash/detail/';
const API_URL = '/api/admin/splash';
const BOARD_URL = '/admin/image_setting/splash';

const AdminImageSettingSplashViewPage: React.FC = () => {

    const leftBox: React.CSSProperties = {
        width: '293px', minWidth: '293px', height: '488px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        borderTop: `solid 1px ${basicThemeColors.gray300}`,
        borderRight: `solid 1px ${basicThemeColors.gray300}`,
        borderBottom: `solid 1px ${basicThemeColors.gray300}`,
        backgroundColor: basicThemeColors.white,
        transform: 'translateX(-2px)',
    }


    const leftBoxItem: React.CSSProperties = {
        width: '261px', minWidth: '261px', height: '446px', border: `solid 1px ${basicThemeColors.gray300}`, borderRadius: '32px', overflow: 'hidden', position: 'relative', padding: '15px',
    }

    const leftBoxImage: React.CSSProperties = {
        width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px', border: `solid 1px ${basicThemeColors.gray300}`,
    };




    const router = useRouter();
    const searchParams = useSearchParams();
    const viewId = searchParams.get('id');
    const [viewTableObject, setViewTableObject] = useState<
        AdmViewMakeTableObjectType[]
    >([
        {
            placeholder: '이미지 설정',
            inputKey: 'image_type',
            label: '타입선택 *',
            value: 'Y',
            isFirst: true,
            isLast: false,
            inputType: 'radio',
            selectOptions: [
                { label: '직접 업로드', value: 'Y' },
                { label: '기본 이미지', value: 'N' },
            ]
        },

        {
            placeholder: '· 앱이 실행되는 화면에서 처음 나타나는 인트로 이미지 입니다.<br>· 해상도나 사이즈가 큰 이미지는 로딩이 길어지거나 오류가 발생할 수<br/>&nbsp;&nbsp;있으므로 권장 해상도와 사이즈에 맞추어 적용 하기를 권장합니다.<br>· 디바이스 크기 별 해상도가 다르며, 크기별로 자동 리사이징하여 등록됩니다.',
            inputKey: 'files',
            label: '이미지 *',
            value: [],
            isFirst: false,
            isLast: false,
            inputType: 'images',
            maxLength: 1, // 최대 이미지 개수 설정
            required: true,
        },

        {
            placeholder: '이미지 변경 사유 혹은 메모를 입력해주세요 (200자내외)',
            inputKey: 'title',
            label: '설명',
            value: "",
            defaultValue: " ",
            isFirst: false,
            isLast: false,
            inputType: 'text',
        },

        {
            placeholder: '변경일시를 입력하세요.',
            inputKey: 'updateDate',
            label: '변경일시 *',
            value: null,
            isFirst: false,
            isLast: true,
            inputType: 'date',
            desc: '푸시알림 시간을 설정하지 않으면 즉시 알림갑니다.\n1',
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
                data: T_BOARD_BANNER_POST;
                message: string;
            } = await callAPI(HTTPMETHOD.GET, {}, url, token)

            updateValue('order', result.data.order || 0, setViewTableObject);
            updateValue('label', result.data.label || null, setViewTableObject);
            updateValue('title', result.data.title, setViewTableObject);
            updateValue('content', result.data.content || ' ', setViewTableObject);
            updateValue('link', result.data.link || '', setViewTableObject);
            updateValue('files', result.data.files, setViewTableObject);
            updateValue('openDate', result.data.openDate, setViewTableObject);
            updateValue('endDate', result.data.endDate, setViewTableObject);
        } catch (e: any) {
            console.error("Error fetching notice details:", e);
            // alert('정보를 불러오는 데 실패했습니다.');
            alert('준비중 입니다.')
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


    const thumbnailImage = useMemo(() => {
        const imageType = viewTableObject.find((item) => item.inputKey === 'image_type')?.value;
        const files = viewTableObject.find((item) => item.inputKey === 'files')?.value;
        if (imageType === 'N') {
            return '/image/splash_default.png';
        } else {
            if (Array.isArray(files) && files.length > 0 && files[0] instanceof File) {
                return URL.createObjectURL(files[0] as File);
            } else {
                return undefined;
            }
        }
    }, [viewTableObject[0], viewTableObject[1]]);

    return (
        <AdmWrapper>
            <AdmPageTop title={`스플래쉬 이미지 관리`} depth1={'이미지 관리'} depth2={`스플래쉬 이미지 ${viewId == null ? '등록' : '수정'}하기`} />
            <AdmViewBox>
                <>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <AdmViewMakeTable
                            values={viewTableObject}
                            setValues={setViewTableObject}
                        />
                        <div style={leftBox}>
                            <div style={leftBoxItem}>
                                <img
                                    style={leftBoxImage}
                                    src={thumbnailImage}
                                />
                            </div>
                        </div>
                    </div>
                    <AdmViewNavBar
                        mode={viewId !== null ? 'edit' : 'save'}
                        save={save}
                        edit={edit}
                        onCancelConfirm={() => router.back()}
                    />
                </>
            </AdmViewBox>
        </AdmWrapper>
    );
}

export default AdminImageSettingSplashViewPage;