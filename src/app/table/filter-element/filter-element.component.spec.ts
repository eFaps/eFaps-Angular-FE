import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterELementComponent } from './filter-element.component';

describe('FilterELementComponent', () => {
  let component: FilterELementComponent;
  let fixture: ComponentFixture<FilterELementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterELementComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterELementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
