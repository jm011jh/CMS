
const AdmListBox: React.FC<{ children: React.ReactElement }> = ({
    children
}) => {
    const styles: { [key: string]: React.CSSProperties } = {
        box: {
            width: '100%',
        }
    }
    return (
        <div style={styles.box}>
            {children}
        </div>
    )
}

export default AdmListBox;