import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstTimeUserComponent } from './first-time-user.component';

describe('FirstTimeUserComponent', () => {
  let component: FirstTimeUserComponent;
  let fixture: ComponentFixture<FirstTimeUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstTimeUserComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FirstTimeUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
