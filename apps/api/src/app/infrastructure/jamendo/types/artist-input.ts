import { JamendoListTracksOrder } from '$/infrastructure/jamendo/types/track-input';

export interface JamendoArtistTracksInput {
  order: JamendoListTracksOrder;
  artistId: number[];
  limit?: number;
}
