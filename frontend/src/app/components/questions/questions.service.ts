import { Question } from './question.model';
import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { handleErrors } from 'src/app/utils/form.utils';

const rootUrl = 'questions';

@Injectable()
export class QuestionsService {
  constructor(private http: HttpClient) {}

  /** get all question from database */
  getQuestions(categoryId: string): Observable<Question[]> {
    return this.http.get<Question[]>(rootUrl + '/category/' + categoryId);
  }

  /** get all question from database */
  getQuestion(id: string | undefined): Observable<Question> {
    return this.http.get<Question>(rootUrl + '/' + id);
  }

  /** insert question to database */
  insert(form: FormGroup): Observable<Question> {
    return this.http
      .post<Question>(rootUrl, form.value)
      .pipe(catchError(handleErrors(form)));
  }

  /** insert question to database */
  update(form: FormGroup): Observable<Question> {
    return this.http
      .put<Question>(rootUrl, form.value)
      .pipe(catchError(handleErrors(form)));
  }

  /** delete question from database */
  delete(id: string | undefined): Observable<Question> {
    return this.http.delete<Question>(rootUrl + '/' + id);
  }

  upload(file: File): Observable<Question> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<Question>(rootUrl + '/upload', formData);
  }
}
