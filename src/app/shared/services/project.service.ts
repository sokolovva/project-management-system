import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Project } from 'src/app/_models/project';
import {ManagementService} from './iservice';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends ManagementService {
  constructor(public httpClient: HttpClient){
    super(httpClient);
  }
  
  public list(): Observable<any[]> {
    return super.list(true);
  }

  public delete(id: string): Observable<any> {
    return super.delete(id, false);
  }

  public getProject(id: string): Observable<Project> {
    return this.httpClient.get<Project>(`/pm/project/getProject/${id}`);
  }

  public createProject(project: Project): Observable<Project> {
    return this.httpClient.post<Project>('/pm/project/createProject', project);
  }

  public getProjectsForUser(id: string): Observable<Project[]> {
    return this.httpClient.get<Project[]>(`/pm/project/getProjectsForUser/${id}`);
  }

  public assignUserToProject(userId: string, projectId: string){
    return this.httpClient.post(`/pm/project/assignUserToProject/${userId}/to/${projectId}`, {});
  }
}
