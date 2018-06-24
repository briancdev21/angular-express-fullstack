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
import { InvoicesListTableComponent } from './invoiceslisttable/invoiceslisttable.component';
import { InvoiceFilterComponent } from './invoicefilter/invoicefilter.component';
import { Ng2CompleterModule } from 'ng2-completer';
import { NgSelectModule } from '@ng-select/ng-select';


import { InCustomerNameComponent } from './components/in-customer-name/in-customer-name.component';
import { InProjectSelectorComponent } from './components/in-project-selector/in-project-selector.component';
import { InSwitcherComponent } from './components/in-switcher/in-switcher.component';
import { ShippingAddressComponent } from './components/shippingaddress/shippingaddress.component';
import { InCreatedDateFieldComponent } from './components/in-createddatefield/in-createddatefield.component';
import { InOrderIdFieldComponent } from './components/in-orderidfield/in-orderidfield.component';
import { InTermSelectorComponent } from './components/in-termsfield/in-termsfield.component';
import { InDueDateFieldComponent } from './components/in-duedatefield/in-duedatefield.component';
import { InClassComponent } from './components/in-class/in-class.component';
import { InCategoryComponent } from './components/in-category/in-category.component';
import { InTableComponent } from './components/in-table/in-table.component';
import { InInternalMemoComponent } from './components/in-internalmemo/in-internalmemo.component';
import { InNoteToSupplierComponent } from './components/in-notetosupplier/in-notetosupplier.component';
import { InFreightCostsComponent } from './components/in-freightcosts/in-freightcosts.component';
import { InTaxesComponent } from './components/in-taxes/in-taxes.component';
import { InTotalAamountDueComponent } from './components/in-totalamountdue/in-totalamountdue.component';
import { InDiscountComponent } from './components/in-discount/in-discount.component';
import { InSubTotalProductsComponent } from './components/in-subtotalproducts/in-subtotalproducts.component';
import { InTermsOfInvoiceComponent } from './components/in-terms-of-invoice/in-terms-of-invoice.component';
import { InSubTotalServicesComponent } from './components/in-subtotalservices/in-subtotalservices.component';
import { InDepositsCreditsComponent } from './components/in-deposits-credits/in-deposits-credits.component';
import { MultiEmailSelectComponent } from './components/multiemailselect/multiemailselect.component';
import { EsTableComponent } from './components/es-table/es-table.component';

import { AddInvoiceComponent } from './addinvoice/addinvoice.component';
import { AddEstimateComponent } from './addestimate/addestimate.component';
import {AddInvoiceHeaderComponent} from './addinvoice/addinvoiceheader/addinvoiceheader.component';
import {AddInvoiceBodyComponent} from './addinvoice/addinvoicebody/addinvoicebody.component';
import {AddInvoiceFooterComponent} from './addinvoice/addinvoicefooter/addinvoicefooter.component';
import {AddEstimateHeaderComponent} from './addestimate/addestimateheader/addestimateheader.component';
import {AddEstimateFooterComponent} from './addestimate/addestimatefooter/addestimatefooter.component';
import {AddEstimateBodyComponent} from './addestimate/addestimatebody/addestimatebody.component';

import { InvoiceProfileComponent } from './invoiceprofile/invoiceprofile.component';
import { EstimateProfileComponent } from './estimateprofile/estimateprofile.component';
import {InvoiceProfileBodyComponent} from './invoiceprofile/invoiceprofilebody/invoiceprofilebody.component';
import {InvoiceProfileHeaderComponent} from './invoiceprofile/invoiceprofileheader/invoiceprofileheader.component';
import {InvoiceProfileFooterComponent} from './invoiceprofile/invoiceprofilefooter/invoiceprofilefooter.component';

import {EstimateProfileBodyComponent} from './estimateprofile/estimateprofilebody/estimateprofilebody.component';
import {EstimateProfileHeaderComponent} from './estimateprofile/estimateprofileheader/estimateprofileheader.component';
import {EstimateProfileFooterComponent} from './estimateprofile/estimateprofilefooter/estimateprofilefooter.component';
import { InProfileTableComponent } from './components/in-profile-table/in-table.component';
import { EsProfileTableComponent } from './components/es-profile-table/es-table.component';

@NgModule({
  declarations: [
    InvoicesListTableComponent,
    InvoiceFilterComponent,
    AddInvoiceHeaderComponent,
    AddInvoiceFooterComponent,
    AddInvoiceBodyComponent,
    AddEstimateHeaderComponent,
    AddEstimateFooterComponent,
    AddEstimateBodyComponent,
    InCustomerNameComponent,
    InProjectSelectorComponent,
    InSwitcherComponent,
    ShippingAddressComponent,
    InOrderIdFieldComponent,
    InCreatedDateFieldComponent,
    InTermSelectorComponent,
    InDueDateFieldComponent,
    InCategoryComponent,
    InTableComponent,
    InInternalMemoComponent,
    InNoteToSupplierComponent,
    InSubTotalProductsComponent,
    InDiscountComponent,
    InFreightCostsComponent,
    InTaxesComponent,
    InTotalAamountDueComponent,
    InClassComponent,
    InTermsOfInvoiceComponent,
    InSubTotalServicesComponent,
    InDepositsCreditsComponent,
    MultiEmailSelectComponent,
    EsTableComponent,
    AddInvoiceComponent,
    AddEstimateComponent,
    InvoiceProfileComponent,
    EstimateProfileComponent,
    InvoiceProfileBodyComponent,
    InvoiceProfileHeaderComponent,
    InvoiceProfileFooterComponent,
    EstimateProfileBodyComponent,
    EstimateProfileHeaderComponent,
    EstimateProfileFooterComponent,
    InProfileTableComponent,
    EsProfileTableComponent
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
  ],
  exports: [
    InvoicesListTableComponent,
    InvoiceFilterComponent,
    AddInvoiceHeaderComponent,
    AddInvoiceFooterComponent,
    AddInvoiceBodyComponent,
    AddEstimateHeaderComponent,
    AddEstimateFooterComponent,
    AddEstimateBodyComponent,
    InCustomerNameComponent,
    InProjectSelectorComponent,
    InSwitcherComponent,
    ShippingAddressComponent,
    InOrderIdFieldComponent,
    InCreatedDateFieldComponent,
    InTermSelectorComponent,
    InDueDateFieldComponent,
    InCategoryComponent,
    InTableComponent,
    InInternalMemoComponent,
    InNoteToSupplierComponent,
    InSubTotalProductsComponent,
    InDiscountComponent,
    InFreightCostsComponent,
    InTaxesComponent,
    InTotalAamountDueComponent,
    InClassComponent,
    InTermsOfInvoiceComponent,
    InSubTotalServicesComponent,
    InDepositsCreditsComponent,
    MultiEmailSelectComponent,
    EsTableComponent,
    InProfileTableComponent,
    EsProfileTableComponent
  ],
  providers: [FilterService]
})
export class InvoicesCmpModule { }
