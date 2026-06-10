import { z } from 'zod';
import { createJamendoResponseSchema } from '$/infrastructure/jamendo/dtos/common.dto';

const JamendoArtistTrackShema = z.object({
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

const JamendoArtistTracksShema = z.object({
  id: z.string(),
  name: z.string(),
  website: z.string(),
  joindate: z.string(),
  image: z.string(),
  tracks: z.array(JamendoArtistTrackShema),
});

export const JamendoArtistListTracksResponseSchema =
  createJamendoResponseSchema(JamendoArtistTracksShema);

export type JamendoArtistTracks = z.infer<typeof JamendoArtistTracksShema>;
export type JamendoArtistTrack = z.infer<typeof JamendoArtistTrackShema>;
