import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface replayInfoItem {
    category?: string,
    viewerType?: string,
    title?: string,
    description?: string,
    replayUrl?: string,
    newReplayUrl?: string,
    replayPublishDate?: string,
    playtime?: number,
    thumbnailImage?: {
        fileName: string,
        fileUrl: string,
        fileType: string
    }
}

interface replayInfoState extends replayInfoItem {
    setData: (data: replayInfoItem) => void;
}

export const useReplayInfoStore = create<replayInfoState>()(
    persist(
        (set) => ({
            title: '',
            description: '',
            replayUrl: '',
            newReplayUrl: '',
            replayPublishDate: '',
            category: '',
            playtime: 0,
            thumbnailImage: {
                fileName: '',
                fileUrl: '',
                fileType: ''
            },
            setData: (data: replayInfoItem) => set(() => ({ ...data }))
        }),
        {
            name: 'replayInfo', // unique name for the storage
            storage: createJSONStorage(() => sessionStorage),
        }
    ),
);
