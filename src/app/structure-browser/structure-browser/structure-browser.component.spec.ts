import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureBrowserComponent } from './structure-browser.component';

describe('StructureBrowserComponent', () => {
  let component: StructureBrowserComponent;
  let fixture: ComponentFixture<StructureBrowserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StructureBrowserComponent]
    });
    fixture = TestBed.createComponent(StructureBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
