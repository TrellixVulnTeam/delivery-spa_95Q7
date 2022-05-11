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
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

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
      MatTooltipModule,
      MatDialogModule,
      MatFormFieldModule,
      MatInputModule,
      ReactiveFormsModule,
      FormsModule,
      MatProgressSpinnerModule

    ],
  })
  export class MaterialModule {}
  