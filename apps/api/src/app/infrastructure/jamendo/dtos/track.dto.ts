import { z } from 'zod';
import { createJamendoResponseSchema } from './common.dto';

const JamendoTrackMusicInfoTagsSchema = z.object({
  genres: z.array(z.string()),
  instruments: z.array(z.string()),
  vartags: z.array(z.string()),
});

const JamendoTrackMusicInfoSchema = z.object({
  vocalinstrumental: z.string(),
  lang: z.string(),
  gender: z.string(),
  acousticelectric: z.string(),
  speed: z.string(),
  tags: JamendoTrackMusicInfoTagsSchema,
});

const JamendoTrackSchema = z.object({
  id: z.string(),
  name: z.string(),
  duration: z.number(),
  artist_id: z.string(),
  artist_name: z.string(),
  artist_idstr: z.string(),
  album_name: z.string(),
  album_id: z.string(),
  license_ccurl: z.string(),
  position: z.number(),
  releasedate: z.string(),
  album_image: z.string(),
  audio: z.string(),
  audiodownload: z.string(),
  prourl: z.string(),
  shorturl: z.string(),
  shareurl: z.string(),
  waveform: z.string(),
  image: z.string(),
  musicinfo: JamendoTrackMusicInfoSchema.optional(),
  audiodownload_allowed: z.boolean(),
  content_id_free: z.boolean(),
});

export const JamendoListTracksResponseSchema = createJamendoResponseSchema(
  z.array(JamendoTrackSchema),
);

export type JamendoTrackMusicInfoTagsDto = z.infer<typeof JamendoTrackMusicInfoTagsSchema>;
export type JamendoTrackMusicInfoDto = z.infer<typeof JamendoTrackMusicInfoSchema>;
export type JamendoTrackDto = z.infer<typeof JamendoTrackSchema>;
export type JamendoListTracksResponseDto = z.infer<typeof JamendoListTracksResponseSchema>;
