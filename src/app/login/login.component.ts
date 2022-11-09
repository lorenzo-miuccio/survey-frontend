import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {DialogTemplateComponent} from "../dialog-template/dialog-template.component";
import {AppComponent, Button} from "../app.component";
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
    private dialogRef: MatDialogRef<LoginComponent>,
    private dialog: MatDialog,
    public appComp: AppComponent

  ) {

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      mail: new FormControl('', [Validators.required, Validators.email]),
      pass: new FormControl('', [Validators.required])
    });
  }

  public async login() {
    this.error = "";

    await this.ras.callApi('http://localhost:8080/survey/api/check-user', 'POST', this.form.value)
      .then((res) => {
        this.dialogRef.close("login-ok");
      }).catch((err) => {
        this.error = "User not found";
      });
  }

  public close() {
    this.dialogRef.close("login-ko");
  }

  public hasError(controlName: string, errorName: string): boolean {
    return this.form.controls[controlName].hasError(errorName);
  }

}
