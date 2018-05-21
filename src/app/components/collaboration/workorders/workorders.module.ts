import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TabModule } from 'angular-tabs-component';
import { FormsModule } from '@angular/forms';
import { IonRangeSliderModule } from 'ng2-ion-range-slider';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FilterService } from './filter.service';
import { WorkOrdersTableComponent } from './workorderstable/workorderstable.component';
import { WorkOrderFilterComponent } from './workorderfilter/workorderfilter.component';
import { AddWorkOrderComponent } from './addworkorder/addworkorder.component';
import { Ng2CompleterModule } from 'ng2-completer';
import { AutoCompleteModule } from 'ng5-auto-complete';
import { DragulaModule } from 'ng2-dragula';
import { ClickOutsideModule } from 'ng4-click-outside';

import { ProfileCmpModule } from '../../profile/profile.module';
import { CommonCmpModule } from '../../common/common.module';
import { OrderProfileCmpModule } from '../../orderprofile/orderprofile.module';
import { SharedPipesModule } from '../../../pipes/sharedpipes.module';

@NgModule({
  declarations: [
    WorkOrdersTableComponent,
    WorkOrderFilterComponent,
    AddWorkOrderComponent
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
    AutoCompleteModule,
    OrderProfileCmpModule,
    DragulaModule,
    ClickOutsideModule,
    SharedPipesModule
  ],
  exports: [
    WorkOrdersTableComponent,
    WorkOrderFilterComponent,
    AddWorkOrderComponent
  ],
  providers: [FilterService]
})
export class WorkOrdersCmpModule { }
