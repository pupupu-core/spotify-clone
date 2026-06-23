export interface ArtistMusicInfoResponse {
  id: string;
  name: string;
  website: string;
  joinDate: string;
  imageUrl: string;
  shortUrl: string;
  shareUrl: string;
  musicInfo: ArtistMusicInfo;
}

export interface ArtistMusicInfo {
  tags: string[];
  description: Record<string, string>;
}
