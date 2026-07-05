import type { TrackAudioStream } from '$/core/models/tracks/track-audio-stream.model';
import { RetrieveTrackAudioStep } from '$/core/steps/retrieve-track-audio.step';
import { Injectable } from '@nestjs/common';

interface RetrieveTrackAudioQuery {
  trackId: string;
  rangeHeader?: string;
}

@Injectable()
export class RetrieveTrackAudioWorkflow {
  public constructor(private readonly retrieveTrackAudioStep: RetrieveTrackAudioStep) {}

  public async execute(query: RetrieveTrackAudioQuery): Promise<TrackAudioStream> {
    // 1. FindPlayableUploadedTrackAudioStep
    //    Finds the ready stored audio object for a published uploaded track.
    // 2. RetrieveStoredAudioObjectStep
    //    Reads the audio object stream from private object storage.
    return this.retrieveTrackAudioStep.execute(query);
  }
}
