'use client';
import { basicThemeColors } from '@/app/admin/assets/theme';
import { useScreenLanguageStore } from '@/app/screen/store/screenLanguageStore';
import Image from 'next/image';
import {
  ChangeEvent,
  CompositionEvent,
  Fragment,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import 'react-calendar/dist/Calendar.css';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import './form.css';

type inputSize = 'large' | 'medium' | 'small' | 'xsmall' | 'xxsmall';

interface InputPwProps {
  size: inputSize;
  isDisabled?: boolean;
  placeholder?: string;
  id: string;
  name: string;
  value?: any;
  error?: boolean;
  onChange?: (value: string) => void;
  onKeyDown?: (value: any) => void;
  onBlur?: () => void;
}
export const InputPw: React.FC<InputPwProps> = ({
  size,
  isDisabled,
  placeholder,
  id,
  name,
  value,
  error,
  onChange,
  onKeyDown,
  onBlur,
}) => {
  const [isShow, setisShow] = useState(isDisabled);
  const handleChange = (e: any) => {
    const newValue = e;
    if (onChange) {
      onChange(newValue);
    }
  };
  const handleBlur = (e: any) => {
    if (onBlur) {
      onBlur();
    }
  };
  const handleKeyDown = (e: any) => {
    const newValue = e;
    if (onKeyDown) {
      onKeyDown(newValue);
    }
  };
  return (
    <div
      data-disabled={isDisabled}
      data-size={size}
      className={`form-input form-input-pw  ${error ? 'error' : ''}`}>
      <input
        type={isShow ? 'text' : 'password'}
        placeholder={placeholder ? placeholder : 'enter your password'}
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
      <div
        className="form-input-text-visible"
        onClick={e => setisShow(!isShow)}>
        {isShow ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none">
            <path
              d="M15.4698 7.83C14.8817 6.30882 13.8608 4.99331 12.5332 4.04604C11.2056 3.09878 9.62953 2.56129 7.99979 2.5C6.37005 2.56129 4.79398 3.09878 3.46639 4.04604C2.1388 4.99331 1.11787 6.30882 0.529787 7.83C0.490071 7.93985 0.490071 8.06015 0.529787 8.17C1.11787 9.69118 2.1388 11.0067 3.46639 11.954C4.79398 12.9012 6.37005 13.4387 7.99979 13.5C9.62953 13.4387 11.2056 12.9012 12.5332 11.954C13.8608 11.0067 14.8817 9.69118 15.4698 8.17C15.5095 8.06015 15.5095 7.93985 15.4698 7.83ZM7.99979 12.5C5.34979 12.5 2.54979 10.535 1.53479 8C2.54979 5.465 5.34979 3.5 7.99979 3.5C10.6498 3.5 13.4498 5.465 14.4648 8C13.4498 10.535 10.6498 12.5 7.99979 12.5Z"
              fill="#8C959F"
            />
            <path
              d="M7.99979 5C7.40644 5 6.82642 5.17595 6.33308 5.50559C5.83973 5.83524 5.45521 6.30377 5.22815 6.85195C5.00109 7.40013 4.94168 8.00333 5.05743 8.58527C5.17319 9.16721 5.45891 9.70176 5.87847 10.1213C6.29802 10.5409 6.83257 10.8266 7.41452 10.9424C7.99646 11.0581 8.59966 10.9987 9.14784 10.7716C9.69602 10.5446 10.1646 10.1601 10.4942 9.66671C10.8238 9.17336 10.9998 8.59334 10.9998 8C10.9998 7.20435 10.6837 6.44129 10.1211 5.87868C9.5585 5.31607 8.79544 5 7.99979 5ZM7.99979 10C7.60422 10 7.21755 9.8827 6.88865 9.66294C6.55975 9.44318 6.3034 9.13082 6.15203 8.76537C6.00065 8.39991 5.96105 7.99778 6.03822 7.60982C6.11539 7.22186 6.30587 6.86549 6.58557 6.58579C6.86528 6.30608 7.22164 6.1156 7.60961 6.03843C7.99757 5.96126 8.3997 6.00087 8.76515 6.15224C9.13061 6.30362 9.44296 6.55996 9.66273 6.88886C9.88249 7.21776 9.99979 7.60444 9.99979 8C9.99979 8.53043 9.78907 9.03914 9.414 9.41421C9.03893 9.78929 8.53022 10 7.99979 10Z"
              fill="#8C959F"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none">
            <path
              d="M2.61979 11.255L3.33479 10.545C2.5519 9.84206 1.93677 8.97234 1.53479 8C2.54979 5.465 5.34979 3.5 7.99979 3.5C8.68173 3.509 9.3575 3.63064 9.99979 3.86L10.7748 3.08C9.89611 2.70866 8.95363 2.51167 7.99979 2.5C6.37005 2.56129 4.79398 3.09878 3.46639 4.04604C2.1388 4.99331 1.11787 6.30882 0.529787 7.83C0.490071 7.93985 0.490071 8.06015 0.529787 8.17C0.973911 9.34851 1.69 10.4055 2.61979 11.255Z"
              fill="#8C959F"
            />
            <path
              d="M5.99979 7.865C6.03456 7.38586 6.24063 6.93524 6.58033 6.59554C6.92003 6.25584 7.37064 6.04977 7.84979 6.015L8.75479 5.105C8.24767 4.97147 7.71441 4.97321 7.20817 5.11003C6.70193 5.24685 6.24039 5.51399 5.86958 5.8848C5.49878 6.25561 5.23164 6.71714 5.09482 7.22338C4.95799 7.72962 4.95626 8.26288 5.08979 8.77L5.99979 7.865Z"
              fill="#8C959F"
            />
            <path
              d="M15.4698 7.83C14.8965 6.3366 13.8988 5.04351 12.5998 4.11L14.9998 1.705L14.2948 1L0.999787 14.295L1.70479 15L4.25479 12.45C5.39173 13.117 6.68181 13.4787 7.99979 13.5C9.62953 13.4387 11.2056 12.9012 12.5332 11.954C13.8608 11.0067 14.8817 9.69118 15.4698 8.17C15.5095 8.06015 15.5095 7.93985 15.4698 7.83ZM9.99979 8C9.99768 8.35005 9.90374 8.69342 9.72734 8.99578C9.55094 9.29815 9.29828 9.54892 8.99459 9.72303C8.69091 9.89714 8.34684 9.9885 7.99678 9.98797C7.64673 9.98744 7.30294 9.89503 6.99979 9.72L9.71979 7C9.89954 7.30287 9.99613 7.64783 9.99979 8ZM7.99979 12.5C6.95082 12.4817 5.92173 12.2107 4.99979 11.71L6.26979 10.44C6.84746 10.8408 7.54756 11.026 8.24785 10.9632C8.94815 10.9005 9.60415 10.5937 10.1013 10.0965C10.5985 9.59937 10.9052 8.94336 10.968 8.24307C11.0308 7.54277 10.8456 6.84267 10.4448 6.265L11.8798 4.83C13.0271 5.61749 13.9243 6.71771 14.4648 8C13.4498 10.535 10.6498 12.5 7.99979 12.5Z"
              fill="#8C959F"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

interface InputTextProps {
  size: inputSize;
  isDisabled?: boolean;
  placeholder?: string;
  id: string;
  name: string;
  value?: any;
  onChange?: (value: string) => void;
  error?: boolean;
  onKeyDown?: (value: any) => void;
  inputMode?: any;
  pattern?: any;
  boxStyle?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
}
export const InputText: React.FC<InputTextProps> = ({
  size,
  isDisabled,
  placeholder,
  id,
  name,
  value,
  onChange,
  error,
  onKeyDown,
  inputMode,
  pattern,
  boxStyle,
  inputStyle,
}) => {
  const [placeHolderValue, setPlaceHolderValue] = useState(placeholder);
  useEffect(() => {
    setPlaceHolderValue(placeholder);
  }, [placeholder]);
  const handleChange = (e: any) => {
    const newValue = e;
    if (onChange) {
      onChange(newValue);
    }
  };
  const handleKeyDown = (e: any) => {
    const newValue = e;
    if (onKeyDown) {
      onKeyDown(newValue);
    }
  };
  return (
    <div
      data-disabled={isDisabled}
      data-size={size}
      style={boxStyle}
      className={`form-input form-input-text ${error ? 'error' : ''}`}>
      <input
        style={inputStyle}
        inputMode={inputMode && inputMode}
        pattern={pattern && pattern}
        tabIndex={isDisabled ? -1 : 1}
        readOnly={isDisabled ? true : false}
        type="text"
        placeholder={placeHolderValue ? placeHolderValue : 'enter your text'}
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};
interface InputTextAreaProps {
  size: inputSize;
  isDisabled?: boolean;
  placeholder?: string;
  id: string;
  name: string;
  value?: any;
  onChange?: (value: string) => void;
  error?: boolean;
  boxStyle?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
}
export const InputTextArea: React.FC<InputTextAreaProps> = ({
  size,
  isDisabled,
  placeholder,
  id,
  name,
  value,
  onChange,
  error,
  boxStyle,
  inputStyle,
}) => {
  const handleChange = (e: any) => {
    const newValue = e;
    if (onChange) {
      onChange(newValue);
    }
  };
  return (
    <div
      style={boxStyle}
      data-disabled={isDisabled}
      data-size={size}
      className={`form-input form-input-textarea ${error ? 'error' : ''}`}>
      <textarea
        style={inputStyle}
        tabIndex={isDisabled ? -1 : 1}
        readOnly={isDisabled ? true : false}
        maxLength={3000}
        disabled={isDisabled}
        placeholder={placeholder ? placeholder : 'enter your text'}
        id={id}
        name={name}
        value={value}
        onChange={handleChange}></textarea>
    </div>
  );
};

interface InputCheckProps {
  size: inputSize;
  isDisabled?: boolean;
  placeholder?: string;
  id: string;
  name: string;
  checked: boolean;
  onChange?: (value: string) => void;
}
export const InputCheck: React.FC<InputCheckProps> = ({
  size,
  isDisabled,
  placeholder,
  id,
  name,
  checked,
  onChange,
}) => {
  const handleChange = (e: any) => {
    const newValue = e.target.checked;
    if (onChange) {
      onChange(newValue);
    }
  };
  return (
    <div
      data-disabled={isDisabled}
      data-size={size}
      className={`${checked ? 'checked' : ''}`}>
      <input
        type="checkbox"
        placeholder={placeholder ? placeholder : 'enter your text'}
        id={id}
        name={name}
        checked={checked}
        onChange={handleChange}
      />
    </div>
  );
};

interface InputSelectProps {
  size: inputSize;
  isDisabled?: boolean;
  placeholder?: string;
  id: string;
  name: string;
  options: any[];
  value?: any;
  onChange?: (value: string) => void;
  error?: boolean;
}
export const InputSelect: React.FC<InputSelectProps> = ({
  size,
  isDisabled,
  placeholder,
  id,
  name,
  value,
  options,
  onChange,
  error,
}) => {
  const handleChange = (e: any) => {
    onChange && onChange(e);
    setCheckedValue(e.target.value);
    if (value?.length > 0 || value == undefined || value == null) {
      setIsSelected(true);
    }
  };
  const [placeholderValue, setPlaceholderValue] = useState<any>();
  const [checkedValue, setCheckedValue] = useState<any>(value);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [propsValue, setPropsValue] = useState<any>(value);

  useEffect(() => {
    if (value) {
      setIsSelected(true);
      options.forEach(option => {
        if (option.value == value) {
          setPlaceholderValue(option.label);
          setCheckedValue(option.value);
        }
      });
      setPropsValue(value);
    } else {
      setPlaceholderValue(placeholder);
    }
  }, [value, placeholder, options]);
  useEffect(() => {
    if (!value) {
      // value가 없을때만 실행
      setPlaceholderValue(placeholder);
    }
  }, [placeholder]);
  return (
    <>
      {!isDisabled ? (
        <div
          data-size={size}
          className={`form-input form-input-select ${isSelected ? 'selected' : ''} ${error ? 'error' : ''}`}>
          <select
            id={id}
            name={name}
            onChange={handleChange}
            value={checkedValue}>
            {!value && (
              <option disabled value="">
                {placeholder}
              </option>
            )}
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="form-input-select-placeholder">
            {placeholderValue}
            <span></span>
          </div>
        </div>
      ) : (
        <div
          data-disabled={true}
          data-size={size}
          className={`form-input form-input-text ${error ? 'error' : ''}`}>
          <input
            tabIndex={-1}
            readOnly={true}
            type="text"
            id={id}
            name={name}
            value={value}
          />
        </div>
      )}
    </>
  );
};
interface InputFileProps {
  size: inputSize;
  isDisabled?: boolean;
  placeholder?: string;
  id: string;
  name: string;
  type?: string;
  orgFileName?: string;
  onChange: (event: any) => void;
  onDelete?: () => void;
}
export const InputFile: React.FC<InputFileProps> = ({
  size,
  isDisabled,
  placeholder = '선택된 파일이 없음',
  id,
  name,
  type = 'image/*',
  orgFileName,
  onChange,
  onDelete,
}) => {
  const [fileName, setFileName] = useState<string>();
  const [placeholderValue, setPlaceholderValue] = useState(placeholder);
  useEffect(() => {
    setPlaceholderValue(placeholder);
  }, [placeholder]);

  useEffect(() => {
    setFileName(orgFileName);
  }, [orgFileName]);

  const changeFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const selectFile = e.target.files as any;
    if (selectFile[0] !== undefined) {
      if (selectFile[0] !== null) {
        //첨부파일 있을때,
        setFileName(selectFile[0].name);
        onChange(e);
      } else {
        //첨부파일 없을때,
        // setFileName("");
      }
    }
  };
  const dltFileHandler = () => {
    setFileName('');
    onChange({ target: { name: name, files: [] } });
    onDelete && onDelete();
  };

  return (
    <div
      data-disabled={isDisabled}
      data-size={size}
      className={
        fileName
          ? 'form-input form-input-file uploaded'
          : 'form-input form-input-file'
      }>
      <div className={size + ' form-input-file-btn'}>
        <p>파일 선택</p>
        <input
          id={id}
          name={name}
          type="file"
          accept={type}
          onChange={e => changeFileHandler(e)}
        />
      </div>
      <div
        className={
          placeholder
            ? 'form-input-file-placeholder on'
            : 'form-input-file-placeholder'
        }>
        <p>{fileName ? fileName : placeholderValue}</p>
        <div onClick={dltFileHandler} className="form-input-file-dlt">
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};
interface InputFileProps2 {
  isDisabled?: boolean;
  placeholder?: string;
  id: string;
  name: string;
  type?: string;
  orgFileName?: string;
  limitType?: string[];
  limitSize?: string;
  subTxt?: ReactNode;
  onChange: (event: any) => void;
}
export const InputFile2: React.FC<InputFileProps2> = ({
  isDisabled,
  placeholder = '선택된 파일이 없음',
  id,
  name,
  type = 'image/*',
  orgFileName,
  limitType,
  limitSize,
  subTxt,
  onChange,
}) => {
  interface IFileTypes {
    id: number; // 파일들의 고유값 id
    object: File;
  }
  const [file, setFile] = useState<IFileTypes | null>(null);
  const onChangeFiles = (e: ChangeEvent<HTMLInputElement> | any) => {
    let selectFiles: File[] = [];
    // let tempFiles: IFileTypes[] = files;
    // temp 변수를 이용하여 선택했던 파일들을 담습니다.

    // 드래그 했을 때와 안했을 때 가리키는 파일 배열을 다르게 해줍니다.
    if (e.type === 'drop') {
      // 드래그 앤 드롭 했을때
      selectFiles = e.dataTransfer.files;
    } else {
      // "파일 첨부" 버튼을 눌러서 이미지를 선택했을때
      selectFiles = e.target.files;
    }

    if (selectFiles[0]) {
      if (limitSize) {
        const limitSizeToByte = parseInt(limitSize) * 1024 * 1024;
        if (selectFiles[0].size > limitSizeToByte) {
          alert('파일의 용량이 너무 큽니다.');
          setFile(null);
          setFileName('');
          return;
        }
      }
      if (limitType) {
        if (limitType.indexOf(selectFiles[0].type) === -1) {
          alert('파일의 형식이 맞지 않습니다.');
          setFile(null);
          setFileName('');
          return;
        }
      }
    }
    if (!selectFiles[0]) {
      setFile(null);
      setFileName('');
    } else {
      setFile({
        id: 1,
        object: selectFiles[0],
      });
      setFileName(selectFiles[0].name);
      onChange(e);
    }
  };
  const [isDragging, setIsDragging] = useState<boolean>(false);
  //drag & drop event for add event listener
  const handleDragIn = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  const handleDragOut = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);
  }, []);
  const handleDragOver = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer!.files) {
      setIsDragging(true);
    }
  }, []);
  const handleDrop = useCallback(
    (e: DragEvent): void => {
      e.preventDefault();
      e.stopPropagation();

      onChangeFiles(e);
      setIsDragging(false);
    },
    [onChangeFiles],
  );
  //drag&drop init
  const initDragEvents = useCallback((): void => {
    // 앞서 말했던 4개의 이벤트에 Listener를 등록합니다. (마운트 될때)

    if (dragRef.current !== null) {
      dragRef.current.addEventListener('dragenter', handleDragIn);
      dragRef.current.addEventListener('dragleave', handleDragOut);
      dragRef.current.addEventListener('dragover', handleDragOver);
      dragRef.current.addEventListener('drop', handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  const resetDragEvents = useCallback((): void => {
    // 앞서 말했던 4개의 이벤트에 Listener를 삭제합니다. (언마운트 될때)

    if (dragRef.current !== null) {
      dragRef.current.removeEventListener('dragenter', handleDragIn);
      dragRef.current.removeEventListener('dragleave', handleDragOut);
      dragRef.current.removeEventListener('dragover', handleDragOver);
      dragRef.current.removeEventListener('drop', handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  useEffect(() => {
    initDragEvents();

    return () => resetDragEvents();
  }, [initDragEvents, resetDragEvents]);
  const clickHandler = (e: MouseEvent, num: number) => {
    e.preventDefault();
    e.stopPropagation();

    inputRef.current?.click();
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  const [fileName, setFileName] = useState<string>();
  const [placeholderValue, setPlaceholderValue] = useState(placeholder);
  useEffect(() => {
    setPlaceholderValue(placeholder);
  }, [placeholder]);

  useEffect(() => {
    setFileName(orgFileName);
  }, [orgFileName]);

  return (
    <div
      data-disabled={isDisabled}
      className={
        fileName
          ? 'form-input form-input-file2 uploaded'
          : 'form-input form-input-file2'
      }>
      <div
        ref={dragRef}
        onClick={(e: any) => clickHandler(e, 1)}
        className="form-input-file2-dragpoint">
        {fileName ? (
          <>
            <img
              className="form-input-file2-uploaded-icon"
              src="/image/icon_file.png"
              alt=""
            />
            <div className="form-input-file2-uploaded-filename">
              {fileName ? fileName : '파일오류'}
            </div>
          </>
        ) : (
          <>
            <div className="form-input-file2-txt1">
              Drag & Drop or <b> Choose file </b> to upload
            </div>
            {subTxt ? subTxt : ''}
          </>
        )}
      </div>
      <input
        ref={inputRef}
        onChange={onChangeFiles}
        type="file"
        style={{ display: 'none' }}
      />
    </div>
  );
};

interface InputRadioProps {
  size: inputSize;
  isDisabled?: boolean;
  placeholder?: string;
  id: string;
  name: string;
  options: any[];
  value?: any;
  onChange?: (value: string) => void;
}

export const InputRadio: React.FC<InputRadioProps> = ({
  size,
  isDisabled,
  id,
  name,
  options,
  value,
  onChange,
}) => {
  const handleChange = (e: any) => {
    if (isDisabled) {
      return;
    }

    const newValue = e;
    if (onChange) {
      onChange(newValue);
    }
  };
  return (
    <div
      data-disabled={isDisabled}
      data-size={size}
      className="form-input form-input-radio">
      {options.map((option, index) => {
        return (
          <div key={index} className="form-input-radio-item">
            <input
              type="radio"
              disabled={isDisabled}
              id={id + option.value}
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={handleChange}
            />
            <label htmlFor={id + option.value}>{option.label}</label>
          </div>
        );
      })}
    </div>
  );
};
/**
 *
 * @param e "e.target.value"
 * @param func "useState function"
 */
export const handleInput = (e: any, func: any) => {
  if (e === null) {
    func(null);
  } else {
    if (e.target.type === 'file') {
      const newValue = e.target.files[0];
      func(newValue);
    } else {
      const newValue = e.target.value;
      func(newValue);
    }
  }
};
/**
 *
 * @param formData "new FormData()"
 * @param file "e.target.files[0]"
 * @param fileName "e.target.files[0].name"
 * @param key "formData key name"
 * @returns
 */
export const appendFormDataInputFile = (
  formData: FormData,
  file: File,
  key: string,
) => {
  const res = file
    ? formData.append(key, file, file.name.normalize('NFC'))
    : null;
  return res;
};
export const appendFormDataInputFileArray = (
  formData: any,
  files: any[],
  key: string,
) => {
  const res = files
    ? files.forEach(item => {
      if (item != '') {
        formData.append(
          key,
          item,
          encodeURIComponent(item.name.normalize('NFC')),
        );
      }
    })
    : null;
  return res;
};

// 2025-05-22 아티스트팬플랫폼 프로젝트부터 추가된 input
const baseInputTextStyle: Omit<
  React.CSSProperties,
  'height' | 'padding' | 'fontSize' | 'lineHeight'
> = {
  flex: 1,
  color: basicThemeColors.black,
  width: '100%',
  // outline: 'none',
  border: 'none',
  boxSizing: 'border-box', // Ensures padding and border are included in the element's total width and height
  borderRadius: '12px',
  display: 'flex',
  resize: 'none',
};
const baseInputTextAreaStyle: Omit<
  React.CSSProperties,
  'height' | 'padding' | 'fontSize' | 'lineHeight'
> = {
  flex: 1,
  color: basicThemeColors.black,
  width: '100%',
  // outline: 'none',
  border: 'none',
  boxSizing: 'border-box', // Ensures padding and border are included in the element's total width and height
  borderRadius: '8px',
  display: 'flex',
  resize: 'vertical',
  scrollbarWidth: 'thin',
};
const baseInputTextPlaceStyle: Omit<
  React.CSSProperties,
  'height' | 'padding' | 'fontSize' | 'lineHeight'
> = {
  flex: 1,
  color: basicThemeColors.gray500,
  width: '100%',
  outline: 'none',
  border: 'none',
  boxSizing: 'border-box', // Ensures padding and border are included in the element's total width and height
  borderRadius: '12px',
  display: 'flex',
  resize: 'none',
};
const baseInputSelectPlaceHolder: Omit<
  React.CSSProperties,
  'height' | 'padding' | 'fontSize' | 'lineHeight'
> = {
  color: '#d1d5db',
  fontWeight: '400',
  position: 'absolute',
  top: '50%',
  left: ' 50%',
  width: '100%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  alignItems: 'center',
  /* font-size: var(--ct-input-fs); */
  backgroundColor: '#fff',
  pointerEvents: 'none',
  /* border: 1px solid var(--cr-g03); */
  borderRadius: 'var(--ct-input-text-radius)',
}
const baseInputSelectStyle: Omit<
  React.CSSProperties,
  'height' | 'padding' | 'fontSize' | 'lineHeight'
> = {
  flex: 1,
  color: basicThemeColors.black,
  width: '100%',
  outline: 'none',
  border: 'none',
  boxSizing: 'border-box', // Ensures padding and border are included in the element's total width and height
  borderRadius: '12px',
  display: 'flex',
  resize: 'none',
  alignItems: 'center'
};
const basicInputTextConstructorStyle: Omit<
  React.CSSProperties,
  'height' | 'padding' | 'fontSize' | 'lineHeight'
> = {
  color: basicThemeColors.gray500,
  backgroundColor: basicThemeColors.gray100,
  outline: 'none',
  border: 'none',
  boxSizing: 'border-box', // Ensures padding and border are included in the element's total width and height
  borderRadius: '12px 0 0 12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};
const formStyle: {
  inputTextBox: React.CSSProperties;
  inputTextWrap: React.CSSProperties;
  inputText: Record<inputSize, React.CSSProperties>;
  inputSelect: Record<inputSize, React.CSSProperties>;
  inputSelectPlaceHolder: Record<inputSize, React.CSSProperties>;
  inputTextArea: Record<inputSize, React.CSSProperties>;
  inputTextDesc: React.CSSProperties;
  inputTextConstructor: Record<inputSize, React.CSSProperties>;
  DateTimeBox: React.CSSProperties;
  DateTimeDesc: React.CSSProperties;
  DateTimeDescAlert: React.CSSProperties;
  inputDateBox: React.CSSProperties;
  inputTimeBox: React.CSSProperties;
  inputDateTimeLine: React.CSSProperties;
  clearDateTimeButton: React.CSSProperties;
} = {
  inputTextWrap: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px 0',
  },
  inputTextBox: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    // border: `1px solid ${basicThemeColors.gray300}`,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: basicThemeColors.gray300,
    borderRadius: '12px',
    width: '100%',
  },
  inputTextArea: {
    large: {
      ...baseInputTextAreaStyle,
      height: '144px',
      padding: '16px 16px',
      fontSize: '16px',
      lineHeight: '24px',
    },
    medium: {
      ...baseInputTextAreaStyle,
      height: '120px',
      padding: '16px 16px',
      fontSize: '16px',
      lineHeight: '20px',
    },
    small: {
      ...baseInputTextAreaStyle,
      height: '96px',
      padding: '16px 16px',
      fontSize: '14px',
      lineHeight: '18px',
    },
    xsmall: {
      ...baseInputTextAreaStyle,
      height: '84px',
      padding: '16px 16px',
      fontSize: '13px',
      lineHeight: '16px',
    },
    xxsmall: {
      ...baseInputTextAreaStyle,
      height: '72px',
      padding: '16px 16px',
      fontSize: '12px',
      lineHeight: '14px',
    },
  },
  inputSelect: {
    large: {
      ...baseInputSelectStyle,
      height: '48px',
      padding: '0 16px',
      fontSize: '16px',
      lineHeight: '24px',
    },
    medium: {
      ...baseInputSelectStyle,
      height: '40px',
      padding: '0 16px',
      fontSize: '16px',
      lineHeight: '20px',
    },
    small: {
      ...baseInputSelectStyle,
      height: '32px',
      padding: '0 16px',
      fontSize: '14px',
      lineHeight: '18px',
    },
    xsmall: {
      ...baseInputSelectStyle,
      height: '28px',
      padding: '0 16px',
      fontSize: '13px',
      lineHeight: '16px',
    },
    xxsmall: {
      ...baseInputSelectStyle,
      height: '24px',
      padding: '0 16px',
      fontSize: '12px',
      lineHeight: '14px',
    },
  },
  inputSelectPlaceHolder: {
    large: {
      ...baseInputSelectPlaceHolder,
      height: '48px',
      padding: '16px 16px',
      fontSize: '16px',
      lineHeight: '24px',
    },
    medium: {
      ...baseInputSelectPlaceHolder,
      height: '40px',
      padding: '16px 16px',
      fontSize: '16px',
      lineHeight: '20px',
    },
    small: {
      ...baseInputTextPlaceStyle,
      height: '32px',
      padding: '16px 16px',
      fontSize: '14px',
      lineHeight: '18px',
    },
    xsmall: {
      ...baseInputSelectPlaceHolder,
      height: '28px',
      padding: '16px 16px',
      fontSize: '13px',
      lineHeight: '16px',
    },
    xxsmall: {
      ...baseInputSelectPlaceHolder,
      height: '24px',
      padding: '16px 16px',
      fontSize: '12px',
      lineHeight: '14px',
    },
  },
  inputText: {
    large: {
      ...baseInputTextStyle,
      height: '48px',
      padding: '0px 16px',
      fontSize: '16px',
      lineHeight: '24px',
    },
    medium: {
      ...baseInputTextStyle,
      height: '40px',
      padding: '8px 16px',
      fontSize: '16px',
      lineHeight: '20px',
    },
    small: {
      ...baseInputTextStyle,
      height: '32px',
      padding: '0px 16px',
      fontSize: '14px',
      lineHeight: '18px',
    },
    xsmall: {
      ...baseInputTextStyle,
      height: '28px',
      padding: '0px 16px',
      fontSize: '13px',
      lineHeight: '16px',
    },
    xxsmall: {
      ...baseInputTextStyle,
      height: '24px',
      padding: '0px 16px',
      fontSize: '12px',
      lineHeight: '14px',
    },
  },
  inputTextDesc: {
    fontSize: '14px',
    color: basicThemeColors.primary.primary,
    marginTop: '4px',
    marginLeft: '8px',
  },
  inputTextConstructor: {
    large: {
      ...basicInputTextConstructorStyle,
      height: '48px',
      padding: '0px 16px',
      fontSize: '12px',
      lineHeight: '24px',
    },
    medium: {
      ...basicInputTextConstructorStyle,
      height: '40px',
      padding: '8px 16px',
      fontSize: '12px',
      lineHeight: '20px',
    },
    small: {
      ...basicInputTextConstructorStyle,
      height: '32px',
      padding: '0px 16px',
      fontSize: '12px',
      lineHeight: '18px',
    },
    xsmall: {
      ...basicInputTextConstructorStyle,
      height: '28px',
      padding: '0px 16px',
      fontSize: '12px',
      lineHeight: '16px',
    },
    xxsmall: {
      ...basicInputTextConstructorStyle,
      height: '24px',
      padding: '0px 16px',
      fontSize: '12px',
      lineHeight: '14px',
    },
  },
  DateTimeBox: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '8px 0'
  },
  DateTimeDesc: {
    width: '100%',
    fontSize: '14px',
    color: basicThemeColors.gray400,
  },
  DateTimeDescAlert: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    width: '100%',
    fontSize: '12px',
    color: basicThemeColors.error,
  },
  inputDateBox: {
    fontWeight: 600,
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    border: `1px solid ${basicThemeColors.gray300}`,
    borderRadius: '12px',
    height: '40px',
    padding: '0 16px',
    width: '160px',
    fontSize: '16px !important',
  },
  inputTimeBox: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    border: `1px solid ${basicThemeColors.gray300}`,
    borderRadius: '12px',
    height: '40px',
    padding: '0 16px',
    width: '160px',
  },
  inputDateTimeLine: {
    width: '12px',
    height: '2px',
    backgroundColor: basicThemeColors.gray300,
    borderRadius: '2px',
    margin: '0 8px',
  },
  clearDateTimeButton: {
    width: '24px',
    height: '24px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginLeft: '10px',
    cursor: 'pointer',
  }
}
type InputImageArrayProps = {
  isDisabled?: boolean;
  placeholder?: string;
  id: string;
  name: string;
  value?: any;
  onChange: (newValue: Array<File | { fileUrl: string }>) => void; // Pass the updated list of files/urls
  error?: boolean;
  maxLength?: number;
};
export const InputImageArray: React.FC<InputImageArrayProps> = ({
  isDisabled,
  placeholder,
  id,
  name,
  value,
  onChange,
  error,
  maxLength = 10,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  // State to hold the items currently displayed (mix of initial URLs and new Files)
  const [items, setItems] = useState<
    { url: string; original: File | { fileUrl: string } }[]
  >([]);

  // Effect to sync internal state with the parent's value prop
  useEffect(() => {
    const newItems: { url: string; original: File | { fileUrl: string } }[] =
      [];

    // Clean up previous temporary URLs before creating new ones
    items.forEach(item => {
      if (item.original instanceof File && item.url.startsWith('blob:')) {
        URL.revokeObjectURL(item.url);
      }
    });

    if (value) {
      if (value instanceof FileList) {
        // Value is a FileList (from user selection)
        Array.from(value).forEach(file => {
          newItems.push({
            url: URL.createObjectURL(file),
            original: file,
          });
        });
      } else if (Array.isArray(value)) {
        // Value is an array (from initial load or previous state update)
        value.forEach(item => {
          if (
            item &&
            typeof item === 'object' &&
            'fileUrl' in item &&
            item.fileUrl
          ) {
            newItems.push({
              url: item.fileUrl,
              original: item as { fileUrl: string },
            });
          } else if (item instanceof File) {
            newItems.push({
              url: URL.createObjectURL(item),
              original: item,
            });
          }
        });
      }
    }

    setItems(newItems);

    // Cleanup function to revoke URLs when component unmounts or value changes
    return () => {
      newItems.forEach(item => {
        if (item.original instanceof File && item.url.startsWith('blob:')) {
          URL.revokeObjectURL(item.url);
        }
      });
    };
  }, [value]); // Depend on 'value' prop

  // Handler for the hidden file input change event
  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const selectFiles = e.target.files;
    if (!selectFiles) return;

    // If the first selected file is a .heic, convert it to jpg using heic2any
    if (selectFiles && selectFiles[0] && selectFiles[0].name.toLowerCase().endsWith('.heic')) {
      // Dynamically import heic2any since we can't import at the top level here
      import('heic2any').then(heic2any => {
        const heicFile = selectFiles[0];
        heic2any.default({
          blob: heicFile,
          toType: "image/jpeg",
          quality: 0.92,
        })
          .then((convertedBlob: Blob | Blob[]) => {
            // heic2any may return a single Blob or an array of Blobs
            const blob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
            // Create a new File object with .jpg extension
            const jpgFile = new File([blob], heicFile.name.replace(/\.heic$/i, '.jpg'), { type: 'image/jpeg' });
            // Replace the first file in the FileList with the new jpg file
            // Since FileList is read-only, we create a new array
            const newFilesArray = [jpgFile, ...Array.from(selectFiles).slice(1)];
            // Get current original items (can be File objects or { fileUrl: string } objects)
            const existingOriginalItems = items.map(item => item.original);
            // Combine existing items with newly selected files
            const combinedOriginals = [...existingOriginalItems, ...newFilesArray];
            // Enforce maxLength
            const finalOriginals = combinedOriginals.slice(0, maxLength);
            // Call parent's onChange with the updated list of original files/urls
            onChange(finalOriginals);
            // Clear the input value so the same file can be selected again
            if (inputRef.current) {
              inputRef.current.value = '';
            }
          })
          .catch((err: any) => {
            alert('HEIC 파일을 변환하는 데 실패했습니다.');
            console.error('HEIC to JPG 변환 오류:', err);
          });
      });
      return; // Prevent further processing until conversion is done
    } else {

      const newFilesArray = Array.from(selectFiles);

      // Get current original items (can be File objects or { fileUrl: string } objects)
      const existingOriginalItems = items.map(item => item.original);

      // Combine existing items with newly selected files
      const combinedOriginals = [...existingOriginalItems, ...newFilesArray];

      // Enforce maxLength
      const finalOriginals = combinedOriginals.slice(0, maxLength);

      // Call parent's onChange with the updated list of original files/urls
      onChange(finalOriginals);

      // Clear the input value so the same file can be selected again
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  // Handler for removing an image thumbnail
  const handleRemoveItem = (indexToRemove: number) => {
    // Create a new list of items excluding the one at indexToRemove
    const updatedItems = items.filter((_, index) => index !== indexToRemove);

    // Call parent's onChange with the updated list of original files/urls
    // Extract the original file/url from the updated items list
    const updatedOriginals = updatedItems.map(item => item.original);
    onChange(updatedOriginals);
  };
  const styles: { [inputKey: string]: React.CSSProperties } = {
    imgThumbList: {
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      padding: '8px 0',
      gap: '16px',
      alignItems: 'flex-end'
    },
    imgThumbBox: {
      width: '156px',
      height: '156px',
      borderRadius: '10px',
      overflow: 'hidden',
      border: `1px solid ${basicThemeColors.gray300}`,
      position: 'relative', // Needed for absolute positioning of remove button
    },
    imgThumbBoxImg: {
      display: 'block',
      width: '100%',
      height: '100%',
      objectFit: 'contain',
    },
    removeButton: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      background: 'rgba(0, 0, 0, 0.5)',
      color: 'white',
      borderRadius: '50%',
      width: '24px',
      height: '24px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      fontSize: '12px',
      fontWeight: 'bold',
      zIndex: 10, // Ensure button is above the image
    },
    placeholder: {
      color: basicThemeColors.gray400,
      fontSize: '14px',
      whiteSpace: 'nowrap',
      lineHeight: '130%'
    },
    fileInputContainer: {
      width: '156px',
      height: '156px',
      borderRadius: '10px',
      border: `1px dashed ${basicThemeColors.gray300}`, // Dashed border for input area
      flexShrink: 0, // Prevent shrinking
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      backgroundColor: basicThemeColors.white,
      position: 'relative', // Needed for absolute positioning of input
    },
    hiddenFileInput: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      opacity: 0,
      cursor: 'pointer',
    },
    addIcon: {
      fontSize: '30px',
      color: basicThemeColors.gray300,
      marginBottom: '5px',
      fontWeight: 300,
    },
    addText: {
      fontSize: '14px',
      color: basicThemeColors.gray500,
    },
    count: {
      fontSize: '14px',
      color: basicThemeColors.black,
      fontWeight: 700,
    },
  };
  return (
    <>
      <div style={styles.imgThumbList}>
        {/* Display existing and newly selected images */}
        {items.map((item, index) => (
          <div key={index} style={styles.imgThumbBox}>
            <Image
              src={item.url}
              style={styles.imgThumbBoxImg}
              alt={`Thumbnail ${index + 1}`}
              width={156}
              height={156}
            />
            {/* Remove button */}
            {
              !isDisabled &&
              <div
                style={styles.removeButton}
                onClick={() => handleRemoveItem(index)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M11.6673 2.33331L2.33398 11.6666" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2.33398 2.33331L11.6673 11.6666" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            }
          </div>
        ))}

        {/* File input area (only shown if max length is not reached) */}
        {items.length < maxLength && (
          !isDisabled &&
          <div style={styles.fileInputContainer}>
            <div style={styles.addIcon}>+</div>
            <div style={styles.addText}>파일 추가하기</div>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              id={id}
              name={name}
              onChange={handleFileSelect}
              multiple // Allow selecting multiple files at once
              style={styles.hiddenFileInput}
            />
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', width: '100%', justifyContent: 'flex-start' }}>
          {!isDisabled && (maxLength > 1 && <div style={styles.count}>{items.length}/{maxLength}</div>)}
          {!isDisabled && (placeholder && <div style={styles.placeholder} dangerouslySetInnerHTML={{ __html: placeholder }}></div>)}
        </div>
      </div>
      {/* Placeholder/Hint text */}
    </>
  );
};
export const InputImageArray2: React.FC<InputImageArrayProps> = ({
  isDisabled,
  placeholder,
  id,
  name,
  value,
  onChange,
  error,
  maxLength = 10,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  // State to hold the items currently displayed (mix of initial URLs and new Files)
  const [items, setItems] = useState<
    { url: string; original: File | { fileUrl: string } }[]
  >([]);

  const { language } = useScreenLanguageStore();
  // Effect to sync internal state with the parent's value prop
  useEffect(() => {
    const newItems: { url: string; original: File | { fileUrl: string } }[] =
      [];

    // Clean up previous temporary URLs before creating new ones
    items.forEach(item => {
      if (item.original instanceof File && item.url.startsWith('blob:')) {
        URL.revokeObjectURL(item.url);
      }
    });

    if (value) {
      if (value instanceof FileList) {
        // Value is a FileList (from user selection)
        Array.from(value).forEach(file => {
          newItems.push({
            url: URL.createObjectURL(file),
            original: file,
          });
        });
      } else if (Array.isArray(value)) {
        // Value is an array (from initial load or previous state update)
        value.forEach(item => {
          if (
            item &&
            typeof item === 'object' &&
            'fileUrl' in item &&
            item.fileUrl
          ) {
            newItems.push({
              url: item.fileUrl,
              original: item as { fileUrl: string },
            });
          } else if (item instanceof File) {
            newItems.push({
              url: URL.createObjectURL(item),
              original: item,
            });
          }
        });
      }
    }

    setItems(newItems);

    // Cleanup function to revoke URLs when component unmounts or value changes
    return () => {
      newItems.forEach(item => {
        if (item.original instanceof File && item.url.startsWith('blob:')) {
          URL.revokeObjectURL(item.url);
        }
      });
    };
  }, [value]); // Depend on 'value' prop

  // Handler for the hidden file input change event
  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const selectFiles = e.target.files;
    if (!selectFiles) return;

    const newFilesArray = Array.from(selectFiles);

    // Get current original items (can be File objects or { fileUrl: string } objects)
    const existingOriginalItems = items.map(item => item.original);

    // Combine existing items with newly selected files
    const combinedOriginals = [...existingOriginalItems, ...newFilesArray];

    // Enforce maxLength
    const finalOriginals = combinedOriginals.slice(0, maxLength);

    // Call parent's onChange with the updated list of original files/urls
    onChange(finalOriginals);

    // Clear the input value so the same file can be selected again
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  // Handler for removing an image thumbnail
  const handleRemoveItem = (indexToRemove: number) => {
    // Create a new list of items excluding the one at indexToRemove
    const updatedItems = items.filter((_, index) => index !== indexToRemove);

    // Call parent's onChange with the updated list of original files/urls
    // Extract the original file/url from the updated items list
    const updatedOriginals = updatedItems.map(item => item.original);
    onChange(updatedOriginals);
  };
  const styles: { [inputKey: string]: React.CSSProperties } = {
    imgThumbList: {
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      alignItems: 'flex-end'
    },
    imgThumbBox: {
      width: '64px',
      height: '64px',
      borderRadius: '4px',
      overflow: 'hidden',
      border: `1px solid ${basicThemeColors.gray300}`,
      position: 'relative', // Needed for absolute positioning of remove button
    },
    imgThumbBoxImg: {
      display: 'block',
      width: '100%',
      height: '100%',
      objectFit: 'contain',
    },
    removeButton: {
      position: 'absolute',
      top: '0',
      right: '0',
      background: 'rgba(0, 0, 0, 0.5)',
      color: 'white',
      borderRadius: '4px',
      width: '24px',
      height: '24px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      fontSize: '12px',
      fontWeight: 'bold',
      zIndex: 10, // Ensure button is above the image
    },
    placeholder: {
      color: basicThemeColors.error,
      fontSize: '12px',
      whiteSpace: 'nowrap',
    },
    fileInputContainer: {
      width: '100%',
      height: '40px',
      borderRadius: '10px',
      border: `1px dashed ${basicThemeColors.gray300}`, // Dashed border for input area
      flexShrink: 0, // Prevent shrinking
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      backgroundColor: basicThemeColors.white,
      position: 'relative', // Needed for absolute positioning of input
    },
    hiddenFileInput: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      opacity: 0,
      cursor: 'pointer',
    },
    addIcon: {
      height: '40px',
      width: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    addText: {
      fontSize: '14px',
      color: '#000000',
    },
    count: {
      fontSize: '14px',
      color: basicThemeColors.black,
      fontWeight: 700,
    },
  };
  return (
    <>
      <div style={styles.imgThumbList}>
        {/* File input area (only shown if max length is not reached) */}
        {items.length < maxLength && (
          !isDisabled &&
          <div style={styles.fileInputContainer}>
            <div style={styles.addIcon}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M15.833 9.25L15.9092 9.25391C16.2875 9.29223 16.583 9.61161 16.583 10C16.583 10.3884 16.2875 10.7078 15.9092 10.7461L15.833 10.75H4.16602C3.7518 10.75 3.41602 10.4142 3.41602 10C3.41602 9.58579 3.7518 9.25 4.16602 9.25H15.833Z" fill="#7D828C" />
                <path d="M9.25 15.834V4.16699C9.25 3.75278 9.58579 3.41699 10 3.41699C10.4142 3.41699 10.75 3.75278 10.75 4.16699V15.834C10.7498 16.248 10.4141 16.584 10 16.584C9.5859 16.584 9.25018 16.248 9.25 15.834Z" fill="#7D828C" />
              </svg>
            </div>
            <div style={styles.addText}>{language === 'KOR' ? '첨부파일 선택' : 'Select file'}</div>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              id={id}
              name={name}
              onChange={handleFileSelect}
              multiple // Allow selecting multiple files at once
              style={styles.hiddenFileInput}
            />
          </div>
        )}
        {/* Placeholder/Hint text */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', width: '100%', justifyContent: 'flex-start' }}>
          {/* {!isDisabled && (maxLength > 1 && <div style={styles.count}>{items.length}/{maxLength}</div>)} */}
          {!isDisabled && (placeholder && <div style={styles.placeholder}>{placeholder}</div>)}
        </div>
        {/* Display existing and newly selected images */}
        {items.map((item, index) => (
          <div key={index} style={styles.imgThumbBox}>
            <img
              src={item.url}
              style={styles.imgThumbBoxImg}
              alt={`Thumbnail ${index + 1}`}
            />
            {/* Remove button */}
            {
              !isDisabled &&
              <div
                style={styles.removeButton}
                onClick={() => handleRemoveItem(index)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M11.6673 2.33331L2.33398 11.6666" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2.33398 2.33331L11.6673 11.6666" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            }
          </div>
        ))}
      </div>
    </>
  );
};
type InputFileArrayProps = {
  isDisabled?: boolean;
  placeholder?: string;
  id: string;
  name: string;
  value?: any;
  onChange: (newValue: Array<File | { fileUrl: string }>) => void; // Pass the updated list of files/urls
  error?: boolean;
  maxLength?: number;
};
export const InputFileArray: React.FC<InputFileArrayProps> = ({
  isDisabled,
  placeholder,
  id,
  name,
  value,
  onChange,
  error,
  maxLength = 10,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  // State to hold the items currently displayed (mix of initial URLs and new Files)
  const [items, setItems] = useState<
    {
      url: string;
      original: File | { fileUrl: string, fileName: string }
    }[]
  >([]);

  // Effect to sync internal state with the parent's value prop
  useEffect(() => {
    const newItems: { url: string; original: File | { fileUrl: string, fileName: string } }[] =
      [];

    // Clean up previous temporary URLs before creating new ones
    items.forEach(item => {
      if (item.original instanceof File && item.url.startsWith('blob:')) {
        URL.revokeObjectURL(item.url);
      }
    });

    if (value) {
      if (value instanceof FileList) {
        // Value is a FileList (from user selection)
        Array.from(value).forEach(file => {
          newItems.push({
            url: URL.createObjectURL(file),
            original: file,
          });
        });
      } else if (Array.isArray(value)) {
        // Value is an array (from initial load or previous state update)
        console.log(value)
        value.forEach(item => {
          if (
            item &&
            typeof item === 'object' &&
            'fileUrl' in item &&
            item.fileUrl
          ) {
            newItems.push({
              url: item.fileUrl,
              original: item as { fileUrl: string, fileName: string },
            });
          } else if (item instanceof File) {
            newItems.push({
              url: URL.createObjectURL(item),
              original: item,
            });
          }
        });
      }
    }

    setItems(newItems);

    // Cleanup function to revoke URLs when component unmounts or value changes
    return () => {
      newItems.forEach(item => {
        if (item.original instanceof File && item.url.startsWith('blob:')) {
          URL.revokeObjectURL(item.url);
        }
      });
    };
  }, [value]); // Depend on 'value' prop

  // Handler for the hidden file input change event
  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const selectFiles = e.target.files;
    if (!selectFiles) return;

    const newFilesArray = Array.from(selectFiles);

    // Get current original items (can be File objects or { fileUrl: string } objects)
    const existingOriginalItems = items.map(item => item.original);

    // Combine existing items with newly selected files
    const combinedOriginals = [...existingOriginalItems, ...newFilesArray];

    // Enforce maxLength
    const finalOriginals = combinedOriginals.slice(0, maxLength);

    // Call parent's onChange with the updated list of original files/urls
    onChange(finalOriginals);

    // Clear the input value so the same file can be selected again
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  // Handler for removing an image thumbnail
  const handleRemoveItem = (indexToRemove: number) => {
    // Create a new list of items excluding the one at indexToRemove
    const updatedItems = items.filter((_, index) => index !== indexToRemove);

    // Call parent's onChange with the updated list of original files/urls
    // Extract the original file/url from the updated items list
    const updatedOriginals = updatedItems.map(item => item.original);
    onChange(updatedOriginals);
  };

  const handleDownloadItem = (item: File | { fileUrl: string }) => {
    if (item instanceof File) {
      const url = URL.createObjectURL(item);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', item.name);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
      window.open(item.fileUrl, '_blank');
    }
  };



  const styles: { [inputKey: string]: React.CSSProperties } = {
    imgThumbList: {
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      padding: '8px 0',
      gap: '16px',
      alignItems: 'flex-end'
    },
    fileThumbBox: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      gap: '8px',
      height: '40px',
      overflow: 'hidden',
      position: 'relative', // Needed for absolute positioning of remove button
    },
    fileName: {
      padding: '0 16px',
      display: 'flex',
      alignItems: 'center',
      flex: 1,
      height: '40px',
      borderRadius: '10px',
      border: `1px solid ${basicThemeColors.gray300}`,
    },
    imgThumbBoxImg: {
      display: 'block',
      width: '100%',
      height: '100%',
      objectFit: 'contain',
    },
    removeButton: {
      color: 'white',
      borderRadius: '50%',
      width: '20px',
      height: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      zIndex: 10, // Ensure button is above the image
    },
    placeholder: {
      color: basicThemeColors.gray500,
      fontSize: '12px',
      whiteSpace: 'nowrap',
    },
    fileInputContainer: {
      width: '100%',
      height: '40px',
      flexShrink: 0, // Prevent shrinking
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: basicThemeColors.white,
      position: 'relative', // Needed for absolute positioning of input
    },
    fileAddButton: {
      position: 'relative',
      width: '120px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '12px',
      color: '#ffffff',
      fontSize: '14px',
      backgroundColor: basicThemeColors.primary.primary,
      cursor: 'pointer',
    },
    hiddenFileInput: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      opacity: 0,
      cursor: 'pointer',
      zIndex: 1,
    },
    addIcon: {
      fontSize: '30px',
      color: basicThemeColors.gray300,
      marginBottom: '5px',
      fontWeight: 300,
    },
    addText: {
      width: 'calc(100% - 140px)',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '0 16px',
      borderRadius: '10px',
      border: `1px dashed ${basicThemeColors.gray300}`, // Dashed border for input area
      fontSize: '14px',
      color: basicThemeColors.gray500,
      pointerEvents: 'none',
    },
    count: {
      fontSize: '14px',
      color: basicThemeColors.black,
      fontWeight: 700,
    },
    noFileText: {
      fontSize: '14px',
      color: basicThemeColors.gray400,
      fontWeight: 400,
    },
  };
  return (
    <>
      <div style={styles.imgThumbList}>
        {/* Display existing and newly selected images */}

        {items.length < maxLength && (
          !isDisabled &&
          <div style={styles.fileInputContainer}>
            <div style={styles.addText}>선택된 파일 없음</div>
            <div style={styles.fileAddButton}>
              <p>파일첨부</p>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                id={id}
                name={name}
                onChange={handleFileSelect}
                style={styles.hiddenFileInput}
              />
            </div>
          </div>
        )}
        {items.map((item, index) => (
          <div key={index} style={styles.fileThumbBox}>
            {
              item.original instanceof File
                ?
                <div style={styles.fileName}>{item.original.name}</div>
                :
                <div style={styles.fileName}>{item.original.fileName}</div>
            }
            {
              <div
                style={styles.removeButton}
                onClick={() => handleDownloadItem(item.original)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M1.75 15.833V12.5C1.75 12.0858 2.08579 11.75 2.5 11.75C2.91421 11.75 3.25 12.0858 3.25 12.5V15.833C3.25 16.0762 3.34665 16.3096 3.51855 16.4815C3.69046 16.6534 3.92388 16.75 4.16699 16.75H15.833C16.0761 16.75 16.3095 16.6534 16.4814 16.4815C16.6534 16.3096 16.75 16.0762 16.75 15.833V12.5C16.75 12.0858 17.0858 11.75 17.5 11.75C17.9142 11.75 18.25 12.0858 18.25 12.5V15.833C18.25 16.474 17.9952 17.0888 17.542 17.542C17.0888 17.9952 16.4739 18.25 15.833 18.25H4.16699C3.52605 18.25 2.91122 17.9952 2.45801 17.542C2.00479 17.0888 1.75 16.474 1.75 15.833Z" fill="#2E5AAC" />
                  <path d="M13.6367 7.80311C13.9295 7.51027 14.4043 7.51037 14.6972 7.80311C14.9901 8.096 14.9901 8.57076 14.6972 8.86365L10.5312 13.0306C10.2384 13.3234 9.76357 13.3232 9.47065 13.0306L5.30365 8.86365C5.01076 8.57076 5.01076 8.096 5.30365 7.80311C5.59655 7.51021 6.07131 7.51021 6.3642 7.80311L9.99994 11.4388L13.6367 7.80311Z" fill="#2E5AAC" />
                  <path d="M9.25 12.5V2.5C9.25 2.08579 9.58579 1.75 10 1.75C10.4142 1.75 10.75 2.08579 10.75 2.5V12.5C10.75 12.9142 10.4142 13.25 10 13.25C9.58579 13.25 9.25 12.9142 9.25 12.5Z" fill="#2E5AAC" />
                </svg>
              </div>
            }
            {
              !isDisabled &&
              <div
                style={styles.removeButton}
                onClick={() => handleRemoveItem(index)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M16.4697 2.46967C16.7626 2.17678 17.2373 2.17678 17.5302 2.46967C17.8231 2.76256 17.8231 3.23732 17.5302 3.53022L3.53022 17.5302C3.23732 17.8231 2.76256 17.8231 2.46967 17.5302C2.17678 17.2373 2.17678 16.7626 2.46967 16.4697L16.4697 2.46967Z" fill="#D23838" />
                  <path d="M2.46967 2.46967C2.76256 2.17678 3.23732 2.17678 3.53022 2.46967L17.5302 16.4697L17.582 16.5263C17.8223 16.8209 17.8048 17.2556 17.5302 17.5302C17.2556 17.8048 16.8209 17.8223 16.5263 17.582L16.4697 17.5302L2.46967 3.53022C2.17678 3.23732 2.17678 2.76256 2.46967 2.46967Z" fill="#D23838" />
                </svg>
              </div>
            }
          </div>
        ))}
        {
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', width: '100%', justifyContent: 'flex-start' }}>
            {

              isDisabled
                ?
                (
                  items.length > 0
                    ?
                    (maxLength > 1 && <div style={styles.count}>{items.length}/{maxLength}</div>)
                    :
                    <div style={styles.noFileText}>첨부한 파일 없음</div>
                )
                :
                (maxLength > 1 && <div style={styles.count}>{items.length}/{maxLength}</div>)
            }
            {placeholder && (!isDisabled && <div style={styles.placeholder}>{placeholder}</div>)}
          </div>
        }
      </div>
      {/* Placeholder/Hint text */}
    </>
  );
};
interface AdmInputTextProps {
  size: inputSize;
  isDisabled?: boolean;
  placeholder?: string;
  id: string;
  name: string;
  value?: any;
  onChange?: (value: string) => void;
  error?: boolean;
  onKeyDown?: (value: any) => void;
  inputMode?: any;
  pattern?: any;
  boxStyle?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  containConstructedValue?: string;
  desc?: string;
  maxLength?: number;
  searchIcon?: boolean;
}
export const AdmInputText: React.FC<AdmInputTextProps> = ({
  size,
  isDisabled,
  placeholder,
  id,
  name,
  value,
  onChange,
  error,
  onKeyDown,
  inputMode,
  pattern,
  boxStyle,
  inputStyle,
  containConstructedValue,
  desc,
  maxLength,
  searchIcon = false,
}) => {

  const [internalValue, setInternalValue] = useState(value);
  const [isComposing, setIsComposing] = useState(false);
  useEffect(() => {
    // 외부에서 value prop이 변경될 때 internalValue 동기화 (IME 입력 중이 아닐 때)
    if (!isComposing) {
      setInternalValue(value);
    }
  }, [value]);



  const [placeHolderValue, setPlaceHolderValue] = useState(placeholder);
  useEffect(() => {
    setPlaceHolderValue(placeholder);
  }, [placeholder]);

  const handleChange = (e: any) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    if (!isComposing) {
      if (onChange) {
        onChange(newValue);
      }
    }
  };
  const handleKeyDown = (e: any) => {
    // const newValue = e;
    // if (onKeyDown) {
    //   onKeyDown(newValue);
    // }
  };

  const handleCompositionStart = () => {
    setIsComposing(true)
  };
  const handleCompositionEnd = (event: CompositionEvent<HTMLInputElement>) => {
    setIsComposing(false);
    // Composition이 끝났을 때 최종 값을 부모로 전달
    const finalValue = (event.target as HTMLInputElement).value;
    setInternalValue(finalValue); // 내부 상태도 최종값으로 업데이트
    if (onChange) {
      onChange(finalValue);
    }
  };


  return (
    <div style={{ ...formStyle.inputTextWrap, ...boxStyle }}>
      <div
        data-disabled={isDisabled}
        data-size={size}
        style={{ ...formStyle.inputTextBox, ...(error && { borderColor: basicThemeColors.error }) }}
      >
        {containConstructedValue && containConstructedValue.length > 0 &&
          <div style={formStyle.inputTextConstructor[size]}>
            {containConstructedValue}
          </div>
        }
        <input
          style={{ ...formStyle.inputText[size], ...inputStyle, color: isDisabled ? basicThemeColors.gray400 : basicThemeColors.black, ...(isDisabled ? { outline: 'none' } : {}) }}
          inputMode={inputMode && inputMode}
          pattern={pattern && pattern}
          tabIndex={isDisabled ? -1 : 1}
          readOnly={isDisabled ? true : false}
          type="text"
          placeholder={placeHolderValue ? placeHolderValue : 'enter your text'}
          id={id}
          name={name}
          value={value === null ? '' : internalValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          maxLength={maxLength}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
        />
        {
          searchIcon &&
          <div style={{ width: '24px', height: '24px', position: 'absolute', right: 0, top: '50%', transform: 'translate(-50%,-50%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="21" height="20" viewBox="0 0 21 20" fill="none">
              <path d="M18.0654 16.9687C18.3582 17.2616 18.3583 17.7373 18.0654 18.0302C17.7725 18.3231 17.2967 18.3231 17.0038 18.0302L18.0654 16.9687ZM13.3876 13.3525C13.6805 13.0596 14.1553 13.0596 14.4482 13.3525L18.0654 16.9687L17.5341 17.499L17.0038 18.0302L13.3876 14.413C13.0947 14.1201 13.0947 13.6454 13.3876 13.3525Z" fill="#9CA3AF" />
              <path d="M15.1182 9.16699C15.1182 5.89942 12.4697 3.25018 9.20215 3.25C5.93446 3.25 3.28516 5.89931 3.28516 9.16699C3.28533 12.4345 5.93457 15.083 9.20215 15.083C12.4696 15.0828 15.118 12.4344 15.1182 9.16699ZM16.6182 9.16699C16.618 13.2628 13.298 16.5828 9.20215 16.583C5.10614 16.583 1.78533 13.263 1.78516 9.16699C1.78516 5.07088 5.10604 1.75 9.20215 1.75C13.2981 1.75018 16.6182 5.07099 16.6182 9.16699Z" fill="#9CA3AF" />
            </svg>
          </div>
        }
      </div>
      {desc && <div style={{ ...formStyle.inputTextDesc, ...(error && { color: basicThemeColors.error }) }}>{desc.split('\n').map((line, i) => (
        <Fragment key={i}>
          {line}
          {i < desc.split('\n').length - 1 && <br />}
        </Fragment>
      ))}</div>}
    </div>
  );
};
interface AdmInputTextPwProps {
  size: inputSize;
  isDisabled?: boolean;
  placeholder?: string;
  id: string;
  name: string;
  value?: any;
  onChange?: (value: string) => void;
  error?: boolean;
  onKeyDown?: (value: any) => void;
  inputMode?: any;
  pattern?: any;
  boxStyle?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  containConstructedValue?: string;
  desc: string;
}
export const AdmInputTextPw: React.FC<AdmInputTextPwProps> = ({
  size,
  isDisabled,
  placeholder,
  id,
  name,
  value,
  onChange,
  error,
  onKeyDown,
  inputMode,
  pattern,
  boxStyle,
  inputStyle,
  containConstructedValue,
  desc,
}) => {
  const [placeHolderValue, setPlaceHolderValue] = useState(placeholder);

  const [valueCheckSwitch01, setValueCheckSwitch01] = useState<boolean>(false)
  const [valueCheckSwitch02, setValueCheckSwitch02] = useState<boolean>(false)
  const [valueCheckSwitch03, setValueCheckSwitch03] = useState<boolean>(false)
  const [valueCheckSwitch04, setValueCheckSwitch04] = useState<boolean>(false)

  const valueCheck = (value: string) => {
    if (value.length > 7) {
      setValueCheckSwitch01(true)
    } else {
      setValueCheckSwitch01(false)
    }

    if (/[0-9]/.test(value)) {
      setValueCheckSwitch02(true)
    } else {
      setValueCheckSwitch02(false)
    }

    if (/[A-Z]/.test(value)) {
      setValueCheckSwitch03(true)
    } else {
      setValueCheckSwitch03(false)
    }

    if (/[a-z]/.test(value)) {
      setValueCheckSwitch04(true)
    } else {
      setValueCheckSwitch04(false)
    }
  }

  useEffect(() => {
    setPlaceHolderValue(placeholder);
  }, [placeholder]);
  const handleChange = (e: any) => {
    const newValue = e.target.value;
    valueCheck(newValue)
    if (onChange) {
      onChange(newValue);
    }
  };
  const handleKeyDown = (e: any) => {
    const newValue = e;
    if (onKeyDown) {
      onKeyDown(newValue);
    }
  };
  return (
    <div style={{ ...formStyle.inputTextWrap, ...boxStyle }}>
      <div
        data-disabled={isDisabled}
        data-size={size}
        style={formStyle.inputTextBox}
      >
        {containConstructedValue && containConstructedValue.length > 0 &&
          <div style={formStyle.inputTextConstructor[size]}>
            {containConstructedValue}
          </div>
        }
        <input
          style={{ ...formStyle.inputText[size], ...inputStyle }}
          inputMode={inputMode && inputMode}
          pattern={pattern && pattern}
          tabIndex={isDisabled ? -1 : 1}
          readOnly={isDisabled ? true : false}
          type="password"
          placeholder={placeHolderValue ? placeHolderValue : 'enter your text'}
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M11.4455 3.66797L5.33442 9.77908L2.55664 7.0013" stroke={`${valueCheckSwitch01 ? basicThemeColors.success : basicThemeColors.primary.primary}`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p style={{ color: `${valueCheckSwitch01 ? basicThemeColors.success : basicThemeColors.primary.primary}` }}>최소 8자</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M11.4455 3.66797L5.33442 9.77908L2.55664 7.0013" stroke={`${valueCheckSwitch02 ? basicThemeColors.success : basicThemeColors.primary.primary}`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p style={{ color: `${valueCheckSwitch02 ? basicThemeColors.success : basicThemeColors.primary.primary}` }}>숫자 1개</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M11.4455 3.66797L5.33442 9.77908L2.55664 7.0013" stroke={`${valueCheckSwitch03 ? basicThemeColors.success : basicThemeColors.primary.primary}`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p style={{ color: `${valueCheckSwitch03 ? basicThemeColors.success : basicThemeColors.primary.primary}` }}>대문자 1개</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M11.4455 3.66797L5.33442 9.77908L2.55664 7.0013" stroke={`${valueCheckSwitch04 ? basicThemeColors.success : basicThemeColors.primary.primary}`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />          </svg>
          <p style={{ color: `${valueCheckSwitch04 ? basicThemeColors.success : basicThemeColors.primary.primary}` }}>소문자 1개</p>
        </div>

      </div>
      {desc && <div style={formStyle.inputTextDesc}>{desc.split('\n').map((line, i) => (
        <Fragment key={i}>
          {line}
          {i < desc.split('\n').length - 1 && <br />}
        </Fragment>
      ))}</div>}
    </div>
  );
};
interface AdmInputTextAreaProps {
  size: inputSize;
  isDisabled?: boolean;
  placeholder?: string;
  id: string;
  name: string;
  value?: any;
  onChange?: (value: string) => void;
  error?: boolean;
  boxStyle?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  desc?: string;
  maxLength?: number;
  height?: string;
}
export const AdmInputTextPw2: React.FC<AdmInputTextPwProps> = ({
  size,
  isDisabled,
  placeholder,
  id,
  name,
  value,
  onChange,
  error,
  onKeyDown,
  inputMode,
  pattern,
  boxStyle,
  inputStyle,
  containConstructedValue,
  desc,
}) => {
  const [placeHolderValue, setPlaceHolderValue] = useState(placeholder);

  useEffect(() => {
    setPlaceHolderValue(placeholder);
  }, [placeholder]);
  const handleChange = (e: any) => {
    const newValue = e.target.value;
    if (onChange) {
      onChange(newValue);
    }
  };
  const handleKeyDown = (e: any) => {
    const newValue = e;
    if (onKeyDown) {
      onKeyDown(newValue);
    }
  };
  return (
    <div style={{ ...formStyle.inputTextWrap, ...boxStyle }}>
      <div
        data-disabled={isDisabled}
        data-size={size}
        style={formStyle.inputTextBox}
      >
        {containConstructedValue && containConstructedValue.length > 0 &&
          <div style={formStyle.inputTextConstructor[size]}>
            {containConstructedValue}
          </div>
        }
        <input
          style={{ ...formStyle.inputText[size], ...inputStyle }}
          inputMode={inputMode && inputMode}
          pattern={pattern && pattern}
          tabIndex={isDisabled ? -1 : 1}
          readOnly={isDisabled ? true : false}
          type="password"
          placeholder={placeHolderValue ? placeHolderValue : 'enter your text'}
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '14px', color: basicThemeColors.primary.primary }}>
        {desc.split('\n').map((line, i) => (
          <Fragment key={i}>
            {line}
            {i < desc.split('\n').length - 1 && <br />}
          </Fragment>
        ))}
      </div>
    </div>
  );
};
export const AdmInputTextArea: React.FC<AdmInputTextAreaProps> = ({
  size,
  isDisabled,
  placeholder,
  id,
  name,
  value,
  onChange,
  error,
  boxStyle,
  inputStyle,
  desc,
  maxLength,
  height
}) => {
  const handleChange = (e: any) => {
    const newValue = e.target.value;
    if (onChange) {
      onChange(newValue);
    }
  };
  return (
    <div style={formStyle.inputTextWrap}>
      <div
        style={{ ...formStyle.inputTextBox, overflow: 'hidden', padding: '4px', backgroundColor: isDisabled ? 'var(--cr-g02)' : '' }}
        data-disabled={isDisabled}
        data-size={size}
      >
        <textarea
          style={{ ...formStyle.inputTextArea[size], height: '160px', ...inputStyle }}
          tabIndex={isDisabled ? -1 : 1}
          readOnly={isDisabled ? true : false}
          maxLength={maxLength}
          disabled={isDisabled}
          placeholder={placeholder ? placeholder : 'enter your text'}
          id={id}
          name={name}
          value={value === null ? '' : value}
          onChange={handleChange} />
      </div>
      {desc && <div style={formStyle.inputTextDesc}>{desc}</div>}
    </div>
  );
};

const formatTimeToHHMM = (date: Date | null): string => {
  if (!date) return '';
  if (isNaN(new Date(date).getTime())) return '';
  const d = new Date(date);
  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

interface AdmInputDateTimeProps {
  size: inputSize;
  isDisabled?: boolean;
  id: string;
  name: string;
  value?: any;
  onChange?: (value: string | null | Date) => void;
  error?: boolean;
  boxStyle?: React.CSSProperties;
  desc?: string,
  placeholder?: string;
  descAlert?: string,
  only?: 'date' | 'time' | 'datetime';
}
export const AdmInputDate: React.FC<AdmInputDateTimeProps> = ({
  size,
  isDisabled,
  id,
  name,
  value,
  onChange,
  error,
  boxStyle,
  desc,
  descAlert,
  only = 'datetime',
}) => {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null | string>(null);
  const [timeInputValue, setTimeInputValue] = useState<string>('');
  useEffect(() => {
    let initialDate: string | Date | null = null;
    if (value instanceof Date) {
      initialDate = new Date(value); // Clone to avoid mutating prop
    } else if (typeof value === 'string' && value) {
      const parsedDate = new Date(value);
      if (!isNaN(parsedDate.getTime())) {
        initialDate = parsedDate;
      }
    }
    setSelectedDateTime(initialDate);
    setTimeInputValue(formatTimeToHHMM(initialDate));
  }, [value]);

  function convertToISO8601(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString();
  }
  const handleDatePartChange = (dateFromPicker: any) => {
    if (dateFromPicker) {
      const newDateTime: any = selectedDateTime ? new Date(selectedDateTime) : new Date();
      newDateTime.setFullYear(dateFromPicker.getFullYear(), dateFromPicker.getMonth(), dateFromPicker.getDate());

      const [hoursStr, minutesStr] = timeInputValue.split(':');
      const hours = parseInt(hoursStr, 10);
      const minutes = parseInt(minutesStr, 10);

      if (!isNaN(hours) && !isNaN(minutes)) {
        newDateTime.setHours(hours, minutes, 0, 0);
      } else {
        newDateTime.setHours(0, 0, 0, 0);
      }

      const iso8601Date = convertToISO8601(newDateTime);
      setSelectedDateTime(iso8601Date);
      onChange?.(iso8601Date);
    } else {
      setSelectedDateTime(null);
      onChange?.(null);
    }
  };
  const handleTimePartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTimeStr = e.target.value;
    setTimeInputValue(newTimeStr);

    if (selectedDateTime) {
      const newDateTime: any = new Date(selectedDateTime);
      const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;

      if (timePattern.test(newTimeStr)) {
        const [hours, minutes] = newTimeStr.split(':').map(Number);
        newDateTime.setHours(hours, minutes, 0, 0);
        const iso8601Date = convertToISO8601(newDateTime);
        setSelectedDateTime(iso8601Date);
        onChange?.(iso8601Date);
      } else if (newTimeStr === '') {
        newDateTime.setHours(0, 0, 0, 0);
        const iso8601Date = convertToISO8601(newDateTime);
        setSelectedDateTime(iso8601Date);
        onChange?.(iso8601Date);
      }
    }
  };
  const handleBothClear = () => {
    setSelectedDateTime(null);
    setTimeInputValue('');
    onChange?.(null);
  }

  const timeInputSpecificStyle: React.CSSProperties = {
    border: 'none',
    outline: 'none',
    height: '100%',
    backgroundColor: 'transparent',
    fontSize: '16px',
    flexShrink: 0,
    width: '100%',
  };
  return (
    <div style={formStyle.DateTimeBox}>
      <div
        data-disabled={isDisabled}
        style={{
          ...formStyle.inputDateBox,
          ...(error && { borderColor: basicThemeColors.warning }),
          ...boxStyle
        }}
        className={`adm-datetime-picker-wrapper ${isDisabled ? 'disabled' : ''} ${error ? 'error' : ''}`}
      >

        {(only === 'date' || only === 'datetime') &&
          <DatePicker
            format={'yyyy-MM-dd'}
            onChange={handleDatePartChange}
            value={selectedDateTime}
            disabled={isDisabled}
            locale="en"
            id={`${id}-date`}
            name={`${name}-date`}
            clearIcon={null}
            calendarIcon={
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <g clipPath="url(#clip0_2128_3575)">
                  <path d="M6.66602 1.66016V4.99349" stroke={basicThemeColors.gray400} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M13.332 1.66016V4.99349" stroke={basicThemeColors.gray400} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M15.8333 3.33008H4.16667C3.24619 3.33008 2.5 4.07627 2.5 4.99674V16.6634C2.5 17.5839 3.24619 18.3301 4.16667 18.3301H15.8333C16.7538 18.3301 17.5 17.5839 17.5 16.6634V4.99674C17.5 4.07627 16.7538 3.33008 15.8333 3.33008Z" stroke={basicThemeColors.gray400} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2.5 8.32812H17.5" stroke={basicThemeColors.gray400} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <defs>
                  <clipPath id="clip0_2128_3575">
                    <rect width="20" height="20" fill="white" transform="translate(0 -0.00195312)" />
                  </clipPath>
                </defs>
              </svg>}
          />
        }
      </div>
      {
        only === 'datetime' &&
        <div style={formStyle.inputDateTimeLine}></div>
      }
      {

        (only === 'time' || only === 'datetime') &&
        <div
          data-disabled={isDisabled}
          style={{
            ...formStyle.inputTimeBox,
            ...(error && { borderColor: basicThemeColors.warning }),
            ...boxStyle
          }}
          className={`adm-datetime-picker-wrapper ${isDisabled ? 'disabled' : ''} ${error ? 'error' : ''}`}
        >
          <input
            type="time"
            id={`${id}-time`}
            name={`${name}-time`}
            value={timeInputValue}
            onChange={handleTimePartChange}
            disabled={isDisabled}
            style={timeInputSpecificStyle}
            className="adm-time-input-custom"
          />
          <div style={{ width: '24px', height: '36px', backgroundColor: `${isDisabled ? 'var(--cr-g02)' : '#fff'}`, position: 'absolute', top: '50%', right: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <g clipPath="url(#clip0_2941_54789)">
                <path d="M9.99935 18.3327C14.6017 18.3327 18.3327 14.6017 18.3327 9.99935C18.3327 5.39698 14.6017 1.66602 9.99935 1.66602C5.39698 1.66602 1.66602 5.39698 1.66602 9.99935C1.66602 14.6017 5.39698 18.3327 9.99935 18.3327Z" stroke={basicThemeColors.gray400} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10 5V10L13.3333 11.6667" stroke={basicThemeColors.gray400} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </g>
              <defs>
                <clipPath id="clip0_2941_54789">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      }
      {
        !isDisabled &&
        only === 'datetime' &&
        <div style={formStyle.clearDateTimeButton} onClick={handleBothClear}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M17 3L3 17" stroke={basicThemeColors.gray400} strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 3L17 17" stroke={basicThemeColors.gray400} strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      }
      {
        desc &&
        <div style={formStyle.DateTimeDesc}>
          {desc}
        </div>
      }
      {
        descAlert &&
        <div style={formStyle.DateTimeDescAlert}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <g clipPath="url(#clip0_2920_45147)">
              <path d="M7.00098 0.832031C10.4066 0.832207 13.167 3.59338 13.167 6.99902C13.1668 10.4045 10.4065 13.1649 7.00098 13.165C3.59533 13.165 0.83416 10.4046 0.833984 6.99902C0.833984 3.59327 3.59522 0.832031 7.00098 0.832031Z" stroke="#D23838" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7 4.33203V6.9987" stroke="#D23838" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7 9.66797H7.00667" stroke="#D23838" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
              <clipPath id="clip0_2920_45147">
                <rect width="13.3333" height="13.3333" fill="white" transform="translate(0.333984 0.332031)" />
              </clipPath>
            </defs>
          </svg>
          {descAlert}
        </div>
      }
    </div>
  );
};

interface AdmInputSelectProps {
  size: inputSize;
  isDisabled?: boolean;
  placeholder?: string;
  id: string;
  name: string;
  options: Array<{
    value: string;
    label: string;
  }> | null | undefined;
  value?: any;
  boxStyle?: React.CSSProperties;
  onChange?: (value: string) => void;
  error?: boolean;
  style?: React.CSSProperties;
}
export const AdmInputSelect: React.FC<AdmInputSelectProps> = ({
  size,
  isDisabled,
  placeholder,
  id,
  name,
  value,
  boxStyle,
  options,
  onChange,
  error,
  style
}) => {
  const handleChange = (e: any) => {
    const newValue = e.target.value;
    if (onChange) {
      onChange(newValue);
    }
  };
  const [placeholderValue, setPlaceholderValue] = useState<any>();
  const [checkedValue, setCheckedValue] = useState<any>(value);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [propsValue, setPropsValue] = useState<any>(value);

  useEffect(() => {
    if (value) {
      setIsSelected(true);
      options &&
        options.forEach(option => {
          if (option.value == value) {
            setPlaceholderValue(option.label);
            setCheckedValue(option.value);
          }
        });
      setPropsValue(value);
    } else {
      setPlaceholderValue(placeholder);
    }
  }, [value, placeholder, options]);
  useEffect(() => {
    if (!value) {
      // value가 없을때만 실행
      setPlaceholderValue(placeholder);
    }
  }, [placeholder]);
  return (
    <>
      {!isDisabled ? (
        <div
          style={{ ...formStyle.inputTextBox, ...boxStyle, ...style }}
          data-disabled={isDisabled}
          data-size={size}
        >
          <select
            style={{ all: 'unset', ...formStyle.inputSelect[size] }}  // 다른 css 속성은 모두 초기화하고, inputSelect 스타일 적용
            id={id}
            name={name}
            onChange={handleChange}
            value={checkedValue}>
            {!value && (
              <option disabled value="">
                {placeholder}
              </option>
            )}
            {options && options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div style={{ ...formStyle.inputSelectPlaceHolder[size], color: value ? basicThemeColors.black : basicThemeColors.gray500 }}>
            {placeholderValue}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ pointerEvents: 'none', position: 'absolute', right: '14px', top: '50%', transform: 'translate(0, -50%)' }}>
              <path d="M5 7.5L10 12.5L15 7.5" stroke="#7D828C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      ) : (
        <div
          style={{ ...formStyle.inputTextBox, ...boxStyle }}
          data-disabled={true}
          data-size={size}
          className={`${error ? 'error' : ''}`}>
          <input
            style={{ ...formStyle.inputSelect[size] }}
            tabIndex={-1}
            readOnly={true}
            type="text"
            id={id}
            name={name}
            value={''}
          />
        </div>
      )}
    </>
  );
};
// 새로운 컴포넌트 Props 정의
interface AdmInputSelectAndTextProps {
  size: inputSize;
  isDisabled?: boolean;
  placeholder?: string; // Placeholder for the text input
  id: string;
  name: string;
  value?: any; // Current value of the text input
  originSelectValue?: string; // 선택되어있던 select input의 value 세팅용
  onChange?: (value: string) => void; // Called when the text input value changes
  onSearchClick?: () => void; // Called when the search button is clicked
  error?: boolean;
  options: Array<{
    value: string;
    label: string;
  }> | null | undefined; // Options for the select input
  selectPlaceholder?: string; // Placeholder for the select input
  desc?: string;
  boxStyle?: React.CSSProperties; // Style for the main container
  selectBoxStyle?: React.CSSProperties; // Style for the main container
  isSearchButton?: boolean; // Whether to show a search button
}

export const AdmInputSelectAndText: React.FC<AdmInputSelectAndTextProps> = ({
  size,
  isDisabled,
  placeholder,
  id,
  name,
  value,
  onChange,
  onSearchClick,
  error,
  options,
  selectPlaceholder,
  desc,
  boxStyle,
  selectBoxStyle,
  isSearchButton
}) => {
  const [selectValue, setSelectValue] = useState('')
  const [textValue, setTextValue] = useState('')
  const handleSelectChange = (val: string) => {
    setSelectValue(val)
  };

  const handleTextChange = (val: string) => {
    setTextValue(val)
  };

  useEffect(() => {
    if (value && options && options.length > 0) {
      options.forEach(option => {
        if (value.includes(option.value)) {
          setSelectValue(option.value);
          setTextValue(value.replace(option.value, ''));
        }
      })
    }
  }, [options, value])

  useEffect(() => {
    if (onChange) {
      onChange((selectValue + textValue).toString());
    }
  }, [selectValue, textValue])

  // 스타일 정의
  const componentStyles: { [key: string]: React.CSSProperties } = {
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start', // AdmInputText, AdmInputSelect가 desc를 가질 수 있으므로 flex-start
      gap: '8px',
      width: '100%',
      ...boxStyle,
    },
    selectWrapper: {
      position: 'relative',
      flexShrink: 0, // Select는 너비 고정 방지
      width: '200px', // 예시 너비, 필요에 따라 조절 가능
      ...selectBoxStyle,
    },
    textWrapper: {
      flexGrow: 1, // Text input이 남은 공간을 차지하도록
      position: 'relative',
    },
    desc: {
      ...formStyle.inputTextDesc, // 기존 desc 스타일 재활용
      width: '100%', // 전체 너비에 걸쳐 표시되도록
      marginTop: '4px',
    },
    searchButton: {
      position: 'absolute',
      right: '8px',
      top: '50%',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
      width: '24px',
      height: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    selectDisabledValue: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      fontSize: '16px',
      color: basicThemeColors.gray400
    }
  };

  return (
    <div style={{ ...formStyle.inputTextWrap, width: '100%' }}> {/* AdmInputText와 유사한 전체 래퍼 */}
      <div style={componentStyles.container}>
        <div style={{ ...componentStyles.selectWrapper }}>
          <AdmInputSelect
            size={size} id={`${id}-select`} name={`${name}-select`}
            options={options} value={selectValue ? selectValue : ''} onChange={handleSelectChange}
            placeholder={selectPlaceholder || '선택하세요'} isDisabled={isDisabled} error={error}
          />
          {
            isDisabled &&
            <div style={componentStyles.selectDisabledValue}>{
              options?.map((option: any, idx: number) => {
                return (
                  <Fragment key={idx}>{selectValue === option.value ? selectValue : null}</Fragment>
                )
              })
            }</div>
          }
        </div>
        <div style={componentStyles.textWrapper}>
          <AdmInputText
            size={size} id={`${id}-text`} name={`${name}-text`}
            value={textValue} onChange={handleTextChange} placeholder={placeholder}
            isDisabled={isDisabled} error={error} desc={''} /> {/* 내부 desc는 사용 안함 */}

          {
            isSearchButton &&
            <div style={componentStyles.searchButton} onClick={onSearchClick}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M17.4995 17.4995L13.8828 13.8828" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          }
        </div >
      </div >
      {desc && <div style={componentStyles.desc}>{desc.split('\n').map((line, i) => (
        <Fragment key={i}>
          {line}
          {i < desc.split('\n').length - 1 && <br />}
        </Fragment>
      ))}</div>}
    </div >
  );
};

interface AdmInputRadioProps {
  size: inputSize;
  isDisabled?: boolean;
  id: string;
  name: string;
  options: Array<{
    value: string;
    label: string;
  }>;
  value?: any;
  onChange?: (value: string) => void;
  error?: boolean;
  boxStyle?: React.CSSProperties;
  itemStyle?: React.CSSProperties;
  direction?: 'row' | 'column';
  desc?: string;
}

export const AdmInputRadio: React.FC<AdmInputRadioProps> = ({
  size,
  isDisabled,
  id,
  name,
  options,
  value,
  onChange,
  error, // Not directly used for styling radio itself, but good to have for consistency
  boxStyle,
  itemStyle,
  direction = 'row',
  desc,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isDisabled) {
      return;
    }
    const newValue = e.target.value;
    if (onChange) {
      onChange(newValue);
    }
  };

  const radioContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: direction,
    gap: direction === 'row' ? '16px' : '8px', // Adjust gap based on direction
    alignItems: direction === 'row' ? 'center' : 'flex-start',
    ...boxStyle,
  };

  const radioItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px', // Space between radio button and label
    cursor: isDisabled ? 'default' : 'pointer',
    fontSize: formStyle.inputText[size]?.fontSize || '16px', // Reuse font size from text input for consistency
    color: isDisabled ? basicThemeColors.gray400 : basicThemeColors.black,
    position: 'relative',
    ...itemStyle,
  };
  const radioItemSelected: React.CSSProperties = {
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    border: `1px solid ${isDisabled ? basicThemeColors.gray400 : basicThemeColors.primary.primary}`,
    backgroundColor: value ? (value === options[0].value ? basicThemeColors.primary.primary : 'transparent') : 'transparent',
    position: 'absolute',
    top: '50%',
    left: '0px', // Adjusted to position the radio button before the label
    transform: 'translateY(-50%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  const radioItemSelectedSpan: React.CSSProperties = {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateY(-50%) translateX(-50%)',
  };

  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = (event: React.FocusEvent<HTMLButtonElement>) => {
    if (!isDisabled) {
      setIsFocused(true);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLButtonElement>) => {
    setIsFocused(false);
  };


  return (
    <div style={{ ...formStyle.inputTextWrap }}> {/* Consistent wrapper for desc */}
      <div style={radioContainerStyle} data-disabled={isDisabled} data-size={size}>
        {options.map((option, index) => (
          <label key={index} htmlFor={`${id}-${option.value}`} style={radioItemStyle}>
            <input
              tabIndex={1}
              type="radio"
              disabled={isDisabled}
              id={`${id}-${option.value}`}
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={handleChange}
              style={{ accentColor: '#ffffff', cursor: isDisabled ? 'default' : 'pointer', width: '16px', height: '16px', opacity: 1 }} // Accent color for radio button
            />
            <div style={{ ...radioItemSelected, backgroundColor: '#ffffff' }}>
              <span style={{ ...radioItemSelectedSpan, backgroundColor: value === option.value ? basicThemeColors.primary.primary : 'transparent' }}></span>
            </div>
            {option.label}
          </label>
        ))}
      </div>
      {desc && <div style={formStyle.inputTextDesc}>{desc}</div>}
    </div>
  );
};

interface AdmInputCheckboxProps {
  size: inputSize;
  isDisabled?: boolean;
  id: string; // 각 체크박스 ID의 접두사로 사용됩니다.
  name: string; // 체크박스 그룹의 이름입니다.
  options: Array<{
    value: string; // 이 체크박스 옵션의 고유 값입니다.
    label: string; // 이 체크박스 옵션의 표시 레이블입니다.
  }>;
  value?: any; // 현재 선택된 값들의 배열입니다.
  onChange?: (selectedValues: string[]) => void; // 선택된 값들의 새 배열과 함께 호출되는 콜백입니다.
  error?: boolean;
  boxStyle?: React.CSSProperties;
  itemStyle?: React.CSSProperties;
  direction?: 'row' | 'column';
  desc?: string;
}

export const AdmInputCheckbox: React.FC<AdmInputCheckboxProps> = ({
  size,
  isDisabled,
  id,
  name,
  options,
  value = [], // 기본값을 빈 배열로 설정
  onChange,
  error,
  boxStyle,
  itemStyle,
  direction = 'row',
  desc,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isDisabled) {
      return;
    }
    const checkboxValue = e.target.value;
    const isChecked = e.target.checked;
    let newSelectedValues: string[];

    if (isChecked) {
      // 값이 선택되면 배열에 추가합니다 (중복 방지).
      newSelectedValues = [...new Set([...value, checkboxValue])];
    } else {
      // 값이 선택 해제되면 배열에서 제거합니다.
      newSelectedValues = value.filter((v: any) => v !== checkboxValue);
    }

    if (onChange) {
      onChange(newSelectedValues);
    }
  };

  const checkboxContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: direction,
    gap: direction === 'row' ? '16px' : '10px',
    alignItems: direction === 'row' ? 'center' : 'flex-start',
    flexWrap: 'wrap', // 여러 항목이 있을 경우 줄바꿈 허용
    ...boxStyle,
  };

  const checkboxItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    cursor: isDisabled ? 'default' : 'pointer',
    fontSize: formStyle.inputText[size]?.fontSize || '16px',
    color: isDisabled ? basicThemeColors.gray400 : basicThemeColors.black,
    position: 'relative', // For positioning the hidden input correctly
    ...itemStyle,
    fontWeight: '400',
  };

  // 시각적 체크박스 스타일
  const visualCheckboxBaseStyle: React.CSSProperties = {
    width: '16px',
    height: '16px',
    borderRadius: '3px',
    border: `1.5px solid ${isDisabled ? basicThemeColors.gray300 : basicThemeColors.primary.primary}`,
    backgroundColor: basicThemeColors.white,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '4px', // 체크박스와 레이블 텍스트 사이 간격
    transition: 'background-color 0.2s, border-color 0.2s',
    flexShrink: 0, // 크기 고정
  };

  const CheckmarkIcon = ({ color }: { color: string }) => (
    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.5 4L3.83333 6.5L8.5 1.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <div style={{ ...formStyle.inputTextWrap }}> {/* 설명을 위한 일관된 래퍼 */}
      <div style={checkboxContainerStyle} data-disabled={isDisabled} data-size={size}>
        {options.map((option, index) => {
          const isChecked = value.includes(option.value);
          const visualCheckboxCurrentStyle: React.CSSProperties = {
            ...visualCheckboxBaseStyle,
            backgroundColor: isChecked ? (isDisabled ? basicThemeColors.gray300 : basicThemeColors.primary.primary) : basicThemeColors.white,
            borderColor: isChecked ? (isDisabled ? basicThemeColors.gray300 : basicThemeColors.primary.primary) : (isDisabled ? basicThemeColors.gray300 : basicThemeColors.primary.primary),
          };

          return (
            <label key={index} htmlFor={`${id}-${option.value}`} style={checkboxItemStyle}>
              <input
                tabIndex={isDisabled ? -1 : 1}
                type="checkbox"
                disabled={isDisabled}
                id={`${id}-${option.value}`}
                name={name} // 그룹 내 모든 체크박스는 동일한 name을 가질 수 있습니다.
                value={option.value}
                checked={isChecked}
                onChange={handleChange}
                style={{
                  position: 'absolute',
                  opacity: 1,
                  cursor: isDisabled ? 'default' : 'pointer',
                  width: '14px',
                  height: '14px',
                  top: '50%',
                  left: '1px',
                  transform: 'translateY(-50%)',
                  margin: 0,
                  padding: 0,
                  zIndex: 1, // 시각적 요소 위에 있도록
                }}
              />
              <div style={{ ...visualCheckboxCurrentStyle, position: 'relative', zIndex: 2, pointerEvents: 'none' }}>
                {isChecked && <CheckmarkIcon color={basicThemeColors.white} />}
              </div>
              {option.label}
            </label>
          );
        })}
      </div>
      {desc && <div style={formStyle.inputTextDesc}>{desc.split('\n').map((line, i) => (
        <Fragment key={i}>
          {line}
          {i < desc.split('\n').length - 1 && <br />}
        </Fragment>
      ))}</div>}
    </div>
  );
};