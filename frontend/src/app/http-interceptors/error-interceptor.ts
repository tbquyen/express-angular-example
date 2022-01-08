import { AppService } from './../app.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private app: AppService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          this.app.updateUser(undefined);
        }

        // skip if not login and bad request
        if ([400, 401].indexOf(err.status) !== -1) {
          return throwError(err);
        }

        this.router.navigate(['error']);
        return throwError(err);
      })
    );
  }
}
