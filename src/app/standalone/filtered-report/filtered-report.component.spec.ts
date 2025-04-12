import { FilteredReportComponent } from './filtered-report.component';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

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
    fixture.componentRef.setInput('uimodule', {
      id: '123-456-456-465',
      key: 'filtered-report',
      targetMode: 'VIEW',
      properties: {},
      header: 'A header',
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
