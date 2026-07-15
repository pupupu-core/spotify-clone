import { z } from 'zod';
import { createJamendoResponseSchema } from '$/infrastructure/jamendo/dtos/common.dto';
import type { JamendoResponseHeadersDto } from '$/infrastructure/jamendo/dtos/common.dto';

interface JamendoAutocompleteNormalizedResponseDto {
  headers: JamendoResponseHeadersDto;
  results: JamendoAutocompleteResultsDto;
}

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

const JamendoAutocompleteEmptyResultsSchema = z.tuple([]);
const JamendoAutocompleteRawResultsSchema = z.union([
  JamendoAutocompleteResultsSchema,
  JamendoAutocompleteEmptyResultsSchema,
]);

type JamendoAutocompleteResultsDto = z.infer<typeof JamendoAutocompleteResultsSchema>;

export const JamendoAutocompleteResponseSchema = createJamendoResponseSchema(
  JamendoAutocompleteRawResultsSchema,
).transform(
  (dto): JamendoAutocompleteNormalizedResponseDto => ({
    headers: dto.headers,
    results: Array.isArray(dto.results) ? {} : dto.results,
  }),
);

export type JamendoAutocompleteResponseDto = z.infer<typeof JamendoAutocompleteResponseSchema>;
