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
import { GoodsDialogComponent } from './goods-dialog/goods-dialog.component';
@Component({
  selector: 'app-goods-receipt',
  templateUrl: './goods-receipt.component.html',
  styleUrls: ['./goods-receipt.component.css'],
})
export class GoodsReceiptComponent implements OnInit {
  toppings: any = new FormControl('');
  toppingList: string[] = [
    'ENTRY_DATE',
    'MAT_DOC',
    'PSTNG_DATE',
    'ENTRY_TIME',
    'DOC_DATE',
    'USERNAME',
  ];
  currentPage: number;

  change(event: any) {
    this.selectedArr = event.value;
  }
  @ViewChild('htmlData') htmlData!: ElementRef;
  displayedColumns: string[] = [
    'ENTRY_DATE',
    'MAT_DOC',
    'PSTNG_DATE',
    'ENTRY_TIME',
    'DOC_DATE',
    'USERNAME',
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
    this.currentPage = (event.pageIndex + 1);
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
        this.authenticationService.success('Downloading Goods Receipt Report');
      } else {
        this.authenticationService.error(
          'Error in Downloading Goods Receipt Report'
        );
      }

      PDF.save('Goods-Receipt.pdf');
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
      if (parseInt(item.MAT_DOC['_text']) === parseInt(data)) {
        this.newArr = item;
        if (Object.keys(this.newArr).length > 0) {
          this.dialog.open(GoodsDialogComponent, {
            panelClass: 'my-class',
            data: this.newArr,
          });
        }
      }
    });
  }
  getInquiryList = () => {
    this.loader = true;
    this.authenticationService.goods().subscribe((data: any) => {
      this.inquiryArr =
        data['SOAP:Envelope']['SOAP:Body']['ns0:ZFM_VEN_GO_REC_DK.Response'][
          'HEADER_TABLE'
        ]['item'];
      console.log(this.inquiryArr);

      const dataArr = this.inquiryArr.map((item: any) => {
        console.log(item);
        return {
          MAT_DOC: item.MAT_DOC['_text'],
          PSTNG_DATE: item.PSTNG_DATE['_text'],
          ENTRY_TIME: item.ENTRY_TIME['_text'],
          ENTRY_DATE: item.ENTRY_DATE['_text'],
          DOC_DATE: item.DOC_DATE['_text'],
          USERNAME: item.USERNAME['_text'],
        };
      });
      var dataAr = dataArr.shift();
      console.log(dataAr);
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(dataArr);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loader = false;
      this.authenticationService.info('Goods Receipt');
    });
  };
}

export interface UserData {
  MAT_DOC: any;
  PSTNG_DATE: any;
  ENTRY_TIME: any;
  ENTRY_DATE: any;
  DOC_DATE: any;
  USERNAME: any;
}
