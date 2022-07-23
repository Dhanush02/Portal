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
    return this.http.post('http://localhost:4000/ven-login', {
      uname: data.uname,
      pwd: parseInt(data.pwd),
    });
  }
  quotation() {
    return this.http.post('http://localhost:4000/ven-req', {
      uname: localStorage.getItem('uservenid'),
    });
  }
  purchase() {
    return this.http.post('http://localhost:4000/ven-po', {
      uname: localStorage.getItem('uservenid'),
    });
  }
  goods() {
    return this.http.post('http://localhost:4000/ven-gr', {
      uname: localStorage.getItem('uservenid'),
    });
  }
  ven_invoice() {
    return this.http.post('http://localhost:4000/ven-invoice', {
      uname: localStorage.getItem('uservenid'),
    });
  }
  ven_pay_age() {
    return this.http.post('http://localhost:4000/ven-pa', {
      uname: localStorage.getItem('uservenid'),
    });
  }
  ven_credit() {
    return this.http.post('http://localhost:4000/ven-cred', {
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
