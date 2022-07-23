import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenCreditComponent } from './ven-credit.component';

describe('VenCreditComponent', () => {
  let component: VenCreditComponent;
  let fixture: ComponentFixture<VenCreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenCreditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VenCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
