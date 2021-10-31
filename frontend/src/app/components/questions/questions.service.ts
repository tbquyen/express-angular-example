import { Question } from './question.model';
import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { handleErrors } from 'src/app/utils/form.utils';

@Injectable()
export class QuestionsService {
  baseUrl = 'questions';

  constructor(private http: HttpClient) {}

  /** get all question from database */
  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.baseUrl);
  }

  /** get all question from database */
  getQuestion(id: string | undefined): Observable<Question> {
    return this.http.get<Question>(this.baseUrl + '/' + id);
  }

  /** insert question to database */
  insert(form: FormGroup): Observable<unknown> {
    return this.http
      .post<Question>(this.baseUrl, form.value)
      .pipe(catchError(handleErrors(form)));
  }

  /** insert question to database */
  update(form: FormGroup): Observable<unknown> {
    return this.http
      .put<Question>(this.baseUrl, form.value)
      .pipe(catchError(handleErrors(form)));
  }

  /** delete question from database */
  delete(id: string | undefined): Observable<Question> {
    return this.http.delete<Question>(this.baseUrl + '/' + id);
  }

  upload(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<Question>(this.baseUrl + '/upload', formData);
  }
}
