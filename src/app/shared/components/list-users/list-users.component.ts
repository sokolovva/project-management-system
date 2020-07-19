import { Component, Input, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/_models/user';
import { Project } from 'src/app/_models/project';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent {
  page = [1];

  @Input() public users: User[] = [];
  @Input() public project: Project;
  @Input() public showOptions: Boolean = false;

  @Output() userInfoClick = new EventEmitter();
}
