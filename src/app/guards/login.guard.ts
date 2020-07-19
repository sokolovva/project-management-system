import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import {AuthService} from '../shared/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router, private readonly authenticationService: AuthService) {}

  public canActivate(): boolean {
    if (!this.authenticationService.activeUser) {
        return true;
    }
    this.router.navigate(['/home/profile']);
    return false;
  }
}
