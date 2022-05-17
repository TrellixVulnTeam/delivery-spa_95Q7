import { OnInit } from "@angular/core";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Injectable } from "@angular/core";
import { HtmlParser } from "@angular/compiler";

@Injectable()
export class BaseComponent implements OnInit {
    
  public snackBar: MatSnackBar;

    constructor(
        
    ) {}

    ngOnInit(): void {

    }

    /**
     * 
     * @param message 
     * @param action 
     * @param time 
     * @param hp // ? possible values: start, center, end, left, right
     * @param vp // ? possible values: top, bottom
     */
    public openSnackBar(
        message: string, 
        action: string, 
        time: number, 
        hp: MatSnackBarHorizontalPosition, 
        vp: MatSnackBarVerticalPosition) {
        this.snackBar.open(message, action, {
          duration: time * 1000,
          horizontalPosition: hp,
          verticalPosition: vp
        });
      }
}