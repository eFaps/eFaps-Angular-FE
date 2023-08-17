import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import {
  DynamicDialogConfig,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';

import { FormSectionComponent } from '../form-section/form-section.component';
import { SearchContentComponent } from './search-content.component';

describe('SearchContentComponent', () => {
  let component: SearchContentComponent;
  let fixture: ComponentFixture<SearchContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicDialogModule,
        HttpClientTestingModule,
        DividerModule,
        ButtonModule,
      ],
      declarations: [SearchContentComponent, FormSectionComponent],
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
