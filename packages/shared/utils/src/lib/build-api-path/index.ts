export const buildApiPath = ({
  prefix = '/api',
  version = '/v1',
  path,
}: {
  prefix?: string | null;
  version?: string;
  path: string;
}): string => {
  const segments = prefix === null ? [version, path] : [prefix, version, path];

  return `/${segments
    .map(segment => segment.replace(/^\/+|\/+$/g, ''))
    .filter(Boolean)
    .join('/')}`;
};
