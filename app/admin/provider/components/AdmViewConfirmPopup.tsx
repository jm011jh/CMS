import { basicThemeColors } from "@/app/admin/assets/theme";
import AdmButton from "@/app/admin/components/design/AdmButton";

type T_AdmViewConfirmPopupProps = {
    icon?: React.ReactNode | null,
    title?: React.ReactNode,
    desc?: React.ReactNode,
    onConfirm?: () => void;
    onCancel?: () => void;
    hideCancelButton?: boolean; // 취소 버튼 숨김 여부
}
const AdmViewConfirmPopup: React.FC<T_AdmViewConfirmPopupProps> = ({
    icon = null,
    title = <p>저장되지 않은 변경사항</p>,
    desc = <p>변경한 내용이 저장되지 않았습니다.<br />이대로 나가시겠어요?</p>,
    onConfirm,
    onCancel,
    hideCancelButton = false, // 취소 버튼 숨김 여부
}) => {

    const styles: { [key: string]: React.CSSProperties } = {
        container: {
            zIndex: 1002,
            width: '100%',
            height: '100%',
            position: 'fixed',
            top: 0,
            left: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        bg: {
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        box: {
            width: '330px',
            minHeight: '254px',
            backgroundColor: basicThemeColors.white,
            borderRadius: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '24px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        },
        iconWarning: {
            width: '28px',
            height: '28px',
            marginBottom: '16px',
        },
        title: {
            fontSize: '20px',
            color: basicThemeColors.black,
            fontWeight: '600',
            lineHeight: '1.6em',
            marginBottom: '12px',
            textAlign: 'center',
        },
        desc: {
            fontSize: '14px',
            color: basicThemeColors.fontGray,
            lineHeight: '1.6em',
            marginBottom: '24px',
            textAlign: 'center',
        },
        buttons: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            width: '100%',
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.bg}>
                <div style={styles.box}>
                    {
                        icon ||
                        <svg style={styles.iconWarning} width="28" height="28" viewBox="0 0 28 28" fill="none">
                            <g clipPath="url(#clip0_2286_20380)">
                                <path d="M13.999 1.66602C20.8104 1.66602 26.3328 7.18766 26.333 13.999C26.333 20.8105 20.8105 26.333 13.999 26.333C7.18766 26.3328 1.66602 20.8104 1.66602 13.999C1.66619 7.18777 7.18777 1.66619 13.999 1.66602Z" stroke="#D23838" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M14 8.66602V13.9993" stroke="#D23838" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M14 19.332H14.0133" stroke="#D23838" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </g>
                            <defs>
                                <clipPath id="clip0_2286_20380">
                                    <rect width="26.6667" height="26.6667" fill="white" transform="translate(0.666016 0.666016)" />
                                </clipPath>
                            </defs>
                        </svg>
                    }
                    <div style={styles.title}>{title}</div>
                    <div style={styles.desc}>{desc}</div>
                    <div style={styles.buttons}>

                        {
                            !hideCancelButton &&
                            <AdmButton style={{ minWidth: '133px' }} size={'xxlarge'} color={'primary'} onClick={onCancel}>취소</AdmButton>
                        }
                        <AdmButton style={{ minWidth: '133px' }} size={'xxlarge'} onClick={onConfirm}>확인</AdmButton>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default AdmViewConfirmPopup;