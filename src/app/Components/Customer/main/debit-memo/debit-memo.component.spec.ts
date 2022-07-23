import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitMemoComponent } from './debit-memo.component';

describe('DebitMemoComponent', () => {
  let component: DebitMemoComponent;
  let fixture: ComponentFixture<DebitMemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebitMemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DebitMemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
