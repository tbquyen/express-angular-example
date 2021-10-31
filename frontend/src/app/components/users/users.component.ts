import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from './users.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from './user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService],
})
export class UsersComponent implements OnInit {
  @ViewChild('closeModal') closeModal: ElementRef | undefined;
  @ViewChild('openModal') openModal: ElementRef | undefined;

  public users: User[] = [];
  public fUser: FormGroup = new FormGroup({
    id: new FormControl(),
    username: new FormControl(),
    name: new FormControl(),
    role: new FormControl(),
    password: new FormControl(),
    disabled: new FormControl(),
  });

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => (this.users = users));
  }

  insertUser() {
    this.fUser.controls['id'].setValue('');
    this.fUser.controls['username'].setValue('');
    this.fUser.controls['password'].setValue('');
    this.fUser.controls['name'].setValue('');
    this.fUser.controls['role'].setValue('MEMBER');
    this.openModal?.nativeElement.click();
  }

  updateUser(id: string | undefined) {
    this.userService.getUser(id).subscribe((user) => {
      this.fUser.controls['id'].setValue(user.id);
      this.fUser.controls['username'].setValue(user.username);
      this.fUser.controls['name'].setValue(user.name);
      this.fUser.controls['password'].setValue('');
      this.fUser.controls['role'].setValue(user.role);
      this.openModal?.nativeElement.click();
    });
  }

  deleteUser(id: string | undefined) {
    if (!confirm('Are you sure to delete')) {
      return;
    }

    this.userService.delete(id).subscribe((user: any) => {
      this.users = this.users.filter((e) => e.id !== user.id);
    });
  }

  onSubmit() {
    if (this.fUser.controls['id'].value === '') {
      this.userService.insert(this.fUser).subscribe((user: any) => {
        this.users.push(user);
        this.closeModal?.nativeElement.click();
      });
    } else {
      this.userService.update(this.fUser).subscribe((user: any) => {
        this.users.forEach((e) => {
          if (e.id === user.id) {
            Object.assign(e, user);
          }
        });
        this.closeModal?.nativeElement.click();
      });
    }
  }
}
