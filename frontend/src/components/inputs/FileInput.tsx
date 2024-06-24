import { VALID_MIMETYPES } from "@/constants/constraints";
import { INVALID_MIMETYPE } from "@/constants/errorsMsgs";
import { FILE_INPUT_MIMETYPES, OR_DRAG_AND_DROP, UPLOAD_FILE } from "@/constants/uiTexts";
import { useState } from "react";
import { toast } from "react-toastify";

type Props = {
    id: string;
}


const FileInput = ({id}: Props) => {
  const [files, setFiles] = useState([]);

  async function isValidMimetype(mimetype: string): Promise<boolean> {
    if(VALID_MIMETYPES.includes(mimetype)) return true;
    toast.error(INVALID_MIMETYPE)
    return false
  }

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const fileList = event.target.files;

    if(fileList) {
        const filesArray = Array.from(fileList);

        let validFiles = await Promise.all(filesArray.map(async (file) => {
            const isValid = await isValidMimetype(file.type);
            if(isValid) return file;
            return null;
        }));
        validFiles = validFiles.filter((file) => file !== null);

        if(validFiles.length > 0) setFiles(prevState => [...prevState, ...validFiles]);
    }
  }

  console.log('files', files)
  return (
    <div>
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
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
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>{UPLOAD_FILE}</span>
                        <input id={id} type="file" className="sr-only" onChange={handleFileChange} />
                      </label>
                      <p className="pl-1">{OR_DRAG_AND_DROP}</p>
                    </div>
                    <p className="text-xs text-gray-500">{FILE_INPUT_MIMETYPES}</p>
                  </div>
                </div>
              </div>
            </div>

        <ul>
            {files.map((file) => (
                <li key={file.name}>{file.name}</li>
            ))}
        </ul>
    </div>
  )
}

export default FileInput