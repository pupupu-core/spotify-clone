import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { TRACK_MOCK } from '~/core/mocks/tracks.mocks';
import { mapTrackResponseToTrackUI } from '~/shared/utils/mappers/track.mappers';
import type { TrackUI } from '~/shared/models/track-ui.model';
import { PpfAudioEngine } from './html-audio.service';
import { PpfPlayerService } from './track-player.service';

interface AudioEngineMock {
  position: ReturnType<typeof signal<number>>;
  duration: ReturnType<typeof signal<number>>;
  isMuted: ReturnType<typeof signal<boolean>>;
  isPlaying: ReturnType<typeof signal<boolean>>;
  volume: ReturnType<typeof signal<number>>;
  onEnded: ReturnType<typeof vi.fn<PpfAudioEngine['onEnded']>>;
  load: ReturnType<typeof vi.fn<PpfAudioEngine['load']>>;
  play: ReturnType<typeof vi.fn<PpfAudioEngine['play']>>;
  pause: ReturnType<typeof vi.fn<PpfAudioEngine['pause']>>;
  toggle: ReturnType<typeof vi.fn<PpfAudioEngine['toggle']>>;
  seek: ReturnType<typeof vi.fn<PpfAudioEngine['seek']>>;
  setVolume: ReturnType<typeof vi.fn<PpfAudioEngine['setVolume']>>;
  toggleMute: ReturnType<typeof vi.fn<PpfAudioEngine['toggleMute']>>;
  clearAudioElement: ReturnType<typeof vi.fn<PpfAudioEngine['clearAudioElement']>>;
}

function createAudioEngineMock(): AudioEngineMock {
  return {
    position: signal(0),
    duration: signal(0),
    isMuted: signal(false),
    isPlaying: signal(false),
    volume: signal(100),
    onEnded: vi.fn<PpfAudioEngine['onEnded']>(),
    load: vi.fn<PpfAudioEngine['load']>(),
    play: vi.fn<PpfAudioEngine['play']>(),
    pause: vi.fn<PpfAudioEngine['pause']>(),
    toggle: vi.fn<PpfAudioEngine['toggle']>(),
    seek: vi.fn<PpfAudioEngine['seek']>(),
    setVolume: vi.fn<PpfAudioEngine['setVolume']>(),
    toggleMute: vi.fn<PpfAudioEngine['toggleMute']>(),
    clearAudioElement: vi.fn<PpfAudioEngine['clearAudioElement']>(),
  };
}

const TRACKS: TrackUI[] = [
  mapTrackResponseToTrackUI(TRACK_MOCK),
  mapTrackResponseToTrackUI({ ...TRACK_MOCK, id: 'track-2', audioUrl: '/track-2.mp3' }),
  mapTrackResponseToTrackUI({ ...TRACK_MOCK, id: 'track-3', audioUrl: '/track-3.mp3' }),
];

describe('PpfPlayerService', () => {
  let service: PpfPlayerService;
  let engine: ReturnType<typeof createAudioEngineMock>;
  let endedHandler = (): void => undefined;

  beforeEach(() => {
    engine = createAudioEngineMock();
    engine.onEnded.mockImplementation(handler => {
      endedHandler = handler;

      return (): void => undefined;
    });

    TestBed.configureTestingModule({
      providers: [PpfPlayerService, { provide: PpfAudioEngine, useValue: engine }],
    });

    service = TestBed.inject(PpfPlayerService);
  });

  it('ignores an empty track list', () => {
    service.playTracks([]);

    expect(service.current()).toBeNull();
    expect(engine.load).not.toHaveBeenCalled();
  });

  it('clamps the start index and starts playback', () => {
    service.playTracks(TRACKS, 99);

    expect(service.current()).toEqual(TRACKS[2]);
    expect(engine.load).toHaveBeenCalledWith('/track-3.mp3');
    expect(engine.play).toHaveBeenCalledTimes(1);
  });

  it('toggles only when a current track exists', () => {
    service.toggle();
    expect(engine.toggle).not.toHaveBeenCalled();

    service.playTracks(TRACKS);
    service.toggle();

    expect(engine.toggle).toHaveBeenCalledTimes(1);
  });

  it('moves to the next track and pauses at the end', () => {
    service.playTracks(TRACKS, 1);
    service.next();

    expect(service.current()).toEqual(TRACKS[2]);

    service.next();

    expect(engine.pause).toHaveBeenCalledTimes(1);
  });

  it('advances when the audio engine emits ended', () => {
    service.playTracks(TRACKS);

    endedHandler();

    expect(service.current()).toEqual(TRACKS[1]);
  });

  it('seeks to zero at the first track and moves backward otherwise', () => {
    service.playTracks(TRACKS);
    service.previous();
    expect(engine.seek).toHaveBeenCalledWith(0);

    service.playTracks(TRACKS, 2);
    service.previous();

    expect(service.current()).toEqual(TRACKS[1]);
  });

  it('delegates seeking, volume, and mute controls', () => {
    service.seek(15);
    service.setVolume(40);
    service.toggleMute();

    expect(engine.seek).toHaveBeenCalledWith(15);
    expect(engine.setVolume).toHaveBeenCalledWith(40);
    expect(engine.toggleMute).toHaveBeenCalledTimes(1);
  });

  it('removes tracks before and at the current index', () => {
    service.playTracks(TRACKS, 2);
    service.removeTrackFromQueue(0);

    expect(service.queue()).toEqual([TRACKS[1], TRACKS[2]]);
    expect(service.index()).toBe(1);

    service.removeTrackFromQueue(1);

    expect(service.queue()).toEqual([TRACKS[1]]);
    expect(service.current()).toEqual(TRACKS[1]);
  });

  it('clears playback after removing the only queued track', () => {
    service.playTracks([TRACKS[0]]);

    service.removeTrackFromQueue(0);

    expect(engine.clearAudioElement).toHaveBeenCalledTimes(1);
    expect(service.queue()).toEqual([]);
    expect(service.index()).toBeNull();
  });

  it('toggles or selects a track by id', () => {
    service.playTracks(TRACKS);
    service.toggleTrackByID(TRACKS[0], TRACKS);
    expect(engine.toggle).toHaveBeenCalledTimes(1);

    service.toggleTrackByID(TRACKS[2], TRACKS);

    expect(service.current()).toEqual(TRACKS[2]);
  });

  it('plays valid queued tracks and ignores invalid indexes', () => {
    service.playTracks(TRACKS);
    engine.play.mockClear();

    service.toggleQueuedTrack(-1);
    service.playQueuedTrack(99);
    expect(engine.play).not.toHaveBeenCalled();

    service.toggleQueuedTrack(1);
    expect(service.current()).toEqual(TRACKS[1]);

    engine.play.mockClear();
    service.playQueuedTrack(1);
    expect(engine.play).toHaveBeenCalledTimes(1);
  });
});
