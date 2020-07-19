import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {User} from 'src/app/_models/user';
import {AuthService} from '@src/app/shared/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public wrongCredentials: Boolean;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService) {}

  public ngOnInit(): void {
    this.wrongCredentials = false;
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  public login(): void {
    const val = this.loginForm.value;
    if (val.username && val.password) {
      this.authService.login(val.username, val.password)
        .subscribe(
          (user: User) => {
            if (!!user) {
              user.isAdmin() ?  this.router.navigate(['home/profile']) :  this.router.navigate(['home/dashboard']);
            } else {
              this.wrongCredentials = true;
              this.loginForm.patchValue({password: ''});
            }
        });
    }
  }
}
