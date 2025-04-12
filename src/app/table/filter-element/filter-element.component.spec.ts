import { FilterElementComponent } from './filter-element.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('FilterELementComponent', () => {
  let component: FilterElementComponent;
  let fixture: ComponentFixture<FilterElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [FilterElementComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
