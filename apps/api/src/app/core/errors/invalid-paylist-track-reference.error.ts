import { API_ERROR_CODES } from '@streaming-service/config';
import { CoreError } from './core.error';

export class InvalidPlaylistTrackReferenceError extends CoreError {
  public constructor(message = 'Unknown track source') {
    super({
      message,
      code: API_ERROR_CODES.PLAYLIST.INVALID_TRACK_REFERENCE,
    });
  }
}
