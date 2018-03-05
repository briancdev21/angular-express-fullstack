import { NgModule } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CommonComponent } from './components/common/common.component';
import { StopEventPropagationDirective } from './stop-event-propagation.directive';
import { routing } from './app.routes';
import { TestComponent } from './components/test/test.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProposalComponent } from './components/proposal/proposal.component';
import { LeadsComponent } from './components/leads/leads.component';
import { OrderProfileComponent } from './components/orderprofile/orderprofile.component';
import { DealsPipelineComponent } from './components/dealspipeline/dealspipeline.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { SubmenuComponent } from './components/submenu/submenu.component';

import { ProfileCmpModule } from './components/profile/profile.module';
import { ProposalCmpModule } from './components/proposal/proposal.module';
import { LeadsCmpModule } from './components/leads/leads.module';
import { OrderProfileCmpModule } from './components/orderprofile/orderprofile.module';
import { DealspipelineCmpModule } from './components/dealspipeline/dealspipeline.module';
import { ContactsCmpModule } from './components/contacts/contacts.module';
import { SuppliersCmpModule } from './components/suppliers/suppliers.module';
import { CommonCmpModule } from './components/common/common.module';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { AutocompleteModule } from 'ng2-input-autocomplete';
import { ClickOutsideModule } from 'ng4-click-outside';
import { DragulaModule } from 'ng2-dragula';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { Pipe, PipeTransform } from '@angular/core';
import { PhonePipe } from './pipes/phone.pipe';

import { SubnavHandlerService } from './services/subnav-handler.service';


@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    ProposalComponent,
    LeadsComponent,
    OrderProfileComponent,
    DealsPipelineComponent,
    ContactsComponent,
    SubmenuComponent,
    StopEventPropagationDirective,
    PhonePipe,
    SuppliersComponent
  ],
  imports: [
    BrowserModule,
    routing,
    ProfileCmpModule,
    LeadsCmpModule,
    CommonCmpModule,
    ProposalCmpModule,
    OrderProfileCmpModule,
    ContactsCmpModule,
    SuppliersCmpModule,
    DealspipelineCmpModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    FormsModule,
    AutocompleteModule,
    ClickOutsideModule,
    DragulaModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  exports: [
    SubmenuComponent,
    PhonePipe
  ],
  providers: [SubnavHandlerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
