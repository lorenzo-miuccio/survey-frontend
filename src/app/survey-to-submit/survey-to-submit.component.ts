import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RestApiService} from "../services/rest-api.service";
import {Question} from "../models/Question";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-survey-to-submit',
  templateUrl: './survey-to-submit.component.html',
  styleUrls: ['./survey-to-submit.component.css']
})
export class SurveyToSubmitComponent implements OnInit {

  public _pagesArray: any = [];

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

  get pagesArray(): Page[] {
    return this._pagesArray;
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

  set pagesArray(value: Page[]) {
    this._pagesArray = value;
  }

  ngOnInit(): void {
    this._surveyId = this._route.snapshot.queryParamMap.get("id");
    this._mailUser = this._route.snapshot.queryParamMap.get("mail");
    console.log(this.maxPage);
    console.log(this._pagesArray.length);

    this.form = new FormGroup({});
    this.getQuestions(0);


  }

  public checkResp() {
    for(let i = 0; i < this.pagesArray.length; i++) {
      console.log(this.pagesArray[i].responses);
    }

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
            this.form.addControl(q.id.toString(10), new FormControl('', [Validators.required]))
          })

          this.pagesArray.push({pageNumber: page, responses: []});
        }
      }).catch((err) => {
        console.log(err);
      });
  }
}


interface Response {
  id_question: number,
  id_answer: number
}

interface Page {
  pageNumber: number,
  responses: (String | undefined) []
}
