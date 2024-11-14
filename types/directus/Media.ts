export interface DirectusMediaFile {
  id: string;
  storage: string;
  filename_disk: string;
  filename_download: string;
  title?: string;
  type: string;
  folder?: string;
  uploaded_by?: string;
  uploaded_on: string;
  width?: number;
  height?: number;
  duration?: number | null;
  description?: string;
  metadata?: Record<string, unknown>;
}
