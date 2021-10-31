import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { LoginService } from '../login/login.service';

@Injectable()
export class HomeGuardService implements CanActivate, CanActivateChild {
  constructor(private authService: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return true;
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return this.canActivate(route, state);
  }
}
