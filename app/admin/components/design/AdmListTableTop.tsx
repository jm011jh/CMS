import { basicThemeColors } from "@/app/admin/assets/theme";
import AdmButton from "./AdmButton";

type T_AdmListTableTopWriteButtonProps = {
    onClick?: () => void;
    buttonText?: string;
    disabled?: boolean;
}
export const AdmListTableTopGoToWriteButton: React.FC<T_AdmListTableTopWriteButtonProps> = ({ onClick, buttonText = '등록하기' }) => {
    return (
        <AdmButton size={'large'} onClick={onClick ? onClick : () => alert('준비중 입니다.')} style={{ gap: '8px', fontWeight: '600' }}>
            <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
                <path d="M3.61133 7H11.3891" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7.5 3.11133V10.8891" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {buttonText}
        </AdmButton>
    )
}
export const AdmListTableTopGoToWriteUserButton: React.FC<T_AdmListTableTopWriteButtonProps> = ({ onClick, buttonText = '등록하기' }) => {
    return (
        <AdmButton size={'medium'} onClick={onClick ? onClick : () => alert('준비중 입니다.')} style={{ gap: '8px', fontWeight: '600' }}>
            {buttonText}
        </AdmButton>
    )
}
type T_AdmListTableTopCagegoryButtonProps = {
    onClick?: () => void;
    buttonText?: string;
    disabled?: boolean;
}
export const AdmListTableTopGoToCategoryButton: React.FC<T_AdmListTableTopCagegoryButtonProps> = ({ onClick, buttonText = '카테고리 관리' }) => {
    return (
        <AdmButton size={'large'} onClick={onClick ? onClick : () => alert('준비중 입니다.')} style={{ gap: '8px', fontWeight: '600', padding: '0 24px', minWidth: '148px' }}>
            <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
                <path d="M9.62435 1.16602H6.12435C5.80218 1.16602 5.54102 1.42718 5.54102 1.74935V2.91602C5.54102 3.23818 5.80218 3.49935 6.12435 3.49935H9.62435C9.94652 3.49935 10.2077 3.23818 10.2077 2.91602V1.74935C10.2077 1.42718 9.94652 1.16602 9.62435 1.16602Z" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10.209 2.33398H11.3757C11.6851 2.33398 11.9818 2.4569 12.2006 2.67569C12.4194 2.89449 12.5423 3.19123 12.5423 3.50065V11.6673C12.5423 11.9767 12.4194 12.2735 12.2006 12.4923C11.9818 12.7111 11.6851 12.834 11.3757 12.834H4.37565C4.06623 12.834 3.76949 12.7111 3.55069 12.4923C3.3319 12.2735 3.20898 11.9767 3.20898 11.6673V3.50065C3.20898 3.19123 3.3319 2.89449 3.55069 2.67569C3.76949 2.4569 4.06623 2.33398 4.37565 2.33398H5.54232" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7.875 6.41602H10.2083" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7.875 9.33398H10.2083" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5.54102 6.41602H5.54768" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5.54102 9.33398H5.54768" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {buttonText}
        </AdmButton>
    )
}

type T_AdmListTableTopTitleProps = {
    title: string
}
export const AdmListTableTopTitle: React.FC<T_AdmListTableTopTitleProps> = ({ title }) => {
    const styles: { [key: string]: React.CSSProperties } = {
        tableTopTitle: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: basicThemeColors.black,
            fontSize: '18px',
            fontWeight: '600',
        },

    };
    return (
        <div style={styles.tableTopTitle}>
            {title}
        </div>
    )
}

type T_AdmListTableTopProps = {
    LeftComponents?: React.ReactNode;
    RightComponent?: React.ReactNode;
    marginTop?: string;
}
const AdmListTableTop: React.FC<T_AdmListTableTopProps> = ({ LeftComponents, RightComponent, marginTop }) => {
    const styles: { [key: string]: React.CSSProperties } = {
        tableTop: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
            marginTop: marginTop ? marginTop : '40px'
        },
        tableTopLeft: {
            display: 'flex',
            alignItems: 'center',
        },
        tableTopRight: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
        },
    };

    return (
        <div style={styles.tableTop}>
            <div style={styles.tableTopLeft}>{LeftComponents}</div>
            <div style={styles.tableTopRight}>{RightComponent}</div>
        </div>
    )
}

export default AdmListTableTop;