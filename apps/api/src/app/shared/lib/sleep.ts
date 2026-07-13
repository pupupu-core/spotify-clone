/**
 * Delays execution for the specified number of milliseconds.
 *
 * Resolves after the delay without returning a value.
 */
export const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));
