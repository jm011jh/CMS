import viewDataImageFileOneUploadToS3, {
  T_UPLOAD_DIRECTORY,
} from '@/app/admin/lib/viewDataFilesUpload';
import viewDataToOnlyFiles from '@/app/admin/lib/viewDataToOnlyFiles';
import viewDataToParam from '@/app/admin/lib/viewDataToParam';
import { AdmViewMakeTableObjectType } from '@/app/admin/type';
interface I_PROCESSED_FILE {
  fileName: string;
  fileUrl: string;
  fileType: string;
  id?: string;
}
export type FileToProcess = File | (I_PROCESSED_FILE & { id: string });
const prepareSavePayload = async (
  currentViewTableObject: AdmViewMakeTableObjectType[],
  currentViewId?: string | null,
  imgPath?: T_UPLOAD_DIRECTORY,
  tokenExist: boolean = true,
): Promise<any> => {
  const basePayloadFromView: Omit<any, 'id' | 'files'> = await viewDataToParam(
    currentViewTableObject,
  );

  // let processedApiFilesResult = {};
  let processedApiFilesResult: I_PROCESSED_FILE[] = [];
  if (imgPath !== '' || imgPath !== undefined || imgPath !== null) {
    const fileGroups = viewDataToOnlyFiles(currentViewTableObject);

    if (fileGroups.length > 0 && fileGroups[0]) {
      // fileGroups : [{key: string, value: File[] }]
      // for 형태로 변환
      for (let i = 0; i < fileGroups.length; i++) {
        const filesToHandle: Array<FileToProcess> = fileGroups[i].value?.map((file) => file);
        const uploadPromises: Promise<any>[] = filesToHandle.map(fileItem => {
          if (fileItem instanceof File) {
            return viewDataImageFileOneUploadToS3(fileItem, imgPath, tokenExist);
          } else {
            return Promise.resolve(fileItem);
          }
        });
        const processedApiFiles = await Promise.all(uploadPromises);

        // processedApiFilesResult = {
        //   ...processedApiFilesResult,
        //   [fileGroups[i].key]: processedApiFiles
        // }

        // fileGroups[i].key 가 'thumbnail'인 경우 fileType을 THUMB로 변경
        processedApiFilesResult.push(
          ...processedApiFiles.map((file: I_PROCESSED_FILE) => ({
            ...file,
            fileType: fileGroups[i].key === 'thumbnail' ? 'THUMB' : file.fileType
          }))
        );
      }
    }

    let finalApiParams: any = {
      ...basePayloadFromView,
      // ...processedApiFilesResult
      files: processedApiFilesResult,
    };

    // 파일 그룹에서 'thumbnailImage' 키가 있는 경우, processedApiFilesResult를 finalApiParams에 추가
    if (fileGroups.length > 0 && fileGroups[0]) {
      if (fileGroups[0].key === 'thumbnailImage') {
        finalApiParams.thumbnailImage = { ...processedApiFilesResult[0] };
      }
    }

    if (currentViewId) {
      finalApiParams.id = currentViewId;
    }
    return finalApiParams;
  }
};

export default prepareSavePayload;
