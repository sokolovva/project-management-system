import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from 'src/app/shared/services/user.service';
import {User} from 'src/app/_models/user';
import {Location} from '@angular/common';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  page = [1, 1];
  public user: User;

  constructor(private readonly route: ActivatedRoute,
              private readonly userService: UserService,
              private readonly _location: Location) {}

  public ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id).subscribe(user => {
      this.user = user;
    });
  }

  public navigateBack(): void {
    this._location.back();
  }
}
