import { Router } from '@angular/router';
import { AppService } from './../../app.service';
import { User } from './../users/user.model';
import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { handleErrors } from '../../utils/form.utils';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {
  loginUrl = 'login'; // URL to web api

  constructor(
    private http: HttpClient,
    private app: AppService,
    private router: Router
  ) {}

  /** login */
  doLogin(fLogin: FormGroup): Observable<HttpResponse<Object>> {
    const httpResponse = this.http
      .post(this.loginUrl, fLogin.value, { observe: 'response' })
      .pipe(catchError(handleErrors(fLogin)));

    httpResponse.subscribe((res) => {
      this.app.updateUser(res.body as User);
    });
    return httpResponse;
  }

  /** logout */
  doLogout(): Observable<HttpResponse<Object>> {
    const httpResponse = this.http.delete(this.loginUrl, {
      observe: 'response',
    });

    httpResponse.subscribe(() => {
      this.app.updateUser(undefined);
      this.router.navigate(['/login']);
    });
    return httpResponse;
  }

  /** Authorization login */
  authenticated(): Observable<User> {
    const user = this.http.get<User>(this.loginUrl);
    user.subscribe((data) => {
      this.app.updateUser(data);
    });
    return user;
  }
}
