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
import { ProjectFinancialsTableComponent } from './projectfinancialstable.component';
import { PfProductsListTableComponent } from './pfproductslisttable/pfproductslisttable.component';
import { PfTableFilterComponent } from './pftablefilter/pftablefilter.component';
import { Ng2CompleterModule } from 'ng2-completer';
import { NgSelectModule } from '@ng-select/ng-select';
import { ClickOutsideModule } from 'ng4-click-outside';



@NgModule({
  declarations: [
    PfProductsListTableComponent,
    PfTableFilterComponent,
    ProjectFinancialsTableComponent
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
    NgSelectModule,
    ClickOutsideModule
  ],
  exports: [
    ProjectFinancialsTableComponent
  ],
  providers: [FilterService]
})
export class ProjectFinancialsTableCmpModule { }
