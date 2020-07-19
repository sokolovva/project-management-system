import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './shared/services/authentication.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { User } from './_models/user';

 const GUESTMENU = [
  { label: 'Login', routerLink: ['authenticate'],  icon: 'fa fa-sign-in' },
  { label: 'Register', routerLink: ['user/createUser'],  icon: 'fa fa-user' },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  public readonly currentUser$ = new BehaviorSubject<User | undefined>(undefined);
  public routes: MenuItem[];

  public readonly USERMENU = [
    { label: 'Home', routerLink: ['home/dashboard'],  icon: 'fa fa-home' },
    { label: 'Profile', routerLink: ['home/profile'],  icon: 'fa fa-user' },
    { label: 'Logout', routerLink: ['authenticate'],  icon: 'fa fa-sign-out', command: this.logout.bind(this)}
  ];

  public readonly ADMINMENU: MenuItem[] = [
    ...this.USERMENU.slice(1, 2),
    { label: 'Users',  routerLink: ['user/listUsers'],  icon: 'fa fa-users' },
    { label: 'Projects', routerLink: ['projects/listProjects'],  icon: 'fa fa-tasks' },
    this.USERMENU[this.USERMENU.length - 1]
  ];

  constructor(private authService: AuthService) {
  }
  public ngOnInit(): void {
    this.subscriptions.add(this.authService.activeUserChanged.subscribe(user => {
      if (user) {
        this.currentUser$.next(user);
        this.routes = user.isAdmin() ? this.ADMINMENU : this.USERMENU;
      } else {
        this.currentUser$.next(undefined);
        this.routes = GUESTMENU;
      }
    }));
  }

  public ngOnDestroy(): void{
    this.subscriptions.unsubscribe();
  }

  public logout(): void {
    this.authService.logout();
  }

}



