import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VendorService } from '../../Services/vendor.service';
@Component({
  selector: 'app-ven-main',
  templateUrl: './ven-main.component.html',
  styleUrls: ['./ven-main.component.css'],
})
export class VenMainComponent implements OnInit {
  @Input() loader: boolean;
  profileArr: any;
  avatar: any;
  flagIcon1: boolean;
  constructor(
    private router: Router,
    private authenticationService: VendorService
  ) {
    this.flagIcon1 = true;
  }

  ngOnInit(): void {
    if (!localStorage.getItem('uservenid')) {
      console.log(!localStorage.getItem('uservenid'));
      this.router.navigate(['/vendor/login']);
      this.authenticationService.error('Login to Enter into Vendor Portal');
    } else {
      this.loader = true;
      this.authenticationService.info('Setting up profile');
      this.authenticationService.ven_detail().subscribe((data: any) => {
        if (Object.keys(data).length > 0) {
          this.profileArr =
            data['SOAP:Envelope']['SOAP:Body']['ns0:ZFM_VEN_DETAIL.Response'];
          console.log(this.profileArr);
          this.avatar = this.profileArr['E_GENERALDETAIL']['VENDOR'][
            '_text'
          ].substring(0, 2);
          this.loader = false;
          this.authenticationService.onCloseSnack();
        }
      });
    }
  }
  toggleNav = () => {
    this.flagIcon1 = !this.flagIcon1;
  };
  logout = () => {
    this.authenticationService.info('Logging out Please wait...');
    // localStorage.clear();
    localStorage.removeItem('uservenid');
    localStorage.removeItem('ven-password');
    this.router.navigate(['/vendor/login']);
    this.authenticationService.success('Logout Successful');
  };
}
