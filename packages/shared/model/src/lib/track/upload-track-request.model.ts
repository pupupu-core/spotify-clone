export interface UploadTrackRequest {
  title: string;
  artistName: string;
  albumName?: string;
  genres?: string[];
  // TODO: Add fields to prisma schema
  // isSingle: boolean;
  // isPrivate: boolean;
}
