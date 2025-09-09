import { ReactNode } from 'react';
import { create } from 'zustand';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
  id: number;
  message: string | ReactNode| undefined; // 문자열 또는 React 컴포넌트를 메시지로 허용, undefiend는 기본값 출력
  duration: number;
  type?: ToastType;
}

interface ToastState {
  toasts: ToastMessage[];
  addToast: (message?: string | ReactNode | undefined, duration?: number, type?: ToastType) => void;
  removeToast: (id: number) => void;
}

let toastIdCounter = 0;
const DEFAULT_TOAST_DURATION = 3000; // 기본 지속 시간 3초

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (message = undefined, duration , type) => {
    const id = toastIdCounter++;
    const toastDuration = duration ?? DEFAULT_TOAST_DURATION;
    set((state) => ({
      toasts: [...state.toasts, { id, message, duration: toastDuration, type }],
    }));
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
}));

// 컴포넌트에서 addToast 함수를 쉽게 사용하기 위한 커스텀 훅
export const useToast = () => {
  const addToast = useToastStore((state) => state.addToast);
  return { addToast };
};