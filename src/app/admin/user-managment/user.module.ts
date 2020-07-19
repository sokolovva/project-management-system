
import { NgModule } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { UserRoutingModule } from './user-routing.module';
import { UsersComponent } from './users.component';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './user-details/user-details.component';

@NgModule({
  declarations: [UsersComponent, RegisterComponent, UserDetailsComponent],
  imports: [
    SharedModule,
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
