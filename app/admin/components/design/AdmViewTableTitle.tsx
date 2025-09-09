// ============================================================================================
type AdmViewTableTitleTextProps = {
    title: string
}
const AdmViewTableTitleText: React.FC<AdmViewTableTitleTextProps> = ({ title }) => {

    return (
        <div style={{ fontSize: '18px', fontWeight: '600' }}>{title}</div>
    )

}

export { AdmViewTableTitleText }
// ============================================================================================
type AdmViewTableTitleProps = {
    children: React.ReactNode | React.ReactNode[],
}
const AdmViewTableTitle: React.FC<AdmViewTableTitleProps> = ({ children }) => {

    const styles: { [key: string]: React.CSSProperties } = {
        container: {
            width: '100%',
            marginBottom: '8px',
            justifyContent: 'space-between'
        }
    }
    return (
        <div style={styles.container}>{children}</div>
    )
}

export default AdmViewTableTitle;
