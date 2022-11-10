import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RestApiService} from "../services/rest-api.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AppComponent} from "../app.component";
import {User} from "../models/User";
import {Router} from "@angular/router";

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
    @Inject(MAT_DIALOG_DATA) public data: { title:string },
    private ras: RestApiService,
    private dialogRef: MatDialogRef<RegisterComponent>,
    public appComp: AppComponent,
    public router: Router
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
        //this.router.navigate(['homepage'], {skipLocationChange: true});
      }).catch((err) => {
        this.error = "Email already used";
      });
  }

  public close() {
    this.dialogRef.close(null);
  }

  public hasError(controlName: string, errorName: string): boolean {
    return this.formRegister.controls[controlName].hasError(errorName);
  }
}
