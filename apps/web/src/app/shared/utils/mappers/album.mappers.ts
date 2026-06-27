import type { AlbumResponse } from '@streaming-service/model';
import type { AlbumUI } from '~/shared/models/album-ui.model';

export function mapAlbumResponseToAlbumUI(album: AlbumResponse): AlbumUI {
  return {
    id: album.id,
    name: album.name,
    releaseDate: album.releaseDate,
    artistId: album.artistId,
    artistName: album.artistName,
    imageUrl: album.imageUrl,
    tracksCount: album.tracks.length,
  };
}
