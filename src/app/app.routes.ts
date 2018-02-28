import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './components/test/test.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProposalComponent } from './components/proposal/proposal.component';
import { LeadsComponent } from './components/leads/leads.component';
import { OrderProfileComponent } from './components/orderprofile/orderprofile.component';
import { DealsPipelineComponent } from './components/dealspipeline/dealspipeline.component';
import { ContactsComponent } from './components/contacts/contacts.component';


import { CommonComponent } from './components/common/common.component';

export const routes: Routes = [
  { path: '', component: TestComponent },
  { path: 'crm', component: LeadsComponent },
  { path: 'sales', component: ProposalComponent },
  { path: 'pm', component: ContactsComponent },
  { path: 'inventory', component: DealsPipelineComponent },
  { path: 'orderprofile', component: OrderProfileComponent },
  { path: 'servicing', component: TestComponent },
  { path: 'reports', component: TestComponent },
];

export const routing = RouterModule.forRoot(routes);
