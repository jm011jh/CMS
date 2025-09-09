import { AdmListTableCellProps } from '@/app/admin/components/design/AdmListTableHeadRow';
import { CSSProperties } from 'react';
export interface FormattedTableCell extends AdmListTableCellProps {
  value: any;
  originalDataRow?: AdmListTableCellProps;
  cellStyle?: [{
    index: number;
    style: CSSProperties;
  }];
}
const listDataToTableList = (
  data: AdmListTableCellProps[],
  structure: AdmListTableCellProps[],
): FormattedTableCell[][] => {
  if (
    !data ||
    !Array.isArray(data) ||
    !structure ||
    !Array.isArray(structure)
  ) {
    return [];
  }

  return data.map((dataItem: any) => {
    const rowCells: FormattedTableCell[] = structure.map(
      (columnDefinition: AdmListTableCellProps) => {
        const propertyKeyToExtract =
          columnDefinition.cellKey as keyof AdmListTableCellProps;
        const propertyValue = dataItem[propertyKeyToExtract];

        return {
          ...columnDefinition,
          value: propertyValue,
          originalDataRow: dataItem,
        };
      },
    );

    // 받은 데이터에 cellStyle지정하는 값이 있는 경우 로직 실행
    if (dataItem.cellStyle && dataItem.cellStyle.length > 0) {
      for (let i = 0; i < rowCells.length; i++) {
        for (let k = 0; k < dataItem.cellStyle.length; k++) {
          if (i === dataItem.cellStyle[k].index) {
            rowCells[i].cellStyle = dataItem.cellStyle[k].style;
          }
        }
      }
    }
    return rowCells;
  });
};
export default listDataToTableList;
