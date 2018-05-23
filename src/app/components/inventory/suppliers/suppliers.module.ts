import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TabModule } from 'angular-tabs-component';
import { FormsModule } from '@angular/forms';
import { IonRangeSliderModule } from 'ng2-ion-range-slider';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ProfileCmpModule } from '../../profile/profile.module';
import { CommonCmpModule } from '../../common/common.module';

import { FilterService } from './filter.service';
import { SuppliersListTableComponent } from './supplierslisttable/supplierslisttable.component';
import { SupplierFilterComponent } from './supplierfilter/supplierfilter.component';
import { AddSupplierComponent } from './addsupplier/addsupplier.component';
import { Ng2CompleterModule } from 'ng2-completer';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    SuppliersListTableComponent,
    SupplierFilterComponent,
    AddSupplierComponent,
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
    NgSelectModule,
    CommonCmpModule
  ],
  exports: [
    SuppliersListTableComponent,
    SupplierFilterComponent,
    AddSupplierComponent,
  ],
  providers: [FilterService]
})
export class SuppliersCmpModule { }
