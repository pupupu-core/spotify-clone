import type { ArtistTrack } from '@streaming-service/model';
import type { TrackUI } from '~/shared/models/track-ui.model';

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
  };
}
