import { AdmViewMakeTableObjectType } from '@/app/admin/type';
export default function viewDataToParam(
  viewData: AdmViewMakeTableObjectType[],
) {
  const param: any = {};
  viewData.forEach((item: AdmViewMakeTableObjectType) => {
    if (item.notInPayload) {
      return;
    }
    if (item.value) {
      console.log(item.inputKey, " have value")
      if (
        item.inputType !== 'file' &&
        item.inputType !== 'files' &&
        item.inputType !== 'image' &&
        item.inputType !== 'images'
      ) {
        param[item.inputKey] = item.value as string;

        if (item.payloadToNumber) {
          param[item.inputKey] = Number(item.value);
        } else if (item.payloadToBoolean) {
          param[item.inputKey] = Boolean(item.value);
        } else if (item.payloadToString) {
          param[item.inputKey] = String(item.value);
        } else {
          param[item.inputKey] = item.value;
        }
      }
    } else {
      if (item.value !== null && item.value !== undefined) {
        param[item.inputKey] = item.value as string;
      }
    }

  });
  console.log("paramis", param)
  return param;
}
