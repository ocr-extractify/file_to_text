import { APIFile } from '@/utils/types';
import { useFilesStore } from '@/utils/zustandStorage';

const FilesPage = () => {
  const files = useFilesStore((state) => state.files);

  return (
    <div>
      {files.map((file: APIFile) => (
        <div key={file._id}>
          <p>{file.name}</p>
        </div>
      ))}
    </div>
  );
};

export default FilesPage;
