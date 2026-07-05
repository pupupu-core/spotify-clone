import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { LibraryPageComponent } from './library-page.component';

describe('LibraryPageComponent', () => {
  let component: LibraryPageComponent;
  let fixture: ComponentFixture<LibraryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LibraryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
