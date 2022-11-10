import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {DialogTemplateComponent} from "../dialog-template/dialog-template.component";
import {AppComponent, Button} from "../app.component";
import {RestApiService} from "../services/rest-api.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../models/User";

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
    @Inject(MAT_DIALOG_DATA) public data: { title:string },
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
      .then((res) => { //res è boolean isAdmin
        let u!:User;
        if(res != null) {
          u = new User(this.form.value['mail'], this.form.value['pass'], res);
        }
        this.dialogRef.close(u);
      }).catch((err) => {
        this.error = "User not found";
      });
  }

  public close() {
    this.dialogRef.close(null);
  }

  public hasError(controlName: string, errorName: string): boolean {
    return this.form.controls[controlName].hasError(errorName);
  }

}
