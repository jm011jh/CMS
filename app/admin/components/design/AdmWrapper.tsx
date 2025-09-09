type T_AdmWrapperProps = {
    children: React.ReactNode[];
}
const AdmWrapper: React.FC<T_AdmWrapperProps> = ({ children }) => {
    const styles: { [key: string]: React.CSSProperties } = {
        admWrapper: {
            padding: 'var(--ct-pg-sidePd)',
            width: '100%',
            height: '100%',
            boxSizing: 'border-box',
            overflowY: 'auto',
        }
    }
    return (
        <div style={styles.admWrapper}>
            {children}
        </div>
    )
}

export default AdmWrapper;