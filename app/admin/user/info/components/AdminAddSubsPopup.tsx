import { basicThemeColors } from "@/app/admin/assets/theme";
import AdmButton from "@/app/admin/components/design/AdmButton";
import AdmPageExplnation from "@/app/admin/components/design/AdmPageExplnation";
import { AdmInputDate, AdmInputRadio, AdmInputText } from "@/app/components/form/Input";
import { useRef, useState } from "react";
import AdminAddSubsConfirmPopup from "./AdmAddSubsConfirmPopup";

interface AdminAddSubsPopupProps {
    userName: any;
    onClose: any;
    postAdminAddSubs: any;
}

const AdminAddSubsPopup: React.FC<AdminAddSubsPopupProps> = ({
    onClose,
    userName,
    postAdminAddSubs
}) => {
    const styles: { [key: string]: React.CSSProperties } = {
        popup: { width: '100%', height: '100%', position: 'fixed', top: 0, left: 0, zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', },
        popupBox: { display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff', boxShadow: ' 0px 0px 4px 0px rgba(0, 0, 0, 0.25)', width: '100%', maxWidth: '600px', flexDirection: 'column', borderRadius: '6px', zIndex: 10001 },
        popupBoxHead: { height: '56px', display: 'flex', alignItems: 'center', padding: '0 20px', fontSize: '20px', fontWeight: 600, justifyContent: 'flex-start', textAlign: 'left', width: '100%', borderBottom: `1px solid ${basicThemeColors.gray100}` },
        popupBoxBody: { display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px', width: '100%', flexDirection: 'column' },
        popupBoxBodyRow: { width: '100%', display: 'flex', alignItems: 'flex-start', flexDirection: 'column', gap: '8px' },
        popupBoxButtonRow: { width: '100%', display: 'flex', alignItems: 'flex-start', gap: '8px', justifyContent: 'flex-end' },
    }

    const [subsType, setSubsType] = useState<string>('membership');
    const subsEndDate = useRef<any>(null);

    const [confirmPopupSwitch, setConfirmPopupSwitch] = useState<boolean>(false);

    const handleConfirm = () => {

        if (!subsType) {
            alert('구독 타입을 선택해주세요.');
            return;
        }

        if (!subsEndDate.current) {
            alert('구독 시작일을 선택해주세요.');
            return;
        }

        setConfirmPopupSwitch(true);
    }

    return (
        <>
            <div style={styles.popup}>
                <div onClick={onClose} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 9999 }}></div>
                <div style={styles.popupBox}>
                    <div style={styles.popupBoxHead}>구독 종료일 강제 설정</div>
                    <div style={styles.popupBoxBody}>
                        <AdmPageExplnation titleRed={<><p>구독 권한을 강제로 부여 합니다. 자동 갱신은 되지 않으며, 설정하신 기간까지 구독이 유지됩니다.</p></>} />
                        <div style={styles.popupBoxBodyRow}>
                            <p style={{ fontSize: '16px' }}>회원 아이디</p>
                            <AdmInputText id="userName" name="userName" value={userName} size='medium' isDisabled={true} />
                        </div>
                        <div style={styles.popupBoxBodyRow}>
                            <p style={{ fontSize: '16px' }}>강제 설정 구독권 <span style={{ color: basicThemeColors.primary.primary }}>*</span></p>
                            <AdmInputRadio
                                direction='column'
                                value={subsType}
                                size={'medium'}
                                id={'type'}
                                name={'type'}
                                options={[
                                    { label: '멤버쉽', value: 'membership' },
                                    { label: '폰트', value: 'font' }
                                ]}
                                onChange={(textValue: string) => {
                                    setSubsType(textValue);
                                }}
                            />
                        </div>
                        <div style={styles.popupBoxBodyRow}>
                            <p style={{ fontSize: '16px' }}>강제 구독 종료일 <span style={{ color: basicThemeColors.primary.primary }}>*</span></p>
                            <AdmInputDate
                                // boxStyle={{ marginTop: '16px', marginLeft: '24px' }}
                                value={''}
                                size={'medium'}
                                id={'endDate'}
                                name={'endDate'}
                                placeholder={''}
                                desc={''}
                                onChange={(textValue: any) =>
                                    subsEndDate.current = textValue
                                }
                            />
                            <p style={{ fontSize: '12px', color: basicThemeColors.error400 }}>설정한 날짜로 구독 종료일이 강제로 설정됩니다.</p>
                        </div>
                        <div style={styles.popupBoxButtonRow}>
                            <AdmButton size={'large'} onClick={onClose} color='primary'>취소</AdmButton>
                            <AdmButton size={'large'} onClick={handleConfirm}>저장</AdmButton>
                        </div>
                    </div>
                </div>
            </div>
            {confirmPopupSwitch && <AdminAddSubsConfirmPopup onClose={() => setConfirmPopupSwitch(false)} onConfirm={() => postAdminAddSubs(subsType, subsEndDate.current)} />}
        </>
    )
}

export default AdminAddSubsPopup;