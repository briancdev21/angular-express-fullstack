import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AutocompleteModule } from 'ng2-input-autocomplete';
import { PmBreadcrumbBarComponent } from './pmbreadcrumbbar/pmbreadcrumbbar.component';
import { PmBoardComponent } from './pmboard/pmboard.component';
import { PmScheduleComponent } from './pmschedule/pmschedule.component';
import { PmFinancialsComponent } from './pmfinancials/pmfinancials.component';
import { PmProgressComponent } from './pmprogress/pmprogress.component';
import { PmFilesComponent } from './pmfiles/pmfiles.component';
import { PmBoardTopInfoComponent } from './pmboard/pmboardtopinfo/pmboardtopinfo.component';
import { BoardPanelRightComponent } from './pmboard/boardpanelright/boardpanelright.component';
import { ProjectFinanceComponent } from './pmboard/projectfinance/projectfinance.component';
import { PmBoardTableComponent } from './pmboard/pmboardtable/pmboardtable.component';
import { AddDetailedTaskComponent } from '../adddetailedtask/adddetailedtask.component';
import { SubTasksManagementComponent } from '../adddetailedtask/subtasksmanagement/subtasksmanagement.component';
import { GanttChartComponent } from './pmboard/ganttchart/ganttchart.component';
import { PmTasksTableComponent } from './pmschedule/pmtaskstable/pmtaskstable.component';
import { ChangeLogProfileComponent } from './pmprogress/changelogprofile/changelogprofile.component';
import { ChangeLogDetailsComponent } from './pmprogress/changelogdetails/changelogdetails.component';
import { ChangeLogListTableComponent } from './pmprogress/changeloglisttable/changeloglisttable.component';
import { ChangeLogSettingsComponent } from './pmprogress/changelogsettings/changelogsettings.component';
import { ChangeLogsTableComponent } from './pmprogress/changelogstable/changelogstable.component';

import { CommonCmpModule } from '../../../components/common/common.module';
import { ProfileCmpModule } from '../../profile/profile.module';
import { BreadcrumbModule } from '../../../components/breadcrumb/breadcrumb.module';
import { ClickOutsideModule } from 'ng4-click-outside';
import { DragulaModule } from 'ng2-dragula';

import { TabModule } from 'angular-tabs-component';
import { FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_FORMATS } from 'ng-pick-datetime';
import { QuillModule } from 'ngx-quill';

import { PmService } from './pm.service';

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
    PmBreadcrumbBarComponent,
    PmBoardComponent,
    PmScheduleComponent,
    PmFinancialsComponent,
    PmProgressComponent,
    PmFilesComponent,
    PmBoardTopInfoComponent,
    BoardPanelRightComponent,
    ProjectFinanceComponent,
    PmBoardTableComponent,
    AddDetailedTaskComponent,
    SubTasksManagementComponent,
    GanttChartComponent,
    PmTasksTableComponent,
    ChangeLogProfileComponent,
    ChangeLogDetailsComponent,
    ChangeLogListTableComponent,
    ChangeLogSettingsComponent,
    ChangeLogsTableComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    BreadcrumbModule,
    CommonCmpModule,
    ProfileCmpModule,
    TabModule,
    AutocompleteModule,
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ClickOutsideModule,
    DragulaModule,
    QuillModule
  ],
  exports: [
    PmBreadcrumbBarComponent,
    PmBoardComponent,
    PmScheduleComponent,
    PmFinancialsComponent,
    PmProgressComponent,
    PmFilesComponent,
    AddDetailedTaskComponent,
    SubTasksManagementComponent,
    GanttChartComponent
  ],
  providers: [
    PmService,
    {provide: OWL_DATE_TIME_FORMATS, useValue: MY_NATIVE_FORMATS},
  ]
})
export class ProjectManagementCmpModule { }
