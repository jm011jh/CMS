'use client';
import { usePathname } from 'next/navigation';



const EmptyPage = () => {
    const pathname = usePathname();

    return (
        <div style={{ padding: '20px' }}>
            <img src="/image/logo_jisoo_purple.png" alt="Jisoo" style={{ marginBottom: 20 }} />
            <p>이 페이지는 현재 개발 중입니다. 곧 업데이트될 예정입니다.</p>
            <p>기다려 주셔서 감사합니다!</p>
            <p>현재 경로: {pathname}</p>
        </div>
    );
};

export default EmptyPage;