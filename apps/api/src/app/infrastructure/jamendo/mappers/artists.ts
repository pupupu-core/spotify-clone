import {
  JamendoArtistAlbumDto,
  JamendoArtistAlbumsListDto,
  JamendoArtistListAlbumsResponseDto,
  JamendoArtistMusicInfoDto,
  JamendoArtistMusicInfoListDto,
  JamendoArtistMusicInfoResponseDto,
  JamendoArtistTrackDto,
  JamendoArtistTracksDto,
  JamendoArtistTracksResponseDto,
} from '$/infrastructure/jamendo/dtos/artists.dto';
import {
  JamendoArtistAlbum,
  JamendoArtistAlbumsList,
  JamendoArtistMusicInfo,
  JamendoArtistMusicInfoList,
  JamendoArtistTrack,
  JamendoArtistTracks,
} from '$/infrastructure/jamendo/types/artists';

//GET /v3.0/artists/tracks
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

//GET /v3.0/artists/albums
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

//GET /v3.0/artists/musicinfo
const mapToArtistMusicInfo = (dto: JamendoArtistMusicInfoDto): JamendoArtistMusicInfo => {
  return {
    tags: dto.tags,
    description: dto.description,
  };
};

const mapToArtistMusicInfoList = (
  dto: JamendoArtistMusicInfoListDto,
): JamendoArtistMusicInfoList => {
  return {
    id: dto.id,
    name: dto.name,
    website: dto.website,
    joinDate: dto.joindate,
    imageUrl: dto.image,
    shortUrl: dto.shorturl,
    shareUrl: dto.shareurl,
    musicInfo: mapToArtistMusicInfo(dto.musicinfo),
  };
};

export const mapToArtistMusicInfoResponse = (
  dto: JamendoArtistMusicInfoResponseDto,
): JamendoArtistMusicInfoList[] => {
  return dto.results.map(mapToArtistMusicInfoList);
};
