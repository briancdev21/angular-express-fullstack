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
import { ProductsListTableComponent } from './productslisttable/productslisttable.component';
import { ProductFilterComponent } from './productfilter/productfilter.component';
import { AddProductComponent } from './addproduct/addproduct.component';
import { Ng2CompleterModule } from 'ng2-completer';
import { AutoCompleteModule } from 'ng5-auto-complete';


@NgModule({
  declarations: [
    ProductsListTableComponent,
    ProductFilterComponent,
    AddProductComponent,
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
    AutoCompleteModule
  ],
  exports: [
    ProductsListTableComponent,
    ProductFilterComponent,
    AddProductComponent,
  ],
  providers: [FilterService]
})
export class ProductsCmpModule { }
