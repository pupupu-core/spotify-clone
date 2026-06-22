import { z } from 'zod';
import { createJamendoResponseSchema } from '$/infrastructure/jamendo/dtos/common.dto';

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
