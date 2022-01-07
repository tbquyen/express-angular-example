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
import { PasswordComponent } from './components/password/password.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ErrorComponent } from './components/error/error.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { QuizInfoComponent } from './components/quiz-info/quiz-info.component';
import { QuizResultComponent } from './components/quiz-result/quiz-result.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UsersComponent,
    PasswordComponent,
    QuestionsComponent,
    CategoriesComponent,
    ErrorComponent,
    QuizComponent,
    QuizInfoComponent,
    QuizResultComponent,
  ],
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
