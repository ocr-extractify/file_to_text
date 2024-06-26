import { APIFile } from '@/utils/types';
import { useFilesStore } from '@/utils/zustandStorage';

const FilesPage = () => {
  const files = useFilesStore((state) => state.files);

  console.log('files loaded', files);
  return (
    <div>
      {files.map((file: APIFile) => (
        <div key={file.name}>
          <p>{file.name}</p>
        </div>
      ))}
    </div>
  );
};

export default FilesPage;
