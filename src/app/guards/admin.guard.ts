import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {AuthService} from '../shared/services/authentication.service';

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  public canActivate(): boolean {
    return this.authService.activeUser.isAdmin() ? true : false;
  }
}
