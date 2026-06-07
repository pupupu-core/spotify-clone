import type {
  JamendoListTracksResponseDto,
  JamendoTrackDto,
  JamendoTrackMusicInfoDto,
  JamendoTrackMusicInfoTagsDto,
} from '../dtos/track.dto';
import type {
  JamendoTrack,
  JamendoTrackMusicInfo,
  JamendoTrackMusicInfoTags,
} from '../types/track';

const mapToTrackMusicInfoTags = (dto: JamendoTrackMusicInfoTagsDto): JamendoTrackMusicInfoTags => {
  return {
    genres: dto.genres,
    instruments: dto.instruments,
    varTags: dto.vartags,
  };
};

const mapToTrackMusicInfo = (dto: JamendoTrackMusicInfoDto): JamendoTrackMusicInfo => {
  return {
    acousticElectric: dto.acousticelectric,
    gender: dto.gender,
    lang: dto.lang,
    speed: dto.speed,
    vocalInstrumental: dto.vocalinstrumental,
    tags: mapToTrackMusicInfoTags(dto.tags),
  };
};

export const mapToTrack = (dto: JamendoTrackDto): JamendoTrack => {
  return {
    id: dto.id,
    name: dto.name,
    duration: dto.duration,
    artistId: dto.artist_id,
    artistName: dto.artist_name,
    artistIdString: dto.artist_idstr,
    albumName: dto.album_name,
    albumId: dto.album_id,
    licenseUrl: dto.license_ccurl,
    position: dto.position,
    releaseDate: dto.releasedate,
    albumImageUrl: dto.album_image,
    audioUrl: dto.audio,
    audioDownloadUrl: dto.audiodownload,
    proUrl: dto.prourl,
    shortUrl: dto.shorturl,
    shareUrl: dto.shareurl,
    waveformUrl: dto.waveform,
    imageUrl: dto.image,
    musicInfo: dto.musicinfo ? mapToTrackMusicInfo(dto.musicinfo) : undefined,
    isAudioDownloadAllowed: dto.audiodownload_allowed,
    isFreeContent: dto.content_id_free,
  };
};

export const mapToListTracks = (dto: JamendoListTracksResponseDto): JamendoTrack[] => {
  return dto.results.map(mapToTrack);
};
