import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/Components/Services/employee.service';
@Component({
  selector: 'app-payslip',
  templateUrl: './payslip.component.html',
  styleUrls: ['./payslip.component.css'],
})
export class PayslipComponent implements OnInit {
  base64data: any;
  toppings: any = new FormControl('');
  toppingList: string[] = [
    'SeqNo',
    'Paytype_text',
    'Fiscal_period',
    'PayDate',
    'Date',
    'Download',
  ];
  currentPage: number;

  change(event: any) {
    this.selectedArr = event.value;
  }
  @ViewChild('htmlData') htmlData!: ElementRef;
  displayedColumns: string[] = [
    'SeqNo',
    'Paytype_text',
    'Fiscal_period',
    'PayDate',
    'Date',
    'Download',
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
    private authenticationService: EmployeeService,
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
        this.authenticationService.success('Downloading Payroll Report');
      } else {
        this.authenticationService.error('Error in Downloading Payroll Report');
      }

      PDF.save('Payroll.pdf');
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

  public b64toBlob(b64Data: any, contentType: any) {
    contentType = contentType || '';
    let sliceSize = 512;
    var byteCharacters = atob(b64Data);
    var byteArrays = [];
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  pdfDownload(seqNo: any, payPeriod: any) {
    this.authenticationService
      .payslip(seqNo, payPeriod)
      .subscribe((data: any) => {
        console.log(data);
        this.base64data =
          data['SOAP:Envelope']['SOAP:Body']['ns0:ZFM_DK_EMP_PAYSLIP.Response'][
            'PAYSLIP_DOC'
          ]['_text'];
        var blob = this.b64toBlob(this.base64data, 'application/pdf');
        let a = document.createElement('a');
        document.body.appendChild(a);
        var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = String(`Payslip_${seqNo}.pdf`);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
        this.authenticationService.success(
          `Payslip_${seqNo} Downloaded Succesfully`
        );
      });
  }

  getInquiryList = () => {
    this.loader = true;
    this.authenticationService.payroll().subscribe((data: any) => {
      console.log(data);
      this.inquiryArr =
        data['SOAP:Envelope']['SOAP:Body']['ns0:ZFM_DK_EMP_PAYROLL.Response'][
          'RESULT'
        ]['item'];
      console.log(this.inquiryArr);

      const dataArr = this.inquiryArr.map((item: any) => {
        console.log(item);
        return {
          SeqNo: item.SEQUENCENUMBER['_text'],
          Paytype_text: item.PAYTYPE_TEXT['_text'],
          Fiscal_period: item.FPPERIOD['_text'],
          PayDate: item.PAYDATE['_text'],
          Date: item.FPBEGIN['_text'],
        };
      });
      this.dataSource = new MatTableDataSource(dataArr);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loader = false;
      this.authenticationService.info('Employee Payroll');
    });
  };
}

export interface UserData {
  SeqNo: any;
  Paytype_text: any;
  Fiscal_period: any;
  PayDate: any;
  Date: any;
}
