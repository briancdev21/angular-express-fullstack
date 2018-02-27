import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TabModule } from 'angular-tabs-component';
import { FormsModule } from '@angular/forms';
import { IonRangeSliderModule } from "ng2-ion-range-slider";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ProfileCmpModule } from '../profile/profile.module';

import { FilterService } from './filter.service';
import { LeadsListTableComponent } from './leadslisttable/leadslisttable.component';
import { LeadFilterComponent } from './leadfilter/leadfilter.component';
import { AddLeadComponent } from './addlead/addlead.component';
import { Ng2CompleterModule } from "ng2-completer";




@NgModule({
  declarations: [
    LeadsListTableComponent,
    LeadFilterComponent,
    AddLeadComponent
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
    Ng2CompleterModule
  ],
  exports: [
    LeadsListTableComponent,
    LeadFilterComponent,
    AddLeadComponent,
  ],
  providers: [FilterService]
})
export class LeadsCmpModule { }
