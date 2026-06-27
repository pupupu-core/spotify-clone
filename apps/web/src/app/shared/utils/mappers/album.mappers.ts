import type { ArtistAlbum } from '@streaming-service/model';
import type { AlbumUI } from '~/shared/models/album-ui.model';

export function mapAlbumResponseToAlbumUI(
  album: ArtistAlbum,
  artistId: string,
  artistName: string,
): AlbumUI {
  return {
    id: album.albumId,
    name: album.albumName,
    releaseDate: album.releaseDate,
    artistId: artistId,
    artistName: artistName,
    imageUrl: album.albumImageUrl,
    tracksCount: album.tracksCount,
  };
}
