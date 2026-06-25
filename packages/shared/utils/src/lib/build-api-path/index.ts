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
