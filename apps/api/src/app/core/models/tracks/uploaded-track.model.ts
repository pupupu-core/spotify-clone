export interface UploadedTrack {
  id: string;
  title: string;
  artistName: string | null;
  audioFileId: string;
  // TODO: Add fields to prisma schema
  // isSingle: boolean;
  // isPrivate: boolean;
}
