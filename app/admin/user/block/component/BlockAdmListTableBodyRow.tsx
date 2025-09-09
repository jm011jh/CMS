import { adminStyles } from '@/app/admin/assets/styleConstants';
import { basicThemeColors } from '@/app/admin/assets/theme';
import AdmButton from '@/app/admin/components/design/AdmButton';
import { AdmListTableCellProps } from '@/app/admin/components/design/AdmListTableHeadRow';
import { CSSProperties, FC } from 'react';

interface BlockAdmListTableCellHeightProps extends AdmListTableCellProps {
  cellHeight?: string;
  cancelItem?: (id: string) => void | null;
  deleteContentItem?: (id: string) => void | null;
  suspendItem?: (id: string) => void | null;
}

const BlockAdmListTableBodyCell: FC<BlockAdmListTableCellHeightProps> = ({
  value,
  size,
  align,
  cellKey,
  islast,
  cancelItem,
  deleteContentItem,
  suspendItem,
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
      minHeight: cellHeight,
      borderRight: islast ? 'none' : `1px solid ${basicThemeColors.gray300}`,
      padding: '4px 8px',
    },
    tableBodyCellText: {
      // overflow: 'hidden',
      // textOverflow: 'ellipsis',
      // lineClamp: 1,
      // WebkitLineClamp: 1,
      wordBreak: 'break-word',
      WebkitBoxOrient: 'vertical',
      display: '-webkit-box',
      width: '100%',
      textAlign: 'left',
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
            <div style={{ display: 'flex', gap: '4px', flexDirection: 'column' }}>
              {cancelItem && originalDataRow && (
                <AdmButton
                  size={'medium'}
                  color={'tertiaryFill'}
                  onClick={() => originalDataRow.id && cancelItem(originalDataRow.id)}>
                  신고무시
                </AdmButton>
              )}
              {deleteContentItem && originalDataRow && (
                <AdmButton
                  size={'medium'}
                  color={'secondaryFill'}
                  onClick={() => originalDataRow.id && deleteContentItem(originalDataRow.id)}>
                  컨텐츠 삭제
                </AdmButton>
              )}
              {suspendItem && originalDataRow && (
                <AdmButton
                  size={'medium'}
                  color={'danger'}
                  onClick={() => originalDataRow.id && suspendItem(originalDataRow.id)}>
                  불량회원설정
                </AdmButton>
              )}
            </div>
          )}
    </div>
  );
};

type BlockAdmListTableBodyProps = {
  structure: AdmListTableCellProps[];
  cancelItem?: (id: string) => void;
  deleteContentItem?: (id: string) => void;
  suspendItem?: (id: string) => void;
  cellHeight?: string;
};
const BlockAdmListTableBodyRow: FC<BlockAdmListTableBodyProps> = ({
  structure,
  cancelItem,
  deleteContentItem,
  suspendItem,
  cellHeight = adminStyles.table.cell.height,
}) => {
  const styles: { [key: string]: CSSProperties } = {
    tableBodyRow: {
      display: 'flex',
      justifyContent: 'space-between',
      // alignItems: 'center',
      minHeight: cellHeight,
      backgroundColor: basicThemeColors.white,
      width: '100%',
      fontSize: adminStyles.table.cell.fontSize,
      borderBottom: `1px solid ${basicThemeColors.gray300}`,
    },
  };

  return (
    <div>
      <div style={styles.tableBodyRow}>
        {structure.map((column, index) => (
          <BlockAdmListTableBodyCell
            originalDataRow={column.originalDataRow}
            key={index}
            value={column.value}
            size={column.size}
            align={column.align}
            cellKey={column.cellKey}
            islast={index === structure.length - 1}
            cancelItem={
              cancelItem && column.originalDataRow && column.originalDataRow.id
                ? () => cancelItem(column.originalDataRow.id)
                : undefined
            }
            deleteContentItem={
              deleteContentItem && column.originalDataRow && column.originalDataRow.id
                ? () => deleteContentItem(column.originalDataRow.id)
                : undefined
            }
            suspendItem={
              suspendItem && column.originalDataRow && column.originalDataRow.id
                ? () => suspendItem(column.originalDataRow.id)
                : undefined
            }
            cellHeight={cellHeight}
          />
        ))}
      </div>
    </div>
  );
};

export default BlockAdmListTableBodyRow;
export { BlockAdmListTableBodyRow };

