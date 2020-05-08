import { RegisterRoutingModule } from './register-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';

@NgModule({
  declarations: [RegisterComponent],
  imports: [CommonModule, RegisterRoutingModule],
})
export class RegisterModule {}
