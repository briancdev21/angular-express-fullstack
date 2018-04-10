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
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { SubmenuComponent } from './components/submenu/submenu.component';
import { ProductsComponent } from './components/products/products.component';
import { PendingsComponent } from './components/pendings/pendings.component';
import { WorkOrdersComponent } from './components/workorders/workorders.component';
import { ProjectsListComponent } from './components/projectslist/projectslist.component';
import { PuchaseOrderListComponent } from './components/puchaseorderlist/puchaseorderlist.component';
import { HomeComponent } from './components/home/home.component';
import { CrmComponent } from './components/crm/crm.component';

import { ProfileCmpModule } from './components/profile/profile.module';
import { ProposalCmpModule } from './components/proposal/proposal.module';
import { OrderProfileCmpModule } from './components/orderprofile/orderprofile.module';
import { SalesCmpModule } from './components/sales/sales.module';
import { SuppliersCmpModule } from './components/suppliers/suppliers.module';
import { ProductsCmpModule } from './components/products/products.module';
import { PendingsCmpModule } from './components/pendings/pendings.module';
import { WorkOrdersCmpModule } from './components/workorders/workorder.module';
import { ProjectsListCmpModule } from './components/projectslist/projectslist.module';
import { ProjectManagementCmpModule } from './components/projectmanagement/projectmanagement.module';
import { PuchaseOrderListCmpModule } from './components/puchaseorderlist/puchaseorderlist.module';
import { CommonCmpModule } from './components/common/common.module';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { AutocompleteModule } from 'ng2-input-autocomplete';
import { ClickOutsideModule } from 'ng4-click-outside';
import { DragulaModule } from 'ng2-dragula';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { AuthCmpModule } from './components/auth/auth.module';
import { CrmCmpModule } from './components/crm/crm.module';

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
    SuppliersComponent,
    ProductsComponent,
    PendingsComponent,
    WorkOrdersComponent,
    ProjectsListComponent,
    ProjectManagementComponent,
    PuchaseOrderListComponent,
    HomeComponent,
    CrmComponent
  ],
  imports: [
    BrowserModule,
    routing,
    ProfileCmpModule,
    CommonCmpModule,
    ProposalCmpModule,
    OrderProfileCmpModule,
    SuppliersCmpModule,
    SalesCmpModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    FormsModule,
    AutocompleteModule,
    ClickOutsideModule,
    DragulaModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ProductsCmpModule,
    PendingsCmpModule,
    WorkOrdersCmpModule,
    ProjectsListCmpModule,
    ProjectManagementCmpModule,
    PuchaseOrderListCmpModule,
    AuthCmpModule,
    CrmCmpModule
  ],
  exports: [
    SubmenuComponent,
    PhonePipe
  ],
  providers: [SubnavHandlerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
