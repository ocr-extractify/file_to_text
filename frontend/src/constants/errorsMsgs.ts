import { VALID_MIMETYPES } from '@/constants/constraints';

export const INVALID_MIMETYPE: string = `Filetype not supported. Supported filetypes are ${VALID_MIMETYPES.join(
  ', ',
)}`;
