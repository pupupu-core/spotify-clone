export interface JamendoAlbumsInput {
  order?: JamendoAlbumsOrder;
  albumsId: number[];
  imagesize?: JamendoImageSize;
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

type JamendoImageSize =
  | 25
  | 35
  | 50
  | 55
  | 60
  | 65
  | 70
  | 75
  | 85
  | 100
  | 130
  | 150
  | 200
  | 300
  | 400
  | 500
  | 600
  | number;
