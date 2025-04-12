import { ThemeChooserComponent } from './theme-chooser.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('ThemeChooserComponent', () => {
  let component: ThemeChooserComponent;
  let fixture: ComponentFixture<ThemeChooserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ThemeChooserComponent],
    });
    fixture = TestBed.createComponent(ThemeChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
