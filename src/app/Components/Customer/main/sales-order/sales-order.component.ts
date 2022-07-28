import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MatDialog } from '@angular/material/dialog';
import { SalesDialogComponent } from './sales-dialog/sales-dialog.component';
import { CustomerService } from 'src/app/Components/Services/customer.service';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-sales-order',
  templateUrl: './sales-order.component.html',
  styleUrls: ['./sales-order.component.css'],
})
export class SalesOrderComponent implements OnInit {
  toppings: any = new FormControl('');
  toppingList: string[] = [
    'salesDoc',
    'description',
    'soldTo',
    'name',
    'category',
    'date',
  ];

  change(event: any) {
    this.selectedArr = event.value;
  }
  @ViewChild('htmlData') htmlData!: ElementRef;
  displayedColumns: string[] = [
    'salesDoc',
    'description',
    'soldTo',
    'name',
    'category',
    'date',
  ];
  dataSource!: MatTableDataSource<UserData>;
  salesArr: any;
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
      console.log(canvas);
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      if (canvas) {
        this.authenticationService.success('Downloading Sales Order Report');
      } else {
        this.authenticationService.error(
          'Error in Downloading Sales Order Report'
        );
      }

      PDF.save('sales-order.pdf');
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
    this.salesArr.map((item: any) => {
      if (parseInt(item.SD_DOC['_text']) === parseInt(data)) {
        console.log(item);

        this.dialog_Arr = item;
        if (Object.keys(this.dialog_Arr).length > 0) {
          this.dialog.open(SalesDialogComponent, {
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
    this.authenticationService.sales().subscribe((data: any) => {
      this.salesArr =
        data['SOAP:Envelope']['SOAP:Body']['ns0:ZFM_CUST_SALES_LIST.Response'][
          'SALES_ORDER'
        ]['item'];

      console.log(this.salesArr);

      const dataArr = this.salesArr.map((item: any) => {
        return {
          salesDoc: item.SD_DOC['_text'],
          description: item.SHORT_TEXT['_text'],
          soldTo: item.SOLD_TO['_text'],
          name: item.NAME['_text'],
          category: item.DOC_STATUS['_text'],
          date: item.DOC_DATE['_text'],
        };
      });
      this.dataSource = new MatTableDataSource(dataArr);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loader = false;
      this.authenticationService.info('Sales Order');
    });
  };
}

export interface UserData {
  salesDoc: any;
  description: any;
  soldTo: any;
  name: any;
  category: any;
  date: any;
}
