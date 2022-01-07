import { catchError } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { QuizInfo } from './quiz-info.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { handleErrors } from 'src/app/utils/form.utils';

const rootUrl = 'quiz-info';

@Injectable({
  providedIn: 'root',
})
export class QuizInfoService {
  constructor(private http: HttpClient) {}

  getQuizInfo(quizId: string, index: number): Observable<QuizInfo> {
    return this.http.get<QuizInfo>(rootUrl + '/' + quizId + '/' + index);
  }

  anser(form: FormGroup, isFinish: boolean): Observable<number> {
    const value = form.value;
    value.isFinish = isFinish;

    return this.http
      .put<number>(rootUrl, value)
      .pipe(catchError(handleErrors(form)));
  }
}
