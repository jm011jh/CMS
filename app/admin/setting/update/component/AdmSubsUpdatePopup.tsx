import { AdmInputText } from "@/app/components/form/Input";
import { useEffect, useState } from "react";
import { basicThemeColors } from "../../../assets/theme";
import AdmButton from "../../../components/design/AdmButton";

type AdmSubsUpdatePopupProps = {
    handleSave: (data: any) => void;
    data?: any;
    status?: string;
    close?: () => void;
    statusChange?: (status: 'loading' | 'success' | 'error' | 'closed' | '') => void;
}

const AdmSubsUpdatePopup: React.FC<AdmSubsUpdatePopupProps> = ({ data, status, close, handleSave }) => {
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
            minHeight: '600px',
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
            gap: '40px',
            alignSelf: 'stretch',
        },
        bodyBox: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            alignSelf: 'stretch',
        },
        bodyBoxTitle: {
            fontSize: '16px',
            fontWeight: '400',
            color: '#000',
            lineHeight: '20px',
            marginTop: '8px',
        },
        bodyBoxInput: {
            height: '40px',
            padding: '16px',
            borderRadius: '12px',
            border: '1px solid var(--Gray-300, #D1D5DB)',
            background: 'var(--Gray-200, #E5E7EB)',
        },
        bodyBoxStar: {
            color: 'var(--Primary-Primary, #ADAAC7)'
        },

        bodyBoxDesc: {
            fontSize: '12px',
            color: '#9CA3AF',
            lineHeight: '16px',
        },

        toggleBtnRoot: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            height: '40px',
            borderRadius: '8px',
            backgroundColor: basicThemeColors.gray100,
            color: basicThemeColors.gray400,
            padding: '4px',
            fontSize: '16px',
            fontWeight: '600',
        },

        toggleBtnOn: {
            width: '50%',
            height: '100%',
            backgroundColor: basicThemeColors.primary.darken100,
            color: '#fff',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
        },

        toggleBtnOff: {
            width: '50%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
        },

        bodyEmpty: {
            height: '100%',
        },
        bodyBottom: {
            marginTop: '16px',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '8px',
        },
    }

    const [localData, setLocalData] = useState(data);

    useEffect(() => {
        console.log(data)
        setLocalData(data);

    }, [data])

    return (
        <div style={styles.container} >
            <div style={styles.background} onClick={close}></div>
            <div style={styles.wrapper}>
                <div style={styles.head}>
                    <p style={styles.title}>{'앱 업데이트'}</p>
                    <button onClick={close} style={styles.closeButton}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M17 3L3 17" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M3 3L17 17" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
                <div style={styles.body}>
                    <div style={styles.bodyBox}>
                        <div style={styles.bodyBoxTitle}>앱 이름</div>
                        <AdmInputText
                            id={'appName'}
                            name={'appName'}
                            value={localData?.appName || ''}
                            onChange={(val) => setLocalData((prev: any) => ({ ...prev, appName: val }))}
                            placeholder={'앱 이름을 입력하세요'}
                            size="medium" // 필요시 T_AdmListSrchParam에 size 추가
                            desc="" // AdmInputText는 desc prop이 필수일 수 있음
                            isDisabled={true}
                            inputStyle={{ color: '#9CA3AF' }}
                        />
                        <div style={styles.bodyBoxTitle}>플랫폼</div>
                        <AdmInputText
                            id={'platform'}
                            name={'platform'}
                            value={localData?.platformText || ''}
                            onChange={(val) => setLocalData((prev: any) => ({ ...prev, platform: val }))}
                            placeholder={'플랫폼을 입력하세요'}
                            size="medium" // 필요시 T_AdmListSrchParam에 size 추가
                            desc="" // AdmInputText는 desc prop이 필수일 수 있음
                            isDisabled={true}
                            inputStyle={{ color: '#9CA3AF' }}

                        />
                        <div style={styles.bodyBoxTitle}>현재 버전</div>
                        <AdmInputText
                            id={'lastestVersion'}
                            name={'lastestVersion'}
                            value={localData?.lastestVersion || ''}
                            onChange={(val) => setLocalData((prev: any) => ({ ...prev, lastestVersion: val }))}
                            placeholder={'현재 버전을 입력하세요'}
                            size="medium" // 필요시 T_AdmListSrchParam에 size 추가
                            desc="" // AdmInputText는 desc prop이 필수일 수 있음
                            isDisabled={true}
                            inputStyle={{ color: '#9CA3AF' }}
                        />
                        <div style={styles.bodyBoxTitle}>출시 버전 <span style={styles.bodyBoxStar}>*</span></div>
                        <AdmInputText
                            id={'changeVersion'}
                            name={'changeVersion'}
                            value={localData?.changeVersion || ''}
                            onChange={(val) => setLocalData((prev: any) => ({ ...prev, changeVersion: val }))}
                            placeholder={'업데이트할 버전 정보를 입력해주세요.'}
                            size="medium" // 필요시 T_AdmListSrchParam에 size 추가
                            desc="" // AdmInputText는 desc prop이 필수일 수 있음
                        />
                        <div style={styles.bodyBoxTitle}>업데이트 <span style={styles.bodyBoxStar}>*</span></div>
                        {/* <AdmInputRadio
                            id={'isForce'}
                            name={'isForce'}
                            value={localData?.isForce || ''}
                            options={[{ label: '강제', value: 'Y' }, { label: '선택', value: 'N' }]}
                            onChange={(textValue: string) => {
                                console.log(textValue)
                                setLocalData((prev: any) => ({ ...prev, isForce: textValue }));
                            }}
                            size={'medium'}

                        /> */}
                        <div style={styles.toggleBtnRoot}>
                            <div style={localData?.isForce == 'N' ? styles.toggleBtnOn : styles.toggleBtnOff} onClick={() => setLocalData((prev: any) => ({ ...prev, isForce: 'N' }))}>선택</div>
                            <div style={localData?.isForce == 'Y' ? styles.toggleBtnOn : styles.toggleBtnOff} onClick={() => setLocalData((prev: any) => ({ ...prev, isForce: 'Y' }))}>강제</div>
                        </div>
                        <div style={styles.bodyBoxDesc}>강제업데이트 설정을 켜면 사용자는 반드시 앱을 업데이트 해야합니다.</div>
                    </div>
                    <div style={styles.bodyEmpty} >&nbsp;</div>
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
                                    handleSave(localData);
                                }
                            }}
                            style={{ maxWidth: '120px' }}
                        >
                            저장
                        </AdmButton>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default AdmSubsUpdatePopup;