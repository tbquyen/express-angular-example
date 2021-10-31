import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HomeService {
  homeUrl = 'home';

  constructor(private http: HttpClient) {}

  /** home */
  doHome() {
    return this.http.get(this.homeUrl);
  }
}
