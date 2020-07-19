import {Project} from '@src/app/_models/project';
import {User} from '@src/app/_models/user';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

export interface IService {
     list(projects: boolean): Observable<User[] | Project[]>;
     create(object: User | Project): Observable<User | Project>;
     edit(object: User | Project): Observable<User | Project>;
     delete(id: string, isUser: boolean): Observable<User | Project>;
}

export abstract class ManagementService implements IService {

    constructor(public httpClient: HttpClient) {}

    public list(projects: boolean): Observable<any> {
        const path = projects ? '/pm/project/listProjects' : '/pm/user/listUsers';
        const object = projects ? new Project({id: '123'}) : new User({id: '123'});
        return this.httpClient.get<User[] | Project[]>(path);
    }
    public create(object:  User | Project): Observable<any> {
        const path = object instanceof User ? '/pm/user/createUser' : '/pm/project/createProject';
        return this.httpClient.post<typeof object>(path, object);
    }

    public edit(object: User | Project): Observable<any> {
        const type = typeof object;
        return this.httpClient.put<typeof object>(`/pm/${type.toLowerCase()}/edit${type}/${object.id}`, object);
    }

    public delete(id: string, isUser: boolean): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const path = isUser ? `/pm/user/deleteUser/${id}` : `/pm/project/deleteProject/${id}`;
        return this.httpClient.delete<User | Project>(path, {headers: headers});
    }
}
