import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../Services/employee.service';
@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.css'],
})
export class EmployeeLoginComponent implements OnInit {
  constructor(
    private authenticationService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!localStorage.getItem('userempid')) {
      console.log(!localStorage.getItem('userempid'));
      console.log('cannot get data');
      this.router.navigate(['/employee/login']);
    } else {
      this.router.navigate(['/employee/dashboard']);
      this.authenticationService.success('Welcome Again');
    }
  }

  getresult(UserData: any) {
    if (UserData.uname === '' && UserData.pwd === '') {
      this.authenticationService.error('Please enter User Id and Password');
    } else if (UserData.uname === '') {
      this.authenticationService.error('Please enter User Id');
    } else if (UserData.pwd === '') {
      this.authenticationService.error('Please enter Password');
    }
    if (UserData.uname !== '' && UserData.pwd !== '') {
      this.authenticationService.login(UserData).subscribe((data: any) => {
        console.log(data);
        if (
          data['SOAP:Envelope']['SOAP:Body']['ns0:ZFM_DK_EMP_LOGN.Response'][
            'MESSAGE'
          ]['_text'] === 'SUCCESS'
        ) {
          localStorage.setItem('userempid', UserData.uname);
          localStorage.setItem('emp-password', UserData.pwd);
          if (
            localStorage.getItem('userempid') &&
            localStorage.getItem('emp-password')
          ) {
            this.authenticationService.success('Logged in Successfully');
            this.router.navigate(['/employee/dashboard']);
          }
        } else if (
          data['SOAP:Envelope']['SOAP:Body']['ns0:ZFM_DK_EMP_LOGN.Response'][
            'MESSAGE'
          ]['_text'] === 'INVALID PASSWORD'
        ) {
          this.authenticationService.error('Invalid Password');
        } else if (
          data['SOAP:Envelope']['SOAP:Body']['ns0:ZFM_DK_EMP_LOGN.Response'][
            'MESSAGE'
          ]['_text'] === 'USER PASSWORD NOT SET'
        ) {
          this.authenticationService.error('Password not yet created');
          console.log('USER PASSWORD NOT SET');
        } else {
          this.authenticationService.error('User EmpId not in standard table');
        }
      });
    }
  }
}
