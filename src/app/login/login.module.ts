import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { MaterialModule } from './../shared/material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, MaterialModule, FormsModule],
  providers: [],
})
export class LoginModule {}
