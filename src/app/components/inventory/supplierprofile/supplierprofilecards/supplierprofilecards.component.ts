import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { LeadScoreComponent } from './leadscore/leadscore.component';
import { CustomerDealsComponent } from '../../../profile/cards/customerdeals/customerdeals.component';
import { UpcomingAppointmentsComponent } from '../../../profile/cards/upcomingappointments/upcomingappointments.component';
import { TasksComponent } from '../../../profile/cards/tasks/tasks.component';
import { DocumentsComponent } from '../../../profile/cards/documents/documents.component';
import { CollaboratorsComponent } from '../../../profile/cards/collaborators/collaborators.component';

@Component({
  selector: 'app-supplierprofilecards',
  templateUrl: './supplierprofilecards.component.html',
  styleUrls: [
    './supplierprofilecards.component.css'
  ],
  entryComponents: [
    LeadScoreComponent,
    CustomerDealsComponent,
    UpcomingAppointmentsComponent,
    TasksComponent,
    DocumentsComponent,
    CollaboratorsComponent
  ]
})

export class SupplierProfileCardsComponent {

  @Input() cardsInfo;
  @Input() dealsInfo;
  @Input() wonDealsInfo;
  @Input() userInfo;
  @Input() tasksInfo;
  @Input() collaboratorsInfo;
  @Input() documentsInfo;
  @Input() upcomingModalInfo;

  constructor() {

  }
}
