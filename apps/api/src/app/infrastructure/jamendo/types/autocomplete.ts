export interface JamendoAutocompleteMatch {
  match: string;
  count: number; //опять же, првоерить утром на опциональность count
}

export interface JamendoAutocompleteResult {
  tags: JamendoAutocompleteMatch[];
  artists: JamendoAutocompleteMatch[];
  tracks: JamendoAutocompleteMatch[];
  albums: JamendoAutocompleteMatch[];
}
