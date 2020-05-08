import { LoginModule } from './../login/login.module';
import { RegisterComponent } from './register/register.component';
import { RegisterModule } from './register/register.module';

import { HomeComponent } from './home/home.component';
import { WebsiteComponent } from './website.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: WebsiteComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'user',
        children: [
          {
            path: 'register',
            loadChildren: () =>
              import('./register/register.module').then(
                (mod) => mod.RegisterModule
              ),
          },
          {
            path: 'login',
            loadChildren: () =>
              import('./login/login.module').then((mod) => mod.LoginModule),
          },
        ],
        // loadChildren: () =>
        //   import('./register/register.module').then(
        //     (mod) => mod.RegisterModule
        //   ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebsiteRoutingModule {}
