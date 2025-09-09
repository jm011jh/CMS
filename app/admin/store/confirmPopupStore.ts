import { create } from 'zustand';

interface ConfirmPopupState {
  isVisible: boolean;
  onConfirmCallback: (() => void) | null;
  onCancelCallback: (() => void) | null;
  // 향후 팝업 메시지나 제목을 동적으로 변경하고 싶다면 여기에 추가할 수 있습니다.
  title?: React.ReactNode;
  desc?: React.ReactNode;
  icon?: React.ReactNode;
  hideCancelButton?: boolean; // 취소 버튼 숨김 여부
  showPopup: (config: {
    onConfirm: () => void;
    onCancel?: () => void;
    title?: React.ReactNode;
    desc?: React.ReactNode;
    icon?: React.ReactNode;
    hideCancelButton?: boolean; // 취소 버튼 숨김 여부
  }) => void;
  hidePopup: () => void;
}

export const useConfirmPopupStore = create<ConfirmPopupState>(set => ({
  isVisible: false,
  onConfirmCallback: null,
  onCancelCallback: null,
  showPopup: config =>
    set({
      isVisible: true,
      onConfirmCallback: config.onConfirm,
      onCancelCallback: config.onCancel || null,
      title: config.title,
      desc: config.desc,
      icon: config.icon,
      hideCancelButton: config.hideCancelButton, // 취소 버튼 숨김 여부
    }),
  hidePopup: () =>
    set({
      isVisible: false,
      onConfirmCallback: null,
      onCancelCallback: null,
    }),
}));
