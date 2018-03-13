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


import { CommonComponent } from './components/common/common.component';

export const routes: Routes = [
  { path: '', component: TestComponent },
  { path: 'crm', component: LeadsComponent },
  { path: 'sales', component: ProposalComponent },
  { path: 'pm', component: ContactsComponent },
  { path: 'inventory', component: SuppliersComponent },
  { path: 'orderprofile', component: OrderProfileComponent },
  { path: 'servicing', component: ProductsComponent },
  { path: 'reports', component: InvoicesComponent },
  { path: '**', component: TestComponent },
];

export const routing = RouterModule.forRoot(routes);
