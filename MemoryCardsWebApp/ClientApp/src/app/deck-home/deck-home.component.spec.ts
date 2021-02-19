import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckHomeComponent } from './deck-home.component';

describe('DeckHomeComponent', () => {
  let component: DeckHomeComponent;
  let fixture: ComponentFixture<DeckHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeckHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
