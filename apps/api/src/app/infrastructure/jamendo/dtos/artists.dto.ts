import { z } from 'zod';
import { createJamendoResponseSchema } from '$/infrastructure/jamendo/dtos/common.dto';

//GET /v3.0/artists/tracks
const JamendoArtistTrackSchema = z.object({
  album_id: z.string(),
  album_name: z.string(),
  id: z.string(),
  name: z.string(),
  duration: z.string(),
  releasedate: z.string(),
  license_ccurl: z.string(),
  album_image: z.string(),
  image: z.string(),
  audio: z.string(),
  audiodownload: z.string(),
  audiodownload_allowed: z.boolean(),
});

const JamendoArtistTracksSchema = z.object({
  id: z.string(),
  name: z.string(),
  website: z.string(),
  joindate: z.string(),
  image: z.string(),
  tracks: z.array(JamendoArtistTrackSchema),
});

export const JamendoArtistListTracksResponseSchema = createJamendoResponseSchema(
  z.array(JamendoArtistTracksSchema),
);

export type JamendoArtistTracksDto = z.infer<typeof JamendoArtistTracksSchema>;
export type JamendoArtistTrackDto = z.infer<typeof JamendoArtistTrackSchema>;
export type JamendoArtistTracksResponseDto = z.infer<typeof JamendoArtistListTracksResponseSchema>;

//GET /v3.0/artists/albums
const JamendoArtistAlbumSchema = z.object({
  id: z.string(),
  name: z.string(),
  releasedate: z.string(),
  image: z.string(),
});

const JamendoArtistAlbumsListSchema = z.object({
  id: z.string(),
  name: z.string(),
  website: z.string(),
  joindate: z.string(),
  image: z.string(),
  albums: z.array(JamendoArtistAlbumSchema),
});

export const JamendoArtistListAlbumsResponseSchema = createJamendoResponseSchema(
  z.array(JamendoArtistAlbumsListSchema),
);

export type JamendoArtistAlbumDto = z.infer<typeof JamendoArtistAlbumSchema>;
export type JamendoArtistAlbumsListDto = z.infer<typeof JamendoArtistAlbumsListSchema>;
export type JamendoArtistListAlbumsResponseDto = z.infer<
  typeof JamendoArtistListAlbumsResponseSchema
>;

//GET /v3.0/artists/musicinfo
const JamendoArtistMusicInfoSchema = z.object({
  tags: z.array(z.string()),
  description: z.record(z.string(), z.string()),
});

const JamendoArtistMusicInfoListSchema = z.object({
  id: z.string(),
  name: z.string(),
  website: z.string(),
  joindate: z.string(),
  image: z.string(),
  shorturl: z.string(),
  shareurl: z.string(),
  musicinfo: JamendoArtistMusicInfoSchema,
});

export const JamendoArtistMusicInfoResponseSchema = createJamendoResponseSchema(
  z.array(JamendoArtistMusicInfoListSchema),
);

export type JamendoArtistMusicInfoDto = z.infer<typeof JamendoArtistMusicInfoSchema>;
export type JamendoArtistMusicInfoListDto = z.infer<typeof JamendoArtistMusicInfoListSchema>;
export type JamendoArtistMusicInfoResponseDto = z.infer<
  typeof JamendoArtistMusicInfoResponseSchema
>;
