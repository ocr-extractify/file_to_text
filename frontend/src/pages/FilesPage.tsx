import IconButton from '@/components/buttons/IconButton';
import { APIFile } from '@/utils/types';
import { useFilesStore } from '@/utils/zustandStorage';
import { RiDeleteBinLine } from 'react-icons/ri';
import { LiaExternalLinkAltSolid } from 'react-icons/lia';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { httpClient } from '@/utils/axios';

const FilesPage = () => {
  const nav = useNavigate();
  const files = useFilesStore((state) => state.files);
  const removeFile = useFilesStore((state) => state.remove);
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return httpClient.delete(`/files/${id}`).then(() => {
        removeFile(id);
      });
    },
  });

  return (
    <div className="space-y-4">
      {files.map((file: APIFile) => (
        <div
          key={file._id}
          className="rounded-md p-2 shadow-md shadow-indigo-100 flex justify-between"
        >
          <span className="font-medium">{file.name}</span>

          <div>
            <IconButton
              onClick={() => {
                deleteMutation.mutateAsync(file._id);
              }}
            >
              <RiDeleteBinLine className="w-5 h-5" />
            </IconButton>

            <IconButton onClick={() => nav(`/files/${file._id}`)}>
              <LiaExternalLinkAltSolid className="w-5 h-5" />
            </IconButton>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilesPage;
