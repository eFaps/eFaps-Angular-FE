import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeChooserComponent } from './theme-chooser.component';
import { provideZonelessChangeDetection } from '@angular/core';

describe('ThemeChooserComponent', () => {
  let component: ThemeChooserComponent;
  let fixture: ComponentFixture<ThemeChooserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ThemeChooserComponent],
      providers: [provideZonelessChangeDetection(),]
    });
    fixture = TestBed.createComponent(ThemeChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
