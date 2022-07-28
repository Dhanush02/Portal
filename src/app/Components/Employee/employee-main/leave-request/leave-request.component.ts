import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/Components/Services/employee.service';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.css'],
})
export class LeaveRequestComponent implements OnInit {
  leaveReqArr: any;
  constructor(private authenticateService: EmployeeService) {}

  ngOnInit(): void {
    this.authenticateService.leave_request().subscribe((data: any) => {
      this.leaveReqArr =
        data['SOAP:Envelope']['SOAP:Body']['ns0:ZFM_DK_LEAVE_REQ.Response'][
          'RESULT'
        ]['item'];
        console.log(this.leaveReqArr)
    });
  }
}
