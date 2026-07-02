import type { AlbumResponse, AlbumTrack, ArtistAlbum } from '@streaming-service/model';
import type { AlbumUI } from '~/shared/models/album-ui.model';
import type { TrackUI } from '~/shared/models/track-ui.model';

export function mapAlbumArtistResponseToAlbumUI(
  artistAlbum: ArtistAlbum,
  artistId: string,
  artistName: string,
): AlbumUI {
  return {
    id: artistAlbum.albumId,
    name: artistAlbum.albumName,
    releaseDate: artistAlbum.releaseDate,
    artistId: artistId,
    artistName: artistName,
    imageUrl: artistAlbum.albumImageUrl,
    tracksCount: artistAlbum.tracksCount ?? 0,
  };
}

export function mapAlbumResponseToAlbumUI(album: AlbumResponse): AlbumUI {
  return {
    id: album.id,
    name: album.name,
    releaseDate: album.releaseDate,
    artistId: album.artistId,
    artistName: album.artistName,
    imageUrl: album.imageUrl,
    tracksCount: album.tracks.length ?? 0,
    tracks: album.tracks.map(track => mapAlbumTrackResponseToTrackUI(track, album)),
  };
}

export function mapAlbumTrackResponseToTrackUI(track: AlbumTrack, album: AlbumResponse): TrackUI {
  return {
    id: track.trackId,
    name: track.name,
    duration: Number(track.duration),
    artistId: track.artistId ?? album.artistId,
    artistName: track.artistName ?? album.artistName,
    imageUrl: track.imageUrl ?? album.imageUrl,
    albumImageUrl: track.albumImageUrl ?? album.imageUrl,
    audioUrl: track.audioUrl,
    listenedTotal: track.listenedTotal,
  };
}
