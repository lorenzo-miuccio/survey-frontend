import {Component, OnInit, ViewChild} from '@angular/core';
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
import {MatSort, Sort} from "@angular/material/sort";
import {SortCriteria} from "../models/SortCriteria";


@Component({
  selector: 'app-survey-table',
  templateUrl: './survey-table.component.html',
  styleUrls: ['./survey-table.component.css']
})
export class SurveyTableComponent implements OnInit {

  private _surveys: Survey[] = [];
  private _numbOfSurveys!: number
  private _currentPage = 0;
  private _maxPage!: number;
  private _pageSizes: number[] = [2, 5];
  private _prevSize: number = 1;
  public sizeSelected: number = 1; // default pageSize
  private _sortCriteria: Sort = {
    active: 'ending_date',
    direction: 'asc'
  };

  public _dataSource!: MatTableDataSource<Survey>;
  public displayedColumns: string[] = ['name', 'id_mail', 'description', 'category.name', 'publish_date', 'ending_date'];

  constructor(public ras: RestApiService, private appComponent: AppComponent, public _dialog: MatDialog, public router: Router) {
  }

  ngOnInit(): void {
    this.goToPage(0);

  }


  get numbOfSurveys(): number {
    return this._numbOfSurveys;
  }

  get prevSize(): number {
    return this._prevSize;
  }

  get sortCriteria(): SortCriteria {
    return this._sortCriteria;
  }

  get dialog(): MatDialog {
    return this._dialog;
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

  public async goToPage(page: number) {
    await this.ras.callApi('http://localhost:8080/survey/api/notSubmittedSurveys/' + this.appComponent.userLoggedIn.mail +
      '?page=' + page +
      '&size=' + this.sizeSelected +
      '&sort=' + encodeURIComponent(JSON.stringify(this.sortCriteria)),
      'GET',null)
      .then((res) => { //res è boolean isAdmin
        if (res != null) {
          this._surveys = res['surveys'];
          this._numbOfSurveys = res['numbOfSurveys'];
          this._currentPage = page;
          this._maxPage = Math.ceil(this._numbOfSurveys / this.sizeSelected) - 1;
          this._dataSource = new MatTableDataSource<Survey>(this._surveys);
        }
      }).catch((err) => {
        console.log(err);
      });
  }

  public refreshPage() {

    let indexDispSurv: number = this._prevSize * this.currentPage + 1;
    let tmpPage = Math.ceil(indexDispSurv / this.sizeSelected) - 1;

    this._prevSize = this.sizeSelected;
    this.goToPage(tmpPage);
  }

  public goToSurvey(row: Survey) {
    const config = new MatDialogConfig();

    config.disableClose = true;
    config.height = "250px";
    config.width = "600px";
    config.data = {
      surveyTitle: row.name,
    }

    let dialogRef = this._dialog.open(DialogTemplateComponent, config);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.router.navigate(["/submit-survey"], {
          queryParams: {
            surveyTitle: row.name,
            id: row.id
          }
        });
      }

    });
  }

  public sortColumn(sort: Sort){

    if (!sort.active || sort.direction === '') {
      this._sortCriteria.active = "ending_date";
      this._sortCriteria.direction = "asc";
    } else {
      this._sortCriteria = sort;
    }
    // console.log(JSON.stringify(this.sortCriteria));
    // console.log(encodeURIComponent(JSON.stringify(this.sortCriteria)));
    this.goToPage(0);
  }

}
