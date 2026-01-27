import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogService } from 'primeng/dynamicdialog';

import { ItemComponent } from './item.component';

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: DialogService, useValue: {} },
        provideZonelessChangeDetection(),
        provideHttpClient(withInterceptorsFromDi()),
      ],
    });
    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
