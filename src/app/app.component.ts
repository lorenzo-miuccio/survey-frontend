import {Component, Input} from '@angular/core';
import {DialogTemplateComponent} from "./dialog-template/dialog-template.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {LoginComponent} from "./login/login.component";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // array di stili
})


export class AppComponent {

  private _home:Homepage;

  constructor(public dialog: MatDialog) {
    this._home = new Homepage(true);
  }


  get home(): Homepage {
    return this._home;
  }

  openLogin(dialogTitle: string) {

    const config = new MatDialogConfig();

    let b2 = new Button("CANCEL", false);
    let b1 = new Button("ENTER", true);

    let buttons: Button[] = [b2, b1];

    config.disableClose = true;
    config.id           = "login-component";
    config.height       = "500px";
    config.width        = "400px";
    config.data = {title: dialogTitle,
      //component: window,
      buttons: buttons
    }

    let dialogRef = this.dialog.open(LoginComponent, config);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
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

export class Homepage {
    private _isHome: boolean;

  constructor(isHome: boolean) {
    this._isHome = isHome;
  }

  get isHome(): boolean {
    return this._isHome;
  }

  set isHome(value: boolean) {
    this._isHome = value;
  }
}
