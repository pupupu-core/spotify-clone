export interface JamendoArtistTracksInput {
  order: JamendoArtistTracksOrder;
  artistId: number[];
}

export interface JamendoArtistAlbumsInput {
  order: JamendoArtistAlbumsOrder;
  artistId: number[];
}

type JamendoArtistSortDirection = 'asc' | 'desc';

type JamendoArtistRatingOrder = 'popularity_total' | 'popularity_month' | 'popularity_week';

type JamendoArtistBaseOrderField = 'name' | 'id' | 'joindate';

type JamendoArtistTrackOrderField =
  | JamendoArtistBaseOrderField
  | 'track_name'
  | 'track_id'
  | 'track_releasedate';

export type JamendoArtistTracksOrder =
  | JamendoArtistRatingOrder
  | JamendoArtistTrackOrderField
  | `${JamendoArtistTrackOrderField}_${JamendoArtistSortDirection}`;

type JamendoArtistAlbumOrderField =
  | JamendoArtistBaseOrderField
  | 'album_name'
  | 'album_id'
  | 'album_releasedate';

export type JamendoArtistAlbumsOrder =
  | JamendoArtistRatingOrder
  | JamendoArtistAlbumOrderField
  | `${JamendoArtistAlbumOrderField}_${JamendoArtistSortDirection}`;
