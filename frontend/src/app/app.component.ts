import { User, Role } from './components/users/user.model';
import { LoginService } from './components/login/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  readonly ADMIN = Role.ADMIN;
  readonly MENTOR = Role.MENTOR;
  readonly MEMBER = Role.MEMBER;

  public user: User | undefined;

  constructor(private service: LoginService) {}

  ngOnInit(): void {
    this.service.authenticated().subscribe((user) => (this.user = user));
  }

  authenticated(user: any) {
    console.log(user);
  }

  hasRole(roles: string[]): boolean {
    if (roles.length > 0 && roles.indexOf('' + this.user?.role) === -1) {
      return false;
    }

    return true;
  }
}
