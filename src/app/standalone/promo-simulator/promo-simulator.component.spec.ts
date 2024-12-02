import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoSimulatorComponent } from './promo-simulator.component';

describe('PromoSimulatorComponent', () => {
  let component: PromoSimulatorComponent;
  let fixture: ComponentFixture<PromoSimulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromoSimulatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromoSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
