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
@Component({
  selector: 'app-ven-credit',
  templateUrl: './ven-credit.component.html',
  styleUrls: ['./ven-credit.component.css'],
})
export class VenCreditComponent implements OnInit {
  toppings: any = new FormControl('');
  toppingList: string[] = [
    'DOC_NO',
    'REF_DOC',
    'AMOUNT',
    'COMP_CODE',
    'VENDOR',
    'DOC_DATE',
  ];

  change(event: any) {
    this.selectedArr = event.value;
  }
  @ViewChild('htmlData') htmlData!: ElementRef;
  displayedColumns: string[] = [
    'DOC_NO',
    'REF_DOC',
    'AMOUNT',
    'COMP_CODE',
    'VENDOR',
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
        this.authenticationService.success('Downloading Purchase Order Report');
      } else {
        this.authenticationService.error(
          'Error in Downloading Purchase Order Report'
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
  // onRow(data: any) {
  //   console.log(data)
  //   this.inquiryArr.map((item: any) => {
  //     if (parseInt(item.DOC_NO['_text']) === parseInt(data)) {
  //       this.newArr = item;
  //       if (Object.keys(this.newArr).length > 0) {
  //         this.dialog.open(InquiryDialogComponent, {
  //           panelClass: 'my-class',
  //           data: this.newArr,
  //         });
  //       }
  //     }
  //   });
  // }
  getInquiryList = () => {
    this.loader = true;
    this.authenticationService.ven_credit().subscribe((data: any) => {
      console.log(data);
      this.inquiryArr =
        data['SOAP:Envelope']['SOAP:Body']['ns0:ZFM_VEN_CRED_DK.Response'][
          'RESULT'
        ]['item'];
      console.log(this.inquiryArr);

      const dataArr = this.inquiryArr.map((item: any) => {
        console.log(item);
        return {
          DOC_NO: item.DOC_NO['_text'],
          AMOUNT: item.AMOUNT['_text'],
          COMP_CODE: item.COMP_CODE['_text'],
          REF_DOC: item.REF_DOC['_text'],
          VENDOR: item.VENDOR['_text'],
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
  DOC_NO: any;
  AMOUNT: any;
  COMP_CODE: any;
  REF_DOC: any;
  VENDOR: any;
  PSTNG_DATE: any;
}
