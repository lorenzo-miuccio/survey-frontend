import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { RegisterComponent} from "./register/register.component";
import {AppComponent} from "./app.component";
import {HomepageComponent} from "./homepage/homepage.component";
import {SurveyTableComponent} from "./survey-table/survey-table.component";

const routes: Routes = [{
  path: 'app', component: AppComponent},{
  path: 'login', component: LoginComponent},{
  path: 'register', component: RegisterComponent}, {
  path: 'homepage', component: HomepageComponent}, {
  //{  path: 'homepage', component: HomepageComponent, outlet:"test"},
  path: '', redirectTo: 'homepage', pathMatch: "full"}, { // reindirizza l'homepage sul router-outlet
  path: 'surveysTable', component:SurveyTableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
