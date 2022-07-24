import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VendorService } from 'src/app/Components/Services/vendor.service';
import { VenInvoiceDialogComponent } from './ven-invoice-dialog/ven-invoice-dialog.component';

@Component({
  selector: 'app-ven-invoice',
  templateUrl: './ven-invoice.component.html',
  styleUrls: ['./ven-invoice.component.css'],
})
export class VenInvoiceComponent implements OnInit {
  toppings: any = new FormControl('');
  toppingList: string[] = [
    'INV_DOC_NO',
    'DIFF_INV',
    'GROSS_AMNT',
    'PSTNG_DATE',
    'COMP_CODE',
    'CURRENCY',
  ];

  change(event: any) {
    this.selectedArr = event.value;
  }
  @ViewChild('htmlData') htmlData!: ElementRef;
  displayedColumns: string[] = [
    'INV_DOC_NO',
    'DIFF_INV',
    'GROSS_AMNT',
    'PSTNG_DATE',
    'COMP_CODE',
    'CURRENCY',
  ];
  dataSource!: MatTableDataSource<UserData>;
  inquiryArr: any;
  newArr: any;
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
    private authenticationService: VendorService,
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
        this.authenticationService.success(
          'Downloading Vendor Invoice Report'
        );
      } else {
        this.authenticationService.error(
          'Error in Downloading Vendor Invoice Report'
        );
      }

      PDF.save('Vendor-Invoice.pdf');
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
    console.log(data)
    this.inquiryArr.map((item: any) => {
      if (parseInt(item.INV_DOC_NO['_text']) === parseInt(data)) {
        this.newArr = item;
        if (Object.keys(this.newArr).length > 0) {
          this.dialog.open(VenInvoiceDialogComponent, {
            panelClass: 'my-class',
            data: this.newArr,
          });
        }
      }
    });
  }
  getInquiryList = () => {
    this.loader = true;
    this.authenticationService.ven_invoice().subscribe((data: any) => {
      this.inquiryArr =
        data['SOAP:Envelope']['SOAP:Body']['ns0:ZFM_VEN_INVOICE_DK.Response'][
          'HEADER_TABLE'
        ]['item'];
        console.log(this.inquiryArr)

      const dataArr = this.inquiryArr.map((item: any) => {
        console.log(item)
        return {
          INV_DOC_NO: item.INV_DOC_NO['_text'],
          GROSS_AMNT: item.GROSS_AMNT['_text'],
          PSTNG_DATE: item.PSTNG_DATE['_text'],
          DIFF_INV: item.DIFF_INV['_text'],
          COMP_CODE: item.COMP_CODE['_text'],
          CURRENCY: item.CURRENCY['_text'],
        };
      });
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(dataArr);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loader = false;
      this.authenticationService.info('Vendor Invoice');
    });
  };
}

export interface UserData {
  INV_DOC_NO: any;
  GROSS_AMNT: any;
  PSTNG_DATE: any;
  DIFF_INV: any;
  COMP_CODE: any;
  CURRENCY: any;
}
