import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VendorService } from '../../Services/vendor.service';
@Component({
  selector: 'app-ven-login',
  templateUrl: './ven-login.component.html',
  styleUrls: ['./ven-login.component.css']
})
export class VenLoginComponent implements OnInit {

  constructor(
    private authenticationService: VendorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!localStorage.getItem('uservenid')) {
      console.log(!localStorage.getItem('uservenid'));
      console.log("cannot get data")
      this.router.navigate(['/vendor/login']);
    } else {
      this.router.navigate(['/vendor/dashboard']);
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
        console.log(data)
        if (
          data['SOAP:Envelope']['SOAP:Body']['ns0:ZFM_VEN_LOGIN_DHANUSH.Response'][
            'MESSAGE'
          ]['_text'] === 'SUCCESS'
        ) {
          localStorage.setItem('uservenid', UserData.uname);
          localStorage.setItem('ven-password', UserData.pwd);
          if (
            localStorage.getItem('uservenid') &&
            localStorage.getItem('ven-password')
          ) {
            this.authenticationService.success('Logged in Successfully');
            this.router.navigate(['/vendor/dashboard']);
          }
        } else if (
          data['SOAP:Envelope']['SOAP:Body']['ns0:ZFM_VEN_LOGIN_DHANUSH.Response'][
            'MESSAGE'
          ]['_text'] === 'INVALID PASSWORD'
        ) {
          this.authenticationService.error('Invalid Password');
        } else if (
          data['SOAP:Envelope']['SOAP:Body']['ns0:ZFM_VEN_LOGIN_DHANUSH.Response'][
            'MESSAGE'
          ]['_text'] === 'USER PASSWORD NOT SET'
        ) {
          this.authenticationService.error('Password not yet created');
          console.log('USER PASSWORD NOT SET');
        } else {
          this.authenticationService.error('User VendorId not in standard table');
        }
      });
    }
  }

}
