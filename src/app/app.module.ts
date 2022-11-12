import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule         } from './app-routing.module';
import { AppComponent             } from './app.component';
import { LoginComponent           } from './login/login.component';
import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';
import { MatDialogModule          } from "@angular/material/dialog";
import { DialogTemplateComponent  } from './dialog-template/dialog-template.component';
import { HttpClientModule         } from "@angular/common/http";
import { MatCardModule            } from '@angular/material/card';
import { MatInputModule           } from '@angular/material/input';
import { MatIconModule            } from '@angular/material/icon';
import { MatButtonModule          } from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RegisterComponent} from "./register/register.component";
import {HomepageComponent} from "./homepage/homepage.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatMenuModule} from "@angular/material/menu";
import { SurveyTableComponent } from './survey-table/survey-table.component';
import {MatTableModule} from "@angular/material/table";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatSelectModule} from "@angular/material/select";
import { SurveyToSubmitComponent } from './survey-to-submit/survey-to-submit.component';
import {MatRadioModule} from "@angular/material/radio";
import {MatSortModule} from "@angular/material/sort";

@NgModule({
  declarations: [
    AppComponent,
    DialogTemplateComponent,
    LoginComponent,
    RegisterComponent,
    HomepageComponent,
    SurveyTableComponent,
    SurveyToSubmitComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatDialogModule,
        HttpClientModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        ReactiveFormsModule,
        MatMenuModule,
        MatTableModule,
        MatToolbarModule,
        MatExpansionModule,
        MatSelectModule,
        MatRadioModule,
        FormsModule,
        MatSortModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
