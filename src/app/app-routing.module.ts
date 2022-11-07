import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { RegisterComponent} from "./register/register.component";
import { LoggedInPageComponent } from "./logged-in-page/logged-in-page.component";
import {AppComponent} from "./app.component";


const routes: Routes = [{
  path: 'app', component: AppComponent},{
  path: 'login', component: LoginComponent},{
  path: 'register', component: RegisterComponent}, {
  path: 'logged-in-page', component: LoggedInPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
