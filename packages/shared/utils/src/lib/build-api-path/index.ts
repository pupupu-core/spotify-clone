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
  dynamicParams,
}: {
  origin?: string;
  prefix?: string | null;
  version?: string;
  path: string;
  dynamicParams?: Record<string, string>;
}): string => {
  let finalPath = path;

  if (dynamicParams) {
    Object.entries(dynamicParams).forEach(([key, value]) => {
      finalPath = finalPath.split(`:${key}`).join(value);
    });
  }

  const segments = prefix === null ? [version, finalPath] : [prefix, version, finalPath];
  const pathname = `/${segments
    .map(segment => segment.replace(/^\/+|\/+$/g, ''))
    .filter(Boolean)
    .join('/')}`;

  return `${origin.replace(/\/+$/g, '')}${pathname}`;
};
