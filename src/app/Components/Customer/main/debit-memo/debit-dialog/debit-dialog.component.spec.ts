import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitDialogComponent } from './debit-dialog.component';

describe('DebitDialogComponent', () => {
  let component: DebitDialogComponent;
  let fixture: ComponentFixture<DebitDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebitDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DebitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
