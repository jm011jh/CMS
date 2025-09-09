'use client';

import AdmButton from '@/app/admin/components/design/AdmButton';
import AdmPageExplnation from '@/app/admin/components/design/AdmPageExplnation';
import AdmPageTop from '@/app/admin/components/design/AdmPageTop';
import AdmViewBox from '@/app/admin/components/design/AdmViewBox';
import AdmViewMakeTable from '@/app/admin/components/design/AdmViewMakeTable';
import AdmWrapper from '@/app/admin/components/design/AdmWrapper';
import updateDisabled from '@/app/admin/lib/updateDisabled';
import updateIsHidden from '@/app/admin/lib/updateIsHidden';
import updateNotInPayload from '@/app/admin/lib/updateNotInPayload';
import updateValue from '@/app/admin/lib/updateValue';
import validationCheckToken from '@/app/admin/lib/validationCheckToken';
import { T_UPLOAD_DIRECTORY } from '@/app/admin/lib/viewDataFilesUpload';
import handleSubmit from '@/app/admin/lib/viewDataHandleSubmit';
import { useConfirmPopupStore } from '@/app/admin/store/confirmPopupStore';
import useLoadingScreenStore from '@/app/admin/store/loadingScreenStore';
import { useToast } from '@/app/admin/store/useToastStore';
import { AdmViewMakeTableObjectType } from '@/app/admin/type';
import { callAPI, HTTPMETHOD } from '@/lib/util/callApi';
import { getAccessToken } from '@/lib/util/tokenClass';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useEffect, useRef, useState } from 'react';
type PUSH_TYES = 'OFFICIAL' | 'SUB_OFFICIAL' | 'SYSTEM';
type T_BOARD_PUSH_POST = {
  title: string;
  content: string;
  link: string;
  type: PUSH_TYES;
};
const S3_IMAGE_PATH: T_UPLOAD_DIRECTORY = 'link/img';
const API_URL_GET = '/api/admin/push/detail/';
const API_URL_ALL = '/api/admin/push';
const API_URL_MESSENGER = '/api/admin/push/sub';
const BOARD_URL = '/admin/setting/push';

const AdminBoardLinkViewPage: React.FC = () => {

  const [pushType, setPushType] = useState<PUSH_TYES>('OFFICIAL'); // 푸시 타입 상태 추가
  const prevLinkValueRef = useRef<string>(''); // 이전 link 값 저장용
  const router = useRouter();
  const searchParams = useSearchParams();
  const viewId = searchParams.get('id');
  const [viewTableObject, setViewTableObject] = useState<
    AdmViewMakeTableObjectType[]
  >([

    {
      inputKey: 'type',
      label: '발송그룹 *',
      value: 'OFFICIAL',
      isFirst: true,
      isLast: false,
      inputType: 'radio',
      desc: '숫자가 높을수록 상위, 숫자가 낮을수록 하위입니다.',
      selectOptions: viewId == null ? [
        { value: 'OFFICIAL', label: '전체회원' },
        { value: 'SUB_OFFICIAL', label: '구독회원' },
      ] : [
        { value: 'OFFICIAL', label: '전체회원' },
        { value: 'SUB_OFFICIAL', label: '구독회원' },
        { value: 'SYSTEM', label: '전체회원(시스템)' },
      ],
      notInPayload: true, // 이 필드는 API에 포함되지 않음
    },
    {
      placeholder: '푸시알림 발송 이메일을 작성해주세요.',
      inputKey: 'userId',
      label: '발송내용 *',
      value: '',
      isFirst: false,
      isLast: false,
      inputType: 'textarea',
      desc: '여러 명에게 전송 시 엔터로 구분',
      isHidden: false,
      notInPayload: true, // 이 필드는 API에 포함되지 않음
    },
    {
      placeholder: '제목을 입력해주세요. (최대 100자)',
      inputKey: 'title',
      label: '제목 *',
      value: '',
      isFirst: false,
      isLast: false,
      inputType: 'text',
      required: true,
      requireOptions: {
        maxLength: 100,
        minLength: 1,
      }
    },
    {
      placeholder: '내용을 입력해주세요. (최대 150자)',
      inputKey: 'content',
      label: '내용 *',
      value: '',
      isFirst: false,
      isLast: false,
      inputType: 'textarea',
      required: true,
      requireOptions: {
        maxLength: 150,
        minLength: 1,
      }
    },

    {
      desc: '푸시알림 시간을 설정하지 않으면 즉시 알림갑니다.',
      inputKey: 'sendAt',
      label: '푸시 예약 발송 *',
      // value: dayjs().format('YYYY-MM-DD HH:mm:ss'), // 현재 시간으로 초기화
      value: null,
      isFirst: false,
      isLast: false,
      inputType: 'date',
    },

    {
      placeholder: '링크를 입력해주세요.',
      inputKey: 'link',
      label: '링크연결',
      value: '',
      isFirst: false,
      isLast: true,
      inputType: 'select&text',
      desc: "푸시알림 : 앱 실행\n미디어 : 목록일 경우 공란, 상세일 경우 detail/1 \n 공지사항 : 목록일 경우 공란, 상세일 경우 detail/1 \n VOD 다시보기 : 목록일 경우 공란, 상세일 경우 detail/1 \n 스케줄 : 목록으로 이동",
      selectOptions: [
        // { label: '구독', value: 'jisoo://subscribe/' },
        { label: '푸시알림', value: 'jisoo://push/' },
        { label: '미디어', value: 'jisoo://media/' },
        { label: '공지사항', value: 'jisoo://notice/' },
        { label: '스케줄', value: 'jisoo://schedule/' },
        { label: 'VOD 다시보기', value: 'jisoo://vod/' },
        // { label: '외부링크연결', value: 'https://' },

      ],
    },
  ]);

  useEffect(() => {

    // 푸시 타입이 'all' 또는 'messenger'일 때 userId 숨김
    // userId 필드를 숨기고 payload에 포함하지 않음
    updateIsHidden('userId', true, setViewTableObject);
    updateNotInPayload('userId', true, setViewTableObject);
  }, [pushType]);

  useEffect(() => {
    viewTableObject.forEach((item) => {
      if (item.inputKey === 'type') {
        setPushType(item.value as PUSH_TYES); // 푸시 타입 상태 업데이트
      }
    });


    //pushType에 따라 link 필드의 값을 업데이트
    // jisoo://push/ 와 jisoo://schedule/ 링크가 선택되었을 때는 input 필드를 비활성화하고,
    // 해당 링크로 초기화합니다.
    const target = viewTableObject.find((item) => item.inputKey === 'link')?.value || '';

    // 이전 값과 현재 값이 같으면 로직 실행하지 않음 (무한 루프 방지)
    if (prevLinkValueRef.current === target.toString()) {
      return;
    }

    if (target.toString().startsWith('jisoo://push/') || target.toString().startsWith('jisoo://schedule/')) {
      // html tag 에서 id가 'link-text'인 요소를 찾아서 해당 요소의 value를 'jisoo://push/'로 설정
      document.getElementById('link-text')?.setAttribute('disabled', 'true');
      const linkTextInput = document.getElementById('link-text') as HTMLInputElement
      if (linkTextInput) {
        linkTextInput.value = '';
      }
      document.getElementById('link-text')?.setAttribute('placeholder', '');

      const clearTarget = target.toString().startsWith('jisoo://push/') ? 'jisoo://push/' : 'jisoo://schedule/';

      // clearTarget이 현재 target과 다를 때만 업데이트
      if (target !== clearTarget) {
        prevLinkValueRef.current = clearTarget; // 미리 저장하여 무한 루프 방지
        updateValue('link', clearTarget, setViewTableObject);
      }

    } else {
      document.getElementById('link-text')?.removeAttribute('disabled');
      document.getElementById('link-text')?.setAttribute('placeholder', '링크를 입력해주세요.');
    }
    prevLinkValueRef.current = target.toString(); // 현재 값을 저장

  }, [viewTableObject])

  useEffect(() => {
    if (viewId) {
      callView();
    }
  }, [viewId]);
  const callView = async () => {
    const token = getAccessToken();
    if (!validationCheckToken(token)) {
      alert('로그인 해주세요.');
      return;
    }

    try {
      const url = `${API_URL_GET}${viewId}`;
      const result: {
        code: number;
        data: T_BOARD_PUSH_POST;
        message: string;
      } = await callAPI(HTTPMETHOD.GET, {}, url, token)
      updateValue('title', result.data.title, setViewTableObject);
      updateValue('content', result.data.content, setViewTableObject);
      updateValue('link', result.data.link, setViewTableObject);
      if (result.data.type === 'OFFICIAL' || result.data.type === 'SUB_OFFICIAL') {
        updateValue('type', result.data.type, setViewTableObject);
      } else {
        updateValue('type', 'SYSTEM', setViewTableObject);
      }


      updateDisabled('type', true, setViewTableObject);
      updateDisabled('title', true, setViewTableObject);
      updateDisabled('content', true, setViewTableObject);
      updateDisabled('link', true, setViewTableObject);


    } catch (e: any) {
      console.error("Error fetching notice details:", e);
      alert('정보를 불러오는 데 실패했습니다.');
    }
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showLoading, hideLoading } = useLoadingScreenStore();
  const { addToast } = useToast();


  const save = async (event?: FormEvent) => {
    const reserveDate = viewTableObject.find(item => item.inputKey === 'sendAt')?.value;
    if (reserveDate) {
      const reserveDateObj = new Date(reserveDate as string);
      if (reserveDateObj < new Date()) {
        alert('현재 시간보다 이전의 시간에는 예약발송을 할 수 없습니다');
        return;
      }
    }

    if (event) event.preventDefault();
    if (isLoading) return; // 중복 제출 방지

    setIsLoading(true);
    showLoading();

    const initialPayloadTableObject: AdmViewMakeTableObjectType[] = JSON.parse(JSON.stringify(viewTableObject));

    try {
      // 'all' 타입의 경우, initialPayloadTableObject를 그대로 사용합니다.
      // useEffect에 의해 'all' 타입일 때 userId 필드는 notInPayload: true로 설정되어 있으므로,
      // handleSubmit 함수가 이 플래그를 존중한다면 userId는 API 요청에서 제외될 것입니다.
      const apiUrl = pushType === 'OFFICIAL' ? API_URL_ALL : API_URL_MESSENGER;
      await handleSubmit('save', router, viewId, initialPayloadTableObject, S3_IMAGE_PATH, apiUrl, BOARD_URL)
        .then(() => {
          addToast()
        }).
        catch((error) => {
          alert(`푸쉬 중 오류가 발생했습니다: ${error instanceof Error ? error.message : String(error)}`);
        })
        .finally(() => {
          setIsLoading(false);
          hideLoading();
        })
    } catch (error) {
      console.error("Error during save operation:", error);
      alert(`푸시 발송 중 오류가 발생했습니다: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
      hideLoading();
    }

  }

  const { showPopup } = useConfirmPopupStore(); // 스토어에서 showPopup 액션 가져오기
  const handleCancelClick = () => {
    showPopup({
      onConfirm: () => {
        router.back(); // 뒤로가기 동작
      }
    });
  };
  return (
    <AdmWrapper>
      <AdmPageTop title={`푸시알림 ${viewId == null ? '등록하기' : '상세보기'}`} depth1={'푸시알림 관리'} depth2={`푸시알림 ${viewId == null ? '등록하기' : '상세보기'}`} />
      <AdmViewBox>
        <>
          <AdmPageExplnation titleRed={'푸시 예약 발송일에 맞추어 푸시알림이 자동으로 발송됩니다.'} />
          <AdmViewMakeTable
            values={viewTableObject}
            setValues={setViewTableObject}
          />
          <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end', alignItems: 'center', gap: '8px' }}>
            {
              !viewId ?
                <>
                  <AdmButton
                    size={'large'}
                    color={'primaryBorder'}
                    onClick={handleCancelClick}
                    style={{ maxWidth: '120px', marginTop: '20px' }}
                  >
                    취소
                  </AdmButton>
                  <AdmButton
                    size={'large'}
                    onClick={() => save()}
                    style={{ maxWidth: '120px', marginTop: '20px' }}
                  >
                    등록
                  </AdmButton>
                </>
                :
                <AdmButton
                  size={'large'}
                  color={'primaryBorder'}
                  onClick={() => router.back()}
                  style={{ maxWidth: '120px', marginTop: '20px' }}
                >
                  목록으로
                </AdmButton>
            }
          </div>
        </>
      </AdmViewBox>
    </AdmWrapper>
  );
}

export default AdminBoardLinkViewPage;