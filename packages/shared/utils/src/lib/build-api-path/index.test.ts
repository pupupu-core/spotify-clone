import { buildApiPath } from '.';

describe('buildApiPath', () => {
  it('builds a path with default prefix and version', () => {
    expect(buildApiPath({ path: 'tracks' })).toBe('/api/v1/tracks');
  });

  it('builds a path without a prefix', () => {
    expect(buildApiPath({ prefix: null, version: '/v1', path: '/auth/login' })).toBe(
      '/v1/auth/login',
    );
  });

  it('builds a path with custom prefix and version', () => {
    expect(
      buildApiPath({
        prefix: '/internal',
        version: '/v2',
        path: 'albums',
      }),
    ).toBe('/internal/v2/albums');
  });
});
