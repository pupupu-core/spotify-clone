export interface UploadTrackResponse {
  id: string;
  title: string;
  artistName: string | null;
  albumName: string | null;
  audioFileId: string;
}
