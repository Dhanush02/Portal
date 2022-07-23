import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  Input,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MatDialog } from '@angular/material/dialog';
import { DebitDialogComponent } from './debit-dialog/debit-dialog.component';
import { CustomerService } from 'src/app/Components/Services/customer.service';

@Component({
  selector: 'app-debit-memo',
  templateUrl: './debit-memo.component.html',
  styleUrls: ['./debit-memo.component.css']
})
export class DebitMemoComponent implements OnInit {

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
  debitArr: any;
  dialog_Arr: any;
  @Input() loader :boolean;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
    console.log("debit on init");
    
    this.getDebitList();
  }
  constructor(
    private authenticationService: CustomerService,
    private dialog: MatDialog
  ) {}
  public openPDF1(): void {
    let DATA: any = document.getElementById('htmlData1');
    html2canvas(DATA, { scale: 3 }).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      if (canvas) {
        this.authenticationService.success('Downloading Debit Memo Report');
      } else {
        this.authenticationService.error(
          'Error in Downloading Debit Memo Report'
        );
      }

      PDF.save('debit-memo.pdf');
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
    this.debitArr.map((item: any) => {
      if (parseInt(item.DOC_NO['_text']) === parseInt(data)) {
        console.log(item);

        this.dialog_Arr = item;
        if (Object.keys(this.dialog_Arr).length > 0) {
          this.dialog.open(DebitDialogComponent, {
            panelClass: 'my-class',
            data: this.dialog_Arr,
          });
        }
        console.log(this.dialog_Arr);
      }
    });
  }
  getDebitList = () => {
    this.loader = true;
    this.authenticationService.debit().subscribe((data: any) => {
      
      this.debitArr =
        data['SOAP:Envelope']['SOAP:Body'][
          'ns0:ZFM_CUST_DEBIT_MEMO_DK.Response'
        ]['RESULT']['item'];

      console.log(this.debitArr);

      const dataArr = this.debitArr.map((item: any) => {
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
      this.authenticationService.info('Debit Memo');
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