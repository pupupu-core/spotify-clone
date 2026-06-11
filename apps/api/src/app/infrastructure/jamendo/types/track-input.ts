export type JamendoListTrackType = 'single' | 'albumtrack' | 'single+albumtrack';

export interface JamendoListTracksInput {
  order: JamendoListTracksOrder;
  type?: JamendoListTrackType;
  limit?: number;
  offset?: number;
  search?: string;
  genres?: string[];
}

export type JamendoListTracksOrder =
  | 'relevance'
  | JamendoListTracksRatingOrder
  | JamendoListTracksTextOrderField
  | `${JamendoListTracksTextOrderField}_${JamendoListTracksSortDirection}`;

type JamendoListTracksSortDirection = 'asc' | 'desc';

type JamendoListTracksTextOrderField =
  | 'name'
  | 'album_name'
  | 'artist_name'
  | 'releasedate'
  | 'duration'
  | 'id';

type JamendoListTracksRatingOrder =
  | 'buzzrate'
  | 'downloads_week'
  | 'downloads_month'
  | 'downloads_total'
  | 'listens_week'
  | 'listens_month'
  | 'listens_total'
  | 'popularity_week'
  | 'popularity_month'
  | 'popularity_total';
