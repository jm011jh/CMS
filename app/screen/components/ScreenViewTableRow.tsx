import { basicThemeColors } from '@/app/admin/assets/theme';
import { AdmViewMakeTableObjectType } from '@/app/admin/type';
import {
  AdmInputCheckbox,
  AdmInputDate,
  AdmInputRadio,
  AdmInputSelect,
  AdmInputSelectAndText,
  AdmInputText,
  AdmInputTextArea,
  AdmInputTextPw,
  InputFileArray,
  InputImageArray2,
} from '@/app/components/form/Input';
import { CSSProperties, FC } from 'react';

type AdmViewTableRowBProps = {
  setValues?: React.Dispatch<
    React.SetStateAction<AdmViewMakeTableObjectType[]>
  >;
  value: AdmViewMakeTableObjectType;
  setEditValue?: React.Dispatch<
    React.SetStateAction<string>
  >;
  className?: string;
};
const AdmViewTableRow: FC<AdmViewTableRowBProps> = ({
  setValues,
  value,
  className,
  setEditValue
}) => {
  const styles: { [inputKey: string]: CSSProperties } = {
    tableViewRow: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      gap: '16px',
    },
    tableViewRowLabel: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      fontSize: '16px',
    },
    tableViewRowInput: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
    },
  };
  const changeValue = (name: string, newValue: string | any[]) => {
    if (setValues) {
      setValues((prevState: AdmViewMakeTableObjectType[]) =>
        prevState.map((item: AdmViewMakeTableObjectType) => {
          if (item.inputKey === name) {
            return { ...item, value: newValue };
          }
          return item;
        }),
      );
    }
  };
  const changeFile = (
    name: string,
    newFiles: Array<File | { fileUrl: string }>,
  ) => {
    if (setValues) {
      setValues((prevState: any) =>
        prevState.map((item: AdmViewMakeTableObjectType) => {
          if (item.inputKey === name) {
            return { ...item, value: newFiles };
          }
          return item;
        }),
      );
    }
  };
  return (
    <div style={styles.tableViewRow} className={className}>
      <div style={styles.tableViewRowLabel}>{value.label}{value.required && <p style={{ color: basicThemeColors.primary.primary, marginLeft: '4px' }}>*</p>}</div>
      <div style={styles.tableViewRowInput}>
        {value.inputType === 'date' && (
          <AdmInputDate
            value={value.value}
            size={'medium'}
            id={value.inputKey}
            name={value.inputKey}
            placeholder={value.placeholder || ''}
            desc={value.desc}
            onChange={(textValue: any) =>
              changeValue(value.inputKey, textValue)
            }
            isDisabled={value.disabled}
            descAlert={value.descAlert}
          />
        )}
        {value.inputType === 'text' && (
          <AdmInputText
            value={value.value}
            size={'medium'}
            id={value.inputKey}
            name={value.inputKey}
            placeholder={value.placeholder || ''}
            containConstructedValue={value.containConstructedValue}
            onChange={(textValue: string) =>
              changeValue(value.inputKey, textValue)
            }
            desc={value.desc || ''}
            isDisabled={value.disabled}
            maxLength={value.requireOptions?.maxLength}
          />
        )}
        {value.inputType === 'password' && (
          <AdmInputTextPw
            value={value.value}
            size={'medium'}
            id={value.inputKey}
            name={value.inputKey}
            placeholder={value.placeholder || ''}
            containConstructedValue={value.containConstructedValue}
            onChange={(textValue: string) =>
              changeValue(value.inputKey, textValue)
            }
            desc={value.desc || ''}
            isDisabled={value.disabled}
          />
        )}
        {value.inputType === 'select&text' && (
          <AdmInputSelectAndText
            value={value.value}
            size={'medium'}
            id={value.inputKey}
            name={value.inputKey}
            placeholder={value.placeholder || ''}
            onChange={(newValue: string) =>
              changeValue(value.inputKey, newValue)
            }
            options={value.selectOptions}
            desc={value.desc || ''}
            isDisabled={value.disabled}
          />
        )}
        {value.inputType === 'radio' && (
          <AdmInputRadio
            value={value.value}
            size={'medium'}
            id={value.inputKey}
            name={value.inputKey}
            options={value.selectOptions || []}
            onChange={(textValue: string) => {
              console.log(textValue)
              changeValue(value.inputKey, textValue)
            }
            }
            isDisabled={value.disabled}
          />
        )}
        {value.inputType === 'checkbox' && (
          <AdmInputCheckbox
            value={value.value}
            size={'medium'}
            id={value.inputKey}
            name={value.inputKey}
            options={value.selectOptions || []}
            onChange={(textValue: string[]) => {
              console.log(textValue)
              changeValue(value.inputKey, textValue)
            }
            }
            isDisabled={value.disabled}
            direction='column'
          />
        )}
        {value.inputType === 'select' && (
          <AdmInputSelect
            value={value.value}
            size={'medium'}
            id={value.inputKey}
            name={value.inputKey}
            placeholder={value.placeholder || ''}
            options={value.selectOptions || []}
            onChange={(textValue: string) => {
              console.log(textValue)
              changeValue(value.inputKey, textValue)
            }
            }
            isDisabled={value.disabled}
          />
        )}
        {value.inputType === 'textarea' && (
          <AdmInputTextArea
            value={value.value}
            size={'medium'}
            id={value.inputKey}
            name={value.inputKey}
            placeholder={value.placeholder || ''}
            onChange={(textValue: string) =>
              changeValue(value.inputKey, textValue)
            }
            desc={value.desc || ''}
            isDisabled={value.disabled}
            maxLength={value.requireOptions?.maxLength}
          />
        )}
        {value.inputType === 'images' && (
          <InputImageArray2
            value={value.value}
            id={value.inputKey}
            name={value.inputKey}
            placeholder={value.placeholder || ''}
            onChange={(updatedFiles: Array<File | { fileUrl: string }>) =>
              changeFile(value.inputKey, updatedFiles)
            }
            maxLength={value.maxLength || 10}
            isDisabled={value.disabled}
          />
        )}
        {value.inputType === 'files' && (
          <InputFileArray
            value={value.value}
            id={value.inputKey}
            name={value.inputKey}
            placeholder={value.placeholder || ''}
            onChange={(updatedFiles: Array<File | { fileUrl: string }>) =>
              changeFile(value.inputKey, updatedFiles)
            }
            maxLength={value.maxLength || 10}
            isDisabled={value.disabled}
          />
        )}
      </div>
    </div>
  );
};

export default AdmViewTableRow;
