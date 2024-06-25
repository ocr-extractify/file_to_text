import { VALID_MIMETYPES } from '@/constants/constraints';
import { INVALID_MIMETYPE } from '@/constants/errorsMsgs';
import {
  CREATING_ID,
  CREATING_RESULT,
  FILENAME,
  FILE_INPUT_MIMETYPES,
  OR_DRAG_AND_DROP,
  RESULT,
  UPLOAD_FILE,
} from '@/constants/uiTexts';
import { APIFile } from '@/utils/types';
import { ComponentProps } from 'react';
import { toast } from 'react-toastify';
import LoadingText from '../texts/LoadingText';

interface Props extends ComponentProps<'input'> {
  id: string;
  files: APIFile[];
  setFiles: React.Dispatch<React.SetStateAction<[] | APIFile[]>>;
  isUploading: boolean;
}

const FileInput = ({ id, files, setFiles, isUploading, ...rest }: Props) => {
  // const [files, setFiles] = useState<File[] | []>([]);
  async function isValidMimetype(mimetype: string): Promise<boolean> {
    if (VALID_MIMETYPES.includes(mimetype)) return true;
    toast.error(INVALID_MIMETYPE);
    return false;
  }

  async function addFiles(files: File[] | FileList | null) {
    if (files) {
      const filesArray = Array.from(files);

      const arrayOfValidFileOrNull = await Promise.all(
        filesArray.map(async (file) => {
          const isValid = await isValidMimetype(file.type);
          if (isValid) return file;
          return null;
        }),
      );

      const isFile = (file: File | null): file is File => file !== null;
      const validFiles = arrayOfValidFileOrNull.filter(isFile);
      if (validFiles.length > 0) {
        const newFiles = validFiles.map((file) => {
          return { file: file };
        });
        console.log('valid files', validFiles);
        setFiles(newFiles);
      }
    }
  }

  async function removeFile(filename: string) {
    setFiles(files.filter((file) => file.file.name !== filename));
  }

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    addFiles(event.target.files);
  }

  async function handleDrop(event: React.DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    addFiles(event.dataTransfer.files);
  }

  console.log('files', files);
  return (
    <div>
      <label
        htmlFor={id}
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
      >
        <div className="w-full h-52 sm:border-t sm:border-gray-200 sm:pt-5">
          <div className="w-full h-full mt-1 sm:mt-0">
            <div className="h-full flex justify-center items-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex justify-center text-sm text-gray-600">
                  <span>{UPLOAD_FILE}</span>
                  <input
                    id={id}
                    type="file"
                    className="sr-only"
                    onChange={handleChange}
                    {...rest}
                  />

                  <p className="pl-1">{OR_DRAG_AND_DROP}</p>
                </div>
                <p className="text-xs text-gray-500">{FILE_INPUT_MIMETYPES}</p>
              </div>
            </div>
          </div>
        </div>
      </label>

      <ul className="mt-2 space-y-2">
        {files.map((file) => (
          <li
            key={file.file.name}
            className="flex flex-col justify-between border rounded-md p-2 font-medium relative pr-7"
          >
            <span className="w-full flex justify-between">
              <span>{FILENAME}</span>
              <span>{file.file.name}</span>
            </span>
            <span className="w-full flex justify-between">
              <span>ID</span>
              {isUploading ? <LoadingText>{CREATING_ID}</LoadingText> : file.id}
            </span>
            <span className="w-full flex justify-between">
              <span>{RESULT}</span>
              {isUploading ? (
                <LoadingText>{CREATING_RESULT}</LoadingText>
              ) : (
                <span>{file.analysis}</span>
              )}
            </span>
            <button
              onClick={() => removeFile(file.file.name)}
              className="absolute right-2 top-2"
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileInput;
