import { MaterialModule } from './../shared/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceListingComponent } from './components/invoice-listing/invoice-listing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvoiceComponent } from './components/invoice/invoice.component';

@NgModule({
  declarations: [InvoiceListingComponent, InvoiceComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [InvoiceListingComponent, InvoiceComponent],
})
export class InvoicesModule {}
