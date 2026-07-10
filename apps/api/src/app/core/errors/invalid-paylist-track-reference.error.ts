export class InvalidPlaylistTrackReferenceError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = 'InvalidPlaylistTrackReferenceError';
  }
}
