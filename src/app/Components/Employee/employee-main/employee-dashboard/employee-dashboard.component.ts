import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
})
export class EmployeeDashboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  data = [
    {
      category: 'Employee dashboard',
      title: 'Leave Request',
      description: 'Leave Request.',
      path: '/employee/dashboard/leave-request',
      image: '../../../../../../assets/Images/sales.jpg',
    },
    {
      category: 'Employee dashboard',
      title: 'Pay-Slip',
      description: 'Payslip',
      path: '/employee/dashboard/payslip',
      image: '../../../../../../assets/Images/Mail-Man-.jpg',
    },
  ];
}
