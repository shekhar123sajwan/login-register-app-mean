import { LoginComponent } from './login/login.component';
import { MatTabsModule } from '@angular/material/tabs';
import { DialogComponent } from './dialog/dialog.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppLoadingComponent } from './loading/loading.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { LoginModule } from './login/login.module';

@NgModule({
  declarations: [
    AppComponent,
    AppLoadingComponent,
    SnackbarComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    HttpClientModule,
    MatTabsModule,
    LoginModule,
  ],
  providers: [MatTabsModule],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent],
})
export class AppModule {}
