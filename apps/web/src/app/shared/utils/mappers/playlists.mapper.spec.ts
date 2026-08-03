import type { AlbumResponse, ArtistTrack } from '@streaming-service/model';
import { mapAlbumTrackResponseToTrackUI } from './album.mappers';
import { mapArtistTrackToTrackUI } from './artist.mappers';
import { mapTrackToPlaylistTrackRequest } from './playlists.mapper';

const JAMENDO_TRACK_ID = '2332430';

const ARTIST_TRACK = {
  albumId: 'album-1',
  albumName: 'Album',
  id: JAMENDO_TRACK_ID,
  name: 'Jamendo track',
  duration: '180',
  releaseDate: '2026-01-01',
  licenseUrl: '',
  albumImageUrl: '',
  imageUrl: '',
  audioUrl: 'https://cdn.example/track.mp3',
  audioDownloadUrl: '',
  audioDownloadAllowed: false,
} satisfies ArtistTrack;

const ALBUM = {
  id: 'album-1',
  name: 'Album',
  releaseDate: '2026-01-01',
  artistId: 'artist-1',
  artistName: 'Artist',
  trackId: JAMENDO_TRACK_ID,
  imageUrl: '',
  zipUrl: '',
  zipAllowed: false,
  tracks: [
    {
      count: '1',
      trackId: JAMENDO_TRACK_ID,
      position: '1',
      name: 'Jamendo track',
      duration: '180',
      licenseUrl: '',
      audioUrl: 'https://cdn.example/track.mp3',
      audioDownloadUrl: '',
      audioDownloadAllowed: false,
    },
  ],
} satisfies AlbumResponse;

describe('mapTrackToPlaylistTrackRequest', () => {
  it('maps an artist-page Jamendo track to an external track reference', () => {
    const track = mapArtistTrackToTrackUI('artist-1', 'Artist', ARTIST_TRACK);

    expect(mapTrackToPlaylistTrackRequest(track)).toEqual({
      source: 'jamendo',
      externalId: JAMENDO_TRACK_ID,
    });
  });

  it('maps an album-page Jamendo track to an external track reference', () => {
    const track = mapAlbumTrackResponseToTrackUI(ALBUM.tracks[0], ALBUM);

    expect(mapTrackToPlaylistTrackRequest(track)).toEqual({
      source: 'jamendo',
      externalId: JAMENDO_TRACK_ID,
    });
  });
});
