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

import { CommonComponent } from './components/common/common.component';

export const routes: Routes = [
  { path: '', component: WorkOrdersComponent },
  { path: 'crm', component: ProposalListComponent },
  { path: 'sales', component: PendingsComponent },
  { path: 'pm', component: ContactsComponent },
  { path: 'inventory', component: ProjectsListComponent },
  { path: 'orderprofile', component: OrderProfileComponent },
  { path: 'servicing', component: ProductsComponent },
  { path: 'reports', component: InvoicesComponent },
  { path: '**', component: TestComponent },
];

export const routing = RouterModule.forRoot(routes);
