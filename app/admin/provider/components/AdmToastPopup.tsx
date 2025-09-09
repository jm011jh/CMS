import { basicThemeColors } from "@/app/admin/assets/theme";
import React, { CSSProperties, useEffect, useState } from 'react';

export interface AdmTooastPopupProps {
    id: number;
    message: string | React.ReactNode; // 문자열 또는 React 컴포넌트를 메시지로 허용
    duration: number;
    onDismiss: (id: number) => void;
    type?: 'success' | 'error' | 'info' | 'warning';
}
const AdmTooastPopup: React.FC<AdmTooastPopupProps> = ({
    id,
    duration,
    onDismiss,
    message = <p>성공적으로 업로드되었습니다.</p>,
    type
}) => {
    const [isVisible, setIsVisible] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            // Allow time for fade-out animation before removing from DOM
            setTimeout(() => onDismiss(id), 300); // 300ms for fade-out
        }, duration);

        return () => {
            clearTimeout(timer);
        };
    }, [id, duration, onDismiss]);

    const getBackgroundColor = (): string => {
        switch (type) {
            case 'success': return '#4CAF50'; // Green
            case 'error': return '#F44336';   // Red
            case 'warning': return '#FF9800'; // Orange
            case 'info':
            default: return basicThemeColors.gray500; // Gray
        }
    };
    const toastStyle: CSSProperties = {
        backgroundColor: getBackgroundColor(),
        // backgroundColor: basicThemeColors.gray500,
        color: 'white',
        padding: '6px 12px',
        margin: '0 0 10px 0',
        borderRadius: '24px',
        minHeight: '32px',
        height: '100%',
        fontSize: '16px',
        fontWeight: '600',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
    };
    return (
        <div style={toastStyle}>
            <svg width="24" height="24" viewBox="0 0 14 14" fill="none">
                <path d="M11.4455 3.66406L5.33442 9.77517L2.55664 6.9974" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {message}
        </div>
    )
}

export default AdmTooastPopup