import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { RegisterComponent } from './register/register.component';
import { UsersComponent } from './users.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'createUser',
        component: RegisterComponent
      },
      {
        path: 'listUsers',
        component: UsersComponent,
        canActivate: [AuthGuard, AdminGuard],
      },
      {
        path: 'userDetails/:id',
        component: UserDetailsComponent,
        canActivate: [AuthGuard, AdminGuard],
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
