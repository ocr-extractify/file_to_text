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
import { RxTextAlignTop } from 'react-icons/rx';

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
    if (files.length === 0) {
      toast.error(NO_FILE);
      return;
    }

    const filesArray: File[] = Array.from(files);
    Promise.all(
      filesArray.map((file: File) => {
        return uploadFileMutation.mutateAsync(file);
      }),
    );
  }

  return (
    <div className="mx-auto">
      {!results ? (
        <form
          className="w-3/6 flex flex-col mx-auto sm:pt-10"
          onSubmit={handleSubmit}
        >
          <FileInput
            id="files"
            files={files}
            setFiles={setFiles}
            multiple
            accept={VALID_MIMETYPES.join(',')}
          />
          <Button
            className="w-fit mt-2 font-medium mx-auto space-x-2 flex items-center"
            isLoading={uploadFileMutation.isPending}
          >
            <span>{SUBMIT_BUTTON}</span>
            <RxTextAlignTop className="w-5 h-5 flex items-end" />
          </Button>
        </form>
      ) : (
        <div className="space-y-10 divide-y-2">
          {results.map((result) => (
            <Result result={result} />
          ))}
        </div>
      )}
    </div>
  );
}

export default UploadFilesPage;
