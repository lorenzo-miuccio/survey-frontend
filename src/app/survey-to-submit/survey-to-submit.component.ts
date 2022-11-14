import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {User} from "../models/User";
import {RestApiService} from "../services/rest-api.service";
import {Question} from "../models/Question";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-survey-to-submit',
  templateUrl: './survey-to-submit.component.html',
  styleUrls: ['./survey-to-submit.component.css']
})
export class SurveyToSubmitComponent implements OnInit {

  public _pagesArray: Page[] = [];

  private _maxPage!: number;
  private _currentPage: number = 0;
  private _pageSize: number = 2;
  private _questions: Question[] = [];
  private _numbOfQuestions!: number;
  private _surveyId:any;
  private _mailUser!: any;

  constructor(private _route: ActivatedRoute, public ras: RestApiService) { }


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
    this.form = new FormGroup({
      mail: new FormControl('', [Validators.required, Validators.email]),
      pass: new FormControl('', [Validators.required])
    });

    this._surveyId = this._route.snapshot.queryParamMap.get("id");
    this._mailUser = this._route.snapshot.queryParamMap.get("mail");
    let test: Response = {id_question:1, id_answer:1};
    console.log(JSON.stringify(test));
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

          let pagePresent = false;
          for(let i = 0; i < this.pagesArray.length; i++) {
            if(this.pagesArray[i].pageNumber == page) {
              pagePresent = true;
              break;
            }
          }

          if(!pagePresent) {
            let responsesTemplate: string [] = [];
            for(let i = 0; i < this.questions.length; i++) {
              responsesTemplate[i] = "";
            }

            let pageItem: Page = {pageNumber: page, responses: responsesTemplate};

            this.pagesArray.push(pageItem);
          }
          console.log(this._pagesArray[this._currentPage].responses);
        }
      }).catch((err) => {
        console.log(err);
      });
  }
}


interface Response {
  id_question: number,
  id_answer?: number
}

interface Page {
  pageNumber: number,
  responses: String[]
}
