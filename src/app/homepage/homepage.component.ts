import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DialogTemplateComponent} from "../dialog-template/dialog-template.component";
import {Button} from "../app.component";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

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

  ngOnInit(): void {
  }

}
