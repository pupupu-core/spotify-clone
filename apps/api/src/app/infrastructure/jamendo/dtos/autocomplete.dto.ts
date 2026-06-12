import { z } from 'zod';
import { createJamendoResponseSchema } from '$/infrastructure/jamendo/dtos/common.dto';

export const JamendoAutocompleteMatchSchema = z.object({
  match: z.string(),
  count: z.number().optional(),
});

export const JamendoAutocompleteResultsSchema = z.object({
  tags: z.array(JamendoAutocompleteMatchSchema).optional(),
  artists: z.array(JamendoAutocompleteMatchSchema).optional(),
  tracks: z.array(JamendoAutocompleteMatchSchema).optional(),
  albums: z.array(JamendoAutocompleteMatchSchema).optional(),
});

export const JamendoArtistListTracksResponseSchema = createJamendoResponseSchema(
  JamendoAutocompleteResultsSchema,
);

export type JamendoAutocompleteResponseDto = z.infer<typeof JamendoArtistListTracksResponseSchema>;
