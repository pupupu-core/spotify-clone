import z from 'zod';
import { createJamendoResponseSchema } from '$/infrastructure/jamendo/dtos/common.dto';

const JamendoAlbumTrackSchema = z.object({
  count: z.string(),
  id: z.string(),
  position: z.string(),
  name: z.string(),
  duration: z.string(),
  license_ccurl: z.string(),
  audio: z.string(),
  audiodownload: z.string(),
  audiodownload_allowed: z.boolean(),
});

const JamendoAlbumSchema = z.object({
  id: z.string(),
  name: z.string(),
  releasedate: z.string(),
  artist_id: z.string(),
  artist_name: z.string(),
  track_id: z.string(),
  image: z.string(),
  zip: z.string(),
  zip_allowed: z.boolean(),
  tracks: z.array(JamendoAlbumTrackSchema),
});

export const JamendoAlbumsResponseSchema = createJamendoResponseSchema(z.array(JamendoAlbumSchema));

export type JamendoAlbumTrackDto = z.infer<typeof JamendoAlbumTrackSchema>;
export type JamendoAlbumDto = z.infer<typeof JamendoAlbumSchema>;
export type JamendoAlbumResponseDto = z.infer<typeof JamendoAlbumsResponseSchema>;
