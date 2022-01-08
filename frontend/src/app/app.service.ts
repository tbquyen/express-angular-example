import { User } from './components/users/user.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  public userSubject: BehaviorSubject<User | undefined>;

  constructor() {
    this.userSubject = new BehaviorSubject<User | undefined>(undefined);
  }

  updateUser(user: User | undefined): void {
    this.userSubject.next(user);
  }
}
