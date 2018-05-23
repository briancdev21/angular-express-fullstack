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
import { ProposalListTableComponent } from './proposallisttable/proposallisttable.component';
import { ProposalListFilterComponent } from './proposallistfilter/proposallistfilter.component';
import { Ng2CompleterModule } from 'ng2-completer';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    ProposalListTableComponent,
    ProposalListFilterComponent,
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
    ProposalListTableComponent,
    ProposalListFilterComponent,
  ],
  providers: [FilterService]
})
export class ProposalListCmpModule { }
