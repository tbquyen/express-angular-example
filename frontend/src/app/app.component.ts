import { Router } from '@angular/router';
import { LoginService } from './components/login/login.service';
import { AppService } from './app.service';
import { User, Role } from './components/users/user.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LoginService],
})
export class AppComponent implements OnInit {
  readonly ADMIN = Role.ADMIN;
  readonly MENTOR = Role.MENTOR;
  readonly MEMBER = Role.MEMBER;

  public user: User | undefined;

  constructor(private app: AppService, private loginService: LoginService) {}

  ngOnInit(): void {
    this.app.userSubject.subscribe((user) => (this.user = user));
  }

  hasRole(roles: string[]): boolean {
    if (roles.length > 0 && roles.indexOf('' + this.user?.role) === -1) {
      return false;
    }

    return true;
  }

  logout(): void {
    this.loginService.doLogout().subscribe();
  }
}
