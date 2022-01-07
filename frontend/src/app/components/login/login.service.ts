import { User } from './../users/user.model';
import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { handleErrors } from '../../utils/form.utils';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {
  loginUrl = 'login'; // URL to web api

  constructor(private http: HttpClient) {}

  /** login */
  doLogin(fLogin: FormGroup) {
    return this.http
      .post(this.loginUrl, fLogin.value, { observe: 'response' })
      .pipe(catchError(handleErrors(fLogin)));
  }

  /** Authorization login */
  authenticated(): Observable<User> {
    return this.http.get<User>(this.loginUrl);
  }
}
