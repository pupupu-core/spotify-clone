import {
  JamendoArtistAlbumDto,
  JamendoArtistAlbumsListDto,
  JamendoArtistListAlbumsResponseDto,
  JamendoArtistTrackDto,
  JamendoArtistTracksDto,
  JamendoArtistTracksResponseDto,
} from '$/infrastructure/jamendo/dtos/artists.dto';
import {
  JamendoArtistAlbum,
  JamendoArtistAlbumsList,
  JamendoArtistTrack,
  JamendoArtistTracks,
} from '$/infrastructure/jamendo/types/artists';

const mapToArtistTrack = (dto: JamendoArtistTrackDto): JamendoArtistTrack => {
  return {
    albumId: dto.album_id,
    albumName: dto.album_name,
    id: dto.id,
    name: dto.name,
    duration: dto.duration,
    releaseDate: dto.releasedate,
    licenseUrl: dto.license_ccurl,
    albumImageUrl: dto.album_image,
    imageUrl: dto.image,
    audioUrl: dto.audio,
    audioDownloadUrl: dto.audiodownload,
    audioDownloadAllowed: dto.audiodownload_allowed,
  };
};

const mapToArtistTracks = (dto: JamendoArtistTracksDto): JamendoArtistTracks => {
  return {
    id: dto.id,
    name: dto.name,
    website: dto.website,
    joinDate: dto.joindate,
    imageUrl: dto.image,
    tracks: dto.tracks.map(mapToArtistTrack),
  };
};

export const mapToArtistTracksResponse = (
  dto: JamendoArtistTracksResponseDto,
): JamendoArtistTracks[] => {
  return dto.results.map(mapToArtistTracks);
};

const mapToArtistAlbum = (dto: JamendoArtistAlbumDto): JamendoArtistAlbum => {
  return {
    albumId: dto.id,
    albumName: dto.name,
    releaseDate: dto.releasedate,
    albumImageUrl: dto.image,
  };
};

const mapToArtistAlbumsList = (dto: JamendoArtistAlbumsListDto): JamendoArtistAlbumsList => {
  return {
    id: dto.id,
    name: dto.name,
    website: dto.website,
    joinDate: dto.joindate,
    imageUrl: dto.image,
    albums: dto.albums.map(mapToArtistAlbum),
  };
};

export const mapToArtistAlbumsListResponse = (
  dto: JamendoArtistListAlbumsResponseDto,
): JamendoArtistAlbumsList[] => {
  return dto.results.map(mapToArtistAlbumsList);
};
