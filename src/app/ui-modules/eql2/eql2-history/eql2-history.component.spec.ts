import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EQL2HistoryComponent } from './eql2-history.component';

describe('EQL2HistoryComponent', () => {
  let component: EQL2HistoryComponent;
  let fixture: ComponentFixture<EQL2HistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EQL2HistoryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EQL2HistoryComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
