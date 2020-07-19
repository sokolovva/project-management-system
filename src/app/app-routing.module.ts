import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { LoginComponent } from './shared/components/login/login.component';

const routes: Routes = [
  { path: 'authenticate', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'user', loadChildren: './admin/user-managment/user.module#UserModule'},
  { path: 'projects', loadChildren: './admin/projects/project.module#ProjectModule'},
  { path: 'home', loadChildren: './users/users.module#UsersModule' },
  { path: 'logout', redirectTo: 'authenticate', pathMatch: 'full' },
  { path: '', redirectTo: (() => {
    return localStorage.getItem('loggedUser') ? 'home/profile' : 'authenticate' ;
  })(),  pathMatch: 'full' },
  { path: '**', redirectTo: (() => {
    return  localStorage.getItem('loggedUser') ? 'home/profile' : 'authenticate' ;
  })(), pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
