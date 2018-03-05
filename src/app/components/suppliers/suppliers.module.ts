import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TabModule } from 'angular-tabs-component';
import { FormsModule } from '@angular/forms';
import { IonRangeSliderModule } from 'ng2-ion-range-slider';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ProfileCmpModule } from '../profile/profile.module';

import { FilterService } from './filter.service';
import { SuppliersListTableComponent } from './supplierslisttable/supplierslisttable.component';
import { SupplierFilterComponent } from './supplierfilter/supplierfilter.component';
import { AddSupplierComponent } from './addsupplier/addsupplier.component';
import { Ng2CompleterModule } from 'ng2-completer';
import { AutocompleteModule } from 'ng2-input-autocomplete';


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
    AutocompleteModule
  ],
  exports: [
    SuppliersListTableComponent,
    SupplierFilterComponent,
    AddSupplierComponent,
  ],
  providers: [FilterService]
})
export class SuppliersCmpModule { }
