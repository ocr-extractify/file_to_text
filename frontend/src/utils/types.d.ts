/**
 * Represents a detected language in the analysis of a Google document using AI.
 *
 * ref: https://cloud.google.com/php/docs/reference/cloud-document-ai/1.7.0/V1.Document.Page.DetectedLanguage
 */
export type GoogleDocumentAiAnalysisDetectedLanguage = {
  languageCode: string;
  confidence: number;
};

/**
 * Represents the layout analysis of a document using Google Document AI.
 *
 * ref: https://cloud.google.com/php/docs/reference/cloud-document-ai/1.7.0/V1.Document.Page.Layout
 */
export type GoogleDocumentAiAnalysisLayout = {
  textAnchor: unknown;
  confidence: number;
  boundingPoly: number;
  orientation: number;
};

/**
 * Represents a page in the analysis of a Google document by AI.
 *
 * ref: https://cloud.google.com/php/docs/reference/cloud-document-ai/1.7.0/V1.Document.Page
 */
export type GoogleDocumentAiAnalysisPage = {
  pageNumber?: number;
  dimension?: Dimension;
  layout?: GoogleDocumentAiAnalysisLayout;
  detectedLanguages?: Array<GoogleDocumentAiAnalysisDetectedLanguage>;
  blocks?: Array<unknown>;
  paragraphs?: Array<unknown>;
  lines?: Array<unknown>;
  tokens?: Array<unknown>;
  visualElements?: Array<unknown>;
  tables?: Array<unknown>;
  formFields?: Array<unknown>;
  symbols?: Array<unknown>;
  detectedBarcodes?: Array<unknown>;
};

/**
 * Represents the analysis result of a Google Document using AI.
 *
 * ref: https://cloud.google.com/php/docs/reference/cloud-document-ai/1.7.0/V1.Document
 */
export type GoogleDocumentAiAnalysis = {
  uri?: string;
  content?: string;
  mimeType: string;
  text?: string;
  textStyles?: Array<unknown>;
  pages?: Array<GoogleDocumentAiAnalysisPage>;
  entities?: Array<unknown>;
  entityRelations?: Array<unknown>;
};

/**
 * Represents the response from an API call.
 * @template T - The type of the data in the response.
 */
export type APIResponse<T> = {
  data: T;
  // count: number; -> it may be implemented in the future
};

/**
 * Represents a file object retrieve from API.
 */
export type APIFile = {
  _id: string;
  name: string;
  created_at: string;
  analysis: GoogleDocumentAiAnalysis;
};

/**
 * Represents the statistics of the API.
 */
export type APIStats = {
  uploaded_files_qty: number;
  uploaded_files_qty_today: number;
  uploaded_files_qty_week: number;
  uploaded_files_qty_month: number;
};
