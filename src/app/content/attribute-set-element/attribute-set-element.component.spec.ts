import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueService } from '../../services/value.service';
import { AttributeSetElementComponent } from './attribute-set-element.component';

describe('AttributeSetElementComponent', () => {
  let component: AttributeSetElementComponent;
  let fixture: ComponentFixture<AttributeSetElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttributeSetElementComponent],
      providers: [
        { provide: ValueService, useValue: {} },
        provideZonelessChangeDetection(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AttributeSetElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
