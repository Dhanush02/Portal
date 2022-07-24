import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenInvoiceDialogComponent } from './ven-invoice-dialog.component';

describe('VenInvoiceDialogComponent', () => {
  let component: VenInvoiceDialogComponent;
  let fixture: ComponentFixture<VenInvoiceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenInvoiceDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VenInvoiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
