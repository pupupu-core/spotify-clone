import { JamendoAutocompleteResponseDto } from '../dtos/autocomplete.dto';
import { JamendoAutocompleteResult } from '../types/autocomplete';

export const mapToAutocompleteResult = (
  dto: JamendoAutocompleteResponseDto,
): JamendoAutocompleteResult => {
  return {
    tags: dto.results.tags ?? [],
    artists: dto.results.artists ?? [],
    tracks: dto.results.tracks ?? [],
    albums: dto.results.albums ?? [],
  };
};
