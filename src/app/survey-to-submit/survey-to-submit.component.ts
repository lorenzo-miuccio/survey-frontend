import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RestApiService} from "../services/rest-api.service";
import {Question} from "../models/Question";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {Survey} from "../models/Survey";

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
  private _mailUser: any;
  public form!: FormGroup;

  constructor(private _route: ActivatedRoute, public ras: RestApiService, public formBuilder: FormBuilder) { }


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
    this._mailUser = this._route.snapshot.queryParamMap.get("mail");

    this.form = new FormGroup({});
    this.getQuestions(0);

  }

  public checkResp() {
      console.log(this.form.value);
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

  public sendResponses() {
      this.sendAnswers();
  }

  public async sendAnswers() {
    await this.ras.callApi('http://localhost:8080/survey/api/sendSubmittedSurvey' +
      '?mail=' + this.mailUser +
      '&id_survey=' + this.surveyId,
      'PUT',this.form.value)
      .then((res) => { //res è boolean isAdmin

        console.log("ok");

      }).catch((err) => {
        console.log(err);
      });
  }
}


interface Response {
  id_question: number,
  id_answer: number
}
