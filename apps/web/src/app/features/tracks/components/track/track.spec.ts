import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { TRACK_MOCK } from '~/core/mocks/tracks.mocks';

import { Track } from './track';

describe('Track', () => {
  let component: Track;
  let fixture: ComponentFixture<Track>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Track],
    }).compileComponents();

    fixture = TestBed.createComponent(Track);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('track', TRACK_MOCK);
    fixture.componentRef.setInput('view', 'card');
    fixture.componentRef.setInput('isPlaying', false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
