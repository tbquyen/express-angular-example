import { QuizComponent } from './components/quiz/quiz.component';
import {
  LoginGuardService,
  AuthGuardService,
} from './components/login/login.guard';
import { LoginService } from './components/login/login.service';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { PasswordComponent } from './components/password/password.component';
import { QuestionsComponent } from './components/questions/questions.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuardService],
  },
  { path: 'password', component: PasswordComponent },
  { path: 'password/:username', component: PasswordComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuardService] },
  { path: 'questions', component: QuestionsComponent, canActivate: [AuthGuardService] },
  { path: 'quiz', component: QuizComponent, canActivate: [AuthGuardService] },
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [LoginGuardService, AuthGuardService, LoginService],
})
export class AppRoutingModule {}
