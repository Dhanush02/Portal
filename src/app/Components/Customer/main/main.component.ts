import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../Services/customer.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  @Input() loader: boolean;
  flagIcon: boolean;
  profileArr: any;
  avatar: any;
  constructor(
    private router: Router,
    private authenticationService: CustomerService
  ) {
    this.flagIcon = true;
  }

  ngOnInit(): void {
    if (!localStorage.getItem('userid')) {
      console.log(!localStorage.getItem('userid'));
      this.router.navigate(['/customer/login']);
      this.authenticationService.error('Login to Enter into Customer Portal');
    } else {
      this.loader = true;
      this.authenticationService.info('Setting up profile');
      this.authenticationService.loginDetail().subscribe((data: any) => {
        if (Object.keys(data).length > 0) {
          this.profileArr =
            data['SOAP:Envelope']['SOAP:Body']['ns0:ZFM_CUST_DET_DK.Response'];
          console.log(this.profileArr);
          this.avatar = this.profileArr['CUST_ADDRESS']['MATCHCODE2'][
            '_text'
          ].substring(0, 2);
          this.loader = false;
          this.authenticationService.onCloseSnack();
        }
      });
    }
  }

  toggleNav = () => {
    this.flagIcon = !this.flagIcon;
  };
  routeDashboard = () => {
    this.router.navigate(['/customer/dashboard']);
    this.authenticationService.info('Customer Dashboard');
  };
  logout = () => {
    this.authenticationService.info('Logging out Please wait...');
    localStorage.removeItem('userid');
    localStorage.removeItem('password');
    this.router.navigate(['/customer/login']);
    this.authenticationService.success('Logout Successful');
  };
}
