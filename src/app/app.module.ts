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
import { OrderProfileComponent } from './components/orderprofile/orderprofile.component';
import { SalesComponent } from './components/sales/sales.component';
import { SubmenuComponent } from './components/submenu/submenu.component';
import { CollaborationComponent } from './components/collaboration/collaboration.component';
import { HomeComponent } from './components/home/home.component';
import { CrmComponent } from './components/crm/crm.component';
import { PmComponent } from './components/pm/pm.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { ServicingComponent } from './components/servicing/servicing.component';

import { ProfileCmpModule } from './components/profile/profile.module';
import { ProposalCmpModule } from './components/proposal/proposal.module';
import { OrderProfileCmpModule } from './components/orderprofile/orderprofile.module';
import { SalesCmpModule } from './components/sales/sales.module';
import { CollaborationCmpModule } from './components/collaboration/collaboration.module';
import { ProjectManagementCmpModule } from './components/projectmanagement/projectmanagement.module';
import { CommonCmpModule } from './components/common/common.module';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { AutocompleteModule } from 'ng2-input-autocomplete';
import { ClickOutsideModule } from 'ng4-click-outside';
import { DragulaModule } from 'ng2-dragula';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { AuthCmpModule } from './components/auth/auth.module';
import { CrmCmpModule } from './components/crm/crm.module';
import { PmCmpModule } from './components/pm/pm.module';
import { InventoryCmpModule } from './components/inventory/inventory.module';
import { ServicingCmpModule } from './components/servicing/servicing.module';

import { Pipe, PipeTransform } from '@angular/core';
import { PhonePipe } from './pipes/phone.pipe';

import { SubnavHandlerService } from './services/subnav-handler.service';
import { ProjectManagementComponent } from './components/projectmanagement/projectmanagement.component';


@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    ProposalComponent,
    OrderProfileComponent,
    SalesComponent,
    SubmenuComponent,
    StopEventPropagationDirective,
    PhonePipe,
    InventoryComponent,
    PmComponent,
    ProjectManagementComponent,
    HomeComponent,
    CrmComponent,
    CollaborationComponent,
    ServicingComponent
  ],
  imports: [
    BrowserModule,
    routing,
    ProfileCmpModule,
    CommonCmpModule,
    ProposalCmpModule,
    OrderProfileCmpModule,
    InventoryCmpModule,
    SalesCmpModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    FormsModule,
    AutocompleteModule,
    ClickOutsideModule,
    DragulaModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ProjectManagementCmpModule,
    AuthCmpModule,
    CrmCmpModule,
    PmCmpModule,
    CollaborationCmpModule,
    ServicingCmpModule
  ],
  exports: [
    SubmenuComponent,
    PhonePipe
  ],
  providers: [SubnavHandlerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
