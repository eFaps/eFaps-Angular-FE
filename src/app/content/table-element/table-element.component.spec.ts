import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableElementComponent } from './table-element.component';

describe('TableElementComponent', () => {
  let component: TableElementComponent;
  let fixture: ComponentFixture<TableElementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TableElementComponent],
    });
    fixture = TestBed.createComponent(TableElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
