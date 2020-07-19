import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {ProjectService} from '../../services/project.service';
import {User} from 'src/app/_models/user';
import {Project} from 'src/app/_models/project';
import {UserService} from '../../services/user.service';
import {AuthService} from '../../services/authentication.service';

@Component({
  selector: 'app-list-project-for-user',
  templateUrl: './list-project-for-user.component.html',
  styleUrls: ['./list-project-for-user.component.scss']
})
export class ListProjectForUserComponent implements OnChanges {
  page = [1, 1];
  
  public userProjects: Project[] = [];
  public usersInProject: User[] = [];
  public project: Project;
  public showUsers = false;
  
  @Input() public user: User;
  @Input() public showProgress = false;

  constructor(private projectService: ProjectService,
    private userService: UserService) {}

  public ngOnChanges(): void {
    if (this.user) {
      this.getProjects();
    }
  }

  public getProjects(): void {
    this.showUsers = false;
    this.projectService.getProjectsForUser(this.user.id).subscribe(projects => this.userProjects = projects);
  }

  public getUsers(project): void {
    this.project = project;
    this.userService.getUsersForProject(project.id).subscribe(users => 
      this.usersInProject = users);
    this.showUsers = true;
  }
}
