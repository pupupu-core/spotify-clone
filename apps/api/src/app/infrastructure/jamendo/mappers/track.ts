import {
  JamendoListTracksResponseDto,
  JamendoTrackDto,
  JamendoTrackMusicInfoDto,
  JamendoTrackMusicInfoTagsDto,
  JamendoTrackStatsDto,
} from '../dtos/track.dto';
import {
  JamendoTrack,
  JamendoTrackMusicInfo,
  JamendoTrackMusicInfoTags,
  JamendoTrackStats,
} from '../types/track';

const mapToTrackMusicInfoTags = (dto: JamendoTrackMusicInfoTagsDto): JamendoTrackMusicInfoTags => {
  return {
    genres: dto.genres,
    instruments: dto.instruments,
    varTags: dto.vartags,
  };
};

const mapToTrackStats = (dto: JamendoTrackStatsDto): JamendoTrackStats => {
  return {
    downloadsTotal: dto.rate_downloads_total,
    listenedTotal: dto.rate_listened_total,
    playlisted: dto.playlisted,
    favorited: dto.favorited,
    likes: dto.likes,
    dislikes: dto.dislikes,
    averageNote: dto.avgnote,
    notes: dto.notes,
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
    stats: dto.stats ? mapToTrackStats(dto.stats) : undefined,
  };
};

export const mapToListTracks = (dto: JamendoListTracksResponseDto): JamendoTrack[] => {
  return dto.results.map(mapToTrack);
};
