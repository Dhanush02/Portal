import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsDialogComponent } from './goods-dialog.component';

describe('GoodsDialogComponent', () => {
  let component: GoodsDialogComponent;
  let fixture: ComponentFixture<GoodsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
