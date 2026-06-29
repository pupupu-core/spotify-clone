export interface JamendoAlbumsInput {
  order?: JamendoAlbumsOrder;
  albumsId: number[];
}

export type JamendoAlbumsOrder =
  | JamendoAlbumsRatingOrder
  | JamendoAlbumsTextOrderField
  | `${JamendoAlbumsTextOrderField}_${JamendoAlbumsSortDirection}`;

type JamendoAlbumsSortDirection = 'asc' | 'desc';

type JamendoAlbumsTextOrderField =
  | 'name'
  | 'id'
  | 'releasedate'
  | 'artist_id'
  | 'artist_name'
  | 'track_id'
  | 'track_name'
  | 'track_position';

type JamendoAlbumsRatingOrder = 'popularity_total' | 'popularity_month' | 'popularity_week';
