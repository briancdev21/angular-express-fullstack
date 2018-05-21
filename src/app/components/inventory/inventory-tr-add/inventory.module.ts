import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {NgxDnDModule} from '@swimlane/ngx-dnd';

import {InventoryHeaderComponent} from './inventoryheader/inventoryheader.component';
import {InventoryTrAddComponent} from './inventory.component';
import {InventoryBodyComponent} from './inventorybody/inventorybody.component';
import { Ng2CompleterModule } from 'ng2-completer';
import { TRDateTransferFieldComponent } from './components/tr-datetransferfield/tr-datetransferfield.component';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { POTableComponent } from './components/po-table/po-table.component';
import {InventoryFooterComponent} from './inventoryfooter/inventoryfooter.component';
import { TRInternalMemoComponent } from './components/tr-internalmemo/tr-internalmemo.component';
import { TRLocationFromToComponent } from './components/tr-locationtofrom/tr-locationtofrom.component';

import { TRTransferIdFieldComponent } from './components/ad-transferid/ad-transferid.component';
@NgModule({
  declarations: [
    InventoryHeaderComponent,
    InventoryTrAddComponent,
    InventoryBodyComponent,
    InventoryFooterComponent,
    TRTransferIdFieldComponent,
    TRDateTransferFieldComponent,
    TRInternalMemoComponent,
    POTableComponent,
    TRLocationFromToComponent
    ],
    imports: [
    CommonModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    Ng2CompleterModule,
    FormsModule,
    NgxDnDModule
  ],
    exports: [
    InventoryTrAddComponent,
    InventoryHeaderComponent,
    InventoryBodyComponent,
    InventoryFooterComponent,
    TRTransferIdFieldComponent,
    TRDateTransferFieldComponent,
    POTableComponent,
    TRInternalMemoComponent,
    TRLocationFromToComponent
  ],
  providers: []
})
export class InventoryTRAddModule { }
