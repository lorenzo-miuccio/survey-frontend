import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DialogTemplateComponent} from "../dialog-template/dialog-template.component";
import {AppComponent} from "../app.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(public dialog: MatDialog, public appComponent: AppComponent, public router:Router) { }

  answerSurveyClick() {
    if(!this.appComponent.isLogged) {
      this.appComponent.openLogin('SIGN IN');
    } else {
      this.router.navigate(["surveysTable"], {skipLocationChange: true});
    }
  }

  createSurveyClick() {
    if(!this.appComponent.isLogged) {
      this.appComponent.openLogin('SIGN IN');
    }
  }

  ngOnInit(): void {
  }

}
