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
  AdmInputTextPw2,
  InputFileArray,
  InputImageArray,
} from '@/app/components/form/Input';
import { useSearchParams } from 'next/navigation';
import { CSSProperties, FC, useEffect, useState } from 'react';
import { CustomEditor } from '../../setting/term/component/CustomEditor';

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
      width: '100%',
      minHeight: value.isFirst ? '64px' : value.isLast ? '64px' : '56px',
    },
    tableViewRowLabel: {
      width: '160px',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '16px',
      paddingRight: '16px',
      fontSize: '16px',
      borderRight: basicThemeColors.gray300 + ' 1px solid',
      backgroundColor: basicThemeColors.gray100,
      paddingTop: value.isFirst ? '24px' : '16px',
      paddingBottom: value.isLast ? '24px' : '16px',
      borderBottom: value.isLast
        ? 'rgba(0,0,0,0) 1px solid'
        : basicThemeColors.gray300 + ' 1px solid',
    },
    tableViewRowInput: {
      width: 'calc(100% - 160px)',
      display: 'flex',
      alignItems: 'center',
      padding: '0px 16px',
      paddingTop: value.isFirst ? '16px' : '8px',
      paddingBottom: value.isLast ? '16px' : '8px',
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

  // #region TextEditor를 사용하기 위한 코드 =================================
  const searchParam = useSearchParams();
  const viewId = searchParam.get('id');
  const [mode, setMode] = useState<string>('init');
  useEffect(() => {
    // console.log(viewId)
    if (viewId) {
      setMode('edit');
    } else {
      setMode('view');
    }
  }, [viewId]);
  // #endregion TextEditor를 사용하기 위한 코드 ==============================
  return (
    <div style={styles.tableViewRow} className={className}>
      <div style={styles.tableViewRowLabel}>{value.label}</div>
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
          <AdmInputTextPw2
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
          <InputImageArray
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

        {
          mode === 'edit'
            ?
            value.inputType === 'editor' && value.value && (
              <CustomEditor
                initContent={value.value?.toString() || ''}
                setContent={(newValue: any) => changeValue(value.inputKey, newValue)}
                width='100%'
                height='400px'
              />
            )
            :
            mode === 'view'
              ? value.inputType === 'editor' && (
                <CustomEditor
                  initContent={value.value?.toString() || ''}
                  setContent={(newValue: any) => changeValue(value.inputKey, newValue)}
                  width='100%'
                  height='400px'
                />
              )
              : null
        }

        {
          mode === 'edit'
            ?
            value.inputType === 'editorImage' && value.value && (
              <CustomEditor
                initContent={value.value?.toString() || ''}
                setContent={(newValue: any) => changeValue(value.inputKey, newValue)}
                width='100%'
                height='400px'
                attachImageModule={true} // Enable image upload functionality
              />
            )
            :
            mode === 'view'
              ?
              value.inputType === 'editorImage' && (
                <CustomEditor
                  initContent={value.value?.toString() || ''}
                  setContent={(newValue: any) => changeValue(value.inputKey, newValue)}
                  width='100%'
                  height='400px'
                  attachImageModule={true} // Enable image upload functionality
                />
              )
              : null
        }
      </div>
    </div>
  );
};

export default AdmViewTableRow;
