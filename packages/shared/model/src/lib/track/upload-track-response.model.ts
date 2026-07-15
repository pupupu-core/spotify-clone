export type TrackSource = 'jamendo' | 'userUpload';

export interface UploadTrackResponse {
  id: string;
  title: string;
  artistName: string | null;
  albumName: string | null;
  audioFileId: string;
  source: TrackSource;
  genres: string[];
}
