export interface DataExportResponse {
  downloadUrl: string;
  expiresAt: string;
  format: 'pdf' | 'json' | 'csv';
}
