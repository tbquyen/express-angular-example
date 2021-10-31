import { LoginService } from './login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService],
})
export class LoginComponent implements OnInit {
  public fLogin: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  });

  constructor(private LoginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    this.LoginService.doLogin(this.fLogin).subscribe(
      () => {
        this.router.navigate(['']);
      },
      (error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.router.navigate([
            '/password',
            this.fLogin.controls['username'].value,
          ]);
        }
      }
    );
  }
}
