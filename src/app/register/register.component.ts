import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RestApiService} from "../services/rest-api.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AppComponent} from "../app.component";
import {User} from "../models/User";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {

  public formRegister!:           FormGroup;
  public error:           string  = "";
  public hidePassword:    boolean = true;

  constructor(
    private ras: RestApiService,
    private dialogRef: MatDialogRef<RegisterComponent>,
    private dialog: MatDialog,
    public appComp: AppComponent

  ) {

  }

  ngOnInit(): void {
    this.formRegister = new FormGroup({
      mail: new FormControl('', [Validators.required, Validators.email]),
      pass: new FormControl('', [Validators.required])
    });
  }

  public async register() {
    this.error = "";

    await this.ras.callApi('http://localhost:8080/survey/api/insertUser', 'POST', this.formRegister.value)
      .then((res) => { //res è utente creato
        this.dialogRef.close(res);
      }).catch((err) => {
        this.error = "User not found";
      });
  }

  public close() {
    this.dialogRef.close(null);
  }

  public hasError(controlName: string, errorName: string): boolean {
    return this.formRegister.controls[controlName].hasError(errorName);
  }
}
