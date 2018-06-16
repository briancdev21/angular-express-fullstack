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
import { LeadsComponent } from './leads/leads.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AccountsComponent } from './accounts/accounts.component';
import { CrmDashboardComponent } from './crmdashboard/crmdashboard.component';
import { NewLeadLineComponent } from './crmdashboard/newleadline/newleadline.component';
import { PipeLineChartComponent } from './crmdashboard/pipelinechart/pipelinechart.component';

import { LeadsCmpModule } from './leads/leads.module';
import { ContactsCmpModule } from './contacts/contacts.module';
import { Ng2CompleterModule } from 'ng2-completer';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    LeadsComponent,
    ContactsComponent,
    AccountsComponent,
    CrmDashboardComponent,
    NewLeadLineComponent,
    PipeLineChartComponent
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
    LeadsCmpModule,
    ContactsCmpModule,
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
  ],
})
export class CrmCmpModule { }
