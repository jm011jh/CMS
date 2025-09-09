import { AdmViewMakeTableObjectType } from '@/app/admin/type';
export default function viewDataToFormData(
  viewData: AdmViewMakeTableObjectType[],
) {
  const formData = new FormData();
  viewData.forEach((item: AdmViewMakeTableObjectType) => {
    if (item.value) {
      if (
        item.inputType === 'text' ||
        item.inputType === 'textarea' ||
        item.inputType === 'number'
      ) {
        formData.append(item.inputKey, item.value as string);
      } else if (item.inputType === 'files' || item.inputType === 'images') {
        if (Array.isArray(item.value)) {
          item.value.forEach((element: unknown) => {
            if (element instanceof File) {
              formData.append(item.inputKey, element);
              console.log('is file', element);
            } else {
              // 필요하다면 File이 아닌 요소에 대한 처리 로직 추가 (예: 경고 로그)
              // console.warn(`Skipping non-File element for key ${item.inputKey}:`, element);
              return false;
            }
          });
        }
      } else if (item.inputType === 'file' || item.inputType === 'image') {
        formData.append(item.inputKey, item.value as File);
      }
    }
  });
  return formData;
}
