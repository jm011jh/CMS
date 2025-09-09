import { FC } from 'react';
import ScreenViewTableBody from './ScreenViewTableBody';
import ScreenViewTableRow from './ScreenViewTableRow';
import { ScreenViewMakeTableObjectType } from './type';

type ScreenViewMakeTableProps = {
    values: ScreenViewMakeTableObjectType[];
    setValues: any;
};
const ScreenViewMakeTable: FC<ScreenViewMakeTableProps> = ({ values, setValues }) => {

    return (
        <ScreenViewTableBody>
            {values.map(value => (
                value.isHidden ? null : (
                    <ScreenViewTableRow
                        key={value.inputKey}
                        setValues={setValues}
                        value={value}
                    />
                )
            ))}
        </ScreenViewTableBody>
    );
};

export default ScreenViewMakeTable;
