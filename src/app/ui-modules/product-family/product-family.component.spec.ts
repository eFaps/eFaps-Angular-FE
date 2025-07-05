import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFamilyComponent } from './product-family.component';

describe('ProductFamilyComponent', () => {
  let component: ProductFamilyComponent;
  let fixture: ComponentFixture<ProductFamilyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductFamilyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
