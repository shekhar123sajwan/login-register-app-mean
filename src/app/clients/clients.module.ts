import { MaterialModule } from './../shared/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientListingComponent } from './components/client-listing/client-listing.component';

@NgModule({
  declarations: [ClientListingComponent],
  imports: [CommonModule, MaterialModule],
  exports: [ClientListingComponent],
})
export class ClientsModule {}
