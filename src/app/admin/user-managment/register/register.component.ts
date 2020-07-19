import {Component, OnInit, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {User} from 'src/app/_models/user';
import {Router} from '@angular/router';
import {UserService} from '../../../shared/services/user.service';
import {AuthService} from '../../../shared/services/authentication.service';
import {passwordMatcher} from '../../../shared/validators/passwordMatcher.validator';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();
  public registerForm: FormGroup;

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
  }

  public register(): void {
    if (!this.checkForm()) {
      return;
    }
    const value = this.registerForm.value;
    const user = {
      'username': value.username,
      'password': value.passwords.password1,
      'fullName': value.fullName,
      'role': value.role
    };

    this.subscriptions.add(this.userService.create(new User(user))
      .subscribe(newUser => {
        if (this.authService.activeUser) {
          this.userChanged.emit();
          this.router.navigate(['/user/listUsers']);
          this.toastService.success('User ' + user.username + ' was successfully created!');
        } else {
          this.router.navigate(['/authenticate']);
          this.toastService.success('Your account was successfully created!', 'You can log in!');
        }
        this.users.push(newUser);
      }
      ));
  }

  public checkForm(): boolean {
    return this.registerForm.valid;
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}


