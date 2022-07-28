import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MatDialog } from '@angular/material/dialog';
import { CustomerService } from 'src/app/Components/Services/customer.service';
import { CreditDialogComponent } from './credit-dialog/credit-dialog.component';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-credit-debit-memo',
  templateUrl: './credit-debit-memo.component.html',
  styleUrls: ['./credit-debit-memo.component.css'],
})
export class CreditDebitMemoComponent implements OnInit {
  toppings: any = new FormControl('');
  toppingList: string[] = [
    'DOC_NO',
    'COMP_CODE',
    'CUSTOMER',
    'DB_CR_IND',
    'DISC_BASE',
    'CURRENCY',
  ];

  change(event: any) {
    this.selectedArr = event.value;
  }
  @ViewChild('htmlData') htmlData!: ElementRef;
  displayedColumns: string[] = [
    'DOC_NO',
    'COMP_CODE',
    'CUSTOMER',
    'DB_CR_IND',
    'DISC_BASE',
    'CURRENCY',
  ];
  dataSource!: MatTableDataSource<UserData>;
  creditArr: any;
  @Input() loader: boolean;
  selectedArr: any;
  dialog_Arr: any;
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
        this.authenticationService.success('Downloading Credit Memo Report');
      } else {
        this.authenticationService.error(
          'Error in Downloading Credit Memo Report'
        );
      }

      PDF.save('credit-memo.pdf');
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
    this.creditArr.map((item: any) => {
      if (parseInt(item.DOC_NO['_text']) === parseInt(data)) {
        console.log(item);

        this.dialog_Arr = item;
        if (Object.keys(this.dialog_Arr).length > 0) {
          this.dialog.open(CreditDialogComponent, {
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
    this.authenticationService.credit().subscribe((data: any) => {
      this.creditArr =
        data['SOAP:Envelope']['SOAP:Body'][
          'ns0:ZFM_CUST_CREDIT_MEMO_DK.Response'
        ]['RESULT']['item'];

      console.log(this.creditArr);

      var dataArr = this.creditArr.map((item: any) => {
        console.log;
        // changes is tsfile  noImplicitReturns
        return {
          COMP_CODE: item.COMP_CODE['_text'],
          CUSTOMER: item.CUSTOMER['_text'],
          DB_CR_IND: item.DB_CR_IND['_text'],
          DISC_BASE: item.DISC_BASE['_text'],
          DOC_NO: item.DOC_NO['_text'],
          CURRENCY: item.CURRENCY['_text'],
        };
      });
      var dataAr = dataArr.shift();
      console.log(dataAr);
      this.dataSource = new MatTableDataSource(dataArr);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loader = false;
      this.authenticationService.info('Credit Memo');
    });
  };
}

export interface UserData {
  COMP_CODE: any;
  CUSTOMER: any;
  DB_CR_IND: any;
  DISC_BASE: any;
  DOC_NO: any;
  CURRENCY: any;
}
