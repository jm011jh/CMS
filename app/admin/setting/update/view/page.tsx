'use client';

import AdmPageTop from '@/app/admin/components/design/AdmPageTop';
import AdmViewBox from '@/app/admin/components/design/AdmViewBox';
import AdmViewMakeTable from '@/app/admin/components/design/AdmViewMakeTable';
import AdmViewNavBar from '@/app/admin/components/design/AdmViewNavBar';
import AdmWrapper from '@/app/admin/components/design/AdmWrapper';
import updateValue from '@/app/admin/lib/updateValue';
import validationCheckToken from '@/app/admin/lib/validationCheckToken';
import useLoadingScreenStore from '@/app/admin/store/loadingScreenStore';
import { AdmViewMakeTableObjectType } from '@/app/admin/type';
import { callAPI, HTTPMETHOD } from '@/lib/util/callApi';
import { getAccessToken } from '@/lib/util/tokenClass';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';


const AdminSettingUpdateViewPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const [viewTableObject, setViewTableObject] = useState<
    AdmViewMakeTableObjectType[]
  >([
    {
      placeholder: '앱 타입을 선택해주세요.',
      inputKey: 'appType',
      label: '앱 타입',
      value: '',
      isFirst: true,
      isLast: false,
      inputType: 'text',
      disabled: true
    },
    {
      placeholder: 'AOS 버전을 입력해주세요.',
      inputKey: 'androidVersion',
      label: 'AOS 버전',
      value: '',
      isFirst: false,
      isLast: false,
      inputType: 'text',
    },
    {
      placeholder: 'AOS 강제여부를 선택해주세요.',
      inputKey: 'isForceUpdateAndroid',
      label: 'AOS 강제여부',
      value: '',
      isFirst: false,
      isLast: false,
      inputType: 'select',
      selectOptions: [
        { label: '강제', value: 'Y' },
        { label: '선택', value: 'N' }
      ],
    },

    {
      placeholder: 'iOS 버전을 입력해주세요.',
      inputKey: 'iosVersion',
      label: 'iOS 버전',
      value: '',
      isFirst: false,
      isLast: false,
      inputType: 'text',
    },

    {
      placeholder: 'iOS 강제여부를 선택해주세요.',
      inputKey: 'isForceUpdateIos',
      label: 'iOS 강제여부',
      value: '',
      isFirst: false,
      isLast: false,
      inputType: 'select',
      selectOptions: [
        { label: '강제', value: 'Y' },
        { label: '선택', value: 'N' }
      ],
    }
  ]);

  const [id, setId] = useState<string>();

  const [isLoading, setIsLoading] = useState(false);
  const { showLoading, hideLoading } = useLoadingScreenStore();

  useEffect(() => {
    if (type) {
      callView();
    }
  }, [type]);
  const callView = async () => {
    const token = getAccessToken();
    if (!validationCheckToken(token)) {
      alert('로그인 해주세요.');
      return;
    }

    try {
      const url = `/api/updates/${type}`;
      const result: any = await callAPI(HTTPMETHOD.GET, {}, url, token)

      setId(result.data.id);

      updateValue('appType', result.data.appType, setViewTableObject);
      updateValue('androidVersion', result.data.androidVersion, setViewTableObject);
      updateValue('isForceUpdateAndroid', result.data.isForceUpdateAndroid, setViewTableObject);
      updateValue('iosVersion', result.data.iosVersion, setViewTableObject);
      updateValue('isForceUpdateIos', result.data.isForceUpdateIos, setViewTableObject);


    } catch (e: any) {
      console.error("Error fetching notice details:", e);
      alert('정보를 불러오는 데 실패했습니다.');
    }
  };
  const save = async (event?: FormEvent) => {
    if (event) event.preventDefault();
    // await handleSubmit('save', router, type, viewTableObject, S3_IMAGE_PATH, API_URL, BOARD_URL);
  };
  const edit = async (event?: FormEvent) => {
    if (event) event.preventDefault();

    if (isLoading) return; // 중복 제출 방지
    setIsLoading(true);
    showLoading();

    const token = getAccessToken();
    if (!validationCheckToken(token)) {
      alert('로그인 해주세요.');

      setIsLoading(false);
      hideLoading();

      return;
    }

    const params = {
      id: id,
      appType: viewTableObject.find(item => item.inputKey === 'appType')?.value,
      androidVersion: viewTableObject.find(item => item.inputKey === 'androidVersion')?.value,
      isForceUpdateAndroid: viewTableObject.find(item => item.inputKey === 'isForceUpdateAndroid')?.value,
      iosVersion: viewTableObject.find(item => item.inputKey === 'iosVersion')?.value,
      isForceUpdateIos: viewTableObject.find(item => item.inputKey === 'isForceUpdateIos')?.value,
    }

    try {
      const url = `/api/admin/updates`;
      const result: any = await callAPI(HTTPMETHOD.PATCH, params, url, token);

      alert('수정되었습니다.');

      setIsLoading(false);
      hideLoading();

      router.back();

    } catch (e: any) {
      alert('처리 중 문제가 발생하였습니다.\n반복될 경우, 관리자에게 문의하여 주세요.');

      setIsLoading(false);
      hideLoading();
    }
  };
  return (
    <AdmWrapper>
      <AdmPageTop title={`앱 업데이트 ${type == null ? '등록' : '수정'}하기`} depth1={'설정 관리'} depth2={`앱 업데이트 ${type == null ? '등록' : '수정'}하기`} />
      <AdmViewBox>
        <>
          <AdmViewMakeTable
            values={viewTableObject}
            setValues={setViewTableObject}
          />
          <AdmViewNavBar
            mode={'edit'}
            // save={save}
            edit={edit}
          />
        </>
      </AdmViewBox>
    </AdmWrapper>
  );
}

export default AdminSettingUpdateViewPage;