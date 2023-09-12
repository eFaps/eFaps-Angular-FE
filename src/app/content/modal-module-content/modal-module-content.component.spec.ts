import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalModuleContentComponent } from './modal-module-content.component';

describe('ModalModuleContentComponent', () => {
  let component: ModalModuleContentComponent;
  let fixture: ComponentFixture<ModalModuleContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalModuleContentComponent],
    });
    fixture = TestBed.createComponent(ModalModuleContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
