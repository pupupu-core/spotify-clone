// import { JamendoAutocompleteResponseDto } from '../dtos/autocomplete.dto';
// dto: JamendoAutocompleteResponseDto,
// dto.results.key
import { JamendoAutocompleteResult } from '../types/autocomplete';

export const mapToAutocompleteResult = (): JamendoAutocompleteResult => {
  return {
    tags: [
      {
        match: 'string',
        count: 1,
      },
    ],
    artists: [
      {
        match: 'string',
        count: 1,
      },
    ],
    tracks: [
      {
        match: 'string',
        count: 1,
      },
    ],
    albums: [
      {
        match: 'string',
        count: 1,
      },
    ],
  };
};
