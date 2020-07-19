
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import {ConfirmationService} from 'primeng/api';
import { PasswordModule } from 'primeng/password';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { ListProjectForUserComponent } from './components/list-project-for-user/list-project-for-user.component';
import {ProgressBarModule} from 'primeng/progressbar';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { AppPasswordDirective } from './directives/app-password.directive';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {MenuModule} from 'primeng/menu';
import {RolePipe} from './pipes/role.pipe';

@NgModule({
    imports: [
        CommonModule,
        InputTextModule,
        CardModule,
        FormsModule,
        PasswordModule,
        RadioButtonModule,
        ButtonModule,
        ReactiveFormsModule,
        HttpClientModule,
        TableModule,
        DialogModule,
        ConfirmDialogModule,
        TooltipModule,
        ToastrModule.forRoot(),
        NgxPaginationModule,
        MenuModule
    ],
    declarations: [
        LoginComponent,
        ListProjectForUserComponent,
        RolePipe,
        ListUsersComponent,
        AppPasswordDirective
    ],
    exports: [
        LoginComponent,
        ListProjectForUserComponent,
        ListUsersComponent,
        InputTextModule,
        PasswordModule,
        CardModule,
        FormsModule,
        RadioButtonModule,
        TabMenuModule,
        ButtonModule,
        ReactiveFormsModule,
        HttpClientModule,
        TableModule,
        DialogModule,
        CheckboxModule,
        CalendarModule,
        ConfirmDialogModule,
        TooltipModule,
        ToastrModule,
        NgxPaginationModule,
        RolePipe,
        MessageModule,
        MessagesModule,
        ProgressBarModule,
        AppPasswordDirective,
        MenuModule
    ],
    entryComponents: [LoginComponent],
    providers: [ConfirmationService],
})
export class SharedModule { }
