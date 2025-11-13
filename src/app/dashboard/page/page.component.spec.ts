import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GridsterModule } from 'angular-gridster2';

import { PageComponent } from './page.component';

describe('PageComponent', () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GridsterModule],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    //fixture = TestBed.createComponent(PageComponent);
    //component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should create', () => {
    // expect(component).toBeTruthy();
  });
});
