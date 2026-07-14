export function normalizeGenres(genres?: string[]): string[] {
  return (genres ?? []).map(genre => genre.trim().toLowerCase()).filter(genre => genre.length > 0);
}
