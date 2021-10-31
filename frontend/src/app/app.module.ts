import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { httpInterceptorProviders } from './http-interceptors/index';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { PasswordComponent } from './components/password/password.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { QuizComponent } from './components/quiz/quiz.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent, UsersComponent, PagenotfoundComponent, PasswordComponent, QuestionsComponent, QuizComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})

export class AppModule {}
