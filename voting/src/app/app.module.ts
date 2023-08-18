import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { LoginComponent } from './login/login.component';
import { VoteComponent } from './vote/vote.component';
import { AdminComponent } from './admin/admin.component';
import { AddCandidateComponent } from './add-candidate/add-candidate.component';

import { HttpClientModule } from '@angular/common/http';
import { authGuard } from './auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VoteComponent,
    AdminComponent,
    AddCandidateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {path: '', component: LoginComponent},
      {path: 'admin', component: AdminComponent,canActivate:[authGuard]},
      {path: 'login', component: LoginComponent},
      {path: 'vote', component: VoteComponent,canActivate:[authGuard]},
    ]),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
