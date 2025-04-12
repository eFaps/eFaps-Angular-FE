import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableModule } from 'primeng/table';

import { TableSectionComponent } from './table-section.component';

describe('TableSectionComponent', () => {
  let component: TableSectionComponent;
  let fixture: ComponentFixture<TableSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TableModule],
      declarations: [TableSectionComponent],
    });
    fixture = TestBed.createComponent(TableSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
