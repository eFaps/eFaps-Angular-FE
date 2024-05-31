import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonModule } from 'primeng/button';
import {
  DynamicDialogConfig,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';

import { FilterComponent } from './filter.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [FilterComponent],
    imports: [DynamicDialogModule, ButtonModule],
    providers: [
        {
            provide: DynamicDialogConfig,
            useValue: {
                data: {
                    outline: {
                        header: {},
                    },
                },
            },
        },
        {
            provide: DynamicDialogRef,
            useValue: {
                onClose: {
                    subscribe(): Observable<any> {
                        return new Observable();
                    },
                },
            },
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
    ]
}).compileComponents();

    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
