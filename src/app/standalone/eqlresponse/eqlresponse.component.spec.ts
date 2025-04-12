import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EQLResponseComponent } from './eqlresponse.component';

describe('EQLResponseComponent', () => {
  let component: EQLResponseComponent;
  let fixture: ComponentFixture<EQLResponseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EQLResponseComponent],
    });
    fixture = TestBed.createComponent(EQLResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
