/**
 * Builds a normalized API URL from origin, prefix, version, and endpoint path.
 *
 * By default it creates `/api/v1/...`. Pass `prefix: null` when the API should
 * be versioned directly as `/v1/...`.
 */
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
