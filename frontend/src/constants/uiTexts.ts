import { MAX_FILE_SIZE, VALID_MIMETYPES } from './constraints';

export const TITLE: string = 'File to text';
export const DESCRIPTION: string =
  'Simple app to convert all your files to text.';
export const FILES_INPUT_LABEL: string = 'Files';
export const UPLOAD_FILE: string = 'Upload a file';
export const OR_DRAG_AND_DROP: string = 'or drag and drop';
export const FILE_INPUT_MIMETYPES: string = `${VALID_MIMETYPES.join(
  ', ',
)} up to ${(MAX_FILE_SIZE / 1024 / 1024).toString()}MB`;
export const SUBMIT_BUTTON: string = 'to txt';
export const FILENAME: string = 'Filename';
export const RESULT: string = 'Result';
export const CREATING_ID: string = 'Creating id...';
export const CREATING_RESULT: string = 'Creating result...';
