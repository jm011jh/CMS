import { basicThemeColors } from "@/app/admin/assets/theme";
import AdmButton from "@/app/admin/components/design/AdmButton";
import { AdmInputText, AdmInputTextArea } from "@/app/components/form/Input";

interface AdminMemoPopupProps {
    userName: any;
    onClose: any;
    adminMemo: string;
    setAdminMemo: React.Dispatch<React.SetStateAction<string>>;
    postAdminMemo: any;
}

const AdminMemoPopup: React.FC<AdminMemoPopupProps> = ({
    adminMemo,
    onClose,
    userName,
    setAdminMemo,
    postAdminMemo
}) => {
    const styles: { [key: string]: React.CSSProperties } = {
        popup: { width: '100%', height: '100%', position: 'fixed', top: 0, left: 0, zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', },
        popupBox: { display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff', boxShadow: ' 0px 0px 4px 0px rgba(0, 0, 0, 0.25)', width: '100%', maxWidth: '600px', flexDirection: 'column', borderRadius: '6px' },
        popupBoxHead: { height: '56px', display: 'flex', alignItems: 'center', padding: '0 20px', fontSize: '20px', fontWeight: 600, justifyContent: 'flex-start', textAlign: 'left', width: '100%', borderBottom: `1px solid ${basicThemeColors.gray100}` },
        popupBoxBody: { display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px', width: '100%', flexDirection: 'column' },
        popupBoxBodyRow: { width: '100%', display: 'flex', alignItems: 'flex-start', flexDirection: 'column', gap: '8px' },
        popupBoxButtonRow: { width: '100%', display: 'flex', alignItems: 'flex-start', gap: '8px', justifyContent: 'flex-end' },
    }
    return (
        <div style={styles.popup}>
            <div style={styles.popupBox}>
                <div style={styles.popupBoxHead}>관리자 메모</div>
                <div style={styles.popupBoxBody}>
                    <div style={styles.popupBoxBodyRow}>
                        <p style={{ fontSize: '16px' }}>회원닉네임</p>
                        <AdmInputText id="userName" name="userName" value={userName} size='medium' isDisabled={true} />
                    </div>
                    <div style={styles.popupBoxBodyRow}>
                        <p style={{ fontSize: '16px' }}>메모</p>
                        <AdmInputTextArea id="adminMemo" name="adminMemo" placeholder='관리자메모는 사용자에게 노출되지 않습니다.' value={adminMemo} size='medium' onChange={setAdminMemo} />
                    </div>
                    <div style={styles.popupBoxButtonRow}>
                        <AdmButton size={'large'} onClick={onClose} color='primary'>취소</AdmButton>
                        <AdmButton size={'large'} onClick={postAdminMemo}>저장</AdmButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminMemoPopup;