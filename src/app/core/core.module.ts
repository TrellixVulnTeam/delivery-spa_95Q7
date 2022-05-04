import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpHeaderRequestInterceptor } from './interceptors/http-request-interceptor';
import { ErrorInterceptor } from './interceptors/error-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    HttpHeaderRequestInterceptor,    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHeaderRequestInterceptor,
      multi: true,
    },
    HttpHeaderRequestInterceptor,    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ]
})
export class CoreModule { }
