import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { PlaylistShelfComponent } from './playlist-shelf.component';

describe('PlaylistShelfComponent', () => {
  let component: PlaylistShelfComponent;
  let fixture: ComponentFixture<PlaylistShelfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistShelfComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaylistShelfComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('title', 'Featured playlists');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
