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
import { QuotationDialogComponent } from './quotation-dialog/quotation-dialog.component';
@Component({
  selector: 'app-quotation-req',
  templateUrl: './quotation-req.component.html',
  styleUrls: ['./quotation-req.component.css'],
})
export class QuotationReqComponent implements OnInit {
  toppings: any = new FormControl('');
  toppingList: string[] = [
    'EBELN',
    'LIFNR',
    'WKURS',
    'WAERS',
    'AEDAT',
    'ERNAM',
  ];

  change(event: any) {
    this.selectedArr = event.value;
  }
  @ViewChild('htmlData') htmlData!: ElementRef;
  displayedColumns: string[] = [
    'EBELN',
    'LIFNR',
    'WKURS',
    'WAERS',
    'AEDAT',
    'ERNAM',
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
          'Downloading Quotation Request Report'
        );
      } else {
        this.authenticationService.error(
          'Error in Downloading Quotation Request Report'
        );
      }

      PDF.save('Quotation-Request.pdf');
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
      if (parseInt(item.EBELN['_text']) === parseInt(data)) {
        this.newArr = item;
        if (Object.keys(this.newArr).length > 0) {
          this.dialog.open(QuotationDialogComponent, {
            panelClass: 'my-class',
            data: this.newArr,
          });
        }
      }
    });
  }
  getInquiryList = () => {
    this.loader = true;
    this.authenticationService.quotation().subscribe((data: any) => {
      this.inquiryArr =
        data['SOAP:Envelope']['SOAP:Body']['ns0:ZFM_VEN_REQ_QUO_DK.Response'][
          'RESULT'
        ]['item'];
        console.log(this.inquiryArr)

      const dataArr = this.inquiryArr.map((item: any) => {
        console.log(item)
        return {
          LIFNR: item.LIFNR['_text'],
          WKURS: item.WKURS['_text'],
          WAERS: item.WAERS['_text'],
          EBELN: item.EBELN['_text'],
          AEDAT: item.AEDAT['_text'],
          ERNAM: item.ERNAM['_text'],
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
  LIFNR: any;
  WKURS: any;
  WAERS: any;
  EBELN: any;
  AEDAT: any;
  ERNAM: any;
}
