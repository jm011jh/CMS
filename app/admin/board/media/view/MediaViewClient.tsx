'use client';

import AdmPageExplnation from '@/app/admin/components/design/AdmPageExplnation';
import AdmPageTop from '@/app/admin/components/design/AdmPageTop';
import AdmViewBox from '@/app/admin/components/design/AdmViewBox';
import AdmViewMakeTable from '@/app/admin/components/design/AdmViewMakeTable';
import AdmViewNavBar from '@/app/admin/components/design/AdmViewNavBar';
import AdmWrapper from '@/app/admin/components/design/AdmWrapper';
import apiDeleteBoardItem from '@/app/admin/lib/apiDeleteBoardItem';
import updateValue from '@/app/admin/lib/updateValue';
import { T_UPLOAD_DIRECTORY } from '@/app/admin/lib/viewDataFilesUpload';
import handleSubmit from '@/app/admin/lib/viewDataHandleSubmit';
import { useConfirmPopupStore } from '@/app/admin/store/confirmPopupStore';
import useLoadingScreenStore from '@/app/admin/store/loadingScreenStore';
import { useToast } from '@/app/admin/store/useToastStore';
import { AdmViewMakeTableObjectType } from '@/app/admin/type';
import { callAPI, HTTPMETHOD } from '@/lib/util/callApi';
import { getAccessToken } from '@/lib/util/tokenClass';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

const S3_IMAGE_PATH: T_UPLOAD_DIRECTORY = 'media/img';
const API_URL = '/api/admin/media';
const API_URL_DELETE = '/api/admin/media/';
const API_URL_GET = '/api/admin/media/detail/';
const BOARD_URL = '/admin/board/media';

const MediaViewClient = ({ viewId }: { viewId?: string | null }) => {
  const router = useRouter();
  const { addToast } = useToast();
  const { showLoading, hideLoading } = useLoadingScreenStore();
  const { showPopup } = useConfirmPopupStore();
  const queryClient = useQueryClient();

  const [viewTableObject, setViewTableObject] = useState<AdmViewMakeTableObjectType[]>([
    { placeholder: '미디어 유형을 입력하세요.', inputKey: 'category', label: '카테고리 *', value: 'G', isFirst: false, isLast: false, inputType: 'text', isHidden: true, required: true },
    { placeholder: '제목을 입력해주세요. / 제목 글자수 100자 내외', inputKey: 'title', label: '제목 *', value: '', isFirst: true, isLast: false, inputType: 'text', required: true, requireOptions: { maxLength: 100 } },
    { placeholder: '3000자 내외 내용을 입력해주세요.', inputKey: 'content', label: '내용 *', value: '', isFirst: false, isLast: false, inputType: 'textarea', required: true, requireOptions: { maxLength: 3000 } },
    { placeholder: '\'/\'로 구분하여 태그를 입력해주세요.', inputKey: 'tag', label: '태그', value: '', isFirst: false, isLast: false, inputType: 'text', desc: '\'/\'으로 구분하여 태그를 입력해주세요.태그는 최대 3개, 30자 미만으로 입력해주세요', requireOptions: { maxLength: 32 } },
    { placeholder: '10mb이하의 00 X 00px jpg, png 형식의 파일만 등록됩니다.', inputKey: 'thumbnail', label: '썸네일 *', value: '', isFirst: false, isLast: false, inputType: 'images', required: true, maxLength: 1, },
    { placeholder: '10mb이하의 00 X 00px jpg, png 형식의 파일만 등록됩니다.', inputKey: 'files', label: '이미지', value: [] as any, isFirst: false, isLast: false, inputType: 'images', },
    { placeholder: '유튜브 영상 아이디를 입력해주세요.', inputKey: 'video', label: '동영상', value: '', isFirst: false, isLast: false, inputType: 'text', containConstructedValue: 'https://www.youtube.com/watch?v=', },
    { placeholder: '공개 예정일를 입력하세요.', inputKey: 'openDate', label: '공개 예정일', value: null, isFirst: false, isLast: true, inputType: 'date', desc: '공개 예정일을 설정하지 않으면 즉시 등록됩니다.', },
  ]);

  const { data: initialData, isLoading: isViewLoading } = useQuery({
    queryKey: ['mediaDetail', viewId],
    queryFn: async () => {
      const token = getAccessToken();
      if (!token) throw new Error('No token found');
      const result = await callAPI(HTTPMETHOD.GET, {}, `${API_URL_GET}${viewId}`, token) as any;
      return result.data;
    },
    enabled: !!viewId, // viewId가 있을 때만 쿼리를 실행합니다.
  });

  useEffect(() => {
    if (initialData) {
      updateValue('category', initialData.category || '', setViewTableObject);
      updateValue('title', initialData.title || '', setViewTableObject);
      updateValue('content', initialData.content || '', setViewTableObject);
      updateValue('tag', initialData.tag || '', setViewTableObject);
      updateValue('video', initialData.video || '', setViewTableObject);
      updateValue('openDate', initialData.openDate || '', setViewTableObject);
      updateValue('files', initialData.files?.filter((item: any) => item.fileType == 'IMG') || [], setViewTableObject);
      updateValue('thumbnail', initialData.files?.filter((item: any) => item.fileType == 'THUMB') || [], setViewTableObject);
    }
  }, [initialData]);

  const mutation = useMutation({
    mutationFn: (event?: FormEvent) => {
      if (event) event.preventDefault();
      const mode = viewId ? 'edit' : 'save';
      return handleSubmit(mode, router, viewId || null, viewTableObject, S3_IMAGE_PATH, API_URL, BOARD_URL) as Promise<void>;
    },
    onSuccess: () => {
      addToast();
      queryClient.invalidateQueries({ queryKey: ['mediaList'] });
    },
    onError: (error) => {
      alert(`게시글 처리 중 오류가 발생했습니다: ${error.message}`);
    },
    onSettled: () => {
      hideLoading();
    }
  });

  const handleFormSubmit = (event?: FormEvent) => {
    if (mutation.isPending) return;

    const tagValue = viewTableObject.find(item => item.inputKey === 'tag')?.value?.toString();
    if (tagValue) {
      const tags = tagValue.split('/');
      if (tags.length > 3) {
        alert('태그는 최대 3개까지 입력 가능합니다.');
        return;
      }
      if (tags.join('').length > 30) {
        alert('태그는 30자 이내로 입력해주세요.');
        return;
      }
    }

    showLoading();
    mutation.mutate(event);
  };

  const deleteMutation = useMutation({
    mutationFn: () => apiDeleteBoardItem(viewId!, API_URL_DELETE),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mediaList'] });
      alert('삭제되었습니다.');
      router.back();
    },
    onError: () => {
      alert('삭제 중 오류가 발생했습니다.');
    },
    onSettled: () => {
      hideLoading();
    }
  });

  const deleteItem = () => {
    if (viewId) {
      showPopup({
        title: <p>삭제 전 확인해주세요</p>,
        desc: <p>삭제된 정보는 사용자에게 노출되지 않으며<br />복구가 불가능합니다.<br />정말 삭제하시겠습니까?</p>,
        onConfirm: () => {
          showLoading();
          deleteMutation.mutate();
        },
      });
    }
  };

  if (isViewLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <AdmWrapper>
      <AdmPageTop title={`미디어 ${viewId == null ? '등록' : '수정'}하기`} depth1={'미디어 관리'} depth2={`미디어 ${viewId == null ? '등록' : '수정'}하기`} />
      <AdmViewBox>
        <form onSubmit={handleFormSubmit}>
          <AdmPageExplnation titleRed={'공개 예정일에 맞추어 푸시알림이 자동으로 발송됩니다.'} />
          <AdmViewMakeTable
            values={viewTableObject}
            setValues={setViewTableObject}
          />
          <AdmViewNavBar
            mode={viewId != null ? 'edit' : 'save'}
            save={handleFormSubmit}
            edit={handleFormSubmit}
            onDelete={viewId ? deleteItem : undefined}
            onCancelConfirm={() => router.push(BOARD_URL)}
          />
        </form>
      </AdmViewBox>
    </AdmWrapper>
  );
}

export default MediaViewClient;