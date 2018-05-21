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
import { DealsPipelineComponent } from './dealspipeline/dealspipeline.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { ProposalListComponent } from './proposallist/proposallist.component';
import { SalesDashboardComponent } from './salesdashboard/salesdashboard.component';
import { InvoicesCmpModule } from './invoices/invoices.module';
import { DealsPipelineCmpModule } from './dealspipeline/dealspipeline.module';
import { ProposalListCmpModule } from './proposallist/proposallist.module';
import { ProposalCmpModule } from './proposal/proposal.module';

import { SalesService } from './sales.service';
import { Ng2CompleterModule } from 'ng2-completer';
import { AutocompleteModule } from 'ng2-input-autocomplete';


@NgModule({
  declarations: [
    DealsPipelineComponent,
    InvoicesComponent,
    ProposalListComponent,
    SalesDashboardComponent
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
    AutocompleteModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    InvoicesCmpModule,
    ProposalListCmpModule,
    DealsPipelineCmpModule,
    DragulaModule,
    ProposalCmpModule
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
  ],
  providers: [SalesService]
})
export class SalesCmpModule { }
