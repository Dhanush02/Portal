import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard-cont',
  templateUrl: './dashboard-cont.component.html',
  styleUrls: ['./dashboard-cont.component.css'],
})
export class DashboardContComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  data = [
    {
      category: 'Customer dashboard',
      title: 'Inquiry list',
      description: 'Presales document in SAP Sales and distribution.',
      path: '/customer/dashboard/inquiry-list',
      image: '../../../../../../assets/Images/sales.jpg',
    },
    {
      category: 'Customer dashboard',
      title: 'Sales Order',
      description: 'Commercial document prepared by a seller.',
      path: '/customer/dashboard/sales-order',
      image: '../../../../../../assets/Images/Mail-Man-.jpg',
    },
    {
      category: 'Customer dashboard',
      title: 'Delivery list',
      description: 'List of delivery details.',
      path: '/customer/dashboard/delivery-list',
      image: '../../../../../../assets/Images/Astronaut.jpg',
    },
  ];
  financeData = [
    {
      category: 'FINANCE SHEET',
      title: 'Invoice Details',
      description:
        'time-stamped commercial document that itemizes and records a transaction',
      path: '/customer/dashboard/invoice-details',
      image: '../../../../../../assets/Images/Overwork.jpg',
    },
    {
      category: 'FINANCE SHEET',
      title: 'Payment and Aging',
      description: 'List of Payment and Aging Process.',
      path: '/customer/dashboard/payment-aging',
      image: '../../../../../../assets/Images/payment.jpg',
    },
    {
      category: 'FINANCE SHEET',
      title: 'Credit Memo',
      description: 'List of Credit Memo',
      path: '/customer/dashboard/credit_debit-memo',
      image: '../../../../../../assets/Images/credit.jpg',
    },
    {
      category: 'FINANCE SHEET',
      title: 'Debit Memo',
      description: 'List of Debit Memo',
      path: '/customer/dashboard/debit-memo',
      image: '../../../../../../assets/Images/credit.jpg',
    },
    {
      category: 'FINANCE SHEET',
      title: 'Overall Sales',
      description: 'List of Overall Sales data',
      path: '/customer/dashboard/overall-sales',
      image: '../../../../../../assets/Images/invoice.jpg',
    },
  ];
}
