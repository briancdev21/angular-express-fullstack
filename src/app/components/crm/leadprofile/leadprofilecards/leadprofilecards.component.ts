import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { LeadScoreComponent } from './leadscore/leadscore.component';
import { CustomerDealsComponent } from '../../../profile/cards/customerdeals/customerdeals.component';
import { UpcomingAppointmentsComponent } from '../../../profile/cards/upcomingappointments/upcomingappointments.component';
import { TasksComponent } from '../../../profile/cards/tasks/tasks.component';
import { DocumentsComponent } from '../../../profile/cards/documents/documents.component';
import { CollaboratorsComponent } from '../../../profile/cards/collaborators/collaborators.component';
import { SharedService } from '../../../../services/shared.service';

@Component({
  selector: 'app-leadprofilecards',
  templateUrl: './leadprofilecards.component.html',
  styleUrls: [
    './leadprofilecards.component.css'
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

export class LeadProfileCardsComponent {

  @Input() cardsInfo;
  @Input() dealsInfo;
  @Input() wonDealsInfo;
  @Input() userInfo;
  @Input() tasksInfo;
  @Input() set collaboratorsInfo(val) {
    this.sharedService.getUsers().subscribe(user => {
      this.usersList = user;
      this._collaboratorInfo = val;
      this._collaboratorInfo.forEach(element => {
        this.collaborators.push(this.usersList.filter(u => u.username === element)[0]);
      });
    });
  }
  @Input() documentsInfo;
  @Input() upcomingModalInfo;

  _collaboratorInfo: any;
  usersList: any;
  collaborators = [];

  constructor(private sharedService: SharedService) {

  }
}
