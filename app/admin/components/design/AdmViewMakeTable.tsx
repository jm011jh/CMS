import { AdmViewMakeTableObjectType } from '@/app/admin/type';
import { FC } from 'react';
import AdmViewTableBody from './AdmViewTableBody';
import AdmViewTableRow from './AdmViewTableRow';

type AdmViewMakeTableProps = {
  values: AdmViewMakeTableObjectType[];
  setValues?: React.Dispatch<
    React.SetStateAction<AdmViewMakeTableObjectType[]>
  >;
  setEditValue?: React.Dispatch<React.SetStateAction<string>>;
};
const AdmViewMakeTable: FC<AdmViewMakeTableProps> = ({ values, setValues, setEditValue }) => {

  return (
    <AdmViewTableBody>
      {values.map(value => (
        value.isHidden ? null : (
          <AdmViewTableRow
            key={value.inputKey}
            setValues={setValues}
            value={value}
            setEditValue={setEditValue}
          />
        )
      ))}
    </AdmViewTableBody>
  );
};

export default AdmViewMakeTable;
