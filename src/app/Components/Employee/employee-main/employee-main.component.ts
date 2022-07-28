import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../Services/employee.service';

@Component({
  selector: 'app-employee-main',
  templateUrl: './employee-main.component.html',
  styleUrls: ['./employee-main.component.css'],
})
export class EmployeeMainComponent implements OnInit {
  @Input() loader: boolean;
  profileArr: any;
  avatar: any;
  flagIcon1: boolean;
  constructor(
    private router: Router,
    private authenticationService: EmployeeService
  ) {
    this.flagIcon1 = true;
  }

  ngOnInit(): void {
    if (!localStorage.getItem('userempid')) {
      console.log(!localStorage.getItem('userempid'));
      this.router.navigate(['/employee/login']);
      this.authenticationService.error('Login to Enter into Employee Portal');
    } else {
      this.loader = true;
      this.authenticationService.info('Setting up profile');
      this.authenticationService.profile().subscribe((data: any) => {
        if (Object.keys(data).length > 0) {
          this.profileArr =
            data['SOAP:Envelope']['SOAP:Body'][
              'ns0:ZFM_DK_EMP_LOGIN_DET.Response'
            ]['RESULT'];
          console.log(this.profileArr);
          this.avatar = this.profileArr['ENAME']['_text'].substring(0, 2);
          console.log(this.avatar);
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
    localStorage.removeItem('userempid');
    localStorage.removeItem('emp-password');
    this.router.navigate(['/employee/login']);
    this.authenticationService.success('Logout Successful');
  };
}
