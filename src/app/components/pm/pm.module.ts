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
import { ProjectsListComponent } from './projectslist/projectslist.component';
import { TasksComponent } from './tasks/tasks.component';
import { PendingsComponent } from './pendings/pendings.component';
import { PmDashboardComponent } from './pmdashboard/pmdashboard.component';
import { ProjectsListCmpModule } from './projectslist/projectslist.module';
import { PendingsCmpModule } from './pendings/pendings.module';

import { PmService } from './pm.service';
import { Ng2CompleterModule } from 'ng2-completer';
import { AutocompleteModule } from 'ng2-input-autocomplete';


@NgModule({
  declarations: [
    ProjectsListComponent,
    TasksComponent,
    PendingsComponent,
    PmDashboardComponent
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
    ProjectsListCmpModule,
    PendingsCmpModule
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
  ],
  providers: [PmService]
})
export class PmCmpModule { }
