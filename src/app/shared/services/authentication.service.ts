import { Injectable } from '@angular/core';
import { User } from '../../_models/user';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly activeUser$$ = new BehaviorSubject<User | undefined>(this.activeUser);

  constructor(private http: HttpClient) {}

  public get activeUser(): User | undefined {
    return this.activeUser$$ && this.activeUser$$.getValue() || undefined;
  }

  public get activeUserChanged(): Observable<User>{
    return this.activeUser$$.asObservable();
  }

  public login(username: string, password: string): Observable<User> {
    return this.http.post('/pm/authenticate', {username: username, password: password}).pipe(map(user => {
      const createdUser = user && new User(user) || undefined;
      this.activeUser$$.next(createdUser);
      return createdUser;
    }));
  }

  public logout(): void {
    this.activeUser$$.next(null);
  }
}
