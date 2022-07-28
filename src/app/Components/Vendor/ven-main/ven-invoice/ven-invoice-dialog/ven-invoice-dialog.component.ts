import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VendorService } from 'src/app/Components/Services/vendor.service';

@Component({
  selector: 'app-ven-invoice-dialog',
  templateUrl: './ven-invoice-dialog.component.html',
  styleUrls: ['./ven-invoice-dialog.component.css'],
})
export class VenInvoiceDialogComponent implements OnInit {
  dialog_Arr: any;
  base64data: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public authenticateService: VendorService
  ) {}
  onClose() {
    this.dialog.closeAll();
  }
  ngOnInit(): void {
    this.dialog_Arr = this.data;
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
  openInvPDF(data1: any, data2: any) {
    console.log(data1,data2)
    this.authenticateService.info('Downloading Please wait....');
    this.authenticateService.venpdf(data1, data2).subscribe((url1: any) => {
      this.base64data =
        url1['SOAP:Envelope']['SOAP:Body']['ns0:ZFM_VEN_PDF.Response'][
          'INVOICE_PDF'
        ]['_text'];
      var blob = this.b64toBlob(this.base64data, 'application/pdf');
      let a = document.createElement('a');
      document.body.appendChild(a);
      var url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = String(`${data1}.pdf`);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
      this.authenticateService.success(`Downloaded Invoice number ${data1}`);
    });
  }
}
