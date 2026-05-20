export const buildWithApi = (path: string, prefix = 'api', version = 'v1'): string =>
  `${prefix}${version}${path}`;
