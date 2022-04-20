import { NgModule } from "@angular/core";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';

@NgModule({
    exports: [
      MatToolbarModule,
      MatIconModule,
      MatButtonModule,
      MatDividerModule,
      MatSidenavModule,
      MatListModule,
      MatCardModule
    
    ],
  })
  export class MaterialModule {}
  