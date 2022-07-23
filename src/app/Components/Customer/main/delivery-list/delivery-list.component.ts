import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MatDialog } from '@angular/material/dialog';
import { DeliveryDialogComponent } from './delivery-dialog/delivery-dialog.component';
import { CustomerService } from 'src/app/Components/Services/customer.service';
@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.css'],
})
export class DeliveryListComponent implements OnInit {
  @Input() loader: boolean;
  @ViewChild('htmlData') htmlData!: ElementRef;
  displayedColumns: string[] = [
    'VBELN',
    'WADAT',
    'WADAT_IST',
    'WAERK',
    'WAUHR',
    'ERNAM',
  ];
  dataSource!: MatTableDataSource<UserData>;
  deliveryArr: any;
  newArr: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
    this.getInquiryList();
  }
  constructor(
    private authenticationService: CustomerService,
    private dialog: MatDialog
  ) {}
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
        this.authenticationService.success('Downloading Delivery List Report');
      } else {
        this.authenticationService.error(
          'Error in Downloading Delivery List Report'
        );
      }

      PDF.save('delivery-list.pdf');
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
    this.deliveryArr.map((item: any) => {
      if (parseInt(item.VBELN['_text']) === parseInt(data)) {
        console.log(item);

        this.newArr = item;
        if (Object.keys(this.newArr).length > 0) {
          this.dialog.open(DeliveryDialogComponent, {
            panelClass: 'my-class',
            data: this.newArr,
          });
        }
        console.log(this.newArr);
      }
    });
  }
  getInquiryList = () => {
    this.loader = true;
    this.authenticationService.delivery().subscribe((data: any) => {
      this.deliveryArr =
        data['SOAP:Envelope']['SOAP:Body'][
          'ns0:ZFM_CUST_DELIVERY_LIST.Response'
        ]['HEADER_TABLE']['item'];

      console.log(this.deliveryArr);

      const dataArr = this.deliveryArr.map((item: any) => {
        return {
          VBELN: item.VBELN['_text'],
          WADAT: item.WADAT['_text'],
          WADAT_IST: item.WADAT_IST['_text'],
          WAERK: item.WAERK['_text'],
          WAUHR: item.WAUHR['_text'],
          ERNAM: item.ERNAM['_text'],
        };
      });
      this.dataSource = new MatTableDataSource(dataArr);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loader = false;
      this.authenticationService.info('Delivery List');
    });
  };
}

export interface UserData {
  VBELN: any;
  WADAT: any;
  WADAT_IST: any;
  WAERK: any;
  WAUHR: any;
  ERNAM: any;
}
