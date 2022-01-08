import { User } from './../users/user.model';
import { AppService } from './../../app.service';
import { LoginService } from './../login/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

const Messages = new Map<number, string>([
  [403, 'FORBIDDEN'],
  [404, 'Sorry, an error has occured, Requested page not found!'],
]);

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
  providers: [LoginService],
})
export class ErrorComponent implements OnInit {
  public user: User | undefined;
  public statusCodes: number = 404;
  public message: string | undefined = Messages.get(404);

  constructor(
    private route: Router,
    private loginService: LoginService,
    private app: AppService
  ) {
    const statusCodes = parseInt(
      this.route.getCurrentNavigation()?.extras.state?.statusCodes
    );
    if (!isNaN(statusCodes)) {
      this.statusCodes = statusCodes;
      this.message = Messages.get(this.statusCodes);
    }
  }

  ngOnInit(): void {
    this.app.userSubject.subscribe((user) => (this.user = user));
    if (!this.user) {
      this.loginService.authenticated().subscribe();
    }
  }
}
