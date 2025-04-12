import { FormSectionComponent } from './form-section.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('FormSectionComponent', () => {
  let component: FormSectionComponent;
  let fixture: ComponentFixture<FormSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormSectionComponent],
    });
    fixture = TestBed.createComponent(FormSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
