import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './Components/Customer/login/login.component';
import { MainComponent } from './Components/Customer/main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './Components/home/home.component';
import { InquiryListComponent } from './Components/Customer/main/inquiry-list/inquiry-list.component';
import { SalesOrderComponent } from './Components/Customer/main/sales-order/sales-order.component';
import { DashboardContComponent } from './Components/Customer/main/dashboard-cont/dashboard-cont.component';
import { DashboardCardComponent } from './Components/Customer/main/dashboard-cont/dashboard-card/dashboard-card.component';
import { DeliveryListComponent } from './Components/Customer/main/delivery-list/delivery-list.component';
import { InvoiceDetailsComponent } from './Components/Customer/main/invoice-details/invoice-details.component';
import { PaymentAgingComponent } from './Components/Customer/main/payment-aging/payment-aging.component';
import { CreditDebitMemoComponent } from './Components/Customer/main/credit-debit-memo/credit-debit-memo.component';
import { DebitMemoComponent } from './Components/Customer/main/debit-memo/debit-memo.component';
import { OverallSalesComponent } from './Components/Customer/main/overall-sales/overall-sales.component';
import { LoaderComponent } from './Components/loader/loader.component';
import { ProfileComponent } from './Components/Customer/main/profile/profile.component';
import { VenLoginComponent } from './Components/Vendor/ven-login/ven-login.component';
import { VenMainComponent } from './Components/Vendor/ven-main/ven-main.component';
import { GoodsReceiptComponent } from './Components/Vendor/ven-main/goods-receipt/goods-receipt.component';
import { PurchaseOrderComponent } from './Components/Vendor/ven-main/purchase-order/purchase-order.component';
import { QuotationReqComponent } from './Components/Vendor/ven-main/quotation-req/quotation-req.component';
import { VenCreditComponent } from './Components/Vendor/ven-main/ven-credit/ven-credit.component';
import { VenDashboardComponent } from './Components/Vendor/ven-main/ven-dashboard/ven-dashboard.component';
import { VenDebitComponent } from './Components/Vendor/ven-main/ven-debit/ven-debit.component';
import { VenInvoiceComponent } from './Components/Vendor/ven-main/ven-invoice/ven-invoice.component';
import { VenPayAgeComponent } from './Components/Vendor/ven-main/ven-pay-age/ven-pay-age.component';
import { VenProfileComponent } from './Components/Vendor/ven-main/ven-profile/ven-profile.component';
import { VenCardComponent } from './Components/Vendor/ven-main/ven-dashboard/ven-card/ven-card.component';
import { GoodsDialogComponent } from './Components/Vendor/ven-main/goods-receipt/goods-dialog/goods-dialog.component';
import { PurchaseDialogComponent } from './Components/Vendor/ven-main/purchase-order/purchase-dialog/purchase-dialog.component';
import { QuotationDialogComponent } from './Components/Vendor/ven-main/quotation-req/quotation-dialog/quotation-dialog.component';
import { VenInvoiceDialogComponent } from './Components/Vendor/ven-main/ven-invoice/ven-invoice-dialog/ven-invoice-dialog.component';
import { VenPaymentDialogComponent } from './Components/Vendor/ven-main/ven-pay-age/ven-payment-dialog/ven-payment-dialog.component';
import { VenCreditDialogComponent } from './Components/Vendor/ven-main/ven-credit/ven-credit-dialog/ven-credit-dialog.component';
import { EmployeeLoginComponent } from './Components/Employee/employee-login/employee-login.component';
import { EmployeeMainComponent } from './Components/Employee/employee-main/employee-main.component';
import { PayslipComponent } from './Components/Employee/employee-main/payslip/payslip.component';
import { LeaveRequestComponent } from './Components/Employee/employee-main/leave-request/leave-request.component';
import { EmployeeDashboardComponent } from './Components/Employee/employee-main/employee-dashboard/employee-dashboard.component';
import { EmpProfileComponent } from './Components/Employee/employee-main/emp-profile/emp-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    HomeComponent,
    InquiryListComponent,
    SalesOrderComponent,
    DashboardCardComponent,
    DashboardContComponent,
    DeliveryListComponent,
    InvoiceDetailsComponent,
    PaymentAgingComponent,
    CreditDebitMemoComponent,
    DebitMemoComponent,
    OverallSalesComponent,
    LoaderComponent,
    ProfileComponent,
    VenLoginComponent,
    VenMainComponent,
    GoodsReceiptComponent,
    PurchaseOrderComponent,
    QuotationReqComponent,
    VenCreditComponent,
    VenDashboardComponent,
    VenDebitComponent,
    VenInvoiceComponent,
    VenPayAgeComponent,
    VenProfileComponent,
    VenCardComponent,
    GoodsDialogComponent,
    PurchaseDialogComponent,
    QuotationDialogComponent,
    VenInvoiceDialogComponent,
    VenPaymentDialogComponent,
    VenCreditDialogComponent,
    EmployeeLoginComponent,
    EmployeeMainComponent,
    PayslipComponent,
    LeaveRequestComponent,
    EmployeeDashboardComponent,
    EmpProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  exports: [LoaderComponent, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
