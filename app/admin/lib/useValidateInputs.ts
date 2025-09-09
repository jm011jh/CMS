import { AdmViewMakeTableObjectType } from '@/app/admin/type';
interface I_PROCESSED_FILE {
  fileName: string;
  fileUrl: string;
  fileType: string;
  id?: string;
}
const useValidateInputs = (
  data: AdmViewMakeTableObjectType[],
): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  let isValid = true;

  // 필수입력 항목의 유효성 먼저 체크
  data.forEach(item => {
    if (item.required) {
      if (
        (!item.value?.toString()) ||
        (item.value === '') ||
        (item.value === null)
      ) {
        errors[item.inputKey] = item.label + '값은 필수 항목입니다.';
        isValid = false;
      }
    }

    if (item.onlyNumber) {
      const reg = /^-?[0-9]*$/;
      if (item.value?.toString() && !reg.test(item.value?.toString())) {
        errors[item.inputKey] = item.label + '값은 숫자만 입력 가능합니다.';
        isValid = false;
      }
    }
  });
  const passwordField = data.find(item => item.inputKey === 'password');
  const passwordFieldRe = data.find(item => item.inputKey === 'passwordRe');
  if (passwordField && passwordField.value) {
    const password = passwordField.value.toString();
    if (password.length < 8) {
      errors.password = '비밀번호는 8자 이상이어야 합니다.';
      isValid = false;
    } else if (!/[0-9]/.test(password)) {
      errors.password = '비밀번호는 숫자를 포함해야 합니다.';
      isValid = false;
    } else if (!/[a-z]/.test(password)) {
      errors.password = '비밀번호는 영소문자를 포함해야 합니다.';
      isValid = false;
    } else if (!/[!@#$%^&*()_+\-=]/.test(password)) {
      errors.password = '비밀번호는 특수문자를 포함해야 합니다.';
      isValid = false;
    }
  }
  if (passwordFieldRe && passwordFieldRe.value) {
    const passwordRe = passwordFieldRe.value.toString();
    if (passwordRe.length < 8) {
      errors.passwordRe = '비밀번호 확인은 8자 이상이어야 합니다.';
      isValid = false;
    } else if (!/[0-9]/.test(passwordRe)) {
      errors.passwordRe = '비밀번호 확인은 숫자를 포함해야 합니다.';
      isValid = false;
    } else if (!/[a-z]/.test(passwordRe)) {
      errors.passwordRe = '비밀번호 확인은 영소문자를 포함해야 합니다.';
      isValid = false;
    } else if (!/[!@#$%^&*()_+\-=]/.test(passwordRe)) {
      errors.passwordRe = '비밀번호 확인은 특수문자를 포함해야 합니다.';
      isValid = false;
    }
  }
  if (
    passwordField &&
    passwordField.value &&
    passwordFieldRe &&
    passwordFieldRe.value
  ) {
    if (passwordField.value !== passwordFieldRe.value) {
      errors.passwordRe = '비밀번호가 일치하지 않습니다.';
      isValid = false;
    }
  }

  // 각 값별로 minLength, maxLength, 형식 등을 체크
  data.forEach(item => {
    if (item.required && item.value) {
      const value = String(item.value).trim();
      if (
        item.requireOptions?.minLength &&
        value.length < item.requireOptions.minLength
      ) {
        errors[item.inputKey] =
          `${item.label}값은 최소 ${item.requireOptions.minLength}자 이상이어야 합니다.`;
        isValid = false;
      }
      if (
        item.requireOptions?.maxLength &&
        value.length > item.requireOptions.maxLength
      ) {
        errors[item.inputKey] =
          `${item.label}값은 최대 ${item.requireOptions.maxLength}자 이내여야 합니다.`;
        isValid = false;
      }
      if (item.inputType === 'number' && isNaN(Number(item.value))) {
        errors[item.inputKey] = `${item.label}값은 숫자여야 합니다.`;
        isValid = false;
      }
      if (
        item.requireOptions?.isNumber
      ) {
        if (isNaN(Number(item.value))) {
          errors[item.inputKey] = `${item.label}값은 숫자여야 합니다.`;
          isValid = false;
        }
      }
    }
  });

  const filesField = data.find(item => item.inputKey === 'files');
  if (filesField) {
    if (filesField.required) {
      if (
        !filesField.value ||
        filesField.value === null ||
        filesField.value === undefined ||
        (Array.isArray(filesField.value) && filesField.value.length === 0)
      ) {
        errors.files = '이미지를 업로드해주세요.';
        isValid = false;
      }
    }
    if (filesField.value && Array.isArray(filesField.value)) {
      const files = filesField.value as Array<File | I_PROCESSED_FILE>; // More specific type
      const MAX_FILES = 10;
      const MAX_FILE_SIZE_MB = 10;
      const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png'];

      if (files.length > MAX_FILES) {
        errors.files = `이미지는 최대 ${MAX_FILES}개까지 등록할 수 있습니다.`;
        isValid = false;
      }

      for (const file of files) {
        if (file instanceof File) {
          console.log(file.size);
          // Only validate new files
          if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
            errors.files =
              (errors.files ? errors.files + '\n' : '') +
              `파일 '${file.name}'의 크기가 ${MAX_FILE_SIZE_MB}MB를 초과합니다.`;
            isValid = false;
          }
          if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            errors.files =
              (errors.files ? errors.files + '\n' : '') +
              `파일 '${file.name}'은(는) jpg, png 형식만 가능합니다.`;
            isValid = false;
          }
        }
      }
    }
  }

  const videoField = data.find(item => item.inputKey === 'video');
  if (videoField && videoField.required) {
    if (videoField.value && String(videoField.value).trim() !== '') {
      const youtubeRegex = /^[a-zA-Z0-9_-]{11}$/;
      if (!youtubeRegex.test(String(videoField.value))) {
        errors.video =
          '유효한 유튜브 영상 ID를 입력해주세요 (예: dQw4w9WgXcQ).';
        isValid = false;
      }
    }
  }

  data.forEach(item => {
    if (item.inputType === 'date') {
      const date = item;
      if (date && date.required) {
        if (
          String(date.value).trim() !== '' ||
          date.value === '' ||
          date.value === null ||
          date.value === undefined
        ) {
          if (isNaN(new Date(String(date.value)).getTime())) {
            errors[item.inputKey] =
              date.label + '의 유효한 날짜를 선택해주세요.';
            isValid = false;
          }
        }
      }
    }
  });

  return { isValid, errors };
};

export default useValidateInputs;
