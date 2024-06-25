import { DESCRIPTION, SUBMIT_BUTTON, TITLE } from '@/constants/uiTexts';
import FileInput from '@/components/inputs/FileInput';
import { VALID_MIMETYPES } from '@/constants/constraints';
import { useMutation } from '@tanstack/react-query';
import { httpClient } from '@/utils/axios';
import Button from '@/components/Button';
import { toast } from 'react-toastify';
import { useFilesStore } from '@/utils/zustandStorage';

function UploadFilesPage() {
  const serverFiles = useFilesStore((state) => state.files);
  const uploadFileMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);

      return httpClient
        .post('/upload/', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => {
          console.log('res: ', res.data._id);
          setServerFiles((prevState) => {
            const targetFile = serverFiles.find(
              (_file) => _file.file.name === file.name,
            );

            if (!targetFile) return prevState;

            targetFile.id = res.data._id;
            const updatedFiles = prevState.filter(
              (_file) => _file.file.name !== file.name,
            );
            return [...[...updatedFiles, targetFile]];
          });
        })
        .catch((err) => {
          toast.error(err.response.data.detail);
        });
    },
  });
  const setNotUploadedFilesPersistently = useFilesStore(
    (state) => state.setNotUploadedFiles,
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log('submit', e.currentTarget.files.files);
    Promise.all(
      Array.from(e.currentTarget.files.files).map((file: File) => {
        uploadFileMutation.mutateAsync(file);
      }),
    );
  }

  console.log('serverFiles', serverFiles);
  return (
    <div className="w-5/6 mx-auto mt-10">
      <h1 className="text-2xl">{TITLE}</h1>
      <h2 className="text-xl">{DESCRIPTION}</h2>
      <form className="w-full flex flex-col" onSubmit={handleSubmit}>
        <FileInput
          id="files"
          files={serverFiles}
          setFiles={(files) => setNotUploadedFilesPersistently(files)}
          isUploading={uploadFileMutation.isPending}
          multiple
          accept={VALID_MIMETYPES.join(',')}
        />
        <Button className="mt-2 uppercase">{SUBMIT_BUTTON}</Button>
      </form>
    </div>
  );
}

export default UploadFilesPage;
