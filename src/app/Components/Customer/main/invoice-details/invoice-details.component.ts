import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
// import { AuthenticationService } from '../../service/authentication/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { InvoiceDialogComponent } from './invoice-dialog/invoice-dialog.component';
import { CustomerService } from 'src/app/Components/Services/customer.service';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css'],
})
export class InvoiceDetailsComponent implements OnInit {
  toppings: any = new FormControl('');
  toppingList: string[] = [
    'DOC_NO',
    'LOGSYS',
    'DATE',
    'NAME',
    'CURRENCY',
    'TYPE',
  ];
  currentPage: any;

  change(event: any) {
    this.selectedArr = event.value;
  }
  @ViewChild('htmlData') htmlData!: ElementRef;
  displayedColumns: string[] = [
    'DOC_NO',
    'LOGSYS',
    'DATE',
    'NAME',
    'CURRENCY',
    'TYPE',
  ];
  dataSource!: MatTableDataSource<UserData>;
  invoiceArr: any;
  dialog_Arr: any;
  @Input() loader: boolean;
  selectedArr: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
    this.getInquiryList();
    this.selectedArr = this.toppingList;
    this.currentPage = 1;
  }
  onPaginateChange(event: any) {
    this.currentPage = (event.pageIndex + 1);
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
        this.authenticationService.success('Downloading Invoice Report');
      } else {
        this.authenticationService.error(
          'Error in Downloading Invoice Report'
        );
      }

      PDF.save('invoice.pdf');
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
    this.invoiceArr.map((item: any) => {
      if (parseInt(item.KIDNO['_text']) === parseInt(data)) {
        console.log(item);

        this.dialog_Arr = item;
        if (Object.keys(this.dialog_Arr).length > 0) {
          this.dialog.open(InvoiceDialogComponent, {
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
    this.authenticationService.invoice().subscribe((data: any) => {
      console.log(data);
      this.invoiceArr =
        data['SOAP:Envelope']['SOAP:Body']['ns0:ZFM_CUST_INVC_LIST.Response'][
          'RESULT'
        ]['item'];

      console.log(this.invoiceArr);

      const dataArr = this.invoiceArr.map((item: any) => {
        return {
          DOC_NO: item.KIDNO['_text'],
          LOGSYS: item.LOGSYS['_text'],
          DATE: item.ERDAT['_text'],
          NAME: item.ERNAM['_text'],
          CURRENCY: item.WAERK['_text'],
          TYPE: item.VBTYP['_text'],
        };
      });
      this.dataSource = new MatTableDataSource(dataArr);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loader = false;
      this.authenticationService.info('Customer Invoice Details');
    });
  };
}

export interface UserData {
  DOC_NO: any;
  LOGSYS: any;
  DATE: any;
  NAME: any;
  CURRENCY: any;
  TYPE: any;
}
