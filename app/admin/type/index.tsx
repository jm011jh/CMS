export type AdmViewMakeTableObjectType = {
  placeholder?: string;
  inputKey: string;
  label: string;
  value: string | number | boolean | File | File[] | string[] | null | undefined;
  defaultValue?: string | number | boolean | File | File[] | string[] | null | undefined; // value가 공백일 경우의 기본값
  isFirst?: boolean;
  isLast?: boolean;
  disabled?: boolean;
  required?: boolean;
  onlyNumber?: boolean;
  payloadToNumber?: boolean;
  payloadToBoolean?: boolean;
  payloadToString?: boolean;
  textMinLength?: number;
  textMaxLength?: number;
  requireOptions?: {
    isNumber?: boolean; // If true, value must be a number
    maxLength?: number;
    minLength?: number;
    pattern?: string; // Regex pattern for validation
    customValidation?: (value: string) => boolean; // Custom validation function
  };
  isHidden?: boolean;
  isReadOnly?: boolean;
  containConstructedValue?: string;
  desc?: string;
  descAlert?: string;
  minLength?: number;
  maxLength?: number;
  order?: number;
  notInPayload?: boolean;
  selectOptions?:
  Array<{
    value: string;
    label: string;
  }> | null | undefined;
  inputType:
  | 'text'
  | 'password'
  | 'textarea'
  | 'select'
  | 'select&text'
  | 'radio'
  | 'checkbox'
  | 'date'
  | 'number'
  | 'boolean'
  | 'files'
  | 'file'
  | 'image'
  | 'images'
  | 'editor'
  | 'editorImage';
};

export interface I_PROCESSED_FILE {
  fileName: string;
  fileUrl: string;
  fileType: string;
  id?: string;
}
