import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredReportComponent } from './filtered-report.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('FilteredReportComponent', () => {
  let component: FilteredReportComponent;
  let fixture: ComponentFixture<FilteredReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilteredReportComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FilteredReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
