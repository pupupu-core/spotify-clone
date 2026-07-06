import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TRACK_MOCK } from '~/core/mocks/tracks.mocks';
import { TrackRowComponent } from './track-row.component';

describe('TrackRowComponent', () => {
  let component: TrackRowComponent;
  let fixture: ComponentFixture<TrackRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackRowComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TrackRowComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('isPlaying', false);
    fixture.componentRef.setInput('track', TRACK_MOCK);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
