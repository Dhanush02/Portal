import { Component, Input, OnInit } from '@angular/core';
import { VendorService } from 'src/app/Components/Services/vendor.service';

@Component({
  selector: 'app-ven-profile',
  templateUrl: './ven-profile.component.html',
  styleUrls: ['./ven-profile.component.css'],
})
export class VenProfileComponent implements OnInit {
  profileArr: any;
  avatar: any;
  @Input() loader: boolean;
  constructor(private authenticationService: VendorService) {}

  ngOnInit(): void {
    // this.authenticationService.info('Loading');
    this.loader = true;
    this.authenticationService.ven_detail().subscribe((data: any) => {
      console.log(data)
      if (Object.keys(data).length > 0) {
        this.profileArr =
          data['SOAP:Envelope']['SOAP:Body']['ns0:ZFM_VEN_DETAIL.Response'];
        console.log(this.profileArr);
        this.avatar = this.profileArr['E_GENERALDETAIL']['VENDOR'][
          '_text'
        ].substring(0, 2);
        console.log(this.avatar);
      }
      this.loader = false;
      // this.authenticationService.onCloseSnack();
    });
  }
}
