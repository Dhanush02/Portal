import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenLoginComponent } from './ven-login.component';

describe('VenLoginComponent', () => {
  let component: VenLoginComponent;
  let fixture: ComponentFixture<VenLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VenLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
