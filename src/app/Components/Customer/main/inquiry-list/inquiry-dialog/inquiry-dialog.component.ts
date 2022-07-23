import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-inquiry-dialog',
  templateUrl: './inquiry-dialog.component.html',
  styleUrls: ['./inquiry-dialog.component.css'],
})
export class InquiryDialogComponent implements OnInit {
  dialog_Arr:any;
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
