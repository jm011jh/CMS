import MediaViewClient from './MediaViewClient';

export default function AdminBoardMediaViewPage({ searchParams }: { searchParams: { id?: string } }) {
  const viewId = searchParams.id;

  // 서버에서는 viewId만 클라이언트 컴포넌트로 넘겨줍니다.
  return <MediaViewClient viewId={viewId} />;
}