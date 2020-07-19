import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../_models/user';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import {ManagementService} from './iservice';
import {Project} from '@src/app/_models/project';

@Injectable({ providedIn: 'root' })
export class UserService extends ManagementService {

  constructor(public httpClient: HttpClient) {
    super(httpClient);
  }
  
  public list(): Observable<any[]> {
    return super.list(false);
  }
  
  public delete(id: string): Observable<User | Project> {
    return super.delete(id, true);
  }

  public getUser(id: string): Observable<User> {
    return this.httpClient.get(`/pm/user/getUser/${id}`).pipe(map(user => new User(<User>user)));
  }

  public getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>('/pm/user/listUsers')
        .pipe(map(users => {
          users.map(user => new User(user));
          return users.filter(user => !user.isAdmin());
    }))
  }

  public changePass(id: string, oldPassword: string, newPassword: string): Observable<boolean> {
    return this.httpClient.post<boolean>(`/pm/user/changePassword/${id}`, {oldPassword, newPassword});
  }

  public getUsersForProject(id: string): Observable<User[]> {
    return this.httpClient.get<User[]>(`/pm/user/getUsersForProject/${id}`).pipe(map(users => users.map(user => new User(user))));
  }

  public getAvailableUsersForProject(id: string): Observable<User[]> {
    return this.httpClient.get<User[]>(`/pm/user/getAvailableUsersForProject/${id}`)
      .pipe(map(users => users.map(user => new User(user))), map(users => users.filter(user => !user.isAdmin())));
  }
}
