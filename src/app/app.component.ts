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

    config.disableClose = true;
    config.height       = "500px";
    config.width        = "400px";
    config.data = {title: dialogTitle,
    }

    if(dialogTitle == "SIGN IN") {
      let dialogRef = this.dialog.open(LoginComponent, config);
      dialogRef.afterClosed().subscribe((result) => {
        if(result != null){
          this._userLoggedIn = result;
          this._isLogged = true;
        }
      });

    } else {
      let dialogRef = this.dialog.open(RegisterComponent, config);
      dialogRef.afterClosed().subscribe((result) => {
        // console.log(result);
        if(result != null){
          this._userLoggedIn = result;
          this._isLogged = true;
        }
      });
    }

  }

  public logout() {
    this._isLogged = false;
    this._userLoggedIn = new User("", "", false);
    this.router.navigate(["homepage"], {skipLocationChange: true});
  }
}
