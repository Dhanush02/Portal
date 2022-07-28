import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MatDialog } from '@angular/material/dialog';
import { PaymentAgingDialogComponent } from './payment-aging-dialog/payment-aging-dialog.component';
import { CustomerService } from 'src/app/Components/Services/customer.service';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment-aging',
  templateUrl: './payment-aging.component.html',
  styleUrls: ['./payment-aging.component.css'],
})
export class PaymentAgingComponent implements OnInit {
  toppings: any = new FormControl('');
  toppingList: string[] = [
    'DOC_NO',
    'ALLOC_NMBR',
    'AMOUNT',
    'AMT_DOCCUR',
    'BLINE_DATE',
    'ENTRY_DATE',
  ];

  change(event: any) {
    this.selectedArr = event.value;
  }
  @ViewChild('htmlData') htmlData!: ElementRef;
  displayedColumns: string[] = [
    'DOC_NO',
    'ALLOC_NMBR',
    'AMOUNT',
    'AMT_DOCCUR',
    'BLINE_DATE',
    'ENTRY_DATE',
  ];
  dataSource!: MatTableDataSource<UserData>;
  paymentAgingArr: any;
  dialog_Arr: any;
  @Input() loader: boolean;
  selectedArr: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
    this.getInquiryList();
    this.selectedArr = this.toppingList;
  }
  form: FormGroup = new FormGroup({});
  constructor(
    private authenticationService: CustomerService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      toppingList: [this.toppingList, [Validators.required]],
    });
  }
  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA, { scale: 3 }).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      if (canvas) {
        this.authenticationService.success('Downloading Payment Aging Report');
      } else {
        this.authenticationService.error(
          'Error in Downloading Payment Aging Report'
        );
      }
      PDF.save('payment-aging.pdf');
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onRow(data: any) {
    this.paymentAgingArr.map((item: any) => {
      if (parseInt(item.DOC_NO['_text']) === parseInt(data)) {
        console.log(item);

        this.dialog_Arr = item;
        if (Object.keys(this.dialog_Arr).length > 0) {
          this.dialog.open(PaymentAgingDialogComponent, {
            panelClass: 'my-class',
            data: this.dialog_Arr,
          });
        }
        console.log(this.dialog_Arr);
      }
    });
  }
  getInquiryList = () => {
    this.loader = true;
    this.authenticationService.payment_aging().subscribe((data: any) => {
      console.log(data);
      this.paymentAgingArr =
        data['SOAP:Envelope']['SOAP:Body']['ns0:ZFM_CUST_PAY_AGING.Response'][
          'RESULT'
        ]['item'];

      console.log(this.paymentAgingArr);

      const dataArr = this.paymentAgingArr.map((item: any) => {
        return {
          DOC_NO: item.DOC_NO['_text'],
          ALLOC_NMBR: item.ALLOC_NMBR['_text'],
          AMOUNT: item.AMOUNT['_text'],
          AMT_DOCCUR: item.AMT_DOCCUR['_text'],
          BLINE_DATE: item.BLINE_DATE['_text'],
          ENTRY_DATE: item.ENTRY_DATE['_text'],
        };
      });
      this.dataSource = new MatTableDataSource(dataArr);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loader = false;
      this.authenticationService.info('Payment and Aging');
    });
  };
}

export interface UserData {
  DOC_NO: any;
  ALLOC_NMBR: any;
  AMOUNT: any;
  AMT_DOCCUR: any;
  BLINE_DATE: any;
  ENTRY_DATE: any;
}
