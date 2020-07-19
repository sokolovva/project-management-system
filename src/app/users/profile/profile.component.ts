import {Component} from '@angular/core';
import {AuthService} from '@src/app/shared/services/authentication.service';
import {User} from 'src/app/_models/user';
import {MenuItem} from 'primeng/api';

const DEFAULT_PROFILE_PICTURE: String = '../../../assets/profilePicture.png';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent {
  private fileToUpload: File = null;
  public currentUser: User;
  public profileMenu: MenuItem[] = [];
  public imgUrl: String = DEFAULT_PROFILE_PICTURE;

  constructor(readonly authService: AuthService) {
    this.profileMenu = [
      {label: 'Settings', icon: 'fa fa-gear', routerLink: '../profile/security'}
    ];
    this.currentUser = authService.activeUser;
  }

  public handleFileInput(file: FileList): void {
    this.fileToUpload = file.item(0);
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imgUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }
}


