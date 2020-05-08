import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // {
  //   path: 'dashboard',
  //   redirectTo: 'dashboard/login',
  //   pathMatch: 'full',
  // },
  {
    path: 'dashboard/login',
    component: LoginComponent,
  },
  // {
  //   path: 'dashboard/register',
  //   component: RegisterComponent,
  // },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((mod) => mod.DashboardModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./website/website.module').then((mod) => mod.WebsiteModule),
  },

  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
