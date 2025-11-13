import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartModule } from 'primeng/chart';

import { ChartWidgetComponent } from './chart-widget.component';
import { provideZonelessChangeDetection } from '@angular/core';

describe('ChartWidgetComponent', () => {
  let component: ChartWidgetComponent;
  let fixture: ComponentFixture<ChartWidgetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ChartModule],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    fixture = TestBed.createComponent(ChartWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
