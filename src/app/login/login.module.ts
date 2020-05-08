import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { MaterialModule } from './../shared/material.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, MaterialModule],
  providers: [],
})
export class LoginModule {}
