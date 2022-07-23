import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenDebitComponent } from './ven-debit.component';

describe('VenDebitComponent', () => {
  let component: VenDebitComponent;
  let fixture: ComponentFixture<VenDebitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenDebitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VenDebitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
