import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class VendorService {
  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}

  login(data: any) {
    console.log(data);
    return this.http.post('http://localhost:4000/api/v1/vendor/ven-login', {
      uname: data.uname,
      pwd: parseInt(data.pwd),
    });
  }
  quotation() {
    return this.http.post('http://localhost:4000/api/v1/vendor/ven-req', {
      uname: localStorage.getItem('uservenid'),
    });
  }
  venpdf(data1: any, data2: any) {
    console.log(data1,data2);
    return this.http.post('http://localhost:4000/api/v1/vendor/ven-pdf', {
      id: data1,
      year: data2,
    });
  }
  purchase() {
    return this.http.post('http://localhost:4000/api/v1/vendor/ven-po', {
      uname: localStorage.getItem('uservenid'),
    });
  }
  goods() {
    return this.http.post('http://localhost:4000/api/v1/vendor/ven-gr', {
      uname: localStorage.getItem('uservenid'),
    });
  }
  ven_invoice() {
    return this.http.post('http://localhost:4000/api/v1/vendor/ven-invoice', {
      uname: localStorage.getItem('uservenid'),
    });
  }
  ven_pay_age() {
    return this.http.post('http://localhost:4000/api/v1/vendor/ven-pa', {
      uname: localStorage.getItem('uservenid'),
    });
  }
  ven_credit() {
    return this.http.post('http://localhost:4000/api/v1/vendor/ven-cred', {
      uname: localStorage.getItem('uservenid'),
    });
  }
  ven_debit() {
    return this.http.post('http://localhost:4000/api/v1/vendor/ven-deb', {
      uname: localStorage.getItem('uservenid'),
    });
  }
  ven_detail() {
    return this.http.post('http://localhost:4000/api/v1/vendor/ven-detail', {
      uname: localStorage.getItem('uservenid'),
    });
  }
  error(message: string) {
    return this._snackBar.open(message, undefined, {
      panelClass: ['snackbar-error'],
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    });
  }

  success(message: string) {
    return this._snackBar.open(message, undefined, {
      panelClass: ['snackbar-success'],
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    });
  }

  info(message: string) {
    return this._snackBar.open(message, undefined, {
      panelClass: ['snackbar-info'],
      duration: 1500,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    });
  }
  onCloseSnack() {
    return this._snackBar.dismiss();
  }
}
