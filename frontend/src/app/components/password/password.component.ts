import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { handleErrors } from 'src/app/utils/form.utils';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css'],
})
export class PasswordComponent implements OnInit {
  private passwordUrl = 'password'; // URL to web api
  public fPassword: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    newPassword: new FormControl(),
    confirmPassword: new FormControl(),
  });

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.fPassword.controls['username'].setValue(params['username']);
    });
  }

  onSubmit() {
    return this.http
      .put(this.passwordUrl, this.fPassword.value, { observe: 'response' })
      .pipe(catchError(handleErrors(this.fPassword)))
      .subscribe(() => {
        this.router.navigate(['']);
      });
  }
}
