import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { CreatePlaylistDialogComponent } from './create-playlist-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';

describe('CreatePlaylistDialogComponent', () => {
  let component: CreatePlaylistDialogComponent;
  let fixture: ComponentFixture<CreatePlaylistDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePlaylistDialogComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {
            close: vi.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePlaylistDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
