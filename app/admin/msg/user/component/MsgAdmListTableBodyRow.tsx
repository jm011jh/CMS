import { adminStyles } from '@/app/admin/assets/styleConstants';
import { basicThemeColors } from '@/app/admin/assets/theme';
import AdmButton from '@/app/admin/components/design/AdmButton';
import { AdmListTableCellProps } from '@/app/admin/components/design/AdmListTableHeadRow';
import { CSSProperties, FC } from 'react';

interface MsgAdmListTableCellHeightProps extends AdmListTableCellProps {
  cellHeight?: string;
}

const MsgAdmListTableBodyCell: FC<MsgAdmListTableCellHeightProps> = ({
  value,
  size,
  align,
  cellKey,
  islast,
  deleteItem,
  editItem,
  viewItem,
  originalDataRow,
  cellHeight = adminStyles.table.cell.height,
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
      padding: '0 16px',
    },
    tableBodyCellText: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      lineClamp: 1,
      WebkitLineClamp: 1,
      WebkitBoxOrient: 'vertical',
      display: 'flex',
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    tableBodyCellNode: {
      height: '100%',
      width: '100%',
    },
  };

  return (
    <div data-type={cellKey} style={styles.tableBodyCell}>
      {cellKey !== 'ctrl' && cellKey !== 'makeNode' ? (
        <div style={styles.tableBodyCellText}>{value}</div>
      )
        :
        cellKey === 'makeNode' ? (
          <div style={styles.tableBodyCellNode}>{value}</div>
        )
          : (
            <div style={{ display: 'flex', gap: '10px', flexDirection: 'row' }}>
              {viewItem && originalDataRow && (
                <AdmButton
                  size={'medium'}
                  color={'primaryFill'}
                  onClick={() => originalDataRow.id && viewItem(originalDataRow.id)}>
                  상세정보
                </AdmButton>
              )}
              {editItem && originalDataRow && (
                <AdmButton
                  style={{ width: '66px', ...(originalDataRow.isRemoved === '삭제됨' ? { opacity: 0.5, cursor: 'default' } : {}) }}
                  size={'medium'}
                  color={'danger'}
                  disabled={originalDataRow.isRemoved === '삭제됨'}
                  onClick={() => originalDataRow.id && editItem(originalDataRow.id)}>
                  신고하기
                </AdmButton>
              )}
              {deleteItem && originalDataRow && (
                <AdmButton
                  style={{ width: '45px', maxWidth: '45px', minWidth: '45px' }}
                  size={'medium'}
                  color={'secondaryFill'}
                  onClick={deleteItem}>
                  삭제
                </AdmButton>
              )}
            </div>
          )}
    </div>
  );
};

type AdmListTableBodyProps = {
  structure: AdmListTableCellProps[];
  deleteItem?: (id: string) => void;
  editItem?: (id: string) => void;
  viewItem?: (id: string) => void;
  cellHeight?: string;
  isLast?: boolean;
};
const MsgAdmListTableBodyRow: FC<AdmListTableBodyProps> = ({
  structure,
  deleteItem,
  editItem,
  viewItem,
  cellHeight = adminStyles.table.cell.height,
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
          <MsgAdmListTableBodyCell
            originalDataRow={column.originalDataRow}
            key={index}
            value={column.value}
            size={column.size}
            align={column.align}
            cellKey={column.cellKey}
            islast={index === structure.length - 1}
            deleteItem={
              deleteItem && column.originalDataRow && column.originalDataRow.id
                ? () => deleteItem(column.originalDataRow.id)
                : undefined
            }
            editItem={
              editItem && column.originalDataRow && column.originalDataRow.id ? editItem : undefined
            }
            viewItem={
              viewItem && column.originalDataRow && column.originalDataRow.id ? viewItem : undefined
            }
            cellHeight={cellHeight}
          />
        ))}
      </div>
    </div>
  );
};

export default MsgAdmListTableBodyRow;
export { MsgAdmListTableBodyRow };

