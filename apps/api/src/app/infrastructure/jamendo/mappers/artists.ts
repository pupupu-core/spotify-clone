import {
  JamendoArtistTrackDto,
  JamendoArtistTracksDto,
  JamendoArtistTracksResponseDto,
} from '$/infrastructure/jamendo/dtos/artists.dto';
import { JamendoArtistTrack, JamendoArtistTracks } from '$/infrastructure/jamendo/types/artists';

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

export const mapToListArtistTracks = (
  dto: JamendoArtistTracksResponseDto,
): JamendoArtistTracks[] => {
  return dto.results.map(mapToArtistTracks);
};
