import { basicThemeColors } from "@/app/admin/assets/theme";

type T_AdmPageExplnationProps = {
    titleBlack?: string;
    titleRed?: string;
}
const CustomPageExplnationBlue: React.FC<T_AdmPageExplnationProps> = ({ titleBlack, titleRed }) => {
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
            backgroundColor: '#ECF3FF',
            fontSize: '14px',
        },
        admPageExplnationTitle: {
            fontWeight: 400,
            color: '#2E5AAC',
        },
        admPageExplnationTitleRed: {
            fontWeight: 500,
            color: basicThemeColors.error,
        }
    }
    return (
        <div style={styles.admPageExplnation}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_2377_50659)">
                    <path d="M12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75Z" stroke="#2E5AAC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 8V12" stroke="#2E5AAC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 16H12.01" stroke="#2E5AAC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <defs>
                    <clipPath id="clip0_2377_50659">
                        <rect width="20" height="20" fill="white" transform="translate(2 2)" />
                    </clipPath>
                </defs>
            </svg>

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

export default CustomPageExplnationBlue;