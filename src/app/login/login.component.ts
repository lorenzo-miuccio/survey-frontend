import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {DialogTemplateComponent} from "../dialog-template/dialog-template.component";
import {Button} from "../app.component";
import {RestApiService} from "../services/rest-api.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form!:           FormGroup;
  public error:           string  = "";
  public hidePassword:    boolean = true;

  constructor(
    private ras: RestApiService,
    public dialogRef: MatDialogRef<LoginComponent>,
    public dialog: MatDialog
  ) {

  }

  openRegister() {

    this.dialogRef.close();
    const config = new MatDialogConfig();

    let b2 = new Button("CANCEL", false);
    let b1 = new Button("ENTER", true);

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
    this.form = new FormGroup({
      mail: new FormControl('', [Validators.required]),
      pass: new FormControl('', [Validators.required])
    });
  }

  public async login() {
    this.error = "";

    await this.ras.callApi('http://localhost:8080/survey/api/check-user', 'POST', this.form.value)
      .then((res) => {
        this.dialogRef.close("login-ok");
      }).catch((err) => {
        this.error = "Utente non riconosciuto";
      });
  }

  public close() {
    this.dialogRef.close("login-ko");
  }

  public hasError(controlName: string, errorName: string): boolean {
    return this.form.controls[controlName].hasError(errorName);
  }

}
