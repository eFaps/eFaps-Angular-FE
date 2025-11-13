import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PanelModule } from 'primeng/panel';

import { SubSectionComponent } from './sub-section.component';
import { provideZonelessChangeDetection } from '@angular/core';

describe('SubSectionComponent', () => {
  let component: SubSectionComponent;
  let fixture: ComponentFixture<SubSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PanelModule, NoopAnimationsModule, SubSectionComponent],
      providers: [provideZonelessChangeDetection(),]
    });
    fixture = TestBed.createComponent(SubSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
