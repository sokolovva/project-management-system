
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { ProjectRoutingModule } from './project-routing.module';

@NgModule({
  declarations: [ProjectsComponent],
  imports: [
    ProjectRoutingModule,
    SharedModule,
    CommonModule
  ]
})
export class ProjectModule { }
