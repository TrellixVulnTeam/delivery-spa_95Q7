import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [ 
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    RouterModule
  ]
})
export class AppModule { }
