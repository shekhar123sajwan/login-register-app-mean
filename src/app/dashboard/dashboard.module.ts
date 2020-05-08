import { ClientsModule } from './../clients/clients.module';
import { InvoicesModule } from './../invoices/invoices.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { MaterialModule } from './../shared/material.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@NgModule({
  declarations: [DashboardComponent, MainContentComponent, ToolbarComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    InvoicesModule,
    ClientsModule,
  ],
})
export class DashboardModule {}
