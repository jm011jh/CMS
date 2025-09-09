import { FC } from 'react';
import { basicThemeColors } from '../../assets/theme';

type AdmListTableProps = {
  children: React.ReactElement;
};
const AdmListTable: FC<AdmListTableProps> = ({ children }) => {
  const styles: { [key: string]: React.CSSProperties } = {
    table: {
      border: `1px solid ${basicThemeColors.gray300}`,
      width: 'fit-content',
      minWidth: '100%',
    },
  };
  return <div style={styles.table}>{children}</div>;
};

export default AdmListTable;
