import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TabModule } from 'angular-tabs-component';
import { FormsModule } from '@angular/forms';
import { IonRangeSliderModule } from 'ng2-ion-range-slider';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ProfileCmpModule } from '../../../../profile/profile.module';
import { CommonCmpModule } from '../../../../common/common.module';

import { FilterService } from './filter.service';
import { PgProductLogTableComponent } from './pgproductlogtable/pgproductlogtable.component';
import { LogsTableFilterComponent } from './logstablefilter/logstablefilter.component';
import { ProgressProductLogComponent } from './progressproductlog.component';
import { Ng2CompleterModule } from 'ng2-completer';
import { ClickOutsideModule } from 'ng4-click-outside';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [
    PgProductLogTableComponent,
    LogsTableFilterComponent,
    ProgressProductLogComponent
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
    Ng2CompleterModule,
    CommonCmpModule,
    ClickOutsideModule,
    NgSelectModule
  ],
  exports: [
    PgProductLogTableComponent,
    LogsTableFilterComponent,
    ProgressProductLogComponent
  ],
  providers: [FilterService]
})
export class ProgressProductLogCmpModule { }
