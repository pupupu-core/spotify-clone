import type { TrackAudioStream } from '$/core/models/tracks/track-audio-stream.model';
import { HttpStatus, Injectable, StreamableFile } from '@nestjs/common';
import { type Response } from 'express';

@Injectable()
export class TrackStreamService {
  public createResponse(response: Response, audio: TrackAudioStream): StreamableFile {
    response.setHeader('Accept-Ranges', 'bytes');

    if (audio.range) {
      response.status(HttpStatus.PARTIAL_CONTENT);
      response.setHeader(
        'Content-Range',
        `bytes ${audio.range.start}-${audio.range.end}/${audio.range.totalSize}`,
      );
    }

    return new StreamableFile(audio.body, {
      type: audio.contentType ?? 'audio/mpeg',
      length:
        audio.range === undefined ? audio.contentLength : audio.range.end - audio.range.start + 1,
      disposition: 'inline',
    });
  }
}
