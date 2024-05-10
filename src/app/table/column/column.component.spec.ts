import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { OverlayPanelModule } from 'primeng/overlaypanel';

import { ColumnComponent } from './column.component';

describe('ColumnComponent', () => {
  let component: ColumnComponent;
  let fixture: ComponentFixture<ColumnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, OverlayPanelModule],
      declarations: [ColumnComponent],
      providers: [provideRouter([])],
    });
    fixture = TestBed.createComponent(ColumnComponent);
    component = fixture.componentInstance;
    component.rowData = { aFieldName: 'Value' };
    component.column = { header: 'Header', field: 'aFieldName' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
