import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { FormSectionComponent } from '../form-section/form-section.component';
import { SearchContentComponent } from './search-content.component';
import { MessageService } from 'primeng/api';

describe('SearchContentComponent', () => {
  let component: SearchContentComponent;
  let fixture: ComponentFixture<SearchContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchContentComponent, FormSectionComponent],
      imports: [DividerModule, ButtonModule],
      providers: [
        {
          provide: DynamicDialogConfig,
          useValue: {
            data: {
              searches: [
                {
                  selected: true,
                  children: [],
                  label: 'Label',
                  formSection: {},
                },
              ],
            },
          },
        },
        { provide: DynamicDialogRef, useValue: {} },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        MessageService
      ],
    });
    fixture = TestBed.createComponent(SearchContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
