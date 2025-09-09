import { create } from 'zustand';

interface LoadingScreenState {
  isLoading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
}

const useLoadingScreenStore = create<LoadingScreenState>((set) => ({
  isLoading: false,
  showLoading: () => set({ isLoading: true }),
  hideLoading: () => set({ isLoading: false }),
}));
export default useLoadingScreenStore;