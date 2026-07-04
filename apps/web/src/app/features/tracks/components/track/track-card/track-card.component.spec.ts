import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { TRACK_MOCK } from '~/core/mocks/tracks.mocks';
import { TrackCardComponent } from './track-card.component';

describe('TrackCardComponent', () => {
  let component: TrackCardComponent;
  let fixture: ComponentFixture<TrackCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrackCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('isPlaying', false);
    fixture.componentRef.setInput('track', TRACK_MOCK);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
