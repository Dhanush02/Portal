import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CustomerService } from 'src/app/Components/Services/customer.service';
import { MatDialog } from '@angular/material/dialog';
import { InquiryDialogComponent } from './inquiry-dialog/inquiry-dialog.component';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-inquiry-list',
  templateUrl: './inquiry-list.component.html',
  styleUrls: ['./inquiry-list.component.css'],
})
export class InquiryListComponent implements OnInit {
  toppings: any = new FormControl('');
  toppingList: string[] = [
    'docNumber',
    'description',
    'date',
    'by',
    'category',
    'sdCurrency',
  ];
  currentPage: any;
  change(event: any) {
    this.selectedArr = event.value;
  }
  @ViewChild('htmlData') htmlData!: ElementRef;
  displayedColumns: string[] = [
    'docNumber',
    'description',
    'date',
    'by',
    'category',
    'sdCurrency',
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
    this.currentPage = 1;
  }
  onPaginateChange(event: any) {
    this.currentPage = event.pageIndex + 1;
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
        this.authenticationService.success('Downloading Inquiry Report');
      } else {
        this.authenticationService.error('Error in Downloading Inquiry Report');
      }

      PDF.save('inquiry.pdf');
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
    console.log(data);
    this.inquiryArr.map((item: any) => {
      if (parseInt(item.VBELN['_text']) === parseInt(data)) {
        this.newArr = item;
        if (Object.keys(this.newArr).length > 0) {
          this.dialog.open(InquiryDialogComponent, {
            panelClass: 'my-class',
            data: this.newArr,
          });
        }
      }
    });
  }
  getInquiryList = () => {
    this.loader = true;
    this.authenticationService.inquiry().subscribe((data: any) => {
      this.inquiryArr =
        data['SOAP:Envelope']['SOAP:Body']['ns0:ZFM_CUST_INQ_LIST.Response'][
          'HEADER_TABLE'
        ]['item'];

      console.log('Inquiry Data', this.inquiryArr);

      const dataArr = this.inquiryArr.map((item: any) => {
        return {
          docNumber: item.VBELN['_text'],
          description: item.BSTNK['_text'],
          date: item.ERDAT['_text'],
          by: item.ERNAM['_text'],
          category: item.VBTYP['_text'],
          sdCurrency: item.WAERK['_text'],
        };
      });
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(dataArr);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loader = false;
      this.authenticationService.info('Inquiry List');
    });
  };
}

export interface UserData {
  docNumber: any;
  description: any;
  date: any;
  by: any;
  category: any;
  sdCurrency: any;
}
