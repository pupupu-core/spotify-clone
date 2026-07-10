import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { CardDeveloperPreviewComponent } from './card-developer-preview.component';

describe('CardDeveloperPreviewComponent', () => {
  let component: CardDeveloperPreviewComponent;
  let fixture: ComponentFixture<CardDeveloperPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDeveloperPreviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardDeveloperPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
