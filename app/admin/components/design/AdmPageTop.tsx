import { basicThemeColors } from "../../assets/theme";

type T_AdmPageTopProps = {
    title?: string | React.ReactNode;
    right?: React.ReactNode;
    depth1?: string;
    depth2?: string;
}
const AdmPageTop: React.FC<T_AdmPageTopProps> = ({ title, depth1, depth2, right }) => {
    const styles: { [key: string]: React.CSSProperties } = {
        admPageTop: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '30px',
            marginBottom: '40px',
        },
        admPageTopTitle: {
            fontSize: '24px',
            fontWeight: 700,
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            width: depth1 ? 'auto' : '100%'
        },
        admPageTopBreadCrumb: {
            display: 'flex',
            alignItems: 'center',
            fontSize: '16px',
            color: basicThemeColors.gray500,
            fontWeight: 700,
        },
        admPageTopBreadCrumbIcon: {
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
    }
    return (
        <div style={styles.admPageTop}>
            <div style={{ ...styles.admPageTopTitle }}>{title}</div>
            {right || null}
            {
                depth1 &&
                <div style={styles.admPageTopBreadCrumb}>
                    <p>{depth1}</p>
                    {depth2 &&
                        <>
                            <div style={styles.admPageTopBreadCrumbIcon}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                                    <path d="M7.5 15.5L12.5 10.5L7.5 5.5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <p>{depth2}</p>
                        </>
                    }
                </div>
            }
        </div>
    )
}

export default AdmPageTop