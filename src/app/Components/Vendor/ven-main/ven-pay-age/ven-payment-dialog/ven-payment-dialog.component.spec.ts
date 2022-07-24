import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenPaymentDialogComponent } from './ven-payment-dialog.component';

describe('VenPaymentDialogComponent', () => {
  let component: VenPaymentDialogComponent;
  let fixture: ComponentFixture<VenPaymentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenPaymentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VenPaymentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
