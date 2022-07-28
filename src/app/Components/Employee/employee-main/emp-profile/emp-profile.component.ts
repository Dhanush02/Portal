import { Component, Input, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/Components/Services/employee.service';

@Component({
  selector: 'app-emp-profile',
  templateUrl: './emp-profile.component.html',
  styleUrls: ['./emp-profile.component.css'],
})
export class EmpProfileComponent implements OnInit {
  profileArr: any;
  avatar: any;
  @Input() loader: boolean;
  constructor(private authenticationService: EmployeeService) {}

  ngOnInit(): void {
    this.authenticationService.info('Loading');
    this.loader = true;
    this.authenticationService.profile().subscribe((data: any) => {
      if (Object.keys(data).length > 0) {
        this.profileArr =
          data['SOAP:Envelope']['SOAP:Body']['ns0:ZFM_DK_EMP_LOGIN_DET.Response']['RESULT'];
        console.log(this.profileArr);
        this.avatar = this.profileArr['ENAME'][
          '_text'
        ].substring(0, 2);
        console.log(this.avatar);
      }
      this.loader = false;
      this.authenticationService.onCloseSnack();
    });
  }
}
