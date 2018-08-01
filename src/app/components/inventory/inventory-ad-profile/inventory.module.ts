import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {NgxDnDModule} from '@swimlane/ngx-dnd';

import {InventoryHeaderComponent} from './inventoryheader/inventoryheader.component';
import {InventoryAdProfileComponent} from './inventory.component';
import {InventoryBodyComponent} from './inventorybody/inventorybody.component';
import { Ng2CompleterModule } from 'ng2-completer';
import { TRDateTransferFieldComponent } from './components/tr-datetransferfield/tr-datetransferfield.component';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { POTableComponent } from './components/po-table/po-table.component';
import {InventoryFooterComponent} from './inventoryfooter/inventoryfooter.component';
import { TRInternalMemoComponent } from './components/tr-internalmemo/tr-internalmemo.component';
import { ADAdjustmentIdFieldComponent } from './components/ad-adjustmentid/ad-adjustmentid.component';
import { AdLocationFromToComponent } from './components/ad-locationtofrom/ad-locationtofrom.component';
import { CommonCmpModule } from '../../common/common.module';

@NgModule({
  declarations: [
    InventoryHeaderComponent,
    InventoryAdProfileComponent,
    InventoryBodyComponent,
    POTableComponent,
    InventoryFooterComponent,
    ADAdjustmentIdFieldComponent,
    TRDateTransferFieldComponent,
    TRInternalMemoComponent,
    AdLocationFromToComponent
    ],
    imports: [
    CommonModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    Ng2CompleterModule,
    FormsModule,
    NgxDnDModule,
    CommonCmpModule
  ],
  exports: [
    InventoryAdProfileComponent,
    InventoryHeaderComponent,
    InventoryBodyComponent,
    POTableComponent,
    InventoryFooterComponent,
    ADAdjustmentIdFieldComponent,
    TRDateTransferFieldComponent,
    TRInternalMemoComponent,
    AdLocationFromToComponent
  ],
  providers: []
})
export class InventoryADProfileModule { }
