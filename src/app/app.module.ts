import { NgModule } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { ProjectManagementComponent } from './components/projectmanagement/projectmanagement.component';

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
import { ReportsCmpModule } from './components/reports/reports.module';
import { LeadProfileCmpModule } from './components/crm/leadprofile/leadprofile.module';

import { Pipe, PipeTransform } from '@angular/core';
import { PhonePipe } from './pipes/phone.pipe';

import { SubnavHandlerService } from './services/subnav-handler.service';
import { CrmService } from './services/crm.service';
import { SharedService } from './services/shared.service';
import { InvoicesService } from './services/invoices.service'; 
import { TokenInterceptor } from './services/token.interceptor';
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
    ServicingComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
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
    ServicingCmpModule,
    ReportsCmpModule,
    LeadProfileCmpModule
  ],
  exports: [
    SubmenuComponent,
    PhonePipe
  ],
  providers: [
    SubnavHandlerService,
    CrmService,
    InvoicesService,
    SharedService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
