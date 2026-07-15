import { describe, expect, it } from 'vitest';

import { normalizeGenres } from './normalize-genres';

describe('normalizeGenres', () => {
  it('filters empty values and normalizes genre names', () => {
    expect(normalizeGenres([' Rock ', 'POP', '   ', 'indie', ''])).toEqual([
      'rock',
      'pop',
      'indie',
    ]);
  });

  it('deduplicates case and whitespace variations', () => {
    expect(normalizeGenres(['Rock', 'rock', 'ROCK', '  rock  '])).toEqual(['rock']);
  });

  it('returns an empty array for undefined or empty input', () => {
    expect(normalizeGenres(undefined)).toEqual([]);
    expect(normalizeGenres([])).toEqual([]);
  });
});
