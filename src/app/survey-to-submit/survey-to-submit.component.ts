import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RestApiService} from "../services/rest-api.service";
import {Question} from "../models/Question";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {Survey} from "../models/Survey";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {LoginComponent} from "../login/login.component";
import {RegisterComponent} from "../register/register.component";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-survey-to-submit',
  templateUrl: './survey-to-submit.component.html',
  styleUrls: ['./survey-to-submit.component.css']
})
export class SurveyToSubmitComponent implements OnInit {

  private _maxPage!: number;
  private _currentPage: number = 0;
  private _pageSize: number = 2;
  private _questions: Question[] = [];
  private _numbOfQuestions!: number;
  private _surveyId: any;
  private _surveyTitle: any;
  private _mailUser: any;
  public form!: FormGroup;

  constructor(private _route: ActivatedRoute, public ras: RestApiService, public formBuilder: FormBuilder, public dialog: MatDialog, public router: Router) { }


  get maxPage(): number {
    return this._maxPage;
  }

  get currentPage(): number {
    return this._currentPage;
  }

  get pageSize(): number {
    return this._pageSize;
  }


  get questions(): Question[] {
    return this._questions;
  }

  get numbOfQuestions(): number {
    return this._numbOfQuestions;
  }

  get surveyId(): any {
    return this._surveyId;
  }

  get mailUser(): any {
    return this._mailUser;
  }


  ngOnInit(): void {
    this._surveyId = this._route.snapshot.queryParamMap.get("id");
    this._surveyTitle = this._route.snapshot.queryParamMap.get("surveyTitle");
    this._mailUser = this._route.snapshot.queryParamMap.get("mail");

    this.form = new FormGroup({});
    this.getQuestions(0);

  }

  public async getQuestions(page: number, size?: number) { // size è opzionale

    await this.ras.callApi('http://localhost:8080/survey/api/getQuestionsSurvey/' +  this._surveyId +
      '?page=' + page +
      '&size=' + this._pageSize,
      'GET', null)

      .then((res) => { //res è boolean isAdmin
        if(res != null) {
          this._questions = res['questions'];
          this._numbOfQuestions = res['numbOfQuestions'];
          this._currentPage = page;
          this._maxPage = Math.ceil(this._numbOfQuestions / this._pageSize) - 1;

          this.questions.forEach(q => {
            this.form.addControl(q.id.toString(10), new FormControl('', [Validators.required]));
          })

        }
      }).catch((err) => {
        console.log(err);
      });
  }

  public async sendAnswers() {

    console.log(this.form.value);
    console.log(Object.values(this.form.value));

    let arrayString: string[] = Object.values(this.form.value);
    let arrayJson: Response[] = [];
    arrayString.forEach(s => {
      arrayJson.push(JSON.parse(s));
    })
    console.log(JSON.stringify(arrayJson));

    await this.ras.callApi('http://localhost:8080/survey/api/sendSubmittedSurvey' +
      '?mail=' + this.mailUser +
      '&id_survey=' + this.surveyId,
      'PUT', arrayJson)
      .then((res) => { //res è boolean isAdmin
        this.openConfirm();
      }).catch((err) => {
        console.log(err);
      });
  }

  public openConfirm() {
    const config = new MatDialogConfig();

    config.disableClose = true;
    config.height       = "300px";
    config.width        = "400px";
    config.data = { surveyTitle: this._surveyTitle }

    let dialogRef = this.dialog.open(ConfirmDialogComponent, config);
    dialogRef.afterClosed().subscribe((result) => {
      if(result == true) {
        this.router.navigate(['surveysTable']);
      }
    });
  }
}


interface Response {
  idQuestion: number,
  idAnswer: number
}
