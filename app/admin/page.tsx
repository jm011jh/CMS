'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Admin = () => {
  // const [total, setTotal] = useState<string>('');

  // const callCount = async () => {
  //   const token = getAccessToken();
  //   if (token === '') {
  //     alert('로그인 해주세요.');
  //     return;
  //   }

  //   try {
  //     const result: any = await callAPI(
  //       HTTPMETHOD.GET,
  //       {},
  //       `/api/admin/user?page=1&take=10`,
  //       token,
  //     );

  //     setTotal(result?.data?.total?.toLocaleString('ko-KR'));
  //   } catch (e: any) {
  //     // alert("처리 중 문제가 발생하였습니다.\n반복될 경우, 관리자에게 문의하여 주세요.");
  //   }
  // };

  const router = useRouter();

  useEffect(() => {
    // callCount();
    router.replace('/admin/user/info');
  }, []);

  return (
    <>
      {/* <div className="adm--wrap">
        <AdminPgTop tit={`관리자 페이지에 오신것을 환영합니다.`} />
        오늘까지 가입자
        <br />
        총: {total} 명
      </div> */}
    </>
  );
};

export default Admin;
