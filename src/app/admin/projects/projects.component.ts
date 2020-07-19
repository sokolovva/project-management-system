import {Component, OnInit, OnDestroy} from '@angular/core';
import {Project} from '../../_models/project';
import {ProjectService} from '../../shared/services/project.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from 'src/app/_models/user';
import {UserService} from '../../shared/services/user.service';
import {ConfirmationService} from 'primeng/api';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})

export class ProjectsComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();
  public projectForm: FormGroup;
  public projects: Project[];
  public project: Project;
  public availableUsers: User[] = [];
  public manageProject: Boolean = false;
  public displayAdd: Boolean = true;
  public message: string = '';
  public projectFields: any = [];

  constructor(private projectService: ProjectService,
    private userService: UserService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private toastService: ToastrService) {}

  public ngOnInit(): void {
    this.projectService.list().subscribe(
      projects => this.projects = projects);

    this.projectFields = [
      {field: 'id', header: 'ID'},
      {field: 'key', header: 'Key'},
      {field: 'title', header: 'Title'}
    ];

    this.projectForm = this.fb.group({
      id: [''],
      key: ['', [Validators.required]],
      title: ['', [Validators.required]]
    });
  }

  public listProjects(project: Project): void {
    this.manageProject = true;
    if (project) {
      this.project = project;
      this.displayAdd = false;
      this.projectForm.setValue({id: project.id, key: project.key, title: project.title});
      this.subscriptions.add(this.userService.getAvailableUsersForProject(project.id).subscribe(projects => {
        this.availableUsers = projects;
      }));
    } else {
      this.displayAdd = true;
    }
  }

  public addProject(): void {
    if (this.projectForm.valid) {
      const val = this.projectForm.value;
      const newProject = {
        key: val.key,
        title: val.title
      };
      this.subscriptions.add(this.projectService.createProject(newProject)
          .subscribe(project => {
            this.projects.push(project);
            this.toastService.success('Project ' + project.title + ' was successfully added!');
            this.manageProject = false;
          }, (error) => {
            this.message = 'Something went wrong. Try again later.';
          }
        ));
    }
  }

  public deleteProject(project: Project): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${project.title}?`,
      accept: () => {
        this.subscriptions.add(this.projectService.delete(project.id).subscribe(() => {
            this.projects.splice(this.projects.findIndex(p => p.id === project.id), 1);
            this.toastService.success('Project ' + project.title + ' was successfully deleted!');
          }
        ));
      }
    });
  }

  public ngOnDestroy(): void{
    this.subscriptions.unsubscribe();
  }
}
