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
import { ChangeLogListTableComponent } from './pmprogress/changeloglisttable/changeloglisttable.component';
import { CommonCmpModule } from '../../components/common/common.module';
import { BreadcrumbModule } from '../../components/breadcrumb/breadcrumb.module';

import { TabModule } from 'angular-tabs-component';
import { FormsModule } from '@angular/forms';

import { PmService } from './pm.service';

@NgModule({
  declarations: [
    PmBreadcrumbBarComponent,
    PmBoardComponent,
    PmScheduleComponent,
    PmFinancialsComponent,
    PmProgressComponent,
    PmFilesComponent,
    ChangeLogListTableComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    BreadcrumbModule,
    CommonCmpModule,
    TabModule,
    AutocompleteModule,
    FormsModule,
  ],
  exports: [
    PmBreadcrumbBarComponent,
    PmBoardComponent,
    PmScheduleComponent,
    PmFinancialsComponent,
    PmProgressComponent,
    PmFilesComponent,
    ChangeLogListTableComponent
  ],
  providers: [PmService]
})
export class ProjectManagementCmpModule { }
