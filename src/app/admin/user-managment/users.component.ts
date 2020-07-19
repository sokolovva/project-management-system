import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from '../../shared/services/user.service';
import { ConfirmationService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import {RolePipe} from '@src/app/shared/pipes/role.pipe';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  public user: User[];
  public selectedUsers: User[] = [];
  public users: User[] = [];
  public editUser = false;
  public currentUser: User | undefined = undefined;
  public userTableFields: any = [];
  public messages: any = [];

  constructor(private userService: UserService,
              private confirmationService: ConfirmationService,
              private toastService: ToastrService) {}

  public ngOnInit(): void {
    this.userTableFields = [
      { field: 'id', header: 'id' },
      { field: 'username', header: 'User Name' },
      { field: 'fullName', header: 'Full Name' },
      { field: 'role', header: 'Role', pipe: RolePipe }
    ];
    this.subscriptions.add(this.userService.getUsers().subscribe(users => this.users = users));
  }

  public manageUser(user): void {
    this.user = user;
    this.editUser = true;
    this.currentUser = user || undefined;
  }

  public deleteSelected(): void {
    if (!this.selectedUsers.length) {
     this.showMessage();
     return;
    }

    this.confirmationService.confirm({
      message: `Are you sure you want to delete these users?`,
      accept: () => {
      this.selectedUsers.forEach(user => {
        this.subscriptions.add(this.userService.delete(user.id).subscribe(() =>
          this.users.splice(this.users.findIndex((u) => u.id === user.id), 1)));
        });
      }
    });
  }

  public showMessage(): void {
    this.messages[0] = {severity: 'error', summary: 'Warning Message', detail: 'Please, select users to delete.'};
    setTimeout(() => {
    this.messages = [];
    }, 5000);
  }

  public hideMessage(): void {
  this.messages = [];
  }

  public delete(user): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${user.username}?`,
      accept: () => {
          this.subscriptions.add(this.userService.delete(user.id).subscribe(() => {
            this.users.splice(this.users.findIndex(u => u.id === user.id), 1);
            this.toastService.success('User ' + user.username + ' was successfully deleted!');
          }
        ));
      }
    });
  }

  public onSave(): void {
    this.editUser = undefined;
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
