import { NavbarComponent } from './navbar/navbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { WebsiteRoutingModule } from './website-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { WebsiteComponent } from './website.component';

@NgModule({
  declarations: [
    WebsiteComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    NavbarComponent,
  ],
  imports: [CommonModule, WebsiteRoutingModule],
})
export class WebsiteModule {}
