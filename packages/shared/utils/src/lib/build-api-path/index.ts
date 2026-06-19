export const buildApiPath = ({
  prefix = '/api',
  version = '/v1',
  path,
}: {
  prefix?: string | null;
  version?: string;
  path: string;
}): string => {
  if (prefix !== null) {
    return `${prefix}${version}${path}`;
  }

  return `${version}${path}`;
};
