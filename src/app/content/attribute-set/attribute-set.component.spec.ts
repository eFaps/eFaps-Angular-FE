import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableModule } from 'primeng/table';

import { AttributeSetComponent } from './attribute-set.component';
import { provideZonelessChangeDetection } from '@angular/core';

describe('AttributeSetComponent', () => {
  let component: AttributeSetComponent;
  let fixture: ComponentFixture<AttributeSetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TableModule, AttributeSetComponent],
      providers: [provideZonelessChangeDetection(),]
    });
    fixture = TestBed.createComponent(AttributeSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
