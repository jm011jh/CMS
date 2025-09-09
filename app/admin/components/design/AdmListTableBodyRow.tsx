import { adminStyles } from '@/app/admin/assets/styleConstants';
import { basicThemeColors } from '@/app/admin/assets/theme';
import AdmButton from '@/app/admin/components/design/AdmButton';
import { CSSProperties, Dispatch, FC } from 'react';
import { AdmCheckBoxButton } from './AdmCheckBoxButton';
import { AdmListTableCellProps } from './AdmListTableHeadRow';

interface AdmListTableCellHeightProps extends AdmListTableCellProps {
  cellHeight?: string;
  selected?: string[];
  setSelected?: Dispatch<string[]>;
  column?: AdmListTableStructureProps;
}

const AdmListTableBodyCell: FC<AdmListTableCellHeightProps> = ({
  value,
  size,
  align,
  cellKey,
  islast,
  deleteItem,
  editItem,
  viewItem,
  withdrawItem,
  withdrawItemText,
  originalDataRow,
  cellHeight = adminStyles.table.cell.height,
  selected,
  setSelected,
  styleProp,
  column,
}) => {
  const styles: { [key: string]: CSSProperties } = {
    tableBodyCell: {
      color: '#000',
      // textAlign: align || 'center',
      textAlign: 'left',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: size,
      minWidth: size === '100%' ? '100px' : size,
      maxWidth: size === '100%' ? 'auto' : size,
      height: cellHeight || adminStyles.table.cell.height,
      borderRight: islast ? 'none' : `1px solid ${basicThemeColors.gray300}`,
      padding: '0 16px',
    },
    tableBodyCellText: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      lineClamp: column?.lineClamp || 1,
      WebkitLineClamp: column?.lineClamp || 1,
      WebkitBoxOrient: 'vertical',
      display: '-webkit-box',
      width: '100%',
    },
  };

  return (
    <div data-type={cellKey} style={{ ...styles.tableBodyCell, ...styleProp }}>
      {cellKey !== 'ctrl' ?
        cellKey === 'checkbox' && selected ?
          (
            <AdmCheckBoxButton
              isDisabled={false}
              id={originalDataRow.id} name={'artist'} value={originalDataRow.id} selected={selected} setSelected={setSelected} />
          ) :
          (
            <div style={styles.tableBodyCellText}>{value}</div>
          ) :
        (
          <div style={{ display: 'flex', gap: '10px' }}>
            {viewItem && originalDataRow && (
              <AdmButton
                size={'small'}
                color={'primaryFill'}
                style={{ padding: '0 12px' }}
                onClick={() => originalDataRow.id && viewItem(originalDataRow.id)}>
                상세정보
              </AdmButton>
            )}
            {editItem && originalDataRow && (
              <AdmButton
                size={'small'}
                color={'primaryFill'}
                onClick={() => originalDataRow.id && editItem(originalDataRow.id)}>
                수정
              </AdmButton>
            )}
            {deleteItem && originalDataRow && (
              <AdmButton
                size={'small'}
                color={'secondaryFill'}
                onClick={deleteItem}>
                삭제
              </AdmButton>
            )}
            {withdrawItem && originalDataRow && (
              <AdmButton
                size={'small'}
                color={'secondaryFill'}
                style={{
                  opacity: originalDataRow.isWithdraw === '탈퇴' ? '0.2' : 1,
                  pointerEvents: originalDataRow.isWithdraw === '탈퇴' ? 'none' : 'auto',
                  width: 'fit-content',
                  padding: '0 8px',
                }}
                disabled={originalDataRow.isWithdraw === '탈퇴'}
                onClick={withdrawItem}>
                {withdrawItemText ? withdrawItemText : '탈퇴'}
              </AdmButton>
            )}
          </div>
        )}
    </div>
  );
};

interface AdmListTableStructureProps extends AdmListTableCellProps {
  cellStyle?: any;
}
interface AdmListTableBodyProps {
  structure: AdmListTableStructureProps[];
  deleteItem?: (id: string) => void;
  editItem?: (id: string) => void;
  viewItem?: (id: string) => void;
  withdrawItem?: (id: string) => void;
  withdrawItemText?: string;
  cellHeight?: string;
  selected?: string[];
  setSelected?: Dispatch<string[]>;
  isLast?: boolean;
};
const AdmListTableBodyRow: FC<AdmListTableBodyProps> = ({
  structure,
  deleteItem,
  editItem,
  viewItem,
  withdrawItem,
  withdrawItemText,
  cellHeight,
  selected,
  setSelected,
  isLast,
}) => {
  const styles: { [key: string]: CSSProperties } = {
    tableBodyRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: cellHeight || adminStyles.table.cell.height,
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
          <AdmListTableBodyCell
            column={column}
            styleProp={column.cellStyle}
            originalDataRow={column.originalDataRow}
            key={index}
            value={column.value}
            size={column.size}
            align={column.align}
            cellKey={column.cellKey}
            islast={index === structure.length - 1}
            cellHeight={column.cellHeight}
            deleteItem={
              deleteItem && column.originalDataRow && column.originalDataRow.id
                ? () => deleteItem(column.originalDataRow.id)
                : undefined
            }
            withdrawItem={
              withdrawItem && column.originalDataRow && column.originalDataRow.id
                ? () => withdrawItem(column.originalDataRow.id)
                : undefined
            }
            withdrawItemText={withdrawItemText}
            editItem={
              editItem && column.originalDataRow && column.originalDataRow.id ? editItem : undefined
            }
            viewItem={
              viewItem && column.originalDataRow && column.originalDataRow.id ? viewItem : undefined
            }
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </div>
    </div>
  );
};

export default AdmListTableBodyRow;
export { AdmListTableBodyCell, AdmListTableBodyRow };

