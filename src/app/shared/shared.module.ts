import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { CoreModule } from "../core/core.module";
import { MaterialModule } from "../material/material.module";

@NgModule({
    declarations: [],
    imports: [
      MaterialModule,
      HttpClientModule,
    ],
    exports:[ 
      MaterialModule,
      CoreModule,
    ]
  })
  export class SharedModule {}
  