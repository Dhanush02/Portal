import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}

  login(data: any) {
    return this.http.post('http://localhost:4000/api/v1/customer/login', {
      uname: parseInt(data.uname),
      pwd: parseInt(data.pwd),
    });
  }
  invoicePdf(data: any) {
    return this.http.post('http://localhost:4000/api/v1/customer/cust-invoice-pdf', {
      uname: parseInt(localStorage.getItem('userid')),
      inv: data,
    });
  }
  inquiry() {
    console.log('hiii');
    return this.http.post('http://localhost:4000/api/v1/customer/inquiry', {
      uname: parseInt(localStorage.getItem('userid')),
    });
  }
  sales() {
    return this.http.post('http://localhost:4000/api/v1/customer/sales', {
      uname: parseInt(localStorage.getItem('userid')),
    });
  }
  delivery() {
    return this.http.post('http://localhost:4000/api/v1/customer/delivery', {
      uname: parseInt(localStorage.getItem('userid')),
    });
  }
  invoice() {
    return this.http.post('http://localhost:4000/api/v1/customer/invoice', {
      uname: parseInt(localStorage.getItem('userid')),
    });
  }
  payment_aging() {
    return this.http.post(
      'http://localhost:4000/api/v1/customer/payment-aging',
      {
        uname: parseInt(localStorage.getItem('userid')),
      }
    );
  }
  credit() {
    return this.http.post('http://localhost:4000/api/v1/customer/credit', {
      uname: parseInt(localStorage.getItem('userid')),
    });
  }
  debit() {
    return this.http.post('http://localhost:4000/api/v1/customer/debit', {
      uname: parseInt(localStorage.getItem('userid')),
    });
  }
  loginDetail() {
    return this.http.post('http://localhost:4000/api/v1/customer/log-detail', {
      uname: parseInt(localStorage.getItem('userid')),
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
