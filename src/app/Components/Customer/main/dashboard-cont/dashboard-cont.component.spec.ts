import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardContComponent } from './dashboard-cont.component';

describe('DashboardContComponent', () => {
  let component: DashboardContComponent;
  let fixture: ComponentFixture<DashboardContComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardContComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardContComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
