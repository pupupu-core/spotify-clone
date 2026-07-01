export type AutocompleteEntity = 'albums' | 'artists' | 'tags' | 'tracks';

export interface AutocompleteMatch {
  match: string;
  count?: number;
}

export type AutocompleteResponse = Record<AutocompleteEntity, AutocompleteMatch[]>;
