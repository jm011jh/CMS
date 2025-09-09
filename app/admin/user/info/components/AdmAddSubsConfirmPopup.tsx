import { basicThemeColors } from "@/app/admin/assets/theme";
import AdmButton from "@/app/admin/components/design/AdmButton";

interface AdminAddSubsConfirmPopupProps {
    onClose: any;
    onConfirm: any;
}

const AlertIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
            <g clipPath="url(#clip0_7220_36881)">
                <path d="M25.3327 14.0013C25.3327 7.74207 20.2586 2.66797 13.9993 2.66797C7.74012 2.66797 2.66602 7.74207 2.66602 14.0013C2.66602 20.2605 7.74012 25.3346 13.9993 25.3346V27.3346C6.63555 27.3346 0.666016 21.3651 0.666016 14.0013C0.666016 6.63751 6.63555 0.667969 13.9993 0.667969C21.3631 0.667969 27.3327 6.63751 27.3327 14.0013C27.3327 21.3651 21.3631 27.3346 13.9993 27.3346V25.3346C20.2586 25.3346 25.3327 20.2605 25.3327 14.0013Z" fill="#D23838" />
                <path d="M13 14.0013V8.66797C13 8.11568 13.4477 7.66797 14 7.66797C14.5523 7.66797 15 8.11568 15 8.66797V14.0013C15 14.5536 14.5523 15.0013 14 15.0013C13.4477 15.0013 13 14.5536 13 14.0013Z" fill="#D23838" />
                <path d="M14.013 18.332C14.5653 18.332 15.013 18.7797 15.013 19.332C15.013 19.8843 14.5653 20.332 14.013 20.332H14C13.4477 20.332 13 19.8843 13 19.332C13 18.7797 13.4477 18.332 14 18.332H14.013Z" fill="#D23838" />
            </g>
            <defs>
                <clipPath id="clip0_7220_36881">
                    <rect width="26.6667" height="26.6667" fill="white" transform="translate(0.666016 0.667969)" />
                </clipPath>
            </defs>
        </svg>
    )
}

const AdminAddSubsConfirmPopup: React.FC<AdminAddSubsConfirmPopupProps> = ({
    onClose,
    onConfirm
}) => {
    const styles: { [key: string]: React.CSSProperties } = {
        popup: { width: '100%', height: '100%', position: 'fixed', top: 0, left: 0, zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', },
        popupBox: { display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff', boxShadow: ' 0px 0px 4px 0px rgba(0, 0, 0, 0.25)', width: '100%', maxWidth: '330px', flexDirection: 'column', borderRadius: '6px', zIndex: 10001 },
        popupBoxBody: { display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 14px', width: '100%', flexDirection: 'column' },
        popupBoxBodyRow: { width: '100%', display: 'flex', alignItems: 'flex-start', flexDirection: 'column', gap: '8px' },
        popupBoxButtonRow: { width: '100%', display: 'flex', alignItems: 'flex-start', gap: '8px', justifyContent: 'flex-end' },
        text01: { fontSize: '20px', fontWeight: '600', lineHeight: '1.3', textAlign: 'center' },
        text02: { fontSize: '14px', fontWeight: '400', lineHeight: '1.3', textAlign: 'center', color: basicThemeColors.gray500 },
        text02Bold: { fontSize: '14px', fontWeight: '600', lineHeight: '1.3', textAlign: 'center', color: basicThemeColors.error400 },
    }

    return (
        <>
            <div style={styles.popup}>
                <div onClick={onClose} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 9999 }}></div>
                <div style={styles.popupBox}>
                    <div style={styles.popupBoxBody}>
                        <div style={styles.icon}><AlertIcon /></div>
                        <div style={styles.text01}>구독권 강제 부여를 진행하시겠습니까?<br />진행시 반드시 확인해주세요.</div>
                        <div style={styles.text02}>
                            사용자가 이미 구독 중인 상태에서 구독권 기간을 변경하면 기존 구독의 환불이 불가하며 분쟁 발생 가능성이 있습니다. 또 한, 실제 앱마켓의 결제 내역과  동기화되지 않아 만료/연장/자동 갱신 처리에 오류가 생길 수 있습니다.<br /><br />

                            반드시 해당 사용자가<br />
                            <span style={styles.text02Bold}>구독권이 없는 상태임을 확인 후 진행해주세요.</span><br /><br />

                            위 위험 사항을 모두 확인하였으며
                            구독권 강제 부여를 진행하시겠습니까?
                        </div>
                        <div style={styles.popupBoxButtonRow}>
                            <AdmButton size={'large'} onClick={onClose} color='primary'>취소</AdmButton>
                            <AdmButton size={'large'} onClick={onConfirm}>확인</AdmButton>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminAddSubsConfirmPopup;