export interface UploadTrackForm {
  file: File;
  title: string;
  artistName: string;
  albumName?: string;
  genres?: string[];
}
