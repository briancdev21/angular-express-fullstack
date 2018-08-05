import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NgSelectModule } from '@ng-select/ng-select';
import { PendingProjectBreadcrumbBarComponent } from './pendingprojectbreadcrumbbar/pendingprojectbreadcrumbbar.component';

import { AddDetailedTaskComponent } from '../../adddetailedtask/adddetailedtask.component';
import { SubTasksManagementComponent } from '../../adddetailedtask/subtasksmanagement/subtasksmanagement.component';
import { ProjectInformationComponent } from './projectinformation/projectinformation.component';
import { PendingProjectScopeComponent } from './pendingprojectscope/pendingprojectscope.component';
import { PendingProjectTasksComponent } from './pendingprojecttasks/pendingprojecttasks.component';
import { PendingProjectFinancialsComponent } from './pendingprojectfinancials/pendingprojectfinancials.component';
import { PendingProjectComponent } from './pendingproject.component';
import { PendingWorkOrdersListTableComponent } from './pendingworkorderslisttable/pendingworkorderslisttable.component';


import { CommonCmpModule } from '../../../common/common.module';
import { ProfileCmpModule } from '../../../profile/profile.module';
import { BreadcrumbModule } from '../../../breadcrumb/breadcrumb.module';
import { ProjectManagementCmpModule } from '../../projectmanagement/projectmanagement.module';
import { ProjectFinancialsTableCmpModule } from './projectfinancialstable/projectfinancialstable.module';

import { ClickOutsideModule } from 'ng4-click-outside';
import { TabModule } from 'angular-tabs-component';
import { FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_FORMATS } from 'ng-pick-datetime';
import { QuillModule } from 'ngx-quill';
import { DpDatePickerModule } from 'ng2-date-picker';
import { Ng2CompleterModule } from 'ng2-completer';

import { PendingProjectService } from './pendingproject.service';

export const MY_NATIVE_FORMATS = {
  fullPickerInput: {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'},
  datePickerInput: {year: 'numeric', month: 'numeric', day: 'numeric'},
  timePickerInput: {hour: 'numeric', minute: 'numeric'},
  monthYearLabel: {year: 'numeric', month: 'short'},
  dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
  monthYearA11yLabel: {year: 'numeric', month: 'long'},
};

@NgModule({
  declarations: [
    PendingProjectBreadcrumbBarComponent,
    ProjectInformationComponent,
    PendingProjectScopeComponent,
    PendingProjectTasksComponent,
    PendingProjectFinancialsComponent,
    PendingProjectComponent,
    PendingWorkOrdersListTableComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    BreadcrumbModule,
    CommonCmpModule,
    ProfileCmpModule,
    TabModule,
    NgSelectModule,
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ClickOutsideModule,
    QuillModule,
    ProjectManagementCmpModule,
    DpDatePickerModule,
    ProjectFinancialsTableCmpModule,
    Ng2CompleterModule
  ],
  exports: [
  ],
  providers: [
    PendingProjectService,
    {provide: OWL_DATE_TIME_FORMATS, useValue: MY_NATIVE_FORMATS},
  ]
})
export class PendingProjectCmpModule { }
