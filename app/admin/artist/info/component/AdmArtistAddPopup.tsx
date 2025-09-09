"use client";

import { basicThemeColors } from "@/app/admin/assets/theme";
import AdmButton from "@/app/admin/components/design/AdmButton";
import CustomPageExplnationMultiLines from "@/app/admin/setting/term/component/CustomPageExplnationMultiLines";
import useLoadingScreenStore from "@/app/admin/store/loadingScreenStore";
import { AdmInputText } from "@/app/components/form/Input";
import { callAPI, HTTPMETHOD } from "@/lib/util/callApi";
import { getAccessToken } from "@/lib/util/tokenClass";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type AdmArtistAddPopupProps = {
    data?: any;
    status?: string;
    close?: () => void;
    statusChange?: (status: 'loading' | 'success' | 'error' | 'closed' | '') => void;
    handleSave?: (data: any) => void;
}

const AdmArtistAddPopup: React.FC<AdmArtistAddPopupProps> = ({ data, status, close, handleSave }) => {
    const router = useRouter();
    const styles: { [key: string]: React.CSSProperties } = {
        container: {
            width: '100%',
            height: '100%',
            position: 'fixed',
            zIndex: 1003,
            top: 0,
            left: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        background: {
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            position: 'absolute',
            top: 0,
            left: 0,
        },
        wrapper: {
            borderRadius: '6px',
            boxShadow: '0 0px 4px rgba(0, 0, 0, 0.25)',
            width: 'calc(100% - 40px)',
            maxWidth: '600px',
            backgroundColor: '#fff',
            display: 'flex',
            position: 'relative',
            flexDirection: 'column',
            maxHeight: 'calc(100% - 40px)',
            overflowY: 'auto',
        },
        head: {
            width: '100%',
            minHeight: '56px',
            padding: '0 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: ` 1px solid ${basicThemeColors.gray100}`,
        },
        title: {
            fontSize: '20px',
            fontWeight: '600',
            color: '#111827',
            margin: 0,
        },
        closeButton: {
            cursor: 'pointer',
            position: 'relative',
            width: '24px',
            height: '24px',
            backgroundColor: 'transparent',
            border: 'none',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        body: {
            padding: '16px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignSelf: 'stretch',
        },

        bodyBox: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            alignItems: 'center',
        },

        bodyBottom: {
            marginTop: '16px',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '8px',
        },

        profileInputRoot: {
            color: 'var(--Black, #000)',
            fontSize: '16px',
            gap: '8px',
            marginTop: '16px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
        }
    }

    const [detailData, setDetailData] = useState<any>(null);

    useEffect(() => {
        setDetailData(data || []);
    }, [])

    const [errorDesc, setErrorDesc] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { showLoading, hideLoading } = useLoadingScreenStore();

    const handleEmailCheck = async () => {
        if (isLoading) return; // 중복 제출 방지
        setIsLoading(true);
        showLoading();

        setErrorDesc('');

        try {
            // 이메일 존재 체크 로직
            if (!detailData?.name || detailData?.name === '') {
                setErrorDesc('이메일 형식을 확인해주세요.');
                return;
            }

            // 이메일 형식 체크
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(detailData?.name)) {
                setErrorDesc('이메일 형식을 확인해주세요.');
                return;
            }

            const token = getAccessToken();
            if (token === '') {
                alert('로그인 해주세요.');
                return;
            }

            // API 호출
            //TODO: API 가 like로 검색되는것이라, yjh1411@naver.c 만해도 검색이 됨.
            // 추후 API 수정 필요
            const res: any = await callAPI(HTTPMETHOD.GET, {}, `/api/admin/user?search=${detailData?.name}`, token);


            if (!res || res.code !== 200 || res.data.data.length === 0) {
                setErrorDesc('가입되지 않은 계정입니다.');
                return;
            }

            // 성공 후
            if (handleSave) {
                handleSave({ ...res.data.data[0] });
            }

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

    return (
        <div style={styles.container} >
            <div style={styles.background} onClick={close}></div>
            {
                status === 'success' &&
                <div style={styles.wrapper}>
                    <div style={styles.head}>
                        <p style={styles.title}>{'관리자 초대'}</p>
                        <button onClick={close} style={styles.closeButton}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M17 3L3 17" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M3 3L17 17" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <div style={styles.body}>
                        <div style={styles.bodyBox}>


                            <CustomPageExplnationMultiLines
                                titleBlack={'(현재는 초대 불가능 합니다.)<br/>· JISOO 서비스에 가입되지 않은 계정은 초대되지 않습니다.<br/>· 관리자로 초대하여도 초대를 수락하지 않으면 관리자로 추가되지 않습니다.<br/>· 초대를 수락한 관리자에게는 \'매니저\'권한이 부여됩니다.<br/>&nbsp;&nbsp;마스터와 매니저의 서비스 운영 권한은 동일합니다.'}
                            />

                            <div style={styles.profileInputRoot}>
                                <div>
                                    관리자 계정 *
                                </div>
                                <AdmInputText
                                    id={'profileName'}
                                    name={'profileName'}
                                    value={detailData?.name || ''}
                                    onChange={(val) => {
                                        setErrorDesc(''); // 입력 시 에러 메시지 초기화
                                        setDetailData((prev: any) => ({ ...prev, name: val }))
                                    }}
                                    placeholder={'계정 이메일을 입력해주세요.'}
                                    size="large"
                                    desc={errorDesc}
                                    error={errorDesc !== ''}
                                />
                            </div>
                        </div>

                        <div style={styles.bodyBottom}>

                            <div style={{ width: '100%' }}></div>

                            <AdmButton
                                size={'large'}
                                color={'primaryBorder'}
                                onClick={close}
                                style={{ maxWidth: '120px' }}
                            >
                                취소
                            </AdmButton>
                            <AdmButton
                                size={'large'}
                                onClick={handleEmailCheck}
                                style={{ maxWidth: '120px' }}
                            >
                                초대하기
                            </AdmButton>
                        </div>
                    </div>
                </div>
            }
        </div >
    )
}

export default AdmArtistAddPopup;