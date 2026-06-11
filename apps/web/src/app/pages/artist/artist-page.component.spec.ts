import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { ArtistPageComponent } from './artist-page.component';

describe('ArtistComponent', () => {
  let component: ArtistPageComponent;
  let fixture: ComponentFixture<ArtistPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArtistPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
