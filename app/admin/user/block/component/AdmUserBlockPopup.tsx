import { basicThemeColors } from "@/app/admin/assets/theme";
import AdmButton from "@/app/admin/components/design/AdmButton";
import { AdmInputDate, AdmInputRadio, AdmInputText, AdmInputTextArea } from "@/app/components/form/Input";
import { useEffect, useState } from "react";

type AdmSubsUserPopupProps = {
    data?: any;
    status?: string;
    close?: () => void;
    statusChange?: (status: 'loading' | 'success' | 'error' | 'closed' | '') => void;
    handleSave?: (data: any) => void;
}

const AdmUserBlockPopup: React.FC<AdmSubsUserPopupProps> = ({ data, status, close, handleSave }) => {
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
        },
        head: {
            width: '100%',
            height: '56px',
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
            alignSelf: 'stretch',
        },
        bodyBoxHead: {
            width: '100%',
            height: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        bodyBoxHeadTitle: {
            fontSize: '16px',
            fontWeight: '400',
        },
        bodyBottom: {
            marginTop: '16px',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '8px',
        },
    }

    const [detailData, setDetailData] = useState<any>(null);

    useEffect(() => {
        setDetailData(data)
    }, [data])

    useEffect(() => {
        if (detailData?.isRestricted === 'N') {
            setDetailData((prev: any) => ({ ...prev, endDate: null }))
            setDetailData((prev: any) => ({ ...prev, isServiceBlocked: false }))
            setDetailData((prev: any) => ({ ...prev, isLoginBlocked: false }))
        }
    }, [detailData?.isRestricted])

    return (
        <div style={styles.container} >
            <div style={styles.background} onClick={close}></div>
            {
                status === 'success' &&
                <div style={styles.wrapper}>
                    <div style={styles.head}>
                        <p style={styles.title}>{'불량회원설정'}</p>
                        <button onClick={close} style={styles.closeButton}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M17 3L3 17" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M3 3L17 17" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                    {
                        detailData &&
                        <div style={styles.body}>
                            <div style={styles.bodyBox}>
                                <div style={styles.bodyBoxHead}>
                                    <div style={styles.bodyBoxHeadTitle}>
                                        회원닉네임
                                    </div>
                                </div>
                                <AdmInputText
                                    key={'nickname'}
                                    id={'nickname'}
                                    name={'nickname'}
                                    size="medium" // 필요시 T_AdmListSrchParam에 size 추가
                                    placeholder=""
                                    value={data?.reportedUser?.name || ''}
                                    isDisabled={true}
                                />

                                <div style={{ ...styles.bodyBoxHead, marginTop: '8px' }}>
                                    <div style={styles.bodyBoxHeadTitle}>
                                        설정 여부 <span style={{ color: 'var(--Primary-Primary, #ADAAC7)' }}>*</span>
                                    </div>
                                </div>
                                <div>
                                    <AdmInputRadio
                                        boxStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px', marginLeft: '4px' }}
                                        value={detailData?.isRestricted}
                                        size={'medium'}
                                        id={'isRestricted'}
                                        name={'isRestricted'}
                                        options={[
                                            { value: 'N', label: '설정안함' },
                                            { value: 'Y', label: '설정함' },
                                        ]}
                                        onChange={(textValue: string) => {
                                            setDetailData((prev: any) => ({ ...prev, isRestricted: textValue }))
                                        }}
                                    />

                                    <div style={{ marginTop: '16px', marginLeft: '24px' }}>
                                        <AdmInputDate
                                            // boxStyle={{ marginTop: '16px', marginLeft: '24px' }}
                                            value={data?.endDate || ''}
                                            size={'medium'}
                                            id={'endDate'}
                                            name={'endDate'}
                                            placeholder={''}
                                            desc={''}
                                            onChange={(textValue: any) =>
                                                setDetailData((prev: any) => ({ ...prev, endDate: textValue }))
                                            }
                                            descAlert={'차단 기간 미설정 시, 사용자 앱 진입이 무기한 차단됩니다.'}
                                            isDisabled={detailData?.isRestricted !== 'Y'}
                                        />
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px', marginLeft: '24px', marginTop: '16px' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '20px', position: 'relative' }}>
                                            <input
                                                style={{ width: '12px', height: '12px', marginLeft: '1px' }}
                                                type="checkbox"
                                                id="isLoginBlocked"
                                                name="isLoginBlocked"
                                                value="Y"
                                                checked={detailData?.isLoginBlocked}
                                                onChange={(e) => {
                                                    const checked = e.target.checked;
                                                    setDetailData((prev: any) => ({
                                                        ...prev,
                                                        isLoginBlocked: checked ? true : false
                                                    }));
                                                }}
                                                disabled={detailData?.isRestricted !== 'Y'}
                                            />
                                            <div style={{ width: '16px', height: '16px', backgroundColor: `${detailData?.isLoginBlocked ? 'rgb(173, 170, 199)' : 'white'}`, position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)', border: `1px solid ${detailData?.isLoginBlocked ? 'rgb(173, 170, 199)' : '#D1D5DB'}`, borderRadius: '4px' }}>
                                                <span style={{ width: '8px', height: '4px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -75%) rotate(-45deg)', borderWidth: '0px 0px 1px 1px', borderStyle: 'solid', borderColor: '#ffffff' }}></span>
                                            </div>
                                            <p style={{ height: '20px', lineHeight: '20px', fontSize: '16px' }}>로그인 차단</p>
                                        </label>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px', marginLeft: '24px', marginTop: '16px' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '20px', position: 'relative' }}>
                                            <input
                                                style={{ width: '12px', height: '12px', marginLeft: '1px' }}
                                                type="checkbox"
                                                id="isServiceBlocked"
                                                name="isServiceBlocked"
                                                value="Y"
                                                checked={detailData?.isServiceBlocked}
                                                onChange={(e) => {
                                                    const checked = e.target.checked;
                                                    setDetailData((prev: any) => ({
                                                        ...prev,
                                                        isServiceBlocked: checked ? true : false
                                                    }));
                                                }}
                                                disabled={detailData?.isRestricted !== 'Y'}
                                            />
                                            <div style={{ width: '16px', height: '16px', backgroundColor: `${detailData?.isServiceBlocked ? 'rgb(173, 170, 199)' : 'white'}`, position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)', border: `1px solid ${detailData?.isServiceBlocked ? 'rgb(173, 170, 199)' : '#D1D5DB'}`, borderRadius: '4px' }}>
                                                <span style={{ width: '8px', height: '4px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -75%) rotate(-45deg)', borderWidth: '0px 0px 1px 1px', borderStyle: 'solid', borderColor: '#ffffff' }}></span>
                                            </div>
                                            <p style={{ height: '20px', lineHeight: '20px', fontSize: '16px' }}>아티스트 라이브 및 유료 메신저 - 서비스 차단</p>
                                        </label>
                                    </div>

                                </div>

                                <div style={{ ...styles.bodyBoxHead, marginTop: '8px' }}>
                                    <div style={styles.bodyBoxHeadTitle}>
                                        메모
                                    </div>
                                </div>
                                <AdmInputTextArea
                                    value={detailData?.memo || ''}
                                    size={'medium'}
                                    id={'memo'}
                                    name={'memo'}
                                    placeholder={'관리자메모는 사용자에게 노출되지 않습니다.'}
                                    onChange={(textValue: string) =>
                                        setDetailData((prev: any) => ({ ...prev, memo: textValue }))
                                    }
                                    height="120px"
                                />
                            </div>
                            <div style={styles.bodyBottom}>
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
                                    onClick={() => {
                                        if (handleSave) {
                                            handleSave(detailData);
                                        }
                                    }}
                                    style={{ maxWidth: '120px' }}
                                >
                                    저장
                                </AdmButton>
                            </div>
                        </div>
                    }
                </div>
            }
        </div >
    )
}

export default AdmUserBlockPopup;