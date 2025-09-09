import AdmViewConfirmPopup from '@/app/admin/provider/components/AdmViewConfirmPopup';

import { useConfirmPopupStore } from '@/app/admin/store/confirmPopupStore';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const ConfirmPopupProvider: React.FC = () => {

    const pathname = usePathname(); // Get current pathname
    // 공통 팝업으로 변경
    const {
        isVisible: isConfirmPopupVisible,
        onConfirmCallback,
        onCancelCallback,
        hidePopup,
        title,
        desc,
        icon,
        hideCancelButton
    } = useConfirmPopupStore();

    const handlePopupConfirm = () => {
        if (onConfirmCallback) {
            onConfirmCallback();
        }
        hidePopup();
    };
    const handlePopupCancel = () => {
        if (onCancelCallback) {
            onCancelCallback();
        }
        hidePopup();
    };

    // // 탈퇴 여부를 묻는 팝업 #######################################################
    // const {
    //     isWithdrawVisible: isWithdrawConfirmPopupVisible,
    //     onWithdrawConfirmCallback,
    //     onWithdrawCancelCallback,
    //     hideWithdrawPopup
    // } = useWithdrawConfirmPopupStore();

    // const handlePopupWithdrawConfirm = () => {
    //     if (onWithdrawConfirmCallback) {
    //         onWithdrawConfirmCallback();
    //     }
    //     hideWithdrawPopup();
    // };
    // const handlePopupWithdrawCancel = () => {
    //     if (onWithdrawCancelCallback) {
    //         onWithdrawCancelCallback();
    //     }
    //     hideWithdrawPopup();
    // };

    // // 삭제 여부를 묻는 팝업 #######################################################
    // const {
    //     isDeleteItemVisible: isDeleteItemConfirmPopupVisible,
    //     onDeleteItemConfirmCallback,
    //     onDeleteItemCancelCallback,
    //     hideDeleteItemPopup
    // } = useDeleteItemConfirmPopupStore();

    // const handlePopupDeleteItemConfirm = () => {
    //     if (onDeleteItemConfirmCallback) {
    //         onDeleteItemConfirmCallback();
    //     }
    //     hideDeleteItemPopup();
    // };
    // const handlePopupDeleteItemCancel = () => {
    //     if (onDeleteItemCancelCallback) {
    //         onDeleteItemCancelCallback();
    //     }
    //     hideDeleteItemPopup();
    // };

    // Effect to hide popups on route change
    useEffect(() => {
        if (isConfirmPopupVisible) {
            hidePopup();
        }
        // if (isWithdrawConfirmPopupVisible) {
        //     hideWithdrawPopup();
        // }
        // if (isDeleteItemConfirmPopupVisible) {
        //     hideDeleteItemPopup();
        // }
    }, [pathname, hidePopup]);
    // }, [pathname, hidePopup, hideWithdrawPopup, hideDeleteItemPopup]);
    return (
        <div aria-live="polite" aria-atomic="true">
            {isConfirmPopupVisible && (
                <AdmViewConfirmPopup
                    icon={icon}
                    title={title}
                    desc={desc}
                    onConfirm={handlePopupConfirm}
                    onCancel={handlePopupCancel}
                    hideCancelButton={hideCancelButton}
                />
            )}
            {/* {isWithdrawConfirmPopupVisible && (
                <AdmWithdrawConfirmPopup
                    onConfirm={handlePopupWithdrawConfirm}
                    onCancel={handlePopupWithdrawCancel}
                />
            )}
            {isDeleteItemConfirmPopupVisible && (
                <AdmDeleteItemConfirmPopup
                    onConfirm={handlePopupDeleteItemConfirm}
                    onCancel={handlePopupDeleteItemCancel}
                />
            )} */}
        </div>
    )
}

export default ConfirmPopupProvider;