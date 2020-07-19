import {Component, OnInit} from '@angular/core';
import {Project} from '../../_models/project';
import {ProjectService} from '../../shared/services/project.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from 'src/app/_models/user';
import {UserService} from '../../shared/services/user.service';
import {ConfirmationService} from 'primeng/api';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})

export class ProjectsComponent implements OnInit {
  public selectedValues: Project[] = [];
  public projectForm: FormGroup;
  public projects: Project[];
  public project: Project;
  public availableUsers: User[];
  public manageProject: Boolean = false;
  public displayAdd: Boolean = true;
  public messages: any = [];
  public message: string;
  public projectFields: any = [];

  constructor(private projectService: ProjectService,
    private userService: UserService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private toastService: ToastrService) {}

  public ngOnInit(): void {
    this.projectFields = [
      {field: 'id', header: 'ID'},
      {field: 'key', header: 'Key'},
      {field: 'title', header: 'Title'}
    ];

    this.projectService.list().subscribe(
      projects => this.projects = projects);

    this.projectForm = this.fb.group({
      id: [''],
      key: ['', [Validators.required]],
      title: ['', [Validators.required]]
    });
  }

  public showDialog(project: Project): void {
    this.message = '';
    this.manageProject = true;
    this.availableUsers = [];
    if (project) {
      this.project = project;
      this.displayAdd = false;
      this.projectForm.setValue({id: project.id, key: project.key, title: project.title});
      this.userService.getAvailableUsersForProject(project.id).subscribe(projects => {
        this.availableUsers = projects;
      });
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
      this.projectService.createProject(newProject)
        .subscribe(project => {
          this.projects.push(project);
          this.toastService.success('Project ' + project.title + ' was successfully added!');
          this.manageProject = false;
        }, (error) => {
          this.message = 'Something went wrong. Try again later.';
        }
        );
    }
  }

  public editProject(edit: boolean): void {
    if (this.projectForm.valid) {
      const val = this.projectForm.value;
      const projectChanges = {
        id: edit ? val.id : undefined,
        key: val.key,
        title: val.title
      };
      const successMessage = edit ? `Project  ${projectChanges.title} was successfully changed! `:
                                    `Project  ${projectChanges.title} was successfully added!`;
      const request = edit ? this.projectService.edit(projectChanges) : this.projectService.createProject(projectChanges);
      request.subscribe(project => {
        if (edit) {
          const i = this.projects.indexOf(this.project);
          this.projects[i] = project;
        } else {}
        this.projects.push(project);
          this.manageProject = false;
          this.toastService.success(successMessage);
        }, (error) => {
          this.message = 'Something went wrong. Try again later.';
        }
        );
    }
  }

  public deleteProject(project: Project): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${project.title}?`,
      accept: () => {
        this.projectService.delete(project.id).subscribe(() => {
          this.projects.splice(this.projects.findIndex(p => p.id === project.id), 1);
          this.toastService.success('Project ' + project.title + ' was successfully deleted!');
        }
        );
      }
    });
  }

  public assignUsers(): void {
    const checkedUsers = [];
    [].forEach.call(document.getElementsByClassName('user-checkbox'), function (element) {
      if (element.checked) {
        checkedUsers.push(element.value);
      }
    });
    checkedUsers.forEach(u => {
      this.projectService.assignUserToProject(u, this.project.id).subscribe(() => {
        [].forEach.call(document.getElementsByClassName('user-checkbox'), element => {
          if (element.checked) {
            element.nextSibling.style.display = 'inline';
            element.remove();
            this.toastService.success('User was successfully assigned to ' + this.project.title + '!');
          }
        });
      });
    });
  }
}
