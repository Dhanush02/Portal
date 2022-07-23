import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../Services/customer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authenticationService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!localStorage.getItem('userid')) {
      console.log(!localStorage.getItem('userid'));
      this.router.navigate(['/customer/login']);
    } else {
      this.router.navigate(['/customer/dashboard']);
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
        if (
          data['SOAP:Envelope']['SOAP:Body']['ns0:ZFM_CUST_LOGIN_DK.Response'][
            'MESSAGE'
          ]['_text'] === 'SUCESS'
        ) {
          localStorage.setItem('userid', UserData.uname);
          localStorage.setItem('password', UserData.pwd);
          if (
            localStorage.getItem('userid') &&
            localStorage.getItem('password')
          ) {
            this.authenticationService.success('Logged in Successfully');
            this.router.navigate(['/customer/dashboard']);
          }
        } else if (
          data['SOAP:Envelope']['SOAP:Body']['ns0:ZFM_CUST_LOGIN_DK.Response'][
            'MESSAGE'
          ]['_text'] === 'INVALID PASSWORD'
        ) {
          this.authenticationService.error('Invalid Password');
        } else if (
          data['SOAP:Envelope']['SOAP:Body']['ns0:ZFM_CUST_LOGIN_DK.Response'][
            'MESSAGE'
          ]['_text'] === 'USER PASSWORD NOT SET'
        ) {
          this.authenticationService.error('Password not yet created');
          console.log('USER PASSWORD NOT SET');
        } else {
          this.authenticationService.error('UserId not in standard table');
        }
      });
    }
  }
}
