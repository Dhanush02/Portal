import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenCardComponent } from './ven-card.component';

describe('VenCardComponent', () => {
  let component: VenCardComponent;
  let fixture: ComponentFixture<VenCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VenCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
