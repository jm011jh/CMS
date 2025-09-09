'use client';

import AdminBox from '@/app/admin/components/card/AdminBox';
import AdminPgTop from '@/app/admin/components/card/AdminPgTop';
import { InputFile, InputText } from '@/app/components/form/Input';
import { callAPI, HTTPMETHOD } from '@/lib/util/callApi';
import { getAccessToken } from '@/lib/util/tokenClass';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

interface Isns {
  new_img_file?: File | null;
  org_file_path?: string;
  org_file_name?: string;
  title?: string;
  title_en?: string;
  title_cn?: string;
  title_cn_tw?: string;
  link?: string;
}

export default function AdminBoardNewsViewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const viewId = searchParams.get('id');
  const [view, setView] = useState<Isns>({
    new_img_file: null,
    org_file_path: '',
    org_file_name: '',
    title: '',
    title_en: '',
    title_cn: '',
    title_cn_tw: '',
    link: '',
  });

  useEffect(() => {
    if (viewId) callView();
  }, [viewId]);

  const valueCheck = () => {
    if (view.title && view.title.length < 1) {
      alert('제목(KR)을 입력해주세요.');
      return false;
    }
    if (view.title_en && view.title_en.length < 1) {
      alert('제목(EN)을 입력해주세요.');
      return false;
    }
    if (view.title_cn && view.title_cn.length < 1) {
      alert('제목(CN)을 입력해주세요.');
      return false;
    }
    if (view.title_cn_tw && view.title_cn_tw.length < 1) {
      alert('제목(CN_TW)을 입력해주세요.');
      return false;
    }
    return true;
  };

  const callView = async () => {
    const token = getAccessToken();
    if (token === '') {
      alert('로그인 해주세요.');
      return;
    }

    try {
      const url = `/api/admin/mgmt/sns?take=999`;
      const result: { code: number; data: any; message: string } =
        await callAPI(HTTPMETHOD.GET, {}, url, token);
      const mgmtList = result.data.mgmt;
      const snsItem = mgmtList.filter(
        (item: any) => item.index.toString() === viewId?.toString(),
      )[0];
      if (snsItem == null || snsItem == undefined) {
        alert('존재하지 않는 SNS 정보입니다.');
        router.back();
        return;
      }
      const snsItemCopy = {
        new_img_file: null,
        org_file_path: snsItem.files[0] ? snsItem.files[0].file_path : '',
        org_file_name: snsItem.files[0] ? snsItem.files[0].file_name : '',
        title: snsItem.title,
        title_en: snsItem.title_en,
        title_cn: snsItem.title_cn,
        title_cn_tw: snsItem.title_cn_tw,
        link: snsItem.link,
      };
      setView(snsItemCopy);
    } catch (e: any) {
      console.log(e);
    }
  };

  const save = async (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    if (!valueCheck()) return;
    // 기본 정보
    formData.append('title', view.title?.substring(0, 9999) ?? '');
    formData.append('title_en', view.title_en?.substring(0, 9999) ?? '');
    formData.append('title_cn', view.title_cn?.substring(0, 9999) ?? '');
    formData.append('title_cn_tw', view.title_cn_tw?.substring(0, 9999) ?? '');
    formData.append('link', view.link?.substring(0, 9999) ?? '');
    view.new_img_file && formData.append('main_sns_img', view.new_img_file);
    formData.append('type', 'sns');

    const token = getAccessToken();
    if (token === '') {
      alert('로그인 해주세요.');
      return;
    }

    try {
      const result = await callAPI(
        HTTPMETHOD.POST,
        formData,
        '/api/admin/mgmt/sns',
        token,
      );
      alert('등록 되었습니다.');

      router.push('/admin/pages/main/snslist');
      // router.back();
    } catch (e: any) {
      alert(
        '처리 중 문제가 발생하였습니다.\n반복될 경우, 관리자에게 문의하여 주세요.',
      );
    }
  };

  const edit = async (event: FormEvent) => {
    event.preventDefault();
    if (!valueCheck()) return;

    const formData = new FormData();
    formData.append('index', viewId?.toString() ?? '');
    formData.append('title', view.title?.substring(0, 9999) ?? '');
    formData.append('title_en', view.title_en?.substring(0, 9999) ?? '');
    formData.append('title_cn', view.title_cn?.substring(0, 9999) ?? '');
    formData.append('title_cn_tw', view.title_cn_tw?.substring(0, 9999) ?? '');
    formData.append('link', view.link?.substring(0, 9999) ?? '');
    view.new_img_file && formData.append('main_sns_img', view.new_img_file);

    const token = getAccessToken();
    if (token === '') {
      alert('로그인 해주세요.');
      return;
    }

    try {
      const result = await callAPI(
        HTTPMETHOD.PATCH,
        formData,
        '/api/admin/mgmt/sns',
        token,
      );
      alert('수정 되었습니다.');

      router.push('/admin/pages/main/snslist');
    } catch (e: any) {
      alert(
        '처리 중 문제가 발생하였습니다.\n반복될 경우, 관리자에게 문의하여 주세요.',
      );
      console.log(e);
    }
  };

  const handleViewValue = (e: any) => {
    setView((prev: any) => {
      if (!prev)
        return {
          title: '',
          title_en: '',
          title_cn: '',
          title_cn_tw: '',
          link: '',
        };
      return { ...prev, [e.target.name]: e.target.value ?? '' }; // null이나 undefined일 경우 빈 문자열 사용
    });
  };
  const handleViewImage = (e: any) => {
    console.log(e.target);
    if (e.target && e.target.files[0]) {
      setView((prev: any) => {
        return { ...prev, new_img_file: e.target.files[0] };
      });
    } else {
      setView((prev: any) => {
        return { ...prev, new_img_file: null };
      });
    }
  };

  return (
    <>
      <div className="adm--wrap">
        <AdminPgTop tit={`SNS 관리`} />
        <AdminBox>
          <>
            <div className="adm--box-fixed">
              <div className="adm--box-tit">{`SNS 관리 ${viewId == null ? '등록' : '수정'}`}</div>
              <div className="adm--box-fixed-r">
                <div
                  onClick={e => router.back()}
                  className="btn disabled small radius">
                  목록
                </div>
                {viewId !== null ? (
                  <div onClick={edit} className="btn primary small radius">
                    수정완료
                  </div>
                ) : (
                  <div onClick={save} className="btn primary small radius">
                    등록완료
                  </div>
                )}
              </div>
            </div>
            <div className="adm--box-tit">SNS 정보</div>
            <div className="input-table">
              <div className="input-table-row" data-grid="1">
                <div className="input-table-row-th">
                  <p>타이틀 (KR)</p>
                </div>
                <div className="input-table-row-td">
                  <InputText
                    size="xsmall"
                    id="title"
                    name="title"
                    value={view?.title ?? ''}
                    placeholder={'한글제목을 입력해주세요'}
                    onChange={e => handleViewValue(e)}></InputText>
                </div>
              </div>
              <div className="input-table-row" data-grid="1">
                <div className="input-table-row-th">
                  <p>타이틀 (EN)</p>
                </div>
                <div className="input-table-row-td">
                  <InputText
                    size="xsmall"
                    id="title_en"
                    name="title_en"
                    value={view?.title_en ?? ''}
                    placeholder={'영문제목을 입력해주세요'}
                    onChange={e => handleViewValue(e)}></InputText>
                </div>
              </div>
              <div className="input-table-row" data-grid="1">
                <div className="input-table-row-th">
                  <p>타이틀 (CN)</p>
                </div>
                <div className="input-table-row-td">
                  <InputText
                    size="xsmall"
                    id="title_cn"
                    name="title_cn"
                    value={view?.title_cn ?? ''}
                    placeholder={'중문제목을 입력해주세요'}
                    onChange={e => handleViewValue(e)}></InputText>
                </div>
              </div>
              <div className="input-table-row" data-grid="1">
                <div className="input-table-row-th">
                  <p>타이틀 (CN_TW)</p>
                </div>
                <div className="input-table-row-td">
                  <InputText
                    size="xsmall"
                    id="title_cn_tw"
                    name="title_cn_tw"
                    value={view?.title_cn_tw ?? ''}
                    placeholder={'중문제목을 입력해주세요'}
                    onChange={e => handleViewValue(e)}></InputText>
                </div>
              </div>

              <div className="input-table-row" data-grid="1">
                <div className="input-table-row-th">
                  <p>링크</p>
                </div>
                <div className="input-table-row-td">
                  <InputText
                    size="xsmall"
                    id="link"
                    name="link"
                    value={view?.link ?? ''}
                    placeholder={'링크를 입력해주세요'}
                    onChange={e => handleViewValue(e)}></InputText>
                </div>
              </div>
              <div className="input-table-row" data-grid="1">
                <div className="input-table-row-th">
                  <p>로고 이미지</p>
                </div>
                <div className="input-table-row-td">
                  <div className="input-table-row-td-img">
                    {view?.new_img_file ? (
                      <img
                        src={URL.createObjectURL(view?.new_img_file)}
                        alt="SNS 이미지"
                      />
                    ) : view?.org_file_path ? (
                      <img src={view?.org_file_path} alt="SNS 이미지" />
                    ) : (
                      <div>이미지를 선택해주세요</div>
                    )}
                  </div>
                  <InputFile
                    size="small"
                    id={`new_img_file`}
                    name={`new_img_file`}
                    orgFileName={view?.org_file_name}
                    placeholder="SNS 이미지를 선택하세요"
                    onChange={e => handleViewImage(e)}
                  />
                </div>
              </div>
            </div>
          </>
        </AdminBox>
      </div>
    </>
  );
}
