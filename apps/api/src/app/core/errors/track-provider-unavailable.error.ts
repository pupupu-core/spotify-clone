import { API_ERROR_CODES } from '@streaming-service/config';
import { CoreError } from './core.error';

export class TrackProviderUnavailableError extends CoreError {
  public constructor(message = 'Track provider is temporarily unavailable') {
    super({
      message,
      code: API_ERROR_CODES.TRACK.PROVIDER_UNAVAILABLE,
    });
  }
}
