import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AutocompleteModule } from 'ng2-input-autocomplete';

import { ProductComponent } from './productprofile.component';
import { CommonCmpModule } from '../../../../components/common/common.module';
import { ProductInfoBarComponent } from './productInfobar/productinfobar.component';
import { ProductCustomDonutChartComponent } from './productcustomdonutchart/productcustomdonutchart.component';
import { ProductCardsComponent } from './productcards/productcards.component';

import { TabModule } from 'angular-tabs-component';
import { FormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { BreadcrumbModule } from '../../../breadcrumb/breadcrumb.module';


@NgModule({
  declarations: [
    ProductComponent,
    ProductInfoBarComponent,
    ProductCustomDonutChartComponent,
    ProductCardsComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    CommonCmpModule,
    TabModule,
    AutocompleteModule,
    FormsModule,
    ImageCropperModule,
    BreadcrumbModule
  ],
  exports: [
    ProductCustomDonutChartComponent,
  ]
})
export class ProductProfileCmpModule { }
