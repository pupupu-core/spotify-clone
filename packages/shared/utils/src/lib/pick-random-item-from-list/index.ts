/**
 * Returns a random subset of items from the provided list.
 *
 * @param items - Source list to sample from.
 * @param limit - Maximum number of items to include in the result.
 * @returns A shuffled subset with at most `limit` items.
 */
export const pickRandomItemFromList = <T>(items: readonly T[], limit: number): T[] => {
  return [...items].sort(() => Math.random() - 0.5).slice(0, limit);
};
