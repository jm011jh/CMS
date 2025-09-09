import { adminStyles } from '@/app/admin/assets/styleConstants';
import { basicThemeColors } from '@/app/admin/assets/theme';
import AdmButton from '@/app/admin/components/design/AdmButton';
import { AdmListTableCellProps } from '@/app/admin/components/design/AdmListTableHeadRow';
import { CSSProperties, FC } from 'react';

export interface CustomListTableCellProps extends AdmListTableCellProps {
  // 여기에 추가 확장 속성을 정의하세요.
  cellHeight?: string;
}

const CustomListTableBodyCell: FC<CustomListTableCellProps> = ({
  value,
  size,
  align,
  cellKey,
  islast,
  editItem,
  cellHeight = '64px',
}) => {
  const styles: { [key: string]: CSSProperties } = {
    tableBodyCell: {
      color: '#000',
      textAlign: align || 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: size,
      minWidth: size === '100%' ? '100px' : size,
      maxWidth: size === '100%' ? 'auto' : size,
      height: cellHeight,
      borderRight: islast ? 'none' : `1px solid ${basicThemeColors.gray300}`,
      padding: '0 8px',
    },
    tableBodyCellText: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      lineClamp: 1,
      WebkitLineClamp: 1,
      WebkitBoxOrient: 'vertical',
      display: '-webkit-box',
      width: '100%',
    },
  };
  return (
    <div data-type={cellKey} style={styles.tableBodyCell}>
      {cellKey != 'content' && cellKey != 'contentUs' && cellKey != 'contentCn' && cellKey != 'contentTw' && cellKey != 'ctrl' ? (
        <div style={styles.tableBodyCellText}>{value}</div>
      ) :
        cellKey === 'ctrl' ? (
          <div style={{ display: 'flex', gap: '10px' }}>
            {editItem && (
              <AdmButton
                size={'medium'}
                color={'primaryFill'}
                onClick={editItem}>
                업데이트
              </AdmButton>
            )}
          </div>
        ) :
          (
            <div style={{ display: 'flex', gap: '10px' }}>
              {editItem && (
                value ?

                  <AdmButton size={'large'} color={'primaryFill'} onClick={editItem}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.11133 7H10.8891" stroke="white" />
                      <path d="M7 3.11035V10.8881" stroke="white" />
                    </svg>
                    <span style={{ marginLeft: 8 }}>수정하기</span>
                  </AdmButton>
                  :
                  <AdmButton size={'large'} color={'primaryBorder'} onClick={editItem}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.11133 7H10.8891" stroke="#ADAAC7" />
                      <path d="M7 3.11035V10.8881" stroke="#ADAAC7" />
                    </svg>
                    <span style={{ marginLeft: 8 }}>등록하기</span>
                  </AdmButton>
              )}
            </div>
          )}
    </div>
  );
};

type CustomListTableBodyProps = {
  structure: AdmListTableCellProps[];
  editItem: (id: string, lang: string) => void;
  cellHeight?: string;
  isLast?: boolean;
};
const CustomListTableBodyRow: FC<CustomListTableBodyProps> = ({
  structure,
  editItem,
  cellHeight = '64px',
  isLast,
}) => {
  const styles: { [key: string]: CSSProperties } = {
    tableBodyRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: cellHeight,
      backgroundColor: basicThemeColors.white,
      width: '100%',
      fontSize: adminStyles.table.cell.fontSize,
      borderBottom: `1px solid ${isLast ? 'rgba(0,0,0,0)' : basicThemeColors.gray300}`,
    },
  };
  return (
    <div>
      <div style={styles.tableBodyRow}>
        {structure.map((column, index) => (
          <CustomListTableBodyCell
            originalDataRow={column.originalDataRow}
            key={index}
            value={column.value}
            size={column.size}
            align={column.align}
            cellKey={column.cellKey}
            islast={index === structure.length - 1 ? true : false}
            editItem={() => editItem(column.originalDataRow.id, column.cellKey)}
            cellHeight={cellHeight}
          />
        ))}
      </div>
    </div>
  );
};

export default CustomListTableBodyRow;

