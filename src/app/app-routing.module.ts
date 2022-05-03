import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./component/login/login.module').then(m => m.LoginModule) },
  { path: 'home', loadChildren: () => import('./component/home/home.module').then(m => m.HomeModule) },
  {path: 'category',  loadChildren: () => import('./component/pages/category/category.module').then(m => m.CategoryModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
