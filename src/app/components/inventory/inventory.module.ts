import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TabModule } from 'angular-tabs-component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonRangeSliderModule } from 'ng2-ion-range-slider';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatButtonModule, MatButtonToggleModule, MatCheckboxModule } from '@angular/material';
import { DragulaModule } from 'ng2-dragula';

import { ProfileCmpModule } from '../profile/profile.module';
import { CommonCmpModule } from '../common/common.module';
import { ProductsComponent } from './products/products.component';
import { PurchaseOrderListComponent } from './purchaseorderlist/purchaseorderlist.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { InventoryDashboardComponent } from './inventorydashboard/inventorydashboard.component';
import { ProductsCmpModule } from './products/products.module';
import { PurchaseOrderListCmpModule } from './purchaseorderlist/purchaseorderlist.module';
import { SuppliersCmpModule } from './suppliers/suppliers.module';
import { SupplierProfileCmpModule } from './supplierprofile/supplierprofile.module';

import { InventoryService } from './inventory.service';
import { Ng2CompleterModule } from 'ng2-completer';
import { NgSelectModule } from '@ng-select/ng-select';
import { InventoryADModule } from './inventory-ad-add/inventory.module';
import { InventoryModule } from './inventory-po-profile/inventory.module';
import { InventoryTRAddModule } from './inventory-tr-add/inventory.module';
import { InventoryPOAddModule } from './inventory-po-add/inventory.module';
import {InventoryADProfileModule} from './inventory-ad-profile/inventory.module';
import {InventoryTRProfileModule} from './inventory-tr-profile/inventory.module';
import { ReceiveInventoryModule} from './receiveinventory/receiveinventory.module';
import { ReceiveInventoryDetailModule } from './receiveinventorydetail/receiveinventorydetail.module';

@NgModule({
  declarations: [
    PurchaseOrderListComponent,
    ProductsComponent,
    SuppliersComponent,
    InventoryDashboardComponent
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
    NgSelectModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    ProductsCmpModule,
    PurchaseOrderListCmpModule,
    SuppliersCmpModule,
    DragulaModule,
    SupplierProfileCmpModule,
    InventoryADModule,
    InventoryModule,
    InventoryTRAddModule,
    InventoryPOAddModule,
    InventoryADProfileModule,
    InventoryTRProfileModule,
    ReceiveInventoryModule,
    ReceiveInventoryDetailModule
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
  ],
  providers: [InventoryService]
})
export class InventoryCmpModule { }
