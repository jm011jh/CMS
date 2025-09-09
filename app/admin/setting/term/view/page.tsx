'use client';

import AdmPageTop from '@/app/admin/components/design/AdmPageTop';
import AdmWrapper from '@/app/admin/components/design/AdmWrapper';
import { callAPI, HTTPMETHOD } from '@/lib/util/callApi';
import { getAccessToken } from '@/lib/util/tokenClass';
import dayjs from 'dayjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { CSSProperties, FormEvent, useEffect, useState } from 'react';
import CustomPageExplnation from '../component/CustomPageExplnation';

import { basicThemeColors } from '@/app/admin/assets/theme';
import AdmViewNavButton from '@/app/admin/components/design/AdmButtonPrimary';
import AdmViewBox from '@/app/admin/components/design/AdmViewBox';
import AdmViewMakeTable from '@/app/admin/components/design/AdmViewMakeTable';
import updateDisabled from '@/app/admin/lib/updateDisabled';
import updateValue from '@/app/admin/lib/updateValue';
import { T_UPLOAD_DIRECTORY } from '@/app/admin/lib/viewDataFilesUpload';
import handleSubmit from '@/app/admin/lib/viewDataHandleSubmit';
import { useConfirmPopupStore } from '@/app/admin/store/confirmPopupStore';
import useLoadingScreenStore from '@/app/admin/store/loadingScreenStore';
import { AdmViewMakeTableObjectType } from '@/app/admin/type';
import { AdmInputSelect } from '@/app/components/form/Input';
import { TermType } from '../component/termType';

const termTypeList = Object.entries(TermType).map(([key, value]) => ({
  value: key,
  label: value,
}))
const S3_IMAGE_PATH: T_UPLOAD_DIRECTORY = 'media/img';
const API_URL = '/api/admin/terms';
const API_URL_GET = '/api/terms/detail/';
const API_URL_GET_ALL = '/api/admin/terms/all';
const BOARD_URL = '/admin/setting/term';

interface I_TERM_ITEM {
  content: string
  contentCn: string
  contentTw: string
  contentUs: string
  id: number
  isRequired: string
  regDate: string
  title: string
  titleUs: string
  type: string
  updateDate: string
}

const AdminSettingTermViewPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const viewId = searchParams.get('id');
  const cellKey = searchParams.get('cellKey');
  const [pageTitle, setPageTitle] = useState<string>('');
  const [viewTableObject, setViewTableObject] = useState<
    AdmViewMakeTableObjectType[]
  >([
    {
      placeholder: '타입',
      inputKey: 'type',
      label: '타입 *',
      value: '',
      isFirst: true,
      isLast: false,
      isHidden: true,
      inputType: 'text',
      required: true,
      requireOptions: {
        maxLength: 100
      }
    },
    { //보여주기용
      notInPayload: true,
      placeholder: '2만자 내외 내용을 입력해주세요.',
      inputKey: 'contentView',
      label: '내용 *',
      value: '',
      isFirst: false,
      isLast: true,
      inputType: 'editorImage',
      required: true,
      requireOptions: {
        maxLength: 20000
      }
    },
    // 숨겨져 있는 진짜 데이터
    {
      isHidden: true,
      placeholder: '2만자 내외 내용을 입력해주세요.',
      inputKey: 'content',
      label: '내용 *',
      value: '',
      isFirst: false,
      isLast: true,
      inputType: 'text',
    },
    {
      isHidden: true,
      placeholder: '2만자 내외 내용을 입력해주세요.',
      inputKey: 'contentCn',
      label: '내용 *',
      value: '',
      isFirst: false,
      isLast: true,
      inputType: 'text',
    },
    {
      isHidden: true,
      placeholder: '2만자 내외 내용을 입력해주세요.',
      inputKey: 'contentTw',
      label: '내용 *',
      value: '',
      isFirst: false,
      isLast: true,
      inputType: 'text',
    },
    {
      isHidden: true,
      placeholder: '2만자 내외 내용을 입력해주세요.',
      inputKey: 'contentUs',
      label: '내용 *',
      value: '',
      isFirst: false,
      isLast: true,
      inputType: 'text',
    },
  ]);

  const styles: { [inputKey: string]: CSSProperties } = {
    tableViewRow: {
      display: 'flex',
      width: '100%',
      minHeight: '64px',
      borderTop: basicThemeColors.gray300 + ' 1px solid',
      borderRight: basicThemeColors.gray300 + ' 1px solid',
      borderLeft: basicThemeColors.gray300 + ' 1px solid',

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
      paddingTop: '24px',
      paddingBottom: '16px',
    },
    tableViewRowInput: {
      width: 'calc(100% - 160px)',
      display: 'flex',
      alignItems: 'center',
      padding: '0px 16px',
      paddingTop: '16px',
      paddingBottom: '8px',
    },
  };


  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showLoading, hideLoading } = useLoadingScreenStore();

  const callView = async () => {
    const token = getAccessToken();
    if (token === '') {
      alert('로그인 해주세요.');
      return;
    }

    try {
      const url = `${API_URL_GET}${viewId}`;
      const result: { code: number; data: any; message: string } =
        await callAPI(HTTPMETHOD.GET, {}, url, token);
      if (result.data.regDate) {
        updateValue('regDate', dayjs(result.data.regDate).format('YYYY-MM-DD'), setViewTableObject);
        updateDisabled('regDate', true, setViewTableObject);
      }

      setPageTitle(`${result.data.title} ${getLanguageLabel(cellKey)} 등록하기`)
      updateValue('type', result.data.type, setViewTableObject);
      updateValue('content', result.data.content || '', setViewTableObject);
      updateValue('contentCn', result.data.contentCn || '', setViewTableObject);
      updateValue('contentTw', result.data.contentTw || '', setViewTableObject);
      updateValue('contentUs', result.data.contentUs || '', setViewTableObject);
      if (cellKey === 'content') {
        updateValue('contentView', result.data.content || ' ', setViewTableObject);
      } else if (cellKey === 'contentCn') {
        updateValue('contentView', result.data.contentCn || ' ', setViewTableObject);
      } else if (cellKey === 'contentTw') {
        updateValue('contentView', result.data.contentTw || ' ', setViewTableObject);
      } else if (cellKey === 'contentUs') {
        updateValue('contentView', result.data.contentUs || ' ', setViewTableObject);
      } else {
        updateValue('contentView', result.data.content || ' ', setViewTableObject);
      }

      // 개정버전 리스트 가져오기
      callHistory(result.data.type);

    } catch (e: any) {
      console.log(e);
    }
  };

  const [historyList, setHistoryList] = useState<{ value: string; label: string }[]>([]);

  // 개정버전 리스트 가져오기
  const callHistory = async (type: string) => {
    const token = getAccessToken();
    if (token === '') {
      alert('로그인 해주세요.');
      return;
    }

    try {
      const url = `${API_URL_GET_ALL}?search=${type}&limit=9999`;
      const result: { code: number; data: any; message: string } = await callAPI(HTTPMETHOD.GET, {}, url, token);

      //해당 언어를 가진 버전만 가져오도록
      const temp = result.data?.data?.filter((item: any) => {
        // 추가로 viewId 같은 버전은 포함
        // if (item.id == viewId) {
        //   return true;
        // }

        if (cellKey === 'content') {
          return item.content != ''
        } else if (cellKey === 'contentCn') {
          console.log(item.contentCn)
          return item.contentCn != ''
        } else if (cellKey === 'contentTw') {
          return item.contentTw != ''
        } else if (cellKey === 'contentUs') {
          return item.contentUs != ''
        }
      })?.map((item: any) => {
        return {
          value: item.id,
          label: dayjs(item.regDate).format('YYYY-MM-DD HH:mm:ss'),
        }
      });

      setHistoryList(temp || []);

    } catch (e: any) {
      console.log(e);
    }

  }

  useEffect(() => {
    if (viewId) {
      callView();
    }
  }, [viewId]);

  const saveApi = async (event?: FormEvent) => {
    if (event) event.preventDefault();
    if (isLoading) return; // 중복 제출 방지
    setIsLoading(true);
    showLoading();

    const viewTableObjectCopy: AdmViewMakeTableObjectType[] = []
    viewTableObject.forEach((item: any) => {
      viewTableObjectCopy.push(item)
    })
    viewTableObjectCopy.forEach((item: any, index: number) => {
      if (item.inputKey === cellKey) {
        viewTableObjectCopy[index].value = viewTableObject.find((viewItem: any) => viewItem.inputKey === 'contentView')?.value || '';
      }
    })

    await handleSubmit('save', router, viewId, viewTableObjectCopy, S3_IMAGE_PATH, API_URL, BOARD_URL)
      .then(() => {
        // alert('저장되었습니다.');
      })
      .catch((error) => {
        alert(`등록 중 오류가 발생했습니다: ${error instanceof Error ? error.message : String(error)}`);
      }).finally(() => {
        setIsLoading(false);
        hideLoading();
      })
  };
  const editApi = async (event?: FormEvent) => {
    if (event) event.preventDefault();
    if (isLoading) return; // 중복 제출 방지
    setIsLoading(true);
    showLoading();

    const viewTableObjectCopy: AdmViewMakeTableObjectType[] = []
    viewTableObject.forEach((item: any) => {
      viewTableObjectCopy.push(item)
    })
    viewTableObjectCopy.forEach((item: any, index: number) => {
      if (item.inputKey === cellKey) {
        viewTableObjectCopy[index].value = viewTableObject.find((viewItem: any) => viewItem.inputKey === 'contentView')?.value || '';
      }
    })

    await handleSubmit('edit', router, viewId, viewTableObjectCopy, S3_IMAGE_PATH, API_URL, BOARD_URL)
      .then(() => {
        // alert('수정되었습니다.');
      })
      .catch((error) => {
        alert(`등록 중 오류가 발생했습니다: ${error instanceof Error ? error.message : String(error)}`);
      }).finally(() => {
        setIsLoading(false);
        hideLoading();
      })
  };

  const { showPopup } = useConfirmPopupStore()

  const save = async (event?: FormEvent) => { // 개정
    showPopup({
      title: <p></p>,
      desc: <p>새로운 버전의 약관이 저장됩니다.<br />약관 수정을 원하신다면 “저장"을 눌러주세요.<br />약관을 개정하시겠습니까?</p>,
      onConfirm: () => {
        saveApi();
      },
    });
  }
  const edit = async (event?: FormEvent) => { // 수정
    showPopup({
      title: <p></p>,
      desc: <p>
        약관의 내용은 변경되지 않으며<br />
        현재 버전에서 수정사항이 저장됩니다.<br />
        약관 개정을 원하신다면 “약관개정”을 눌러주세요.<br />
        수정사항을 저장하시겠습니까?
      </p>,
      onConfirm: () => {
        editApi();
      },
    });
  }

  const getLanguageLabel = (key: string | null) => {
    switch (key) {
      case 'content':
        return '국문';
      case 'contentCn':
        return '중국(간체)';
      case 'contentTw':
        return '중국(번체)';
      case 'contentUs':
        return '영문';
      default:
        return '한글';
    }
  };
  return (
    <AdmWrapper>
      <AdmPageTop title={pageTitle} depth1={'서비스 약관 관리'} depth2={pageTitle} />
      <CustomPageExplnation
        titleRed={'약관을 개정하면 새로운 버전으로 업데이트됩니다.'}
        titleBlack={'수정 또는 저장은 버전을 변경하지 않고 현재 버전만 수정합니다.'}
      />
      <AdmViewBox>
        <>
          {/* <AdmPageExplnation titleRed={'공개 예정일에 맞추어 푸시알림이 자동으로 발송됩니다.'} /> */}
          <div style={styles.tableViewRow}>
            <div style={styles.tableViewRowLabel}>{'개정버전 *'}</div>
            <div style={styles.tableViewRowInput}>
              <AdmInputSelect
                value={viewId}
                size={'medium'}
                id={'historySelect'}
                name={'historySelect'}
                placeholder={'개정버전이 없습니다.'}
                onChange={(newValue: string) => {
                  //에디터 내용 초기화를 위하여
                  updateValue('contentView', '', setViewTableObject);
                  router.replace(`${BOARD_URL}/view?id=${newValue}&cellKey=${cellKey}`);
                }}
                options={[...historyList]}
                isDisabled={historyList.length === 0}
              />
            </div>
          </div>

          <AdmViewMakeTable
            values={viewTableObject}
            setValues={setViewTableObject}
          />

          <div style={{ display: 'flex', gap: '8px', width: '100%', justifyContent: 'flex-end', alignItems: 'center', marginTop: '24px' }}>
            <div className="adm--view-nav-bar-btn" style={{ display: 'flex', gap: '8px', width: '100%', justifyContent: 'flex-end', alignItems: 'center' }}>
              <AdmViewNavButton status={'border'} onClick={() => router.back()} size={'large'}>
                취소
              </AdmViewNavButton>
              <AdmViewNavButton status={'primary'} onClick={edit} size={'large'}>
                저장
              </AdmViewNavButton>
              <AdmViewNavButton status={'error'} onClick={save} size={'large'}>
                약관 개정
              </AdmViewNavButton>
            </div>
          </div>

        </>
      </AdmViewBox>



    </AdmWrapper>
  );
}

export default AdminSettingTermViewPage;
