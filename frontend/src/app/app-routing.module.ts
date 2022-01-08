import { Role } from './components/users/user.model';
import { QuizResultComponent } from './components/quiz-result/quiz-result.component';
import { QuizInfoComponent } from './components/quiz-info/quiz-info.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { ErrorComponent } from './components/error/error.component';
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
import { PasswordComponent } from './components/password/password.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { CategoriesComponent } from './components/categories/categories.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuardService],
  },
  { path: 'password', component: PasswordComponent },
  { path: 'password/:username', component: PasswordComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuardService] },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuardService],
    data: { roles: [Role.ADMIN] },
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [AuthGuardService],
    data: { roles: [Role.ADMIN, Role.MENTOR] },
  },
  {
    path: 'questions',
    component: QuestionsComponent,
    canActivate: [AuthGuardService],
    data: { roles: [Role.ADMIN, Role.MENTOR] },
  },
  {
    path: 'questions/:id',
    component: QuestionsComponent,
    canActivate: [AuthGuardService],
    data: { roles: [Role.ADMIN, Role.MENTOR] },
  },
  {
    path: 'quiz',
    component: QuizComponent,
    canActivate: [AuthGuardService],
    data: { roles: [Role.ADMIN, Role.MENTOR, Role.MEMBER] },
  },
  {
    path: 'quiz/:id/:index',
    component: QuizInfoComponent,
    canActivate: [AuthGuardService],
    data: { roles: [Role.ADMIN, Role.MENTOR, Role.MEMBER] },
  },
  {
    path: 'result/:id',
    component: QuizResultComponent,
    canActivate: [AuthGuardService],
    data: { roles: [Role.ADMIN, Role.MENTOR, Role.MEMBER] },
  },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [LoginGuardService, AuthGuardService, LoginService],
})
export class AppRoutingModule {}
