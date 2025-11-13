import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoSimulatorComponent } from './promo-simulator.component';

describe('PromoSimulatorComponent', () => {
  let component: PromoSimulatorComponent;
  let fixture: ComponentFixture<PromoSimulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromoSimulatorComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PromoSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
