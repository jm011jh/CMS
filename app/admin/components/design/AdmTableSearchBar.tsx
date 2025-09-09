import { FC } from 'react';
import { AdmComponentPropsType } from './type';

const AdmTableSearchBar: FC<AdmComponentPropsType> = ({
  children,
  style,
  className,
}) => {
  return (
    <div className={'' + (className ? className : '')} style={style}>
      {children}
    </div>
  );
};

export default AdmTableSearchBar;
