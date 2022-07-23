import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenMainComponent } from './ven-main.component';

describe('VenMainComponent', () => {
  let component: VenMainComponent;
  let fixture: ComponentFixture<VenMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VenMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
