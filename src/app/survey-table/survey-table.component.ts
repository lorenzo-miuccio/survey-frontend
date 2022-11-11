import { Component, OnInit } from '@angular/core';
import {Survey} from "../models/Survey";
import {User} from "../models/User";
import {RestApiService} from "../services/rest-api.service";
import {AppComponent} from "../app.component";
import {DialogRef} from "@angular/cdk/dialog";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-survey-table',
  templateUrl: './survey-table.component.html',
  styleUrls: ['./survey-table.component.css']
})
export class SurveyTableComponent implements OnInit {

  private _surveys: Survey[] = [];
  private _numbOfSurveys!:number
  private _currentPage = 0;
  private _maxPage!: number;

  public _dataSource!: MatTableDataSource<Survey>;
  public displayedColumns: string[] = ['title', 'email', 'description', 'category', 'publishDate', 'endingDate'];

  constructor(public ras:RestApiService, private appComponent: AppComponent) {}

  ngOnInit(): void {
    this.goToPage(0);

  }

  get surveys(): Survey[] {
    return this._surveys;
  }

  get dataSource(): MatTableDataSource<Survey> {
    return this._dataSource;
  }

  public async goToPage(page:number) {
       await this.ras.callApi('http://localhost:8080/survey/api/notSubmittedSurveys/' + this.appComponent.userLoggedIn.mail + '?page=' + page,
         'GET', null)
      .then((res) => { //res è boolean isAdmin
        if(res != null) {
          this._surveys = res['surveys'];
          this._numbOfSurveys = res['numbOfSurveys'];
          this._currentPage = page;
          this._dataSource = new MatTableDataSource<Survey>(this._surveys);
        }
      }).catch((err) => {
        console.log(err);
      });
  }
}
