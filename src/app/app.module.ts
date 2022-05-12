import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './component/template/header/header.component';
import { SharedModule } from './shared/shared.module';
import { FooterComponent } from './component/template/footer/footer.component';
import { BodyComponent } from './component/template/body/body.component';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faShareNodes as faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faEye as faEye } from '@fortawesome/free-solid-svg-icons';
import { StorageService } from './core/services/storage.service';
import { ClientService } from './core/services/client.service';


@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    RouterModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [
    StorageService,
    ClientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(library: FaIconLibrary) {
    library.addIcons(fasStar, farStar, faShareNodes, faHeart, faHeart, farHeart, faEye);
  }
}
