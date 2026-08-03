import { signal } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { TRACK_MOCK } from '~/core/mocks/tracks.mocks';
import { SearchApiService } from '~/core/services/search-api.service';
import { INCLUDE_UPLOADS_STORAGE_KEY } from '~/core/services/search-preferences.service';
import { PpfPlayerService } from '~/features/player/services/track-player.service';
import type { TrackUI } from '~/shared/models/track-ui.model';
import { mapTrackResponseToTrackUI } from '~/shared/utils/mappers/track.mappers';
import { PpfSearchPageComponent } from './search-page.component';

interface SearchApiMock {
  tracks: ReturnType<typeof vi.fn<SearchApiService['tracks']>>;
}

interface PlayerMock {
  current: ReturnType<typeof signal<TrackUI | null>>;
  isPlaying: ReturnType<typeof signal<boolean>>;
  toggleTrackByID: ReturnType<typeof vi.fn<PpfPlayerService['toggleTrackByID']>>;
}

describe('PpfSearchPageComponent', () => {
  let component: PpfSearchPageComponent;
  let fixture: ComponentFixture<PpfSearchPageComponent>;
  let searchApi: SearchApiMock;
  let player: PlayerMock;
  let router: Router;

  beforeEach(async () => {
    localStorage.clear();
    searchApi = {
      tracks: vi.fn<SearchApiService['tracks']>().mockReturnValue(of([TRACK_MOCK])),
    };
    player = {
      current: signal<TrackUI | null>(null),
      isPlaying: signal(false),
      toggleTrackByID: vi.fn<PpfPlayerService['toggleTrackByID']>(),
    };

    await TestBed.configureTestingModule({
      imports: [PpfSearchPageComponent],
      providers: [
        provideRouter([{ path: 'search', component: PpfSearchPageComponent }]),
        { provide: SearchApiService, useValue: searchApi },
        { provide: PpfPlayerService, useValue: player },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    await router.navigateByUrl(
      '/search?q=iamretard&genres=funk&minDur=200&maxDur=300&sortBy=duration&sortDir=desc&page=2',
    );

    fixture = TestBed.createComponent(PpfSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('loads query results and renders them in the DOM', () => {
    const element = fixture.nativeElement as HTMLElement;

    expect(searchApi.tracks).toHaveBeenCalledWith('iamretard', { includeUploads: false });
    expect(component.trackList()).toHaveLength(1);
    expect(element.textContent).toContain(TRACK_MOCK.name);
    expect(element.textContent).toContain(TRACK_MOCK.artistName);
  });

  it('persists the upload preference and repeats the search with uploads enabled', async () => {
    const checkbox = fixture.nativeElement.querySelector(
      '.panel-uploads input[type="checkbox"]',
    ) as HTMLInputElement | null;

    expect(checkbox).not.toBeNull();

    checkbox?.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(localStorage.getItem(INCLUDE_UPLOADS_STORAGE_KEY)).toBe('true');
    expect(searchApi.tracks).toHaveBeenLastCalledWith('iamretard', { includeUploads: true });
  });

  it('filters tracks by genre and duration', () => {
    const track = mapTrackResponseToTrackUI(TRACK_MOCK);
    const matchingFilter = JSON.stringify({
      genres: ['funk'],
      minDuration: 200,
      maxDuration: 300,
    });
    const wrongGenreFilter = JSON.stringify({
      genres: ['jazz'],
      minDuration: 200,
      maxDuration: 300,
    });

    expect(component.dataSource.filterPredicate(track, '')).toBe(true);
    expect(component.dataSource.filterPredicate(track, matchingFilter)).toBe(true);
    expect(component.dataSource.filterPredicate(track, wrongGenreFilter)).toBe(false);
  });

  it('provides sortable values for supported columns', () => {
    const track = mapTrackResponseToTrackUI(TRACK_MOCK);

    expect(component.dataSource.sortingDataAccessor(track, 'artist_meta')).toContain(
      TRACK_MOCK.artistName,
    );
    expect(component.dataSource.sortingDataAccessor(track, 'play_count')).toBe(0);
    expect(component.dataSource.sortingDataAccessor(track, 'duration')).toBe(TRACK_MOCK.duration);
    expect(component.dataSource.sortingDataAccessor(track, 'unknown')).toBe('');
  });

  it('updates sorting and pagination state', async () => {
    component.ppfOnSortChange({ active: 'artist_meta', direction: 'asc' });
    component.ppfOnPageChange(3);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(router.url).toContain('sortBy=artist_meta');
    expect(router.url).toContain('sortDir=asc');
  });

  it('delegates a rendered track playback click to the player', () => {
    const playbackButton = fixture.nativeElement.querySelector(
      '[aria-label="Track playback control button"]',
    ) as HTMLButtonElement | null;

    expect(playbackButton).not.toBeNull();

    playbackButton?.click();

    expect(player.toggleTrackByID).toHaveBeenCalledWith(mapTrackResponseToTrackUI(TRACK_MOCK), [
      mapTrackResponseToTrackUI(TRACK_MOCK),
    ]);
  });
});
