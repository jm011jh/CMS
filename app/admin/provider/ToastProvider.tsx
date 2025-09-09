import AdmTooastPopup from '@/app/admin/provider/components/AdmToastPopup';
import { useToastStore } from '@/app/admin/store/useToastStore'; // 실제 경로에 맞게 수정
import React, { CSSProperties } from 'react';

export const ToastProvider: React.FC = () => {
    // Zustand 스토어에서 toasts 목록과 removeToast 함수를 가져옵니다.
    const toasts = useToastStore((state) => state.toasts);
    const removeToast = useToastStore((state) => state.removeToast);

    const ToastProviderStyle: CSSProperties = {
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1050, // 다른 요소들 위에 보이도록 높은 z-index 설정
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end', // 오른쪽 정렬 시 토스트들이 쌓이는 방식
    };

    // 표시할 토스트가 없으면 아무것도 렌더링하지 않습니다.
    if (!toasts.length) {
        return null;
    }

    return (
        <div style={ToastProviderStyle} aria-live="polite" aria-atomic="true">
            {toasts.map(toast => (
                <AdmTooastPopup
                    key={toast.id}
                    id={toast.id} // id prop 전달
                    message={toast.message}
                    duration={toast.duration}
                    type={toast.type}
                    onDismiss={removeToast} // onDismiss prop에 removeToast 함수 전달
                />
            ))}
        </div>
    );
};