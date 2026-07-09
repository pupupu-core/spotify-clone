export type PlaylistVisibility = 'private' | 'public' | 'unlisted';

export type PlaylistTrackSource = 'jamendo' | 'userUpload';

export type PlaylistTrackReference =
  | {
      source: 'jamendo';
      externalId: string;
    }
  | {
      source: 'userUpload';
      trackId: string;
    };
