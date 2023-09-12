import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemConfigurationAttributeComponent } from './system-configuration-attribute.component';

describe('SystemConfigurationAttributeComponent', () => {
  let component: SystemConfigurationAttributeComponent;
  let fixture: ComponentFixture<SystemConfigurationAttributeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SystemConfigurationAttributeComponent],
    });
    fixture = TestBed.createComponent(SystemConfigurationAttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
