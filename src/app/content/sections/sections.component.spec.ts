import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionsComponent } from './sections.component';

describe('SectionsComponent', () => {
  let component: SectionsComponent;
  let fixture: ComponentFixture<SectionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SectionsComponent],
    });
    fixture = TestBed.createComponent(SectionsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('sections', []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
