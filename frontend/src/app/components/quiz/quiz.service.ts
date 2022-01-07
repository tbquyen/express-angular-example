import { Category } from './../categories/category.model';
import { Quiz } from './quiz.model';
import { catchError } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { handleErrors } from 'src/app/utils/form.utils';
import { Observable } from 'rxjs';
import * as moment from 'moment';

const rootUrl = 'quiz';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private http: HttpClient) {}

  /** get all quiz from database */
  getQuizs(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(rootUrl);
  }

  /** get all quiz from database */
  getQuiz(id: string | undefined): Observable<Quiz> {
    return this.http.get<Quiz>(rootUrl + '/' + id);
  }

  /** insert quiz to database */
  insert(form: FormGroup): Observable<Quiz> {
    return this.http
      .post<Quiz>(rootUrl, form.value)
      .pipe(catchError(handleErrors(form)));
  }

  /** update quiz to database */
  update(form: FormGroup): Observable<Quiz> {
    return this.http
      .put<Quiz>(rootUrl, form.value)
      .pipe(catchError(handleErrors(form)));
  }

  /** delete quiz from database */
  delete(id: string | undefined): Observable<Quiz> {
    return this.http.delete<Quiz>(rootUrl + '/' + id);
  }

  formatQuiz(quiz: Quiz, categories: Category[]) {
    const categoryName =
      '' + categories.find((e) => e._id === quiz.categoryId)?.name;
    quiz.categoryName = categoryName;

    if (quiz.timeStart) {
      quiz.timeStart = moment(quiz.timeStart).format('YYYY-MM-DD hh:mm:ss');
    }

    if (quiz.timeEnd) {
      quiz.isFinish = moment(quiz.timeEnd).isBefore(Date.now());
      quiz.timeEnd = moment(quiz.timeEnd).format('YYYY-MM-DD hh:mm:ss');
    }
  }
}
