import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-payment-aging-dialog',
  templateUrl: './payment-aging-dialog.component.html',
  styleUrls: ['./payment-aging-dialog.component.css']
})
export class PaymentAgingDialogComponent implements OnInit {

  dialog_Arr: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) {}
  onClose() {
    this.dialog.closeAll();
  }
  ngOnInit(): void {
    this.dialog_Arr = this.data;
  }

}
