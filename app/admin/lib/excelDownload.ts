import ExcelJS from 'exceljs';
import { AdmListTableCellProps } from '../components/design/AdmListTableHeadRow';

/**
 * tableStructureData는 admin의 data list페이지에서 테이블을 만들 때 선언하는 테이블구조입니다. 그거 그대로 가져오시면 됩니다.
 * 
 */
interface ExcelDownloadProps {
    tableStructureData: AdmListTableCellProps[]; // 엑셀의 헤더 구조
    data: any; // 엑셀에 들어갈 데이터
    filename: string; // 엑셀 파일 이름
    sheetName: string; // 엑셀 시트 이름
}
const excelDownload = ({ tableStructureData, data, filename = 'noFileName', sheetName = 'sheet1' }: ExcelDownloadProps) => {

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(sheetName);
    const col = tableStructureData.map((item: any) => {
        if (item.cellKey !== 'ctrl' && item.cellKey !== 'checkbox') {
            return { header: item.value, key: item.cellKey }
        } else {
            return null;
        }
    });
    worksheet.columns = col.filter((item: any) => item !== null) as any;
    worksheet.addRows(data);

    const headerStyle = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'F3F4F6' },

        alignment: { horizontal: 'center' as const, vertical: 'middle' as const },
        font: {
            name: 'Pretendard',
            size: 11,
            color: { argb: '000000' },
        },
    };

    worksheet.getRow(1).height = 40;
    worksheet.eachRow((row: any, rowNumber: number) => {
        rowNumber > 1 && (row.height = 30)
    });

    worksheet.columns.forEach((column: any, index: number) => {
        let maxLength = 0;
        const headerEachCell = worksheet.getCell(`${String.fromCharCode(index + 65)}1`);
        headerEachCell.style = { ...headerEachCell.style, ...headerStyle };

        column.eachCell({ includeEmpty: true }, (cell: any) => {
            const columnLength = cell.value ? cell.value.toString().length : 0;
            if (columnLength > maxLength) {
                maxLength = columnLength;
            }
        });
        column.width = maxLength < 10 ? 10 : maxLength + 2; // 최소 너비 10 설정, 여유 공간 2 추가
    });

    workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${filename}.xlsx`;
        a.click();
        URL.revokeObjectURL(url);
    })
}

export default excelDownload;
