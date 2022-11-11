import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-survey-to-submit',
  templateUrl: './survey-to-submit.component.html',
  styleUrls: ['./survey-to-submit.component.css']
})
export class SurveyToSubmitComponent implements OnInit {


  constructor(private _route: ActivatedRoute) { }

  private surveyId:any;

  ngOnInit(): void {
    this.surveyId = this._route.snapshot.queryParamMap.get("id");

  }

}
