import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallSalesDialogComponent } from './overall-sales-dialog.component';

describe('OverallSalesDialogComponent', () => {
  let component: OverallSalesDialogComponent;
  let fixture: ComponentFixture<OverallSalesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverallSalesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallSalesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
