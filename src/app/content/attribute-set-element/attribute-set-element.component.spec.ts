import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValueService } from 'src/app/services/value.service';

import { AttributeSetElementComponent } from './attribute-set-element.component';

describe('AttributeSetElementComponent', () => {
  let component: AttributeSetElementComponent;
  let fixture: ComponentFixture<AttributeSetElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttributeSetElementComponent],
      providers: [{ provide: ValueService, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(AttributeSetElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
