import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TabModule } from 'angular-tabs-component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonRangeSliderModule } from 'ng2-ion-range-slider';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatButtonModule, MatButtonToggleModule, MatCheckboxModule } from '@angular/material';

import { ProfileCmpModule } from '../profile/profile.module';
import { CommonCmpModule } from '../common/common.module';
import { ServicingDashboardComponent } from './servicingdashboard/servicingdashboard.component';
import { TicketsComponent } from './tickets/tickets.component';
import { WorkOrderIssuesComponent } from './workorderissues/workorderissues.component';
import { SolutionsComponent } from './solutions/solutions.component';

import { ServicingService } from './servicing.service';
import { Ng2CompleterModule } from 'ng2-completer';
import { AutocompleteModule } from 'ng2-input-autocomplete';


@NgModule({
  declarations: [
    ServicingDashboardComponent,
    TicketsComponent,
    WorkOrderIssuesComponent,
    SolutionsComponent
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
    AutocompleteModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    MatCheckboxModule,
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
  ],
  providers: [ServicingService]
})
export class ServicingCmpModule { }
