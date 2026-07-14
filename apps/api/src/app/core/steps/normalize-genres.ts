export function normalizeGenres(genres?: string[]): string[] {
  const normalized = (genres ?? [])
    .map(genre => genre.trim().toLowerCase())
    .filter(genre => genre.length > 0);

  return Array.from(new Set(normalized));
}
