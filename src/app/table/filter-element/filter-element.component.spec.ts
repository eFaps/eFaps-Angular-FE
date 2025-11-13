import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterElementComponent } from './filter-element.component';

describe('FilterELementComponent', () => {
  let component: FilterElementComponent;
  let fixture: ComponentFixture<FilterElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
