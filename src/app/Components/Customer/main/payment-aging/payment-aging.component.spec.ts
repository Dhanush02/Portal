import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentAgingComponent } from './payment-aging.component';

describe('PaymentAgingComponent', () => {
  let component: PaymentAgingComponent;
  let fixture: ComponentFixture<PaymentAgingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentAgingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentAgingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
