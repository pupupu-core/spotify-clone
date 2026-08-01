export type PlaylistTrackRequest =
  | {
      source: 'jamendo';
      externalId: string;
    }
  | {
      source: 'userUpload';
      trackId: string;
    };
