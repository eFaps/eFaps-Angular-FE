import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableModule } from 'primeng/table';

import { TableSectionComponent } from './table-section.component';
import { provideZonelessChangeDetection } from '@angular/core';

describe('TableSectionComponent', () => {
  let component: TableSectionComponent;
  let fixture: ComponentFixture<TableSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TableModule, TableSectionComponent],
      providers: [provideZonelessChangeDetection()]
    });
    fixture = TestBed.createComponent(TableSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
