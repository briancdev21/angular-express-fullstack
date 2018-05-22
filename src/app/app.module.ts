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
import { ProposalComponent } from './components/sales/proposal/proposal.component';
import { OrderProfileComponent } from './components/orderprofile/orderprofile.component';
import { SalesComponent } from './components/sales/sales.component';
import { SubmenuComponent } from './components/submenu/submenu.component';
import { CollaborationComponent } from './components/collaboration/collaboration.component';
import { HomeComponent } from './components/home/home.component';
import { SalesMarginsChartComponent } from './components/home/salesmarginschart/salesmarginschart.component';
import { ActiveProjectsChartComponent } from './components/home/activeprojectschart/activeprojectschart.component';
import { LeadsToWinChartComponent } from './components/home/leadstowinchart/leadstowinchart.component';
import { CrmComponent } from './components/crm/crm.component';
import { PmComponent } from './components/pm/pm.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { ServicingComponent } from './components/servicing/servicing.component';
import { ProjectManagementComponent } from './components/pm/projectmanagement/projectmanagement.component';

import { ProfileCmpModule } from './components/profile/profile.module';
import { ProposalCmpModule } from './components/sales/proposal/proposal.module';
import { OrderProfileCmpModule } from './components/orderprofile/orderprofile.module';
import { SalesCmpModule } from './components/sales/sales.module';
import { CollaborationCmpModule } from './components/collaboration/collaboration.module';
import { ProjectManagementCmpModule } from './components/pm/projectmanagement/projectmanagement.module';
import { CommonCmpModule } from './components/common/common.module';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { NgSelectModule } from '@ng-select/ng-select';
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
import { ProductProfileCmpModule } from './components/inventory/products/productprofile/productprofile.module';
import { SharedPipesModule } from './pipes/sharedpipes.module';

import { Pipe, PipeTransform } from '@angular/core';

import { TokenInterceptor } from './services/token.interceptor';
import { SubnavHandlerService } from './services/subnav-handler.service';
import { CrmService } from './services/crm.service';
import { SharedService } from './services/shared.service';
import { InvoicesService } from './services/invoices.service';
import { ProductsService } from './services/inventory/products.service';
import { SuppliersService } from './services/suppliers.service';
import { AuthGuard } from './services/authguard.service';
import { EstimatesService } from './services/estimates.service';
@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    ProposalComponent,
    OrderProfileComponent,
    SalesComponent,
    SubmenuComponent,
    StopEventPropagationDirective,
    InventoryComponent,
    PmComponent,
    ProjectManagementComponent,
    HomeComponent,
    CrmComponent,
    CollaborationComponent,
    ServicingComponent,
    SalesMarginsChartComponent,
    ActiveProjectsChartComponent,
    LeadsToWinChartComponent
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
    NgSelectModule,
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
    LeadProfileCmpModule,
    ProductProfileCmpModule,
    SharedPipesModule
  ],
  exports: [
    SubmenuComponent,
  ],
  providers: [
    SubnavHandlerService,
    CrmService,
    InvoicesService,
    SharedService,
    ProductsService,
    SuppliersService,
    AuthGuard,
    EstimatesService,
    SuppliersService,
    ProductsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
