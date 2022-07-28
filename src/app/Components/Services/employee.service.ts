import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}

  login(data: any) {
    console.log(data);
    return this.http.post('http://localhost:4000/api/v1/employee/login', {
      uname: data.uname,
      pwd: parseInt(data.pwd),
    });
  }
  payroll() {
    return this.http.post('http://localhost:4000/api/v1/employee/payroll', {
      uname: localStorage.getItem('userempid'),
    });
  }
  profile() {
    return this.http.post(
      'http://localhost:4000/api/v1/employee/login-detail',
      {
        uname: localStorage.getItem('userempid'),
      }
    );
  }
  leave_request() {
    return this.http.post('http://localhost:4000/api/v1/employee/leave-req', {
      uname: localStorage.getItem('userempid'),
    });
  }
  payslip(seqNo: any, payPeriod: any) {
    return this.http.post('http://localhost:4000/api/v1/employee/payslip', {
      uname: localStorage.getItem('userempid'),
      seqno: seqNo,
      payvar: payPeriod,
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
