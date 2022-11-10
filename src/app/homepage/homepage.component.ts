import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DialogTemplateComponent} from "../dialog-template/dialog-template.component";
import {AppComponent, Button} from "../app.component";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(public dialog: MatDialog, public appComponent: AppComponent) { }

  answerSurveyClick() {
    if(this.appComponent.isLogged == false) {
      this.appComponent.openLogin('SIGN IN');
    }
  }

  createSurveyClick() {
    if(this.appComponent.isLogged == false) {
      this.appComponent.openLogin('SIGN IN');
    }
  }

  ngOnInit(): void {
  }

}
