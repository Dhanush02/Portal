import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenCreditDialogComponent } from './ven-credit-dialog.component';

describe('VenCreditDialogComponent', () => {
  let component: VenCreditDialogComponent;
  let fixture: ComponentFixture<VenCreditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenCreditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VenCreditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
