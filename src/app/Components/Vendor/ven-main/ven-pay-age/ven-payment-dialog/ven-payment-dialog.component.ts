import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ven-payment-dialog',
  templateUrl: './ven-payment-dialog.component.html',
  styleUrls: ['./ven-payment-dialog.component.css']
})
export class VenPaymentDialogComponent implements OnInit {

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
