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
import { ReactiveFormsModule      } from "@angular/forms";
import {RegisterComponent} from "./register/register.component";
import {HomepageComponent} from "./homepage/homepage.component";
import {LoggedInPageComponent} from "./logged-in-page/logged-in-page.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatMenuModule} from "@angular/material/menu";

@NgModule({
  declarations: [
    AppComponent,
    DialogTemplateComponent,
    LoginComponent,
    RegisterComponent,
    LoggedInPageComponent,
    HomepageComponent
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
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
