import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ven-dashboard',
  templateUrl: './ven-dashboard.component.html',
  styleUrls: ['./ven-dashboard.component.css']
})
export class VenDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  data = [
    {
      category: 'Vendor Dashbaord',
      title: 'Quotation Request',
      description: 'Requesting for Quotation',
      path: '/vendor/dashboard/quotation-request',
      image: '../../../../../../assets/Images/quotation.jpg',
    },
    {
      category: 'Vendor dashboard',
      title: 'Purchase Order',
      description: 'Purchasing Order.',
      path: '/vendor/dashboard/purchase-order',
      image: '../../../../../../assets/Images/purchase.jpg',
    },
    {
      category: 'Vendor dashboard',
      title: 'Goods Receipt',
      description: 'Receipt for Goods.',
      path: '/vendor/dashboard/goods-receipt',
      image: '../../../../../../assets/Images/receipt.jpg',
    },
  ];
  financeData = [
    {
      category: 'FINANCE SHEET',
      title: 'Invoice Details',
      description:
        'time-stamped commercial document that itemizes and records a transaction',
      path: '/vendor/dashboard/ven-invoice',
      image: '../../../../../../assets/Images/Overwork.jpg',
    },
    {
      category: 'FINANCE SHEET',
      title: 'Payment and Aging',
      description: 'List of Payment and Aging Process.',
      path: '/vendor/dashboard/ven-payment-aging',
      image: '../../../../../../assets/Images/payment.jpg',
    },
    {
      category: 'FINANCE SHEET',
      title: 'Credit Memo',
      description: 'List of Credit Memo',
      path: '/vendor/dashboard/vendor-credit',
      image: '../../../../../../assets/Images/credit.jpg',
    },
    {
      category: 'FINANCE SHEET',
      title: 'Debit Memo',
      description: 'List of Debit Memo',
      path: '/vendor/dashboard/vendor-debit',
      image: '../../../../../../assets/Images/credit.jpg',
    }
  ];

}
