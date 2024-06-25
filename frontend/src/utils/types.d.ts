/**
 * Represents a file object retrieve from API..
 */
export type APIFile = {
    id: string,
    file: File, 
    analysis: JSON;
}