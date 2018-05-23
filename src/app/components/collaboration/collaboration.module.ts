import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TabModule } from 'angular-tabs-component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonRangeSliderModule } from 'ng2-ion-range-slider';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatButtonModule, MatButtonToggleModule, MatCheckboxModule } from '@angular/material';
import { DragulaModule } from 'ng2-dragula';

import { ProfileCmpModule } from '../profile/profile.module';
import { CommonCmpModule } from '../common/common.module';
import { PersonalScheduleComponent } from './personalschedule/personalschedule.component';
import { TeamScheduleComponent } from './teamschedule/teamschedule.component';
import { WorkOrdersComponent } from './workorders/workorders.component';
import { CollaborationDashboardComponent } from './collaborationdashboard/collaborationdashboard.component';
import { WorkOrdersCmpModule } from './workorders/workorders.module';

import { CollaborationService } from './collaboration.service';
import { Ng2CompleterModule } from 'ng2-completer';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    PersonalScheduleComponent,
    TeamScheduleComponent,
    WorkOrdersComponent,
    CollaborationDashboardComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    TabModule,
    FormsModule,
    IonRangeSliderModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    BrowserAnimationsModule,
    ProfileCmpModule,
    CommonCmpModule,
    Ng2CompleterModule,
    NgSelectModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    WorkOrdersCmpModule,
    DragulaModule
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
  ],
  providers: [CollaborationService]
})
export class CollaborationCmpModule { }
