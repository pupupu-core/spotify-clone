import { buildWithApi } from './index';

describe('buildWithApi', () => {
  it('builds a path with default prefix and version', () => {
    expect(buildWithApi({ path: 'tracks' })).toBe('/api/v1/tracks');
  });

  it('builds a path with custom prefix and version', () => {
    expect(
      buildWithApi({
        prefix: '/internal',
        version: '/v2',
        path: 'albums',
      }),
    ).toBe('/internal/v2/albums');
  });
});
