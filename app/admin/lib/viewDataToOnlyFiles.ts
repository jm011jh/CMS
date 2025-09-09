import { AdmViewMakeTableObjectType } from '@/app/admin/type';
import { FileToProcess } from './prepareSavePayload';

export default function viewDataToOnlyFiles(
  viewData: AdmViewMakeTableObjectType[],
) {
  const onlyFiles: AdmViewMakeTableObjectType[] = viewData.filter(
    item =>
      (item.inputType === 'files' || item.inputType === 'images') &&
      Array.isArray(item.value),
  );

  // key , value 형태로 변환
  return onlyFiles.map(item => {
    return { key: item.inputKey, value: item.value as Array<FileToProcess> };
  });
}
