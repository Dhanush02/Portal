import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenPayAgeComponent } from './ven-pay-age.component';

describe('VenPayAgeComponent', () => {
  let component: VenPayAgeComponent;
  let fixture: ComponentFixture<VenPayAgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenPayAgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VenPayAgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
