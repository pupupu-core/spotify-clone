export type JamendoAutocompleteEntity = 'artists' | 'albums' | 'tracks' | 'tags';

export interface JamendoAutocompleteFromInput {
  prefix: string;
  limit?: number;
  matchcount?: boolean;
  entity?: JamendoAutocompleteEntity[];
}
