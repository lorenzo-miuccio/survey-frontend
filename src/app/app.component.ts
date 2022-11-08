import { Component } from '@angular/core';
import {DialogTemplateComponent} from "./dialog-template/dialog-template.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // array di stili
})


export class AppComponent {
  constructor(public dialog: MatDialog) { }

  openLogin() {

    const config = new MatDialogConfig();

    let b2 = new Button("CANCEL", false);
    let b1 = new Button("ENTER", true);

    let buttons: Button[] = [b2, b1];

    config.disableClose = true;
    config.id           = "login-component";
    config.height       = "500px";
    config.width        = "400px";
    config.data = {title: 'SIGN IN',
      component: 'login',
      buttons: buttons
    }

    let dialogRef = this.dialog.open(DialogTemplateComponent, config);
  }
}

export class Button {
  private _label: string;
  private _isEnter: boolean;

  constructor(label: string, isEnter: boolean) {
    this._label = label;
    this._isEnter = isEnter;
  }


  get label(): string {
    return this._label;
  }

  get isEnter(): boolean {
    return this._isEnter;
  }
}
