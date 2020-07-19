import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {User} from 'src/app/_models/user';
import {Router} from '@angular/router';
import {UserService} from '../../../shared/services/user.service';
import {AuthService} from '../../../shared/services/authentication.service';
import {passwordMatcher} from '../../../shared/validators/passwordMatcher.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;

  @Input() public editValues: User;
  @Input() public users: User[] = [];
  @Input() public user: User;

  @Output() public userChanged = new EventEmitter();

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router,
              private toastService: ToastrService,
              private authService: AuthService) {}

  public ngOnInit(): void {
      this.registerForm = this.fb.group({
        ID: [''],
        username: ['', [Validators.required]],
        passwords: this.fb.group({
          password1: ['', [Validators.required]],
          password2: ['', [Validators.required]],
        }, {validator: passwordMatcher}),
        fullName: ['', [Validators.required]],
        role: ['NORMAL_USER']
      });

      if (this.editValues) {
        this.registerForm.patchValue({
          ID: this.editValues.id,
          username: this.editValues.username, 
          passwords: {password1: this.editValues.password, 
          password2: this.editValues.password},
          fullName: this.editValues.fullName, 
          role: this.editValues.role
        });
      }
    }

  public register(): void {
    if (!this.checkForm()) {
      return;
    }
    const val = this.registerForm.value;
    const currUser = {'username': val.username, 
                      'password': val.passwords.password1, 
                      'fullName': val.fullName, 
                      'role': val.role
                    };

    this.userService.create(new User(currUser))
      .subscribe(user => {
        if (this.authService.activeUser) {
          this.userChanged.emit();
          this.router.navigate(['/user/listUsers']);
          this.toastService.success('User ' + user.username + ' was successfully created!');
        } else {
          this.router.navigate(['/authenticate']);
          this.toastService.success('Your account was successfully created!', 'You can log in!');
        }
        this.users.push(user);
      }
      );
  }

  public edit(): void {
    if (!this.checkForm()) {
      return;
    }
    const val = this.registerForm.value;
    const currUser = {
      'id': val.id,
      'username': val.username,
      'password': val.passwords.password1, 
      'fullName': val.fullName, 
      'role': val.role
    };
    
    this.userService.edit(new User(currUser))
      .subscribe(user=> {
        this.users[this.users.indexOf(this.user)] = user;
        this.userChanged.emit();
        this.toastService.success('You changed user ' + user.username + '!');
      });
  }

  public checkForm(): boolean{
    return this.registerForm.valid;
  }
}


