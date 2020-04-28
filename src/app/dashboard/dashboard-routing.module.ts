import { InvoiceComponent } from './../invoices/components/invoice/invoice.component';
import { ClientListingComponent } from './../clients/components/client-listing/client-listing.component';
import { InvoiceListingComponent } from './../invoices/components/invoice-listing/invoice-listing.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { MainContentComponent } from './components/main-content/main-content.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: MainContentComponent,
      },
      {
        path: 'invoices',
        component: InvoiceListingComponent,
      },
      {
        path: 'invoices/new',
        component: InvoiceComponent,
      },
      {
        path: 'clients',
        component: ClientListingComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
