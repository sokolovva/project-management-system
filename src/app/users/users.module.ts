import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { SecurityComponent } from './profile/security/security.component';
import { SharedModule } from './../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent,
    SecurityComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    UsersRoutingModule
  ],
  providers: [DatePipe]
})

export class UsersModule {}
