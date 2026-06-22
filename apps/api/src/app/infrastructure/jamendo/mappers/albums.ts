import {
  JamendoAlbumDto,
  JamendoAlbumResponseDto,
  JamendoAlbumTrackDto,
} from '$/infrastructure/jamendo/dtos/albums.dto';
import { JamendoAlbum, JamendoAlbumTrack } from '$/infrastructure/jamendo/types/albums';

const mapToAlbumTrack = (dto: JamendoAlbumTrackDto): JamendoAlbumTrack => {
  return {
    count: dto.count,
    albumId: dto.id,
    position: dto.position,
    name: dto.name,
    duration: dto.duration,
    licenseUrl: dto.license_ccurl,
    audioUrl: dto.audio,
    audioDownloadUrl: dto.audiodownload,
    audioDownloadAllowed: dto.audiodownload_allowed,
  };
};

const mapToAlbum = (dto: JamendoAlbumDto): JamendoAlbum => {
  return {
    id: dto.id,
    name: dto.name,
    releaseDate: dto.releasedate,
    artistId: dto.artist_id,
    artistName: dto.artist_name,
    trackId: dto.track_id,
    imageUrl: dto.image,
    zipUrl: dto.zip,
    zipAllowed: dto.zip_allowed,
    tracks: dto.tracks.map(mapToAlbumTrack),
  };
};

export const mapToAlbumsResponse = (dto: JamendoAlbumResponseDto): JamendoAlbum[] => {
  return dto.results.map(mapToAlbum);
};
