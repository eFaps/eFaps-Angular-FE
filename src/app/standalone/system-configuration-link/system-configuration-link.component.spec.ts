import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemConfigurationLinkComponent } from './system-configuration-link.component';

describe('SystemConfigurationLinkComponent', () => {
  let component: SystemConfigurationLinkComponent;
  let fixture: ComponentFixture<SystemConfigurationLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemConfigurationLinkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SystemConfigurationLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
