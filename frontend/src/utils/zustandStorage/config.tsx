import { create } from 'zustand';
import { APIFile } from '@/utils/types';
import { persist, createJSONStorage } from 'zustand/middleware';

type State = {
  files: APIFile[];
};

type Action = {
  addFiles: (files: APIFile[]) => void;
  setNotUploadedFiles: (files: APIFile[]) => void;
};

export const useFilesStore = create<State & Action>(
  persist(
    (set) => ({
      files: [],
      setNotUploadedFiles: (files) =>
        set((state) => {
          const uploadedFiles = state.files.filter((f) => !f.id);
          return { files: [...uploadedFiles, ...files] };
        }),
      addFiles: (files) =>
        set((state) => ({ files: [...state.files, ...files] })),
      // removeFile: (filename) => set((state) => ({ file: file.filter((f) => f !== file) })),
      removeAll: () => set({ files: [] }),
    }),
    {
      name: 'files-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);
