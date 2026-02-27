import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CIDisplayComponent } from './cidisplay.component';

describe('CIDisplayComponent', () => {
  let component: CIDisplayComponent;
  let fixture: ComponentFixture<CIDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CIDisplayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CIDisplayComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('eqlCIResponse', {
      id: 1,
      type: 'type',
      name: 'name',
      uuid: 'an-uuid',
      attributes: [],
    });
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
