import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationReqComponent } from './quotation-req.component';

describe('QuotationReqComponent', () => {
  let component: QuotationReqComponent;
  let fixture: ComponentFixture<QuotationReqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotationReqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
