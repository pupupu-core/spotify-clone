import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { ArtistAlbumPageComponent } from './artist-album-page.component';

describe('ArtistAlbumPageComponent', () => {
  let component: ArtistAlbumPageComponent;
  let fixture: ComponentFixture<ArtistAlbumPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistAlbumPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArtistAlbumPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
