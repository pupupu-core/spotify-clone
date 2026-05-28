export const buildWithApi = ({
  prefix = '/api',
  version = '/v1',
  path,
}: {
  prefix?: string;
  version?: string;
  path: string;
}): string => `${prefix}${version}/${path}`;
