import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogTemplateComponent } from "./dialog-template/dialog-template.component";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoggedInPageComponent } from './logged-in-page/logged-in-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    AppComponent,
    DialogTemplateComponent,
    LoginComponent,
    RegisterComponent,
    LoggedInPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
