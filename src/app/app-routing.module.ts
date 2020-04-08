import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';


const routes: Routes = [{
	path: '',
	component: AppComponent
},{
	path : 'dashboard',
	loadChildren: () => import('./dashboard/dashboard.module').then(mod => mod.DashboardModule)
}, {
	path : '**',
	redirectTo: 'dashboard'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
