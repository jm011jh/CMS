import { CSSProperties, FC } from 'react';

type AdmViewTableBodyProps = {
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
};
const AdmViewTableBody: FC<AdmViewTableBodyProps> = ({
  children,
  className,
}) => {
  const styles: { [key: string]: CSSProperties } = {
    tableBody: {
      display: 'flex',
      width: '100%',
      height: '100%',
      flexDirection: 'column',
      gap: '24px',
    },
  };
  return (
    <div style={styles.tableBody} className={className}>
      {children}
    </div>
  );
};

export default AdmViewTableBody;
