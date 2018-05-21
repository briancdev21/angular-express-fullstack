import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {NgxDnDModule} from '@swimlane/ngx-dnd';

import {InventoryHeaderComponent} from './inventoryheader/inventoryheader.component';
import {InventoryPoProfileComponent} from './inventory.component';
import {InventoryBodyComponent} from './inventorybody/inventorybody.component';
import { POCustomerNameComponent } from './components/po-customer-name/po-customer-name.component';
import { Ng2CompleterModule } from 'ng2-completer';
import { POProjectSelectorComponent } from './components/po-project-selector/po-project-selector.component';
import { POSwitcherComponent } from './components/po-switcher/po-switcher.component';
import { ShippingAddressComponent } from './components/shippingaddress/shippingaddress.component';
import { POCreatedDateFieldComponent } from './components/po-createddatefield/po-createddatefield.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { POOrderIdFieldComponent } from './components/po-orderidfield/po-orderidfield.component';
import { POTermSelectorComponent } from './components/po-termsfield/po-termsfield.component';
import { PODueDateFieldComponent } from './components/po-duedatefield/po-duedatefield.component';

import { POLocationSelectorComponent } from './components/po-locationsfield/po-locationsfield.component';
import { POTableComponent } from './components/po-table/po-table.component';
import { POInternalMemoComponent } from './components/po-internalmemo/po-internalmemo.component';
import { PONoteToSupplierComponent } from './components/po-notetosupplier/po-notetosupplier.component';
import { POFreightCostsComponent } from './components/po-freightcosts/po-freightcosts.component';

import { POTaxesComponent } from './components/po-taxes/po-taxes.component';
import {InventoryFooterComponent} from './inventoryfooter/inventoryfooter.component';

import { POTotalAamountDueComponent } from './components/po-totalamountdue/po-totalamountdue.component';

import { PODiscountComponent } from './components/po-discount/po-discount.component';
import { POSubTotalProductsComponent } from './components/po-subtotalproducts/po-subtotalproducts.component';
@NgModule({
  declarations: [
    InventoryHeaderComponent,
    InventoryPoProfileComponent,
    InventoryBodyComponent,
    POCustomerNameComponent,
    POProjectSelectorComponent,
    POSwitcherComponent,
    ShippingAddressComponent,
    POOrderIdFieldComponent,
    POCreatedDateFieldComponent,
    POTermSelectorComponent,
    PODueDateFieldComponent,
    POLocationSelectorComponent,
    POTableComponent,
    POInternalMemoComponent,
    PONoteToSupplierComponent,
    POSubTotalProductsComponent,
    PODiscountComponent,
    POFreightCostsComponent,
    POTaxesComponent,
    POTotalAamountDueComponent,
    InventoryFooterComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    Ng2CompleterModule,
    NgxDnDModule
  ],
    exports: [
    InventoryPoProfileComponent,
    InventoryHeaderComponent,
    InventoryBodyComponent,
    POCustomerNameComponent,
    POProjectSelectorComponent,
    POSwitcherComponent,
    ShippingAddressComponent,
    POOrderIdFieldComponent,
    POCreatedDateFieldComponent,
    POTermSelectorComponent,
    PODueDateFieldComponent,
    POLocationSelectorComponent,
    POTableComponent,
    POInternalMemoComponent,
    PONoteToSupplierComponent,
    POSubTotalProductsComponent,
    PODiscountComponent,
    POFreightCostsComponent,
    POTaxesComponent,
    POTotalAamountDueComponent,
    InventoryFooterComponent
  ],
  providers: []
})
export class InventoryModule { }
