export interface UploadTrackRequest {
  title: string;
  artistName: string;
  albumName?: string;
  single: boolean;
  private: boolean;
}
