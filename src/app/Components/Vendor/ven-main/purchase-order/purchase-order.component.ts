import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { VendorService } from 'src/app/Components/Services/vendor.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PurchaseDialogComponent } from './purchase-dialog/purchase-dialog.component';
@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css'],
})
export class PurchaseOrderComponent implements OnInit {
  toppings: any = new FormControl('');
  toppingList: string[] = [
    'VENDOR',
    'PO_NUMBER',
    'EXPORT_NO',
    'STATUS',
    'VEND_NAME',
    'DOC_DATE',
  ];

  change(event: any) {
    this.selectedArr = event.value;
  }
  @ViewChild('htmlData') htmlData!: ElementRef;
  displayedColumns: string[] = [
    'VENDOR',
    'PO_NUMBER',
    'EXPORT_NO',
    'STATUS',
    'VEND_NAME',
    'DOC_DATE',
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
          'Downloading Purchase Order Report'
        );
      } else {
        this.authenticationService.error(
          'Error in Downloading Purchase Order Report'
        );
      }

      PDF.save('Purchase Order.pdf');
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
      if (parseInt(item.PO_NUMBER['_text']) === parseInt(data)) {
        this.newArr = item;
        if (Object.keys(this.newArr).length > 0) {
          this.dialog.open(PurchaseDialogComponent, {
            panelClass: 'my-class',
            data: this.newArr,
          });
        }
      }
    });
  }
  getInquiryList = () => {
    this.loader = true;
    this.authenticationService.purchase().subscribe((data: any) => {
     
      this.inquiryArr =
        data['SOAP:Envelope']['SOAP:Body']['ns0:ZFM_VEN_PO_DK.Response'][
          'HEADER_TABLE'
        ]['item'];
        console.log(this.inquiryArr)

      const dataArr = this.inquiryArr.map((item: any) => {
        console.log(item)
        return {
          PO_NUMBER: item.PO_NUMBER['_text'],
          EXPORT_NO: item.EXPORT_NO['_text'],
          STATUS: item.STATUS['_text'],
          VENDOR: item.VENDOR['_text'],
          VEND_NAME: item.VEND_NAME['_text'],
          DOC_DATE: item.DOC_DATE['_text'],
        };
      });
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(dataArr);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loader = false;
      this.authenticationService.info('Quotation List');
    });
  };
}

export interface UserData {
  PO_NUMBER: any;
  EXPORT_NO: any;
  STATUS: any;
  VENDOR: any;
  VEND_NAME: any;
  DOC_DATE: any;
}
