import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentAgingDialogComponent } from './payment-aging-dialog.component';

describe('PaymentAgingDialogComponent', () => {
  let component: PaymentAgingDialogComponent;
  let fixture: ComponentFixture<PaymentAgingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentAgingDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentAgingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
