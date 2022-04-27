import { NgModule } from "@angular/core";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
    exports: [
      MatToolbarModule,
      MatIconModule,
      MatButtonModule,
      MatDividerModule,
      MatSidenavModule,
      MatListModule,
      MatCardModule,
      InfiniteScrollModule,
      MatTooltipModule    
    ],
  })
  export class MaterialModule {}
  