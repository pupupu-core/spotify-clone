export interface JamendoAutocompleteMatch {
  match: string;
  count?: number;
}

export interface JamendoAutocompleteResult {
  tags: JamendoAutocompleteMatch[];
  artists: JamendoAutocompleteMatch[];
  tracks: JamendoAutocompleteMatch[];
  albums: JamendoAutocompleteMatch[];
}
