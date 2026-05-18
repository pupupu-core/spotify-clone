export const loadComponent = <T>(loader: () => Promise<T>): (() => Promise<T>) => loader;
