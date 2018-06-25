import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TabModule } from 'angular-tabs-component';
import { FormsModule } from '@angular/forms';
import { IonRangeSliderModule } from 'ng2-ion-range-slider';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_FORMATS } from 'ng-pick-datetime';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragulaModule } from 'ng2-dragula';
import { ClickOutsideModule } from 'ng4-click-outside';
import { NgSelectModule } from '@ng-select/ng-select';
import {CalendarModule} from 'ap-angular2-fullcalendar';
import {CalendarComponent} from 'ap-angular2-fullcalendar';

import { ProfileCmpModule } from '../../../profile/profile.module';

import { OrderService } from './order.service';

import { TitleBarComponent } from './titlebar/titlebar.component';
import { OrderDetailsComponent } from './orderdetails/orderdetails.component';
import { DraggableTicketComponent } from './draggableticket/draggableticket.component';
import { OrderSettingsComponent } from './ordersettings/ordersettings.component';
import { AvailabilityComponent } from './availability/availability.component';
import { ArraySortPipe } from './pipes/arraysort.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { Pipe, PipeTransform } from '@angular/core';

export const MY_NATIVE_FORMATS = {
  fullPickerInput: {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'},
  datePickerInput: {year: 'numeric', month: 'numeric', day: 'numeric'},
  timePickerInput: {hour: 'numeric', minute: 'numeric'},
  monthYearLabel: {year: 'numeric', month: 'short'},
  dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
  monthYearA11yLabel: {year: 'numeric', month: 'long'},
};

@NgModule({
  declarations: [
    TitleBarComponent,
    OrderDetailsComponent,
    DraggableTicketComponent,
    OrderSettingsComponent,
    AvailabilityComponent,
    ArraySortPipe,
    SearchPipe,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    TabModule,
    FormsModule,
    IonRangeSliderModule,
    OwlDateTimeModule,
    DragulaModule,
    OwlNativeDateTimeModule,
    BrowserAnimationsModule,
    ProfileCmpModule,
    NgSelectModule,
    ClickOutsideModule,
    CalendarModule
  ],
  exports: [
    TitleBarComponent,
    OrderDetailsComponent,
    DraggableTicketComponent,
    OrderSettingsComponent,
    AvailabilityComponent,
  ],
  providers: [
    OrderService,
    SearchPipe,
    ArraySortPipe,
    {provide: OWL_DATE_TIME_FORMATS, useValue: MY_NATIVE_FORMATS},
  ]
})
export class OrderProfileCmpModule { }
