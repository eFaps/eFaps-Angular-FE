import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyChooserComponent } from './company-chooser.component';

describe('CompanyChooserComponent', () => {
  let component: CompanyChooserComponent;
  let fixture: ComponentFixture<CompanyChooserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CompanyChooserComponent],
    });
    fixture = TestBed.createComponent(CompanyChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
