import { adminStyles } from '@/app/admin/assets/styleConstants';
import { basicThemeColors } from '@/app/admin/assets/theme';
import { CSSProperties, Dispatch, FC } from 'react';
import { AdmCheckBoxButton } from './AdmCheckBoxButton';
export type AdmListTableCellProps = {
  id?: string;
  originalDataRow?: any;
  value: string | React.ReactNode | number | boolean | null | undefined;
  size: string;
  cellKey: string;
  align?: 'left' | 'center' | 'right';
  islast?: boolean;
  deleteItem?: () => void | null;
  editItem?: (id: string) => void | null;
  viewItem?: (id: string) => void | null;
  withdrawItem?: (id: string) => void | null;
  withdrawItemText?: string;
  selected?: string[];
  setSelected?: Dispatch<string[]>;
  selectedAllItem?: string[];
  styleProp?: CSSProperties;
  lineClamp?: number;
  cellHeight?: string;
};
const AdmListTableHeadCell: FC<AdmListTableCellProps> = ({
  value,
  size,
  align,
  cellKey,
  islast,
  selected,
  setSelected,
  selectedAllItem
}) => {
  const styles: { [key: string]: CSSProperties } = {
    tableHeadCell: {
      color: '#000',
      textAlign: align || 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: size,
      minWidth: size === '100%' ? '100px' : size,
      maxWidth: size === '100%' ? 'auto' : size,
      height: adminStyles.table.cell.height,
      borderRight: islast ? 'none' : `1px solid ${basicThemeColors.gray300}`,
      padding: '0 8px',
    },
    tableHeadCellText: {
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
    cellKey === 'checkbox' ? (
      <div data-type={cellKey} style={styles.tableHeadCell}>
        <AdmCheckBoxButton
          isDisabled={false}
          value={"all"}
          id={cellKey}
          name={cellKey}
          selected={selected ?? []}
          setSelected={setSelected}
          selectedAllItem={selectedAllItem ?? []}
        />
      </div>
    ) : (
      <div data-type={cellKey} style={styles.tableHeadCell}>
        <div style={styles.tableHeadCellText}>{value}</div>
      </div>
    )
  )
};

type AdmListTableHeadProps = {
  structure: AdmListTableCellProps[];
  selected?: string[]
  setSelected?: Dispatch<string[]>;
  selectedAllItem?: string[];
};
const AdmListTableHeadRow: FC<AdmListTableHeadProps> = ({ structure, selected, setSelected, selectedAllItem }) => {
  const styles: { [key: string]: CSSProperties } = {
    tableHeadRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: adminStyles.table.cell.height,
      backgroundColor: basicThemeColors.gray100,
      width: '100%',
      fontSize: adminStyles.table.cell.fontSize,
      borderBottom: `1px solid ${basicThemeColors.gray300}`,
    },
  };
  return (
    <div>
      <div style={styles.tableHeadRow}>
        {structure.map((column, index) => (
          <AdmListTableHeadCell
            cellKey={column.cellKey}
            key={index}
            value={column.value}
            size={column.size}
            align={'center'}
            islast={index === structure.length - 1 ? true : false}
            selected={selected ?? []}
            setSelected={setSelected}
            selectedAllItem={selectedAllItem ?? []}
          />
        ))}
      </div>
    </div>
  );
};

export default AdmListTableHeadRow;
export { AdmListTableHeadCell, AdmListTableHeadRow };

