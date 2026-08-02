import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { UploadTrackDialogComponent } from './upload-track-dialog.component';

describe('UploadTrackDialogComponent', () => {
  let component: UploadTrackDialogComponent;
  let fixture: ComponentFixture<UploadTrackDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadTrackDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UploadTrackDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
