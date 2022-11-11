import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-survey-to-submit',
  templateUrl: './survey-to-submit.component.html',
  styleUrls: ['./survey-to-submit.component.css']
})
export class SurveyToSubmitComponent implements OnInit {


  constructor(private _route: ActivatedRoute) { }

  public test!: Test[];
  public listresponses: Responses[] = [];
  private surveyId:any;

  ngOnInit(): void {
    this.surveyId = this._route.snapshot.queryParamMap.get("id");

    this.test = [{ domanda: "Domanda 1",
      array:[1,2,3]}, {
      domanda: "Domanda 2",
      array:[4,5,6]
    }];


  }

}

interface Test {
  domanda:string,
  array :number[]
}

interface Responses {
  id_question: number;
  id_answer: number;
}
