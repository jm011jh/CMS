import { basicThemeColors } from "@/app/admin/assets/theme";
import { useState } from "react";

type AdmQuestionHoverIconProps = {
    children?: React.ReactNode;
    style?: React.CSSProperties;
}
const AdmQuestionHoverIcon: React.FC<AdmQuestionHoverIconProps> = ({ children, style }) => {

    const styles: { [key: string]: React.CSSProperties } = {
        container: {
            width: '16px',
            height: '16px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        button: {
            width: '16px',
            height: '16px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            justifyContent: 'center',
        },
        text: {
            position: 'absolute',
            top: '0',
            right: '-10px',
            transform: 'translateX(100%) translateY(-100%)',
            backgroundColor: '#ffffff',
            padding: '6px',
            border: `1px solid ${basicThemeColors.gray300}`,
            pointerEvents: 'none',
        }
    }
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const open = () => {
        setIsOpen(true);
    }
    const close = () => {
        setIsOpen(false);
    }
    const pressEnter = (e: any) => {
        const key = e.key || e.keyCode;
        if (key === 'Enter' || key === 13) {
            if (isOpen) {
                close();
            } else {
                open();
            }
        }
    }
    return (
        <div style={{ ...styles.container, ...style }}>
            <button onMouseEnter={open} onMouseLeave={close} style={styles.button} onClick={isOpen ? close : open} onKeyDown={pressEnter} aria-label="Question Icon" aria-expanded={isOpen} aria-haspopup="true">
                <svg style={styles.icon} width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <g clipPath="url(#clip0_2666_18135)">
                        <path d="M6.99891 12.5554C10.0672 12.5554 12.5545 10.0681 12.5545 6.99989C12.5545 3.93164 10.0672 1.44434 6.99891 1.44434C3.93067 1.44434 1.44336 3.93164 1.44336 6.99989C1.44336 10.0681 3.93067 12.5554 6.99891 12.5554Z" stroke="#6B7280" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M5.38281 5.33332C5.51343 4.96203 5.77123 4.64894 6.11057 4.44951C6.4499 4.25008 6.84887 4.17718 7.2368 4.24372C7.62473 4.31026 7.9766 4.51195 8.23008 4.81306C8.48356 5.11418 8.62229 5.49528 8.6217 5.88888C8.6217 6.99999 6.95503 7.55555 6.95503 7.55555" stroke="#6B7280" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M7 9.77832H7.00556" stroke="#6B7280" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                    <defs>
                        <clipPath id="clip0_2666_18135">
                            <rect width="13.3333" height="13.3333" fill="white" transform="translate(0.333984 0.333008)" />
                        </clipPath>
                    </defs>
                </svg>
            </button>
            {
                isOpen &&
                <div style={styles.text}>{children}</div>
            }
        </div>
    )
}

export default AdmQuestionHoverIcon;