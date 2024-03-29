import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableModule } from 'primeng/table';

import { AttributeSetComponent } from './attribute-set.component';

describe('AttributeSetComponent', () => {
  let component: AttributeSetComponent;
  let fixture: ComponentFixture<AttributeSetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TableModule],
      declarations: [AttributeSetComponent],
    });
    fixture = TestBed.createComponent(AttributeSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
