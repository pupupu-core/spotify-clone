import { JamendoListTracksOrder } from '$/infrastructure/jamendo/types/track-input';

export interface JamendoArtistTracksInput {
  order: JamendoListTracksOrder;
  artistId: number[];
  limit?: number;
}

export interface JamendoArtistAlbumsInput {
  order: JamendoListTracksOrder;
  artistId: number[];
  limit?: number;
}
