import { create } from 'zustand';
import { APIFile } from '@/utils/types';
import { persist, createJSONStorage } from 'zustand/middleware';

type State = {
  files: APIFile[];
};

export const useFilesStore = create(
  persist(
    (set) => ({
      files: [],
      add: (file: APIFile) =>
        set((state: State) => ({ files: [...state.files, file] })),
      removeAll: () => set({ files: [] }),
    }),
    {
      name: 'files-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
