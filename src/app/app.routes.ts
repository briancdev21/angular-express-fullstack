import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './components/test/test.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProposalComponent } from './components/proposal/proposal.component';
import { LeadsComponent } from './components/leads/leads.component';
import { OrderProfileComponent } from './components/orderprofile/orderprofile.component';
import { DealsPipelineComponent } from './components/dealspipeline/dealspipeline.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { ProductsComponent } from './components/products/products.component';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { PendingsComponent } from './components/pendings/pendings.component';
import { WorkOrdersComponent } from './components/workorders/workorders.component';
import { ProjectsListComponent } from './components/projectslist/projectslist.component';
import { ProposalListComponent } from './components/proposallist/proposallist.component';
import { ProjectManagementComponent } from './components/projectmanagement/projectmanagement.component';
import { PmBoardComponent } from './components/projectmanagement/pmboard/pmboard.component';
import { PmScheduleComponent } from './components/projectmanagement/pmschedule/pmschedule.component';
import { PmFinancialsComponent } from './components/projectmanagement/pmfinancials/pmfinancials.component';
import { PmProgressComponent } from './components/projectmanagement/pmprogress/pmprogress.component';
import { PmFilesComponent } from './components/projectmanagement/pmfiles/pmfiles.component';
import { PuchaseOrderListComponent } from './components/puchaseorderlist/puchaseorderlist.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';

import { CommonComponent } from './components/common/common.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'crm', component: ProposalListComponent },
  { path: 'sales', component: PendingsComponent },
  { path: 'pm', component: ProjectManagementComponent,
    children: [
      { path: '', redirectTo: 'pm-board', pathMatch: 'full' },
      { path: 'pm-board', component: PmBoardComponent },
      { path: 'pm-schedule', component: PmScheduleComponent },
      { path: 'pm-financials', component: PmFinancialsComponent },
      { path: 'pm-progress', component: PmProgressComponent },
      { path: 'pm-files', component: PmFilesComponent },
    ]
  },
  { path: 'inventory', component: ProjectsListComponent },
  { path: 'orderprofile', component: PuchaseOrderListComponent },
  { path: 'servicing', component: ProductsComponent },
  { path: 'reports', component: InvoicesComponent },
  { path: '**', component: TestComponent },
];

export const routing = RouterModule.forRoot(routes);
