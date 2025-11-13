import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFamilyComponent } from './product-family.component';

describe('ProductFamilyComponent', () => {
  let component: ProductFamilyComponent;
  let fixture: ComponentFixture<ProductFamilyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductFamilyComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
