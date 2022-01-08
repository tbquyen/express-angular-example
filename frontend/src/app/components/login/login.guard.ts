import { AppService } from './../../app.service';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class LoginGuardService implements CanActivate, CanActivateChild {
  constructor(private authService: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return this.authService.authenticated().pipe(
      map(() => {
        this.router.navigate(['']);
        return false;
      }),
      catchError(() => {
        return of(true);
      })
    );
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return this.canActivate(route, state);
  }
}

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(private authService: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return this.authService.authenticated().pipe(
      map((user) => {
        if (route.data.roles && route.data.roles.indexOf(user.role) === -1) {
          this.router.navigate(['/403'], {
            skipLocationChange: false,
            state: { statusCodes: 403 },
          });
          return false;
        }
        return true;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
        }
        return of(false);
      })
    );
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return this.canActivate(route, state);
  }
}
