import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './components/test/test.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProposalComponent } from './components/sales/proposal/proposal.component';
import { LeadsComponent } from './components/crm/leads/leads.component';
import { OrderProfileComponent } from './components/orderprofile/orderprofile.component';
import { DealsPipelineComponent } from './components/sales/dealspipeline/dealspipeline.component';
import { ContactsComponent } from './components/crm/contacts/contacts.component';
import { SuppliersComponent } from './components/inventory/suppliers/suppliers.component';
import { ProductsComponent } from './components/inventory/products/products.component';
import { InvoicesComponent } from './components/sales/invoices/invoices.component';
import { AddInvoiceComponent } from './components/sales/invoices/addinvoice/addinvoice.component';
import { AddEstimateComponent } from './components/sales/invoices/addestimate/addestimate.component';
import { PendingsComponent } from './components/pm/pendings/pendings.component';
import { CollaborationComponent } from './components/collaboration/collaboration.component';
import { ProjectsListComponent } from './components/pm/projectslist/projectslist.component';
import { ProposalListComponent } from './components/sales/proposallist/proposallist.component';
import { ProjectManagementComponent } from './components/pm/projectmanagement/projectmanagement.component';
import { PmBoardComponent } from './components/pm/projectmanagement/pmboard/pmboard.component';
import { PmScheduleComponent } from './components/pm/projectmanagement/pmschedule/pmschedule.component';
import { PmFinancialsComponent } from './components/pm/projectmanagement/pmfinancials/pmfinancials.component';
import { PmProgressComponent } from './components/pm/projectmanagement/pmprogress/pmprogress.component';
import { PmFilesComponent } from './components/pm/projectmanagement/pmfiles/pmfiles.component';
import {
    ChangeLogProfileComponent
  } from './components/pm/projectmanagement/pmprogress/progresschangelog/changelogprofile/changelogprofile.component';
import {
    ChangeLogsTableComponent
  } from './components/pm/projectmanagement/pmprogress/progresschangelog/changelogstable/changelogstable.component';
import { PurchaseOrderListComponent } from './components/inventory/purchaseorderlist/purchaseorderlist.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { ForgotPasswordComponent } from './components/auth/forgotpassword/forgotpassword.component';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { CrmComponent } from './components/crm/crm.component';
import { AccountsComponent } from './components/crm/accounts/accounts.component';
import { CrmDashboardComponent } from './components/crm/crmdashboard/crmdashboard.component';
import { SalesComponent } from './components/sales/sales.component';
import { SalesDashboardComponent } from './components/sales/salesdashboard/salesdashboard.component';
import { PmComponent } from './components/pm/pm.component';
import { PmDashboardComponent } from './components/pm/pmdashboard/pmdashboard.component';
import { MyTasksComponent } from './components/pm/mytasks/mytasks.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { InventoryDashboardComponent } from './components/inventory/inventorydashboard/inventorydashboard.component';
import { CollaborationDashboardComponent } from './components/collaboration/collaborationdashboard/collaborationdashboard.component';
import { TeamScheduleComponent } from './components/collaboration/teamschedule/teamschedule.component';
import { PersonalScheduleComponent } from './components/collaboration/personalschedule/personalschedule.component';
import { WorkOrdersComponent } from './components/collaboration/workorders/workorders.component';
import { ServicingComponent } from './components/servicing/servicing.component';
import { ServicingDashboardComponent } from './components/servicing/servicingdashboard/servicingdashboard.component';
import { TicketsComponent } from './components/servicing/tickets/tickets.component';
import { WorkOrderIssuesComponent } from './components/servicing/workorderissues/workorderissues.component';
import { SolutionsComponent } from './components/servicing/solutions/solutions.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ReportsDashboardComponent } from './components/reports/reportsdashboard/reportsdashboard.component';
import { FinancialReportsComponent } from './components/reports/financialreports/financialreports.component';
import { PerformanceReportsComponent } from './components/reports/performancereports/performancereports.component';
import { ProjectReportsComponent } from './components/reports/projectreports/projectreports.component';
import { LeadProfileComponent } from './components/crm/leadprofile/leadprofile.component';
import { SupplierProfileComponent } from './components/inventory/supplierprofile/supplierprofile.component';
import { ProjectInformationComponent } from './components/pm/pendings/pendingproject/projectinformation/projectinformation.component';
import { PendingProjectScopeComponent } from './components/pm/pendings/pendingproject/pendingprojectscope/pendingprojectscope.component';
import { PendingProjectTasksComponent } from './components/pm/pendings/pendingproject/pendingprojecttasks/pendingprojecttasks.component';
import {
  PendingProjectFinancialsComponent
} from './components/pm/pendings/pendingproject/pendingprojectfinancials/pendingprojectfinancials.component';
import { PendingProjectComponent } from './components/pm/pendings/pendingproject/pendingproject.component';
import {
  PendingWorkOrdersListTableComponent
} from './components/pm/pendings/pendingproject/pendingworkorderslisttable/pendingworkorderslisttable.component';
import {InventoryAdProfileComponent} from './components/inventory/inventory-ad-profile/inventory.component';
import {InventoryTrProfileComponent} from './components/inventory/inventory-tr-profile/inventory.component';


import { CommonComponent } from './components/common/common.component';
import {InventoryPoAddComponent} from './components/inventory/inventory-po-add/inventory.component';
import {InventoryTrAddComponent} from './components/inventory/inventory-tr-add/inventory.component';
import {InventoryAdAddComponent} from './components/inventory/inventory-ad-add/inventory.component';
import {InventoryPoProfileComponent} from './components/inventory/inventory-po-profile/inventory.component';
import { ProductProfileComponent } from './components/inventory/products/productprofile/productprofile.component';

import { AuthGuard } from './services/authguard.service';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'home', component: HomeComponent , canActivate: [AuthGuard] },
  { path: 'add-invoice', component: AddInvoiceComponent, canActivate: [AuthGuard] },
  { path: 'add-estimate', component: AddEstimateComponent, canActivate: [AuthGuard] },
  { path: 'crm', component: CrmComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'crm-dashboard', pathMatch: 'full' },
      { path: 'crm-dashboard', component: CrmDashboardComponent },
      { path: 'leads', component: LeadsComponent },
      { path: 'contacts', component: ContactsComponent },
      { path: 'accounts', component: AccountsComponent },
      { path: 'lead-profile', component: LeadProfileComponent },
      { path: 'contact-profile', component: ProfileComponent }
    ]
  },
  { path: 'sales', component: SalesComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'sales-dashboard', pathMatch: 'full' },
      { path: 'sales-dashboard', component: SalesDashboardComponent },
      { path: 'deals', component: DealsPipelineComponent },
      { path: 'invoices', component: InvoicesComponent },
      { path: 'proposals', component: ProposalListComponent },
      { path: 'proposal-details', component: ProposalComponent }
    ]
  },
  { path: 'pm', component: PmComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'pm-dashboard', pathMatch: 'full' },
      { path: 'pm-dashboard', component: PmDashboardComponent },
      { path: 'tasks', component: MyTasksComponent },
      { path: 'projects', component: ProjectsListComponent },
      { path: 'pending-projects', component: PendingsComponent },
      { path: 'pm-details', component: ProjectManagementComponent,
        children: [
          { path: '', redirectTo: 'pm-board', pathMatch: 'full' },
          { path: 'pm-board', component: PmBoardComponent },
          { path: 'pm-schedule', component: PmScheduleComponent },
          { path: 'pm-financials', component: PmFinancialsComponent },
          { path: 'pm-progress', component: PmProgressComponent,
            children: [
              { path: '', redirectTo: 'pm-logs-table', pathMatch: 'full' },
              { path: 'pm-logs-table', component: ChangeLogsTableComponent },
              { path: 'pm-log-details', component: ChangeLogProfileComponent },
            ]
          },
          { path: 'pm-files', component: PmFilesComponent },
          { path: 'pm-log-details', component: ChangeLogProfileComponent },
        ]
      },
      { path: 'pending-project', component: PendingProjectComponent,
          children: [
            { path: '', redirectTo: 'pending-information', pathMatch: 'full' },
            { path: 'pending-information', component: ProjectInformationComponent },
            { path: 'pending-scope', component: PendingProjectScopeComponent },
            { path: 'pending-tasks', component: PendingProjectTasksComponent },
            { path: 'pending-financials', component: PendingProjectFinancialsComponent },
          ]
      },
    ]
  },
  { path: 'inventory', component: InventoryComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'inventory-dashboard', pathMatch: 'full' },
      { path: 'inventory-dashboard', component: InventoryDashboardComponent },
      { path: 'stock-control', component: PurchaseOrderListComponent },
      { path: 'stock-control/add-purchase-order', component: InventoryPoAddComponent },
      { path: 'stock-control/add-transfer', component: InventoryTrAddComponent },
      { path: 'stock-control/add-adjustment', component: InventoryAdAddComponent },
      { path: 'stock-control/purchaseorder/:id', component: InventoryPoProfileComponent },
      { path: 'stock-control/transfer/:id', component: InventoryTrProfileComponent },
      { path: 'stock-control/adjustment/:id', component: InventoryAdProfileComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'suppliers', component: SuppliersComponent },
      { path: 'supplier-profile', component: SupplierProfileComponent },
      { path: 'product-profile', component: ProductProfileComponent }
    ]
  },
  { path: 'collaboration', component: CollaborationComponent, canActivate: [AuthGuard],
      children: [
        { path: '', redirectTo: 'collaboration-dashboard', pathMatch: 'full' },
        { path: 'collaboration-dashboard', component: CollaborationDashboardComponent },
        { path: 'personal-schedule', component: PersonalScheduleComponent },
        { path: 'team-schedule', component: TeamScheduleComponent },
        { path: 'work-order', component: WorkOrdersComponent },
        { path: 'order-profile', component: OrderProfileComponent }
      ]
  },
  { path: 'servicing', component: ServicingComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'servicing-dashboard', pathMatch: 'full' },
      { path: 'servicing-dashboard', component: ServicingDashboardComponent },
      { path: 'tickets', component: TicketsComponent },
      { path: 'work-order-issues', component: WorkOrderIssuesComponent },
      { path: 'solutions', component: SolutionsComponent },
    ]
  },
  { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'reports-dashboard', pathMatch: 'full' },
      { path: 'reports-dashboard', component: ReportsDashboardComponent },
      { path: 'financial-reports', component: FinancialReportsComponent },
      { path: 'performance-reports', component: PerformanceReportsComponent },
      { path: 'project-reports', component: ProjectReportsComponent },
    ]
  },
  { path: '**', redirectTo: 'home' },
];

export const routing = RouterModule.forRoot(routes);
