import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AutoCompleteModule } from 'ng5-auto-complete';
import { SupplierProfileComponent } from './supplierprofile.component';
import { CommonCmpModule } from '../../../components/common/common.module';
import { BreadcrumbModule } from '../../../components/breadcrumb/breadcrumb.module';
import { SupplierProfileCardsComponent } from './supplierprofilecards/supplierprofilecards.component';
import { SupplierLifeTimeStatusComponent } from './supplierprofilecards/lifetimestatus/lifetimestatus.component';
import { SupplierProfileInfoBarComponent } from './supplierprofileinfobar/supplierprofileinfobar.component';
import { PurchaseOrderComponent } from './supplierprofilecards/purchaseorder/purchaseorder.component';

import { TabModule } from 'angular-tabs-component';
import { Ng2TimelineComponent } from '../../profile/ng2-timeline/ng2timeline.component';
import { GetDate } from '../../profile/ng2-timeline/getDate.pipe';
import { GetDateStatus } from '../../profile/ng2-timeline/getDateStatus.pipe';
import { FormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ProfileCmpModule } from '../../profile/profile.module';


@NgModule({
  declarations: [
    SupplierProfileComponent,
    SupplierProfileCardsComponent,
    SupplierLifeTimeStatusComponent,
    SupplierProfileInfoBarComponent,
    PurchaseOrderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    BreadcrumbModule,
    CommonCmpModule,
    TabModule,
    AutoCompleteModule,
    FormsModule,
    ImageCropperModule,
    ProfileCmpModule
  ],
  exports: [
  ]
})
export class SupplierProfileCmpModule { }
