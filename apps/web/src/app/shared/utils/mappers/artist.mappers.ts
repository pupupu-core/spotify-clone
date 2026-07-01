import type { ArtistMusicInfoResponse, ArtistTrack } from '@streaming-service/model';
import type { TrackUI } from '~/shared/models/track-ui.model';
import type { ArtistPageState } from '~/features/artist/store/artist.state';

export function mapArtistTrackToTrackUI(
  artistId: string,
  artistName: string,
  track: ArtistTrack,
): TrackUI {
  return {
    id: track.id,
    name: track.name,
    duration: Number(track.duration),
    artistId,
    artistName,
    releaseDate: track.releaseDate,
    imageUrl: track.imageUrl,
    albumImageUrl: track.albumImageUrl,
    audioUrl: track.audioUrl,
    albumName: track.albumName,
    albumId: track.albumId,
    listenedTotal: track.listenedTotal,
  };
}

export function mapArtistMusicInfoResponse(
  response: ArtistMusicInfoResponse,
): Partial<ArtistPageState> {
  const description = response.musicInfo.description;

  const descriptionValue =
    (description['en'] ||
      description['ru'] ||
      description['fr'] ||
      description['es'] ||
      Object.values(description).find(v => v.trim() !== '')) ??
    '';

  const biography =
    new DOMParser().parseFromString(descriptionValue, 'text/html').body.textContent ?? null;

  return {
    id: response.id,
    name: response.name,
    biography: biography,
    coverUrl: response.imageUrl,
  };
}
