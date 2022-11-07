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

    config.disableClose = true;
    config.id           = "login-component";
    config.height       = "350px";
    config.width        = "600px";
    config.data = {title: 'prova'}

    // @ts-ignore
    let dialogRef = this.dialog.open(DialogTemplateComponent, config);
  }
}
