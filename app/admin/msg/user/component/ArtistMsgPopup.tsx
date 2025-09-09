import { basicThemeColors } from "@/app/admin/assets/theme";
import dayjs from "dayjs";

interface ArtistMsgPopupProps {
    close?: () => void;
    date?: string;
    title?: string;
}

const ArtistMsgPopup: React.FC<ArtistMsgPopupProps> = ({ close, date, title }) => {
    const styles: { [key: string]: React.CSSProperties } = {
        container: {
            width: '100%',
            height: '100%',
            position: 'fixed',
            zIndex: 1001,
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
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            padding: '16px',
            flexDirection: 'column',
        },
        desc: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            flexDirection: 'column',
            fontSize: '12px',
            lineHeight: '1.3',
        },
        desc01: {
            color: basicThemeColors.gray500,
        },
        desc02: {
            color: basicThemeColors.error500,
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            width: '100%',
            padding: '16px',
        },
        formTitle: {
            fontSize: '16px',
            lineHeight: '20px',
        },
        formValue: {
            fontSize: '16px',
            lineHeight: '20px',
            border: `1px solid ${basicThemeColors.gray200}`,
            borderRadius: '4px',
            padding: '16px',
            width: '100%',
        },
        confirm: {
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: '16px',
            padding: '0 16px 16px',
        },
    }


    return (
        <div style={styles.container} >
            <div style={styles.background} onClick={close}></div>
            <div style={styles.wrapper}>
                <div style={styles.head}>
                    <p style={styles.title}>{'아티스트 메시지'}</p>
                    <button onClick={close} style={styles.closeButton}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M17 3L3 17" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M3 3L17 17" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
                <div style={styles.form}>
                    <div style={styles.formTitle}>채팅 일시</div>
                    <div style={styles.formValue}>{dayjs(date).format('YYYY-MM-DD HH:mm')}</div>
                    <div></div>
                    <div style={styles.formTitle}>채팅 내용</div>
                    <div style={styles.formValue}>{title}</div>
                </div>
            </div>
        </div>
    )
}

export default ArtistMsgPopup;