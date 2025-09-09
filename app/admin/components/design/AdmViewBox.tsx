
const AdmViewBox: React.FC<{ children: React.ReactElement }> = ({
    children
}) => {
    const styles: { [key: string]: React.CSSProperties } = {
        box: {
            width: '100%',
            maxWidth: '1152px',
        }
    }
    return (
        <div style={styles.box}>
            {children}
        </div>
    )
}

export default AdmViewBox;