import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AutocompleteModule } from 'ng2-input-autocomplete';

import { ProductProfileComponent } from './productprofile.component';
import { CommonCmpModule } from '../../../../components/common/common.module';
import { ProductInfoBarComponent } from './productInfobar/productinfobar.component';
import { ProductCustomDonutChartComponent } from './productcustomdonutchart/productcustomdonutchart.component';
import { ProductCardsComponent } from './productcards/productcards.component';
import { VariantsListTableComponent } from './variantslisttable/variantslisttable.component';
import { ProductPricingComponent } from './productpricing/productpricing.component';
import { ProductAccAlterComponent } from './productaccalter/productaccalter.component';
import { EditProductModalComponent } from './editproductmodal/editproductmodal.component';
import { VariantMultiKeywordComponent } from './editproductmodal/variantmultikeyword/variantmultikeyword.component';

import { TabModule } from 'angular-tabs-component';
import { FormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { BreadcrumbModule } from '../../../breadcrumb/breadcrumb.module';
import { ProfileCmpModule } from '../../../profile/profile.module';
import { Ng2CompleterModule } from 'ng2-completer';
import { ImageUploadModule } from 'angular2-image-upload';
import { SharedPipesModule } from '../../../../pipes/sharedpipes.module';

import { ProductProfileService } from './productprofile.service';
@NgModule({
  declarations: [
    ProductProfileComponent,
    ProductInfoBarComponent,
    ProductCustomDonutChartComponent,
    ProductCardsComponent,
    VariantsListTableComponent,
    ProductPricingComponent,
    ProductAccAlterComponent,
    EditProductModalComponent,
    VariantMultiKeywordComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    CommonCmpModule,
    TabModule,
    AutocompleteModule,
    FormsModule,
    ImageCropperModule,
    BreadcrumbModule,
    Ng2CompleterModule,
    ImageUploadModule,
    ProfileCmpModule,
    SharedPipesModule
  ],
  exports: [
    ProductCustomDonutChartComponent,
  ],
  providers: [
    ProductProfileService
  ]
})
export class ProductProfileCmpModule { }
