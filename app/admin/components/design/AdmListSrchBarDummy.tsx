
const AdmListSrchBarLabel: React.FC<{ text: string }> = ({ text }) => {
    const style = {
        fontSize: '16px',
        fontWeight: '700',
        color: '#000000',
        width: '120px',
        padding: '0 24px',
        height: '64px',
    }
    return (
        <div style={style}>{text}</div>
    )
}

const AdmListSrchBarInput: React.FC<{ text: string }> = ({ text }) => {
    const style = {
        fontSize: '16px',
        fontWeight: '700',
        color: '#000000',
        width: '120px',
        padding: '0 24px',
        height: '64px',
    }
    return (
        <div style={style}>{text}</div>
    )
}
const AdmListSrchBarDummy: React.FC = () => {

    return (
        <div></div>
    )
}

export default AdmListSrchBarDummy;