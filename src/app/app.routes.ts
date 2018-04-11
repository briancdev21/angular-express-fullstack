import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './components/test/test.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProposalComponent } from './components/proposal/proposal.component';
import { LeadsComponent } from './components/crm/leads/leads.component';
import { OrderProfileComponent } from './components/orderprofile/orderprofile.component';
import { DealsPipelineComponent } from './components/sales/dealspipeline/dealspipeline.component';
import { ContactsComponent } from './components/crm/contacts/contacts.component';
import { SuppliersComponent } from './components/inventory/suppliers/suppliers.component';
import { ProductsComponent } from './components/inventory/products/products.component';
import { InvoicesComponent } from './components/sales/invoices/invoices.component';
import { PendingsComponent } from './components/pm/pendings/pendings.component';
import { WorkOrdersComponent } from './components/workorders/workorders.component';
import { ProjectsListComponent } from './components/pm/projectslist/projectslist.component';
import { ProposalListComponent } from './components/sales/proposallist/proposallist.component';
import { ProjectManagementComponent } from './components/projectmanagement/projectmanagement.component';
import { PmBoardComponent } from './components/projectmanagement/pmboard/pmboard.component';
import { PmScheduleComponent } from './components/projectmanagement/pmschedule/pmschedule.component';
import { PmFinancialsComponent } from './components/projectmanagement/pmfinancials/pmfinancials.component';
import { PmProgressComponent } from './components/projectmanagement/pmprogress/pmprogress.component';
import { PmFilesComponent } from './components/projectmanagement/pmfiles/pmfiles.component';
import { PurchaseOrderListComponent } from './components/inventory/purchaseorderlist/purchaseorderlist.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { CrmComponent } from './components/crm/crm.component';
import { AccountsComponent } from './components/crm/accounts/accounts.component';
import { CrmDashboardComponent } from './components/crm/crmdashboard/crmdashboard.component';
import { SalesComponent } from './components/sales/sales.component';
import { SalesDashboardComponent } from './components/sales/salesdashboard/salesdashboard.component';
import { PmComponent } from './components/pm/pm.component';
import { PmDashboardComponent } from './components/pm/pmdashboard/pmdashboard.component';
import { TasksComponent } from './components/pm/tasks/tasks.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { InventoryDashboardComponent } from './components/inventory/inventorydashboard/inventorydashboard.component';

import { CommonComponent } from './components/common/common.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent},
  { path: 'crm', component: CrmComponent,
    children: [
      { path: '', redirectTo: 'crm-dashboard', pathMatch: 'full' },
      { path: 'crm-dashboard', component: CrmDashboardComponent },
      { path: 'leads', component: LeadsComponent },
      { path: 'contacts', component: ContactsComponent },
      { path: 'accounts', component: AccountsComponent },
    ]
  },
  { path: 'sales', component: SalesComponent,
    children: [
      { path: '', redirectTo: 'sales-dashboard', pathMatch: 'full' },
      { path: 'sales-dashboard', component: SalesDashboardComponent },
      { path: 'deals', component: DealsPipelineComponent },
      { path: 'invoices', component: InvoicesComponent },
      { path: 'proposals', component: ProposalListComponent },
    ]
  },
  { path: 'pm', component: PmComponent,
    children: [
      { path: '', redirectTo: 'pm-dashboard', pathMatch: 'full' },
      { path: 'pm-dashboard', component: PmDashboardComponent },
      { path: 'tasks', component: TasksComponent },
      { path: 'projects', component: ProjectsListComponent },
      { path: 'pending-projects', component: PendingsComponent },
    ]
  },
  { path: 'inventory', component: InventoryComponent,
    children: [
      { path: '', redirectTo: 'inventory-dashboard', pathMatch: 'full' },
      { path: 'inventory-dashboard', component: InventoryDashboardComponent },
      { path: 'stock-control', component: PurchaseOrderListComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'suppliers', component: SuppliersComponent },
    ]
  },
  { path: 'orderprofile', component: PurchaseOrderListComponent },
  { path: 'servicing', component: ProductsComponent },
  { path: 'reports', component: InvoicesComponent },
  { path: 'pm-details', component: ProjectManagementComponent,
    children: [
      { path: '', redirectTo: 'pm-board', pathMatch: 'full' },
      { path: 'pm-board', component: PmBoardComponent },
      { path: 'pm-schedule', component: PmScheduleComponent },
      { path: 'pm-financials', component: PmFinancialsComponent },
      { path: 'pm-progress', component: PmProgressComponent },
      { path: 'pm-files', component: PmFilesComponent },
    ]
  },
  { path: '**', component: TestComponent },
];

export const routing = RouterModule.forRoot(routes);
