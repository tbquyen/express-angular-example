import { catchError } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from './category.model';
import { handleErrors } from 'src/app/utils/form.utils';

const rootUrl = 'categories';

@Injectable()
export class CategoriesService {

  constructor(private http: HttpClient) { }

  /** get all Categories from database */
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(rootUrl);
  }

  /** get all Categories from database */
  getCategory(id: string | undefined): Observable<Category> {
    return this.http.get<Category>(rootUrl + '/' + id);
  }

  /** insert user to database */
  insert(form: FormGroup): Observable<Category> {
    return this.http
      .post<Category>(rootUrl, form.value)
      .pipe(catchError(handleErrors(form)));
  }

  /** insert user to database */
  update(form: FormGroup): Observable<Category> {
    return this.http
      .put<Category>(rootUrl, form.value)
      .pipe(catchError(handleErrors(form)));
  }

  /** delete user from database */
  delete(id: string | undefined): Observable<Category> {
    return this.http.delete<Category>(rootUrl + '/' + id);
  }
}
