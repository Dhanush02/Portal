import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenInvoiceComponent } from './ven-invoice.component';

describe('VenInvoiceComponent', () => {
  let component: VenInvoiceComponent;
  let fixture: ComponentFixture<VenInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VenInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
