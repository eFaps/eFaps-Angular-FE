import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EQLResponseComponent } from './eqlresponse.component';
import { provideZonelessChangeDetection } from '@angular/core';

describe('EQLResponseComponent', () => {
  let component: EQLResponseComponent;
  let fixture: ComponentFixture<EQLResponseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EQLResponseComponent],
      providers: [provideZonelessChangeDetection()]
    });
    fixture = TestBed.createComponent(EQLResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
