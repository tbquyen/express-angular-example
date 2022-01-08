import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { handleErrors } from 'src/app/utils/form.utils';

const rootUrl = 'users';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  /** get all user from database */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(rootUrl);
  }

  /** get all user from database */
  getUser(id: string | undefined): Observable<User> {
    return this.http.get<User>(rootUrl + '/' + id);
  }

  /** insert user to database */
  insert(fUser: FormGroup): Observable<unknown> {
    return this.http
      .post<User>(rootUrl, fUser.value)
      .pipe(catchError(handleErrors(fUser)));
  }

  /** insert user to database */
  update(fUser: FormGroup): Observable<unknown> {
    return this.http
      .put<User>(rootUrl, fUser.value)
      .pipe(catchError(handleErrors(fUser)));
  }

  /** delete user from database */
  delete(id: string | undefined): Observable<User> {
    return this.http.delete<User>(rootUrl + '/' + id);
  }
}
