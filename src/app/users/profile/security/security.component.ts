import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { passwordMatcher } from 'src/app/shared/validators/passwordMatcher.validator';
import { User } from 'src/app/_models/user';
import { AuthService } from '@src/app/shared/services/authentication.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})

export class SecurityComponent implements OnInit {
  private currentUser: User;
  public changePassForm: FormGroup;
  public infoMessage: String;

  constructor(private formBuilder: FormBuilder, 
             private authService: AuthService, 
             private userService: UserService,
             private toastService: ToastrService, 
             private _location: Location) {}

  public ngOnInit(): void {
    this.currentUser = this.authService.activeUser;
    this.changePassForm = this.formBuilder.group({
      currentPass: ['', [Validators.required]],
      passwords: this.formBuilder.group({
        password1: ['', [Validators.required]],
        password2: ['', [Validators.required]],
      }, { validator: passwordMatcher }),
    });
    this.changePassForm.reset();
  }

  public savePassword(): void {
    const value = this.changePassForm.value;
    this.userService.changePass(this.currentUser.id, value.currentPass, value.passwords.password1).subscribe(() => {
      this.toastService.success('You changed your password!');
      this.changePassForm.reset();
    }, () => {
      this.infoMessage = 'You entered a wrong passwod! Try again';
    });
  }

  public navigateBack(): void {
    this._location.back();
  }
}
