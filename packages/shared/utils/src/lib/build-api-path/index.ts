export const buildApiPath = ({
  origin = '',
  prefix = '/api',
  version = '/v1',
  path,
}: {
  origin?: string;
  prefix?: string | null;
  version?: string;
  path: string;
}): string => {
  const segments = prefix === null ? [version, path] : [prefix, version, path];
  const pathname = `/${segments
    .map(segment => segment.replace(/^\/+|\/+$/g, ''))
    .filter(Boolean)
    .join('/')}`;

  return `${origin.replace(/\/+$/g, '')}${pathname}`;
};
