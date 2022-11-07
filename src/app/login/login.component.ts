import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {DialogTemplateComponent} from "../dialog-template/dialog-template.component";
import {AppComponent, Button} from "../app.component";
import {RegisterComponent} from "../register/register.component";
import {LoggedInPageComponent} from "../logged-in-page/logged-in-page.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<any>) { }

  openRegister() {

    this.dialogRef.close();
    const config = new MatDialogConfig();

    let b2 = new Button("CANCEL", false, false);
    let b1 = new Button("ENTER", true, true);

    let buttons: Button[] = [b2, b1];

    config.disableClose = true;
    config.id           = "register-component";
    config.height       = "500px";
    config.width        = "400px";
    config.data = {title: 'REGISTER',
      component: 'register',
      buttons: buttons
    }

    let dialogRef = this.dialog.open(DialogTemplateComponent, config);

  }

  ngOnInit(): void {
  }

}
