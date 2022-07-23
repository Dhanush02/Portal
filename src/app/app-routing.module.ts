import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/Customer/login/login.component';
import { CreditDebitMemoComponent } from './Components/Customer/main/credit-debit-memo/credit-debit-memo.component';
import { DashboardContComponent } from './Components/Customer/main/dashboard-cont/dashboard-cont.component';
import { DebitMemoComponent } from './Components/Customer/main/debit-memo/debit-memo.component';
import { DeliveryListComponent } from './Components/Customer/main/delivery-list/delivery-list.component';
import { InquiryListComponent } from './Components/Customer/main/inquiry-list/inquiry-list.component';
import { InvoiceDetailsComponent } from './Components/Customer/main/invoice-details/invoice-details.component';
import { MainComponent } from './Components/Customer/main/main.component';
import { OverallSalesComponent } from './Components/Customer/main/overall-sales/overall-sales.component';
import { PaymentAgingComponent } from './Components/Customer/main/payment-aging/payment-aging.component';
import { ProfileComponent } from './Components/Customer/main/profile/profile.component';
import { SalesOrderComponent } from './Components/Customer/main/sales-order/sales-order.component';
import { HomeComponent } from './Components/home/home.component';
import { VenLoginComponent } from './Components/Vendor/ven-login/ven-login.component';
import { GoodsReceiptComponent } from './Components/Vendor/ven-main/goods-receipt/goods-receipt.component';
import { PurchaseOrderComponent } from './Components/Vendor/ven-main/purchase-order/purchase-order.component';
import { QuotationReqComponent } from './Components/Vendor/ven-main/quotation-req/quotation-req.component';
import { VenCreditComponent } from './Components/Vendor/ven-main/ven-credit/ven-credit.component';
import { VenDashboardComponent } from './Components/Vendor/ven-main/ven-dashboard/ven-dashboard.component';
import { VenDebitComponent } from './Components/Vendor/ven-main/ven-debit/ven-debit.component';
import { VenInvoiceComponent } from './Components/Vendor/ven-main/ven-invoice/ven-invoice.component';
import { VenMainComponent } from './Components/Vendor/ven-main/ven-main.component';
import { VenPayAgeComponent } from './Components/Vendor/ven-main/ven-pay-age/ven-pay-age.component';
import { VenProfileComponent } from './Components/Vendor/ven-main/ven-profile/ven-profile.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'customer/login', component: LoginComponent },
  {
    path: 'customer/dashboard',
    component: MainComponent,
    children: [
      { path: '', component: DashboardContComponent },
      { path: 'inquiry-list', component: InquiryListComponent },
      { path: 'sales-order', component: SalesOrderComponent },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'delivery-list',
        component: DeliveryListComponent,
      },
      {
        path: 'invoice-details',
        component: InvoiceDetailsComponent,
      },
      {
        path: 'payment-aging',
        component: PaymentAgingComponent,
      },
      {
        path: 'credit_debit-memo',
        component: CreditDebitMemoComponent,
      },
      {
        path: 'debit-memo',
        component: DebitMemoComponent,
      },
      {
        path: 'overall-sales',
        component: OverallSalesComponent,
      },
    ],
  },
  { path: 'vendor/login', component: VenLoginComponent },
  {
    path: 'vendor/dashboard',
    component: VenMainComponent,
    children: [
      { path: '', component: VenDashboardComponent },
      {
        path: 'quotation-request',
        component: QuotationReqComponent,
      },
      {
        path: 'profile',
        component: VenProfileComponent,
      },
      {
        path: 'purchase-order',
        component: PurchaseOrderComponent,
      },
      {
        path: 'goods-receipt',
        component: GoodsReceiptComponent,
      },
      {
        path: 'ven-invoice',
        component: VenInvoiceComponent,
      },
      {
        path: 'ven-payment-aging',
        component: VenPayAgeComponent,
      },
      {
        path: 'vendor-credit',
        component: VenCreditComponent,
      },
      {
        path: 'vendor-debit',
        component: VenDebitComponent,
      },
    ],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
