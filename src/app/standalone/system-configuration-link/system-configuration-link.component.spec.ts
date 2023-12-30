import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { SystemConfigurationLinkComponent } from './system-configuration-link.component';

describe('SystemConfigurationLinkComponent', () => {
  let component: SystemConfigurationLinkComponent;
  let fixture: ComponentFixture<SystemConfigurationLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemConfigurationLinkComponent, HttpClientTestingModule],
      providers: [
        {
          provide: DynamicDialogConfig,
          useValue: {
            data: {},
          },
        },
        { provide: DynamicDialogRef, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SystemConfigurationLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
