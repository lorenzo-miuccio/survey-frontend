import { Component, OnInit } from '@angular/core';
import {Survey} from "../models/Survey";
import {User} from "../models/User";
import {RestApiService} from "../services/rest-api.service";
import {AppComponent} from "../app.component";
import {DialogRef} from "@angular/cdk/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {LoginComponent} from "../login/login.component";
import {Router} from "@angular/router";
import {DialogTemplateComponent} from "../dialog-template/dialog-template.component";


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
  private _pageSizes: number[] = [2, 5];
  private prevSize: number = 1;
  public sizeSelected: number = 1;

  public _dataSource!: MatTableDataSource<Survey>;
  public displayedColumns: string[] = ['title', 'email', 'description', 'category', 'publishDate', 'endingDate'];

  constructor(public ras:RestApiService, private appComponent: AppComponent, public dialog: MatDialog, public router:Router) {}

  ngOnInit(): void {
    this.goToPage(0);

  }

  get surveys(): Survey[] {
    return this._surveys;
  }

  get dataSource(): MatTableDataSource<Survey> {
    return this._dataSource;
  }

  get currentPage(): number {
    return this._currentPage;
  }

  get maxPage(): number {
    return this._maxPage;
  }

  get pageSizes(): number[] {
    return this._pageSizes;
  }

  public async goToPage(page:number) {
       await this.ras.callApi('http://localhost:8080/survey/api/notSubmittedSurveys/' + this.appComponent.userLoggedIn.mail + '?page=' + page + '&size=' + this.sizeSelected,
         'GET', null)
      .then((res) => { //res è boolean isAdmin
        if(res != null) {
          this._surveys = res['surveys'];
          this._numbOfSurveys = res['numbOfSurveys'];
          this._currentPage = page;
          this._maxPage = Math.ceil(this._numbOfSurveys/this.sizeSelected) - 1;
          this._dataSource = new MatTableDataSource<Survey>(this._surveys);
        }
      }).catch((err) => {
        console.log(err);
      });
  }

  public refreshPage() {

    let tmpPage: number
    if(this.maxPage != this.currentPage) {
      let numDispSurv: number = this.prevSize * (this.currentPage + 1);
      tmpPage = Math.ceil(numDispSurv/this.sizeSelected) - 1;
    } else {
      let numDispSurv: number = this._numbOfSurveys;
      tmpPage = Math.ceil(numDispSurv/this.sizeSelected) - 1;
    }
    this.prevSize = this.sizeSelected;
    this.goToPage(tmpPage);
    }

    public goToSurvey(row: Survey) {
      const config = new MatDialogConfig();

      config.disableClose = true;
      config.height       = "250px";
      config.width        = "600px";
      config.data = {surveyTitle: row.name,
      }

      let dialogRef = this.dialog.open(DialogTemplateComponent, config);
      dialogRef.afterClosed().subscribe((result) => {
        if(result){
          this.router.navigate(["/submit-survey"], {
            queryParams: {
              surveyTitle: row.name,
              id: row.id
            }
          });
        }

      });
    }
}
