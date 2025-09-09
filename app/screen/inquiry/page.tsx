'use client';

import { basicThemeColors } from '@/app/admin/assets/theme';
import { T_UPLOAD_DIRECTORY } from '@/app/admin/lib/viewDataFilesUpload';
import handleSubmit from '@/app/admin/lib/viewDataHandleSubmit';
import useLoadingScreenStore from '@/app/admin/store/loadingScreenStore';
import { useToast } from '@/app/admin/store/useToastStore';
import { I_PROCESSED_FILE } from '@/app/admin/type';
import { AdmInputCheckbox } from '@/app/components/form/Input';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import ScreenLayout from '../components/ScreenLayout';
import ScreenViewMakeTable from '../components/ScreenViewMakeTable';
import '../components/screenComponents.css';
import { ScreenViewMakeTableObjectType } from '../components/type';
import { useScreenLanguageStore } from '../store/screenLanguageStore';

type T_BOARD_NOTICE_POST = {
    category: string;
    openDate: string;
    title: string;
    content: string;
    video: string;
    files: I_PROCESSED_FILE[];
};
const S3_IMAGE_PATH: T_UPLOAD_DIRECTORY = 'inquiry/img';
const API_URL = '/api/cs/inquiry';
const BOARD_URL = '/screen';

const AdminBoardNoticeViewPage: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const viewId = searchParams.get('id');
    const { language } = useScreenLanguageStore();
    const [viewTableObject, setViewTableObject] = useState<
        ScreenViewMakeTableObjectType[]
    >([]);

    useEffect(() => {
        setViewTableObject([
            {
                placeholder: '',
                inputKey: 'uiLang',
                label: '언어',
                value: language === 'KOR' ? 'ko' : 'en',
                isFirst: false,
                isLast: false,
                isHidden: true,
                inputType: 'text',
            },
            {
                placeholder: language === 'KOR' ? '문의사항 유형을 입력하세요.' : 'Enter the inquiry type.',
                inputKey: 'category',
                label: language === 'KOR' ? '문의 유형' : 'Inquiry type',
                value: '',
                isFirst: true,
                isLast: false,
                required: true,
                inputType: 'select',
                selectOptions: language === 'KOR' ?
                    [
                        { label: '이용/불편문의', value: '이용/불편문의' },
                        { label: '결제문의', value: '결제문의' },
                        { label: '콘텐츠문의', value: '콘텐츠문의' },
                        { label: '채팅문의', value: '채팅문의' },
                        { label: 'LIVE 문의', value: 'LIVE 문의' },
                        { label: '기타 문의', value: '기타 문의' },
                        { label: '서포트 및 이벤트 문의', value: '서포트 및 이벤트 문의' }
                    ] : [
                        { label: 'Usage/Inconvenience', value: '이용/불편문의' },
                        { label: 'Payment', value: '결제문의' },
                        { label: 'Content', value: '콘텐츠문의' },
                        { label: 'Chat', value: '채팅문의' },
                        { label: 'LIVE', value: 'LIVE 문의' },
                        { label: 'Other', value: '기타 문의' },
                        { label: 'Support/Event', value: '서포트 및 이벤트 문의' }
                    ]
            },
            {
                placeholder: language === 'KOR' ? '이메일을 입력해주세요.' : 'Enter your email.',
                inputKey: 'email',
                label: language === 'KOR' ? '답변받을 이메일 주소' : 'Email address to receive a reply',
                desc: language === 'KOR' ? 'JISOO 서비스에 회원 가입된 이메일을 입력해주셔야 정확한 답변을 받으실 수 있습니다.' : 'You need to enter the email address registered with the JISOO service to receive an accurate response.',
                value: '',
                isFirst: false,
                isLast: false,
                inputType: 'text',
                required: true,
                requireOptions: {
                    maxLength: 50
                }
            },
            {
                placeholder: language === 'KOR' ? '제목을 입력해주세요. (20자)' : 'Enter the subject. (20 characters)',
                inputKey: 'title',
                label: language === 'KOR' ? '문의 제목' : 'Inquiry subject',
                value: '',
                isFirst: true,
                isLast: false,
                inputType: 'text',
                required: true,
                requireOptions: {
                    maxLength: 20
                }
            },
            {
                placeholder: language === 'KOR' ? '3000자 내외 내용을 입력해주세요.' : 'Enter the content. (3000 characters)',
                inputKey: 'content',
                label: language === 'KOR' ? '문의 내용' : 'Inquiry content',
                value: '',
                isFirst: false,
                isLast: false,
                inputType: 'textarea',
                required: true,
                requireOptions: {
                    maxLength: 3000
                }
            },
            {
                placeholder: language === 'KOR' ? '첨부파일은 최대 3개, 30mb까지 등록 가능 합니다.' : 'Up to 3 attachments, 30mb total.',
                inputKey: 'files',
                label: language === 'KOR' ? '파일 첨부' : 'File attachment',
                value: [] as any,
                isFirst: false,
                isLast: false,
                inputType: 'images',
                maxLength: 3,
            },
        ])
    }, [language]);

    const { addToast } = useToast();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { showLoading, hideLoading } = useLoadingScreenStore();
    const save = async (event?: FormEvent) => {

        if (event) event.preventDefault();

        if (!checkBoxAgree.includes('yes')) {
            alert(language === 'KOR' ? '약관에 동의해주세요.' : 'Please accept the terms and conditions.')
            return;
        }

        if (isLoading) return; // 중복 제출 방지
        setIsLoading(true);
        showLoading();

        await handleSubmit('save', router, viewId, viewTableObject, S3_IMAGE_PATH, API_URL, BOARD_URL, false)
            .then(() => {
                addToast()
            })
            .catch((error) => {

                let msg = error instanceof Error ? error.message : String(error);
                if (language !== 'KOR') {
                    msg = msg.replace('입력값을 확인해주세요', 'Please verify your input');
                    msg = msg.replace(/값은 필수 항목입니다/g, ' is required');
                }
                alert(`${language === 'KOR' ? '게시글 등록 중 오류가 발생했습니다:' : 'An error occurred while posting:'}${msg}`);
            }).finally(() => {
                setIsLoading(false);
                hideLoading();
            })
    };

    const [checkBoxAgree, setCheckBoxAgree] = useState<string[]>(['']);
    const checkBoxChange = (e: any) => {
        setCheckBoxAgree(e);
    }
    return (
        <ScreenLayout>
            <div style={{ width: '100%', marginBottom: '120px', padding: '16px', marginTop: '8px' }}>
                <ScreenViewMakeTable
                    values={viewTableObject}
                    setValues={setViewTableObject}
                />
                <div style={{ marginTop: '24px' }}></div>
                <AdmInputCheckbox size="medium" id="agree" name="agree" value={checkBoxAgree} options={[{ value: 'yes', label: language === 'KOR' ? '(필수) 개인정보 수집·이용에 대한 동의' : '(Required) Consent to the collection and use of personal information' }]} onChange={checkBoxChange} />
                <p style={{ fontSize: '14px', color: basicThemeColors.gray400, marginTop: '8px', lineHeight: '1.33' }}>{language === 'KOR' ? '수집한 개인정보는 고객상담 처리를 위해 이용되며 전자상거래법 등 관련 법령에 따라 3년간 보관되고 첨부파일은 180일간 보관합니다.' : 'The collected personal information is used for customer consultation processing, and is stored for 3 years and attached files for 180 days in accordance with relevant laws such as the Electronic Commerce Act.'}</p>
                <button onClick={save} style={{ width: '100%', height: '56px', backgroundColor: basicThemeColors.gray100, border: '0px solid #000', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', cursor: 'pointer', marginTop: '24px', borderRadius: '12px' }}>{language === 'KOR' ? '문의하기' : 'Inquiry'}</button>
            </div>
        </ScreenLayout>
    );
}

export default AdminBoardNoticeViewPage;