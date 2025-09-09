'use client';

import AdmListTableTop, { AdmListTableTopTitle } from '@/app/admin/components/design/AdmListTableTop';
import AdmPageTop from '@/app/admin/components/design/AdmPageTop';
import AdmViewBox from '@/app/admin/components/design/AdmViewBox';
import AdmViewMakeTable from '@/app/admin/components/design/AdmViewMakeTable';
import AdmViewNavBar from '@/app/admin/components/design/AdmViewNavBar';
import AdmWrapper from '@/app/admin/components/design/AdmWrapper';
import apiDeleteBoardItem from '@/app/admin/lib/apiDeleteBoardItem';
import updateValue from '@/app/admin/lib/updateValue';
import validationCheckToken from '@/app/admin/lib/validationCheckToken';
import { isVideoFile, millisecondsToHHmmss } from '@/app/admin/lib/VideoFileFunction';
import { T_UPLOAD_DIRECTORY } from '@/app/admin/lib/viewDataFilesUpload';
import handleSubmit from '@/app/admin/lib/viewDataHandleSubmit';
import { useConfirmPopupStore } from '@/app/admin/store/confirmPopupStore';
import useLoadingScreenStore from '@/app/admin/store/loadingScreenStore';
import { useReplayInfoStore } from '@/app/admin/store/replayInfoStore';
import { useToast } from '@/app/admin/store/useToastStore';
import { AdmViewMakeTableObjectType } from '@/app/admin/type';
import { convertToISO8601 } from '@/lib/util/commonUtil';
import { getAccessToken } from '@/lib/util/tokenClass';
import dayjs from 'dayjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useEffect, useRef, useState } from 'react';

// type T_BOARD_NOTICE_POST = {
//   category: string;
//   openDate: string;
//   title: string;
//   content: string;
//   video: string;
//   files: I_PROCESSED_FILE[];
// };

const S3_IMAGE_PATH: T_UPLOAD_DIRECTORY = 'vod/img';

const API_URL = '/api/admin/live-archive';
const BOARD_URL = '/admin/board/replay';
const API_URL_VIEW = '/api/admin/live';

const AdminBoardReplayViewPage: React.FC = () => {

  const replayInfo = useReplayInfoStore();

  const router = useRouter();
  const searchParams = useSearchParams();
  const viewId = searchParams.get('id');
  const [viewTableObject, setViewTableObject] = useState<
    AdmViewMakeTableObjectType[]
  >([
    {
      inputKey: 'replayUrl',
      label: '',
      value: replayInfo.newReplayUrl || '',
      isFirst: false,
      isLast: false,
      inputType: 'text',
      isHidden: true,
    },
    {
      placeholder: '유형을 입력하세요.',
      inputKey: 'category',
      label: '카테고리 *',
      value: 'ALL',
      isFirst: true,
      isLast: false,
      inputType: 'select',
      selectOptions: [
        { label: '전체', value: 'ALL' },
        { label: '일반', value: 'GENERAL' },
        { label: '기타', value: 'ETC' },
      ],
      isHidden: true
    },
    {
      placeholder: '유형을 입력하세요.',
      inputKey: 'viewerType',
      label: '공개 그룹 *',
      value: 'ALL_USERS',
      isFirst: false,
      isLast: false,
      inputType: 'radio',
      selectOptions: [
        { label: '전체회원', value: 'ALL_USERS' },
        { label: '구독회원', value: 'SUBSCRIBERS' },
      ],
      required: true,
    },
    {
      placeholder: '제목을 입력해주세요. / 제목 글자수 100자 내외',
      inputKey: 'title',
      label: '제목 *',
      value: '',
      isFirst: false,
      isLast: false,
      inputType: 'text',
      required: true,
      requireOptions: {
        maxLength: 100
      }
    },
    {
      placeholder: '500자 내외 내용을 입력해주세요.',
      inputKey: 'description',
      label: '내용',
      value: '',
      isFirst: false,
      isLast: false,
      inputType: 'textarea',
      required: false,
      requireOptions: {
        maxLength: 500
      }
    },
    {
      placeholder: '비디오 재생 시간 - 예) 01:04:30',
      inputKey: 'playtimeDisplay',
      label: '비디오 총 재생시간',
      value: null,
      isFirst: false,
      isLast: false,
      inputType: 'text',
      disabled: isVideoFile(replayInfo.replayUrl + ""),
    },
    {
      placeholder: '비디오 재생 시간',
      inputKey: 'playtime',
      label: '비디오 총 재생시간',
      value: 0,
      isFirst: false,
      isLast: false,
      inputType: 'text',
      disabled: true,
      isHidden: true,
    },
    {
      placeholder:
        '10mb이하의 jpg, png 형식의 파일만 등록됩니다.  (대표이미지 16:9 비율 권장)',
      inputKey: 'thumbnailImage',
      label: '썸네일 이미지 *',
      value: '', // API response for files might need casting or specific typing
      isFirst: false,
      isLast: false,
      inputType: 'images',
      required: true,
      maxLength: 1,
    },
    {
      placeholder: '공개 예정일를 입력하세요.',
      inputKey: 'replayPublishDate',
      label: '공개 예정일',
      value: null,
      // defaultValue: convertToISO8601(dayjs().toString()),
      isFirst: false,
      isLast: true,
      inputType: 'date',
      desc: '공개 예정일을 설정하지 않으면 즉시 등록됩니다.',
    },
  ]);
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

      setVideoIsLoaded(true);
      updateValue('viewerType', replayInfo.viewerType || '', setViewTableObject);
      updateValue('category', replayInfo.category || '', setViewTableObject);
      updateValue('title', replayInfo.title || '', setViewTableObject);
      updateValue('description', replayInfo.description || '', setViewTableObject);
      updateValue('thumbnailImage', replayInfo.thumbnailImage ? [replayInfo.thumbnailImage] : [''], setViewTableObject);
      updateValue('replayPublishDate', replayInfo.replayPublishDate || null, setViewTableObject);

    } catch (e: any) {
      console.error("Error fetching notice details:", e);
      alert('정보를 불러오는 데 실패했습니다.');
    }
  };

  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showLoading, hideLoading } = useLoadingScreenStore();
  const save = async (event?: FormEvent) => {
    if (!videoIsLoaded) {
      alert('아직 비디오 파일을 변환중입니다.');
      return;
    }
    if (event) event.preventDefault();
    if (isLoading) return; // 중복 제출 방지
    setIsLoading(true);
    showLoading();

    let data = viewTableObject;

    if (replayInfo.newReplayUrl) {
      // 비디오 정보 업데이트
      // replayUrl을 직접 업데이트하고 새로운 값으로 viewTableObject를 생성
      data = viewTableObject.map(item =>
        item.inputKey === 'replayUrl'
          ? { ...item, value: replayInfo.newReplayUrl }
          : item
      );
      setViewTableObject(data);

    }

    // replayPublishDate가 없는경우, 지금 시간으로 설정
    const dateValue = data.find(item => item.inputKey === 'replayPublishDate')?.value;
    if (!dateValue) {
      const isoDate = convertToISO8601(dayjs().toString())
      data = viewTableObject.map(item =>
        item.inputKey === 'replayPublishDate'
          ? { ...item, value: isoDate }
          : item
      );
      setViewTableObject(data);
    }

    await handleSubmit('save', router, viewId, data, S3_IMAGE_PATH, API_URL, BOARD_URL)
      .then(() => {
        addToast()
      })
      .catch((error) => {
        alert(`게시글 등록 중 오류가 발생했습니다: ${error instanceof Error ? error.message : String(error)}`);
      }).finally(() => {
        setIsLoading(false);
        hideLoading();
      })
  };
  const edit = async (event?: FormEvent) => {
    if (event) event.preventDefault();
    if (isLoading) return; // 중복 제출 방지
    setIsLoading(true);
    showLoading();

    let data = viewTableObject;

    // replayPublishDate가 없는경우, 지금 시간으로 설정
    const dateValue = data.find(item => item.inputKey === 'replayPublishDate')?.value;
    if (!dateValue) {
      const isoDate = convertToISO8601(dayjs().toString())
      data = viewTableObject.map(item =>
        item.inputKey === 'replayPublishDate'
          ? { ...item, value: isoDate }
          : item
      );
      setViewTableObject(data);
    }

    await handleSubmit('edit', router, viewId, data, S3_IMAGE_PATH, `${API_URL}/${viewId}`, BOARD_URL)
      .then(() => {
        addToast()
      })
      .catch((error) => {
        alert(`게시글 등록 중 오류가 발생했습니다: ${error instanceof Error ? error.message : String(error)}`);
      }).finally(() => {
        setIsLoading(false);
        hideLoading();
      })
  };

  const API_URL_DELETE = '/api/admin/notice/'; // Define the API URL for deletion
  const { showPopup } = useConfirmPopupStore()
  const deleteItem = () => {
    if (viewId) {
      showPopup({
        title: <p>삭제 전 확인해주세요</p>,
        desc: <p>삭제된 정보는 사용자에게 노출되지 않으며<br />복구가 불가능합니다.<br />정말 삭제하시겠습니까?</p>,
        onConfirm: () => {
          showLoading();
          apiDeleteBoardItem(viewId, API_URL_DELETE).finally(() => {
            hideLoading();
            alert('삭제되었습니다.')
            router.back();
          });
          // 팝업에서 "확인"을 눌렀을 때의 동작
        },
        onCancel: () => {
          // 팝업에서 "취소"를 눌렀을 때 (팝업이 닫히는 것 외 추가 동작 필요시)
        }
      });
    }
  };
  // #region video loading ================================

  const refVideo = useRef<HTMLVideoElement>(null);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [videoIsLoaded, setVideoIsLoaded] = useState<boolean>(false);
  const handleVideoError = () => {
    setVideoIsLoaded(false);
    console.log('비디오 소스가 유효하지 않습니다. 5초 후에 다시 시도합니다...');
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
    }
    retryTimeoutRef.current = setTimeout(() => {
      if (refVideo.current) {
        refVideo.current.load();
      }
    }, 5000);
  };

  useEffect(() => {
    handleVideoError()
    if (replayInfo.replayUrl && refVideo.current) {
      refVideo.current.onloadedmetadata = () => {
        // 비디오 메타데이터가 로드된 후에 실행할 코드
        // alert(`비디오 길이: ${refVideo.current?.duration}초`);
        if (refVideo.current?.duration && refVideo.current?.duration > 0) {
          const floorDuration = Math.floor(refVideo.current.duration * 1000);
          updateValue('playtimeDisplay', millisecondsToHHmmss(floorDuration), setViewTableObject);
          updateValue('playtime', floorDuration, setViewTableObject);
        } else {
          alert('비디오의 재생 시간이 0초입니다. 비디오 파일을 확인해주세요.');
        }
      }
    } else {
      updateValue('playtimeDisplay', millisecondsToHHmmss(replayInfo.playtime ?? 0), setViewTableObject);
      updateValue('playtime', replayInfo.playtime ?? 0, setViewTableObject);
    }

    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, [replayInfo.replayUrl]);




  // #endregion video loading ================================

  return (
    <AdmWrapper>
      <AdmPageTop title={`다시보기 VOD ${viewId == null ? '등록' : '수정'}`} depth1={'다시보기 VOD 관리'} depth2={`다시보기 VOD ${viewId == null ? '등록' : '수정'}하기`} />
      <AdmViewBox>
        <>
          {
            replayInfo.replayUrl !== '' &&
            <div style={{ width: '100%', border: 'solid 1px black', borderRadius: '12px', overflow: 'hidden', maxHeight: '600px', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

              {
                viewId == null
                  ?
                  isVideoFile(replayInfo.newReplayUrl + "") ?
                    <>
                      <video
                        ref={refVideo}
                        src={replayInfo.newReplayUrl}
                        data-testid={'noIde'}
                        controls
                        onCanPlay={() => {
                          setVideoIsLoaded(true);
                          if (retryTimeoutRef.current) {
                            clearTimeout(retryTimeoutRef.current);
                          }
                        }}
                        onError={handleVideoError}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          maxHeight: '600px',
                          background: 'black'
                        }}
                      />
                      {!videoIsLoaded && <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)' }}>
                        <div style={{
                          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          maxHeight: '600px',
                          background: 'black',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}>
                          <div style={{ width: '50px', height: '50px', border: '5px solid #fff', borderTop: '5px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                        </div>
                      </div>}
                    </>
                    :
                    <iframe
                      src={replayInfo.replayUrl}
                      title="Replay Video"
                      style={{
                        width: '100%',
                        height: '600px',
                        border: 'none',
                        background: 'black'
                      }}
                    />
                  :
                  isVideoFile(replayInfo.replayUrl + "") ?
                    <>
                      <video
                        ref={refVideo}
                        src={replayInfo.replayUrl}
                        data-testid={'id_video'}
                        controls
                        onCanPlay={() => {
                          setVideoIsLoaded(true);
                          if (retryTimeoutRef.current) {
                            clearTimeout(retryTimeoutRef.current);
                          }
                        }}
                        onError={handleVideoError}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          maxHeight: '600px',
                          background: 'black'
                        }}
                      />
                      {!videoIsLoaded && <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)' }}>
                        <div style={{
                          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          maxHeight: '600px',
                          background: 'black',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}>
                          <div style={{ width: '50px', height: '50px', border: '5px solid #fff', borderTop: '5px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                        </div>
                      </div>}
                    </>
                    :
                    <iframe
                      src={replayInfo.replayUrl}
                      title="Replay Video"
                      style={{
                        width: '100%',
                        height: '600px',
                        border: 'none',
                        background: 'black'
                      }}
                    />
              }
            </div>
          }

          <AdmListTableTop
            LeftComponents={
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <AdmListTableTopTitle title={'세부정보'} />
              </div>
            }
          />

          <AdmViewMakeTable
            values={viewTableObject}
            setValues={setViewTableObject}
          />
          <AdmViewNavBar
            mode={viewId !== null ? 'edit' : 'save'}
            save={save}
            edit={edit}
            onDelete={viewId ? deleteItem : undefined}
            onCancelConfirm={() => router.push(BOARD_URL)}
          />
        </>
      </AdmViewBox>
    </AdmWrapper>
  );
}

export default AdminBoardReplayViewPage;