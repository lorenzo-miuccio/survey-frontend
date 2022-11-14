import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {User} from "../models/User";
import {RestApiService} from "../services/rest-api.service";
import {Question} from "../models/Question";

@Component({
  selector: 'app-survey-to-submit',
  templateUrl: './survey-to-submit.component.html',
  styleUrls: ['./survey-to-submit.component.css']
})
export class SurveyToSubmitComponent implements OnInit {

  private _pagesArray: Page[] = [];

  public currentPage: number = 0;
  private _questions: Question[] = [];
  private _numbOfQuestions!: number;
  private _surveyId:any;
  private _mailUser!: any;

  constructor(private _route: ActivatedRoute, public ras: RestApiService) { }


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
    this.getQuestions(0);
  }

  public addResponse (value: Response) {

    let responses = this._pagesArray[this.currentPage].responses;
    for(let i = 0; i < responses.length; i++) {
      if(responses[i].id_question === value.id_question) {
        responses[i] = value;
        return;
      } else {
        responses.push(value);
      }
    }
  }

  public async getQuestions(page: number, size?: number) { // size è opzionale

    await this.ras.callApi('http://localhost:8080/survey/api//getQuestionsSurvey/' +  this._surveyId, 'GET', null)
      .then((res) => { //res è boolean isAdmin
        if(res != null) {
          this._questions = res['questions'];
          this._numbOfQuestions = res['numbOfQuestions'];

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
  responses: Response []
}
