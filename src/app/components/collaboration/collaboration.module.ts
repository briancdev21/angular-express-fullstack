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
import { TeamUpcomingEventComponent } from './teamschedule/teamupcomingevent/teamupcomingevent.component';
import { WorkOrdersComponent } from './workorders/workorders.component';
import { CollaborationDashboardComponent } from './collaborationdashboard/collaborationdashboard.component';
import { PersonalUpcomingEventsComponent } from './personalschedule/personalupcomingevents/personalupcomingevents.component';
import { BackLogLineChartComponent } from './collaborationdashboard/backloglinechart/backloglinechart.component';
import { WorkOrderDonutChartComponent } from './collaborationdashboard/workorderdonutchart/workorderdonutchart.component';
import { MorrisMultiLineComponent } from './collaborationdashboard/morrismultilinechart/morrismultilinechart.component';

import { WorkOrdersCmpModule } from './workorders/workorders.module';

import { CollaborationService } from './collaboration.service';
import { Ng2CompleterModule } from 'ng2-completer';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';


@NgModule({
  declarations: [
    PersonalScheduleComponent,
    TeamScheduleComponent,
    WorkOrdersComponent,
    CollaborationDashboardComponent,
    PersonalUpcomingEventsComponent,
    TeamUpcomingEventComponent,
    BackLogLineChartComponent,
    BackLogLineChartComponent,
    WorkOrderDonutChartComponent,
    MorrisMultiLineComponent
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
    DragulaModule,
    Ng4GeoautocompleteModule
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    PersonalUpcomingEventsComponent
  ],
  providers: [CollaborationService]
})
export class CollaborationCmpModule { }
