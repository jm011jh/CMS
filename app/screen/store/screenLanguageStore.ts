import { create } from 'zustand'

interface ScreenLanguageState {
    language: string
    setLanguage: (language: string) => void
}

export const useScreenLanguageStore = create<ScreenLanguageState>((set) => ({
    language: 'KOR',
    setLanguage: (language: string) => set({ language }),
}))
