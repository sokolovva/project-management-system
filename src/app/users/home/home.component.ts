import {Component, OnInit} from '@angular/core';
import {AuthService} from '@src/app/shared/services/authentication.service';
import {User} from 'src/app/_models/user';
import {Project} from 'src/app/_models/project';
import {ProjectService} from 'src/app/shared/services/project.service';
import {UserService} from 'src/app/shared/services/user.service';
import {ToastrService} from 'ngx-toastr';
import {Observable, interval} from 'rxjs';
import {startWith, switchMap} from 'rxjs/operators';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  page: Number[] = [1, 1, 1, 1, 1, 1];
  currentUser: User;
  selectedUser: User;
  userProjects: Project[] = [];
  usersInProject: User[];
  relatedUsers: User[] = [];
  selectedProject: Project;
  showUserInfo = false;
  showUsersInProject: Boolean = false;
  showUsers = false;
  showSelectedUserProjects = false;
  columns;
  projectColumns;
  obs = null;

  constructor(private authService: AuthService,
    private projectService: ProjectService,
    private userService: UserService,
    private toastService: ToastrService,
    private datePipe: DatePipe) {}

  public ngOnInit(): void {
    this.projectColumns = [
      {field: 'title', header: 'Title'},
      {field: 'key', header: 'Key', type: this.datePipe}
    ];
    this.currentUser = this.authService.activeUser;
    
    this.projectService.getProjectsForUser(this.currentUser.id).subscribe(projects => {
      this.userProjects = projects;
      if (projects.length > 0) {
        this.userProjects.forEach(pr => {
          this.userService.getUsersForProject(pr.id).subscribe(users => {
            if (this.relatedUsers.length > 0) {
              this.relatedUsers = this.relatedUsers.concat(users.filter(item => {
                return this.relatedUsers.findIndex(u => u.id === item.id) < 0;
              }));
            } else {
              this.relatedUsers = this.relatedUsers.concat(users);
            }
            const myAccount = this.relatedUsers.findIndex(u => u.id === this.currentUser.id);
            if (myAccount !== -1) {
              this.relatedUsers.splice(myAccount, 1);
            }
          });
        });
      } else {
        this.relatedUsers = [];
      }
    });

    if (!this.currentUser.isAdmin()) {
      const obs = interval(7000)
        .pipe(
          startWith(0),
          switchMap(() => this.getData())
        )
        .subscribe();
    }
  }


  getData(): Observable<any> {
    return new Observable(observer => {
      this.projectService.getProjectsForUser(this.currentUser.id)
        .subscribe(res => {
          if (res) {
            res.forEach(pr => {
              const i = this.userProjects.find(project => project.id === pr.id);
              if (i === undefined) {
                this.toastService.success('You had been added to a new project - ' + pr.title);
              }
            });

            this.userProjects.forEach(pr => {
              const i = res.find(project => project.id === pr.id);
              if (i === undefined) {
                this.toastService.success('Project ' + pr.title + ' was successfully deleted!');
              }
            });
            this.userProjects = res;
          }
        });


      observer.next();
      observer.complete();
    });
  }

  informationForProject(project) {
    this.selectedProject = project;
    this.showUsersInProject = !this.showUsersInProject;
    this.userService.getUsersForProject(project.id).subscribe(users => this.usersInProject = users);
  }

  userInfo(id) {
    this.userService.getUser(id).subscribe(u => {
      this.selectedUser = u;
    });
    this.showUserInfo = true;
  }

  public trackByFn(index, item): string {
    return item.id;
  }
}
