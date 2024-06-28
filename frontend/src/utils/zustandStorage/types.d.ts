export interface FileStoreState {
  files: APIFile[] | [];
  add: (file: APIFile) => void;
  remove: (_id: string) => void;
  removeAll: () => void;
}
