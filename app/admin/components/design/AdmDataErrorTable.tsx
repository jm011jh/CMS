import { basicThemeColors } from "@/app/admin/assets/theme";


type AdmDataErrorTableProps = {
    text1?: string;
    text2?: string;

}
const AdmDataErrorTable: React.FC<AdmDataErrorTableProps> = ({
    text1 = '데이터를 불러올 수 없습니다.',
    text2 = '잠시 후 다시 시도해주세요.'
}) => {
    return (
        <div style={{ width: '100%', height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }}>
            <svg style={{ marginBottom: '24px' }} width="28" height="28" viewBox="0 0 28 28" fill="none">
                <g clipPath="url(#clip0_2286_20380)">
                    <path d="M13.999 1.66602C20.8104 1.66602 26.3328 7.18766 26.333 13.999C26.333 20.8105 20.8105 26.333 13.999 26.333C7.18766 26.3328 1.66602 20.8104 1.66602 13.999C1.66619 7.18777 7.18777 1.66619 13.999 1.66602Z" stroke="#D23838" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14 8.66602V13.9993" stroke="#D23838" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14 19.332H14.0133" stroke="#D23838" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <defs>
                    <clipPath id="clip0_2286_20380">
                        <rect width="26.6667" height="26.6667" fill="white" transform="translate(0.666016 0.666016)" />
                    </clipPath>
                </defs>
            </svg>
            <p style={{ fontSize: '20px', fontWeight: '600', marginBottom: '14px' }}>{text1}</p>
            <p style={{ fontSize: '16px', color: basicThemeColors.gray500 }}>{text2}</p>
        </div>
    )
}

export default AdmDataErrorTable;