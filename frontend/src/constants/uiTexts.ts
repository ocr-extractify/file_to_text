import { MAX_FILE_SIZE, VALID_MIMETYPES } from "./constraints";

export const TITLE: string = "File to text"
export const DESCRIPTION: string = "";
export const FILES_INPUT_LABEL: string = "Files";
export const UPLOAD_FILE: string = "Upload a file";
export const OR_DRAG_AND_DROP: string = "or drag and drop";
export const FILE_INPUT_MIMETYPES: string = `${VALID_MIMETYPES.join(", ")} up to ${MAX_FILE_SIZE.toString()} MB`;