import { SUBMIT_BUTTON } from '@/constants/uiTexts';
import FileInput from '@/components/inputs/FileInput';
import { VALID_MIMETYPES } from '@/constants/constraints';
import { useMutation } from '@tanstack/react-query';
import { httpClient } from '@/utils/axios';
import Button from '@/components/buttons/Button';
import { toast } from 'react-toastify';
import { useFilesStore } from '@/utils/zustandStorage';
import { useState } from 'react';
import { APIFile } from '@/utils/types';
import Result from '@/fragments/Result';
import { FileStoreState } from '@/utils/zustandStorage/types';
import { NO_FILE } from '@/constants/errorsMsgs';

function UploadFilesPage() {
  const [results, setResults] = useState<null | APIFile[]>(null);
  const [files, setFiles] = useState<File[] | []>([]);
  const addFile = useFilesStore((state: FileStoreState) => state.add);
  const uploadFileMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);

      return httpClient
        .post('/files/upload/', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => {
          addFile(res.data);
          setResults((prevState) => [...(prevState || []), res.data]);
        })
        .catch((err) => {
          toast.error(err.response.data.detail);
        });
    },
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (e.currentTarget.files.files.length === 0) {
      toast.error(NO_FILE);
      return;
    }

    const filesArray: File[] = Array.from(e.currentTarget.files.files);
    Promise.all(
      filesArray.map((file: File) => {
        return uploadFileMutation.mutateAsync(file);
      }),
    );
  }

  return (
    <div className="mx-auto">
      {!results ? (
        <form className="w-full flex flex-col" onSubmit={handleSubmit}>
          <FileInput
            id="files"
            files={files}
            setFiles={setFiles}
            multiple
            accept={VALID_MIMETYPES.join(',')}
          />
          <Button
            className="mt-2 uppercase"
            isLoading={uploadFileMutation.isPending}
          >
            {SUBMIT_BUTTON}
          </Button>
        </form>
      ) : (
        <>
          {results.map((result) => (
            <Result result={result} />
          ))}
        </>
      )}
    </div>
  );
}

export default UploadFilesPage;
