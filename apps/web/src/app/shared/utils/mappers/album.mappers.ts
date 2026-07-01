import type { AlbumTrack, ArtistAlbum } from '@streaming-service/model';
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

export function mapAlbumResponseToAlbumUI(
  artistAlbum: ArtistAlbum,
  artistId: string,
  artistName: string,
  tracks: AlbumTrack[],
): AlbumUI {
  return {
    id: artistAlbum.albumId,
    name: artistAlbum.albumName,
    releaseDate: artistAlbum.releaseDate,
    artistId: artistId,
    artistName: artistName,
    imageUrl: artistAlbum.albumImageUrl,
    tracksCount: artistAlbum.tracksCount ?? 0,
    tracks: tracks.map(track => mapAlbumTrackResponseToTrackUI(track)),
  };
}

export function mapAlbumTrackResponseToTrackUI(track: AlbumTrack): TrackUI {
  return {
    id: track.trackId,
    name: track.name,
    duration: Number(track.duration),
    artistId: track.artistId,
    artistName: track.artistName,
    imageUrl: track.imageUrl,
    albumImageUrl: track.albumImageUrl,
    audioUrl: track.audioUrl,
    listenedTotal: track.listenedTotal,
  };
}
