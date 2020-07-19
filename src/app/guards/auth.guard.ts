import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AuthService} from '../shared/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private readonly authService: AuthService) {}

  public canActivate(): boolean {
    if (this.authService.activeUser) {
      return true;
    }
    this.router.navigate(['/authenticate']);
    return false;
  }
}
