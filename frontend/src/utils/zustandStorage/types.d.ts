export interface FileStoreState {
  files: APIFile[] | [];
  add: (file: APIFile) => void;
  removeAll: () => void;
}
