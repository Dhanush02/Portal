import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VendorService } from '../../Services/vendor.service';
@Component({
  selector: 'app-ven-main',
  templateUrl: './ven-main.component.html',
  styleUrls: ['./ven-main.component.css']
})
export class VenMainComponent implements OnInit {

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
      this.authenticationService.error('Login to Enter into Customer Portal');
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
