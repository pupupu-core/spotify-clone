export interface UploadTrackRequest {
  title: string;
  artistName: string;
  albumName?: string;
  isSingle: boolean;
  isPrivate: boolean;
}
