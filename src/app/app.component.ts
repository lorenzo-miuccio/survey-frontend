import {Component, Injectable, Input} from '@angular/core';
import {DialogTemplateComponent} from "./dialog-template/dialog-template.component";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {Router} from "@angular/router";
import {User} from "./models/User";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // array di stili
})


@Injectable({
  providedIn: 'any'
})
export class AppComponent {

  private _isLogged: boolean;
  private _userLoggedIn!: User;

  constructor(public dialog: MatDialog, public router:Router) {
    this._isLogged = false;
  }


  get userLoggedIn(): User {
    return this._userLoggedIn;
  }

  get isLogged(): boolean {
    return this._isLogged;
  }

  public openLogin(dialogTitle: string) {

    const config = new MatDialogConfig();

    // let b2 = new Button("CANCEL", false);
    // let b1 = new Button("ENTER", true);

    //let buttons: Button[] = [b2, b1];

    config.disableClose = true;
    //config.id           = "login-component";
    config.height       = "500px";
    config.width        = "400px";
    config.data = {title: dialogTitle,
      //component: window,
      //buttons: buttons
    }

    if(dialogTitle == "SIGN IN") {
      let dialogRef = this.dialog.open(LoginComponent, config);
      dialogRef.afterClosed().subscribe((result) => {
        if(result != null){
          this._userLoggedIn = result;
          this._isLogged = true;
          this.router.navigate(["homepage"], {skipLocationChange: true});
        }
        console.log(result);
      });

    } else {
      let dialogRef = this.dialog.open(RegisterComponent, config);
      dialogRef.afterClosed().subscribe((result) => {
        console.log(result);
        if(result != null){
          this._userLoggedIn = result;
          console.log(this._userLoggedIn)
          this._isLogged = true;
          this.router.navigate(["homepage"], {skipLocationChange: true});
        }
        console.log(result);
      });
    }

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

