import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from '../template/header/header.component';

const routes: Routes = [
  {
    path: '', component: HeaderComponent,
    children: [
      {
        path: 'category',  loadChildren: () => import('../pages/category/category.module').then(m => m.CategoryModule),
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
