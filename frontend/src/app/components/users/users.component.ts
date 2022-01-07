import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from './users.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User, Role } from './user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService],
})
export class UsersComponent implements OnInit {
  readonly ADMIN = Role.ADMIN;
  readonly MENTOR = Role.MENTOR;
  readonly MEMBER = Role.MEMBER;

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

  showDialogInsert() {
    this.fUser.controls['id'].setValue('');
    this.fUser.controls['username'].setValue('');
    this.fUser.controls['password'].setValue('');
    this.fUser.controls['name'].setValue('');
    this.fUser.controls['role'].setValue('MEMBER');
    this.openModal?.nativeElement.click();
  }

  showDialogUpdate(id: string | undefined) {
    this.userService.getUser(id).subscribe((user) => {
      this.fUser.controls['id'].setValue(user._id);
      this.fUser.controls['username'].setValue(user.username);
      this.fUser.controls['name'].setValue(user.name);
      this.fUser.controls['password'].setValue('');
      this.fUser.controls['role'].setValue(user.role);
      this.openModal?.nativeElement.click();
    });
  }

  showDialogDelete(id: string | undefined) {
    if (!confirm('Are you sure to delete')) {
      return;
    }

    this.userService.delete(id).subscribe((user: any) => {
      this.users = this.users.filter((e) => e._id !== user._id);
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
          if (e._id === user._id) {
            Object.assign(e, user);
          }
        });
        this.closeModal?.nativeElement.click();
      });
    }
  }
}
