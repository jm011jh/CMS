import { basicThemeColors } from "@/app/admin/assets/theme";

type T_AdmPageExplnationProps = {
    titleBlack?: string | React.ReactNode;
    titleRed?: string | React.ReactNode;
    theme?: string;
}
const AdmPageExplnation: React.FC<T_AdmPageExplnationProps> = ({ titleBlack, titleRed, theme }) => {
    const styles: { [key: string]: React.CSSProperties } = {
        admPageExplnation: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginBottom: '16px',
            padding: '16px',
            minHeight: '50px',
            borderRadius: '8px',
            backgroundColor: theme === 'blue' ? '#ECF3FF' : '#FFF7F7',
            fontSize: '14px',
        },
        admPageExplnationTitle: {
            fontWeight: 500,
            color: basicThemeColors.black,
        },
        admPageExplnationTitleRed: {
            fontWeight: 500,
            color: theme === 'blue' ? basicThemeColors.info : basicThemeColors.error,
        }
    }
    return (
        <div style={styles.admPageExplnation}>
            {
                titleBlack &&
                <div style={styles.admPageExplnationTitle}>{titleBlack}</div>
            }
            {
                titleRed &&
                <div style={styles.admPageExplnationTitleRed}>{titleRed}</div>
            }
        </div>
    )
}

export default AdmPageExplnation;