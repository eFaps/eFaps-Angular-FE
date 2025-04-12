import { ClassificationDisplayComponent } from './classification-display.component';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('ClassificationDisplayComponent', () => {
  let component: ClassificationDisplayComponent;
  let fixture: ComponentFixture<ClassificationDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassificationDisplayComponent],
      imports: [],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    fixture = TestBed.createComponent(ClassificationDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
