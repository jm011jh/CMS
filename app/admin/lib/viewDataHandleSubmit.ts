import prepareSavePayload from '@/app/admin/lib/prepareSavePayload';
import useValidateInputs from '@/app/admin/lib/useValidateInputs';
import validationCheckToken from '@/app/admin/lib/validationCheckToken';
import { T_UPLOAD_DIRECTORY } from '@/app/admin/lib/viewDataFilesUpload';
import { AdmViewMakeTableObjectType } from '@/app/admin/type';
import { callAPI, HTTPMETHOD } from '@/lib/util/callApi';
import { getAccessToken } from '@/lib/util/tokenClass';
import { useRouter } from 'next/navigation';

const handleSubmit = async (
  isEditing: 'save' | 'edit' | 'put',
  router: ReturnType<typeof useRouter>,
  viewId: string | null,
  viewTableObject: AdmViewMakeTableObjectType[],
  S3_IMAGE_PATH: T_UPLOAD_DIRECTORY,
  paramApiUrl: string,
  paramBackUrl?: string,
  tokenExist: boolean = true,
) => {
  const token = getAccessToken();
  if (tokenExist && !validationCheckToken(token)) {
    // alert('로그인 해주세요.');
    throw new Error('로그인 해주세요.');
  }
  const { isValid, errors } = useValidateInputs(viewTableObject);
  if (!isValid) {
    const errorMessages = Object.values(errors).join('\n');
    // alert(`입력값을 확인해주세요:\n${errorMessages}`);
    throw new Error(`입력값을 확인해주세요:\n${errorMessages}`);
  }

  if (isEditing === 'edit' && !viewId) {
    // alert('수정할 항목의 ID가 없습니다. 저장할 수 없습니다.');
    throw new Error('수정할 항목의 ID가 없습니다. 저장할 수 없습니다.');
  }
  if (isEditing === 'put' && !viewId) {
    // alert('수정할 항목의 ID가 없습니다. 저장할 수 없습니다.');
    throw new Error('수정할 항목의 ID가 없습니다. 저장할 수 없습니다.');
  }

  try {
    const apiUrl = paramApiUrl;
    const method =
      isEditing === 'edit'
        ? HTTPMETHOD.PATCH
        : isEditing === 'save'
          ? HTTPMETHOD.POST
          : HTTPMETHOD.PUT;
    const payload = await prepareSavePayload(
      viewTableObject,
      (isEditing === 'edit' || isEditing === 'put') ? viewId : null,
      S3_IMAGE_PATH,
      tokenExist,
    );

    await callAPI(method, payload, apiUrl, token);

    if (paramBackUrl) {
      alert((isEditing === 'edit' ? '수정이' : '저장이') + ' 완료됐습니다.');
      router.push(paramBackUrl);
    } else {
      // then에서 처리할 수 있도록 Promise를 반환합니다.
      return Promise.resolve();
    }
  } catch (exception: any) {
    exception.code = exception.response.data.code;
    throw exception;
  }
};

export default handleSubmit;
