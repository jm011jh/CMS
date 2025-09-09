import { basicThemeColors } from "@/app/admin/assets/theme";

type T_AdmPageExplnationProps = {
    titleBlack?: string;
    titleRed?: string;
}
const CustomPageExplnation: React.FC<T_AdmPageExplnationProps> = ({ titleBlack, titleRed }) => {
    const styles: { [key: string]: React.CSSProperties } = {
        admPageExplnation: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginBottom: '40px',
            padding: '16px',
            minHeight: '50px',
            borderRadius: '8px',
            backgroundColor: '#FFF7F7',
            fontSize: '14px',
        },
        admPageExplnationTitle: {
            fontWeight: 500,
            color: basicThemeColors.black,
        },
        admPageExplnationTitleRed: {
            fontWeight: 500,
            color: basicThemeColors.error,
        }
    }
    return (
        <div style={styles.admPageExplnation}>
            {
                titleRed &&
                <div style={styles.admPageExplnationTitleRed}>{titleRed}</div>
            }
            {
                titleBlack &&
                <div style={styles.admPageExplnationTitle}>&nbsp;{titleBlack}</div>
            }
        </div>
    )
}

export default CustomPageExplnation;