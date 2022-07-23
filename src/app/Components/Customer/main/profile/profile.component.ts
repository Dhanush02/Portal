import { Component, Input, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/Components/Services/customer.service';
// import { AuthenticationService } from '../../service/authentication/authentication.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileArr: any;
  avatar: any;
  @Input() loader: boolean;
  constructor(private authenticationService: CustomerService) {}

  ngOnInit(): void {
    this.authenticationService.info('Loading');
    this.loader = true;
    this.authenticationService.loginDetail().subscribe((data: any) => {
      if (Object.keys(data).length > 0) {
        this.profileArr =
          data['SOAP:Envelope']['SOAP:Body']['ns0:ZFM_CUST_DET_DK.Response'];
        console.log(this.profileArr);
        this.avatar = this.profileArr['CUST_ADDRESS']['MATCHCODE2'][
          '_text'
        ].substring(0, 2);
        console.log(this.avatar);
      }
      this.loader = false;
      this.authenticationService.onCloseSnack();
    });
  }
}
