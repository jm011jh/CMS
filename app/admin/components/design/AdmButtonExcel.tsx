import { callAPI_download_excel } from "@/lib/util/callApi";
import { getAccessToken } from "@/lib/util/tokenClass";
import { basicThemeColors } from "../../assets/theme";
import dataToExcelAndDownload from "../../lib/dataToExcelAndDownload";
import useLoadingScreenStore from "../../store/loadingScreenStore";

interface AdmButtonExcelProps {
    url: string;
    text: string;
    filename: string;
}

const AdmButtonExcel: React.FC<AdmButtonExcelProps> = ({ url, text, filename }) => {
    const style: React.CSSProperties = {
        color: basicThemeColors.primary.primary,
        padding: '0 12px',
        borderRadius: '4px',
        border: `1px solid ${basicThemeColors.primary.primary}`,
        cursor: 'pointer',
        height: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        fontWeight: '600',
        outline: 'none',
        backgroundColor: 'transparent',
    }

    const { showLoading, hideLoading } = useLoadingScreenStore();
    const callExcelData = async () => {
        const token = getAccessToken();
        if (!token) {
            throw new Error('로그인이 필요합니다.');
        }
        try {
            const response: any = await callAPI_download_excel(url, token);
            return response;
        } catch (error) {
            console.error('Error downloading user list:', error);
            throw new Error('회원 목록을 다운로드하는 중 오류가 발생했습니다.');
        }
    }

    const handleClick = async () => {
        showLoading();
        callExcelData().then((res) => {
            // Access-Control-Expose-Headers에 Content-Disposition을 명시해야 Content-Disposition 헤더를 읽을 수 있습니다.
            // 지금은 안되어 있어서, 파일명을 직접 지정.
            // const disposition = res.headers.get('Content-Disposition');
            // let fileName = `download-excel-${new Date().toISOString()}.xlsx`;
            // const match = disposition && disposition.match(/filename="?([^"]+)"?/);
            // if (match && match[1]) {
            //     fileName = match[1];
            // }
            dataToExcelAndDownload(res, filename);
        }).catch((err) => {
            console.error('Error downloading user list:', err);
            alert('처리 중 문제가 발생하였습니다.\n반복될 경우, 관리자에게 문의하여 주세요.');
        }).finally(() => {
            hideLoading();
        });
    }
    return (
        <button type="button" onClick={handleClick} style={style}>
            {text}
        </button>
    );
};

export default AdmButtonExcel;