import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { LifeTimeStatusComponent } from './lifetimestatus/lifetimestatus.component';
import { CustomerDealsComponent } from './customerdeals/customerdeals.component';
import { UpcomingAppointmentsComponent } from './upcomingappointments/upcomingappointments.component';
import { TasksComponent } from './tasks/tasks.component';
import { DocumentsComponent } from './documents/documents.component';
import { CollaboratorsComponent } from './collaborators/collaborators.component';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: [
    './cards.component.css'
  ],
  entryComponents: [
    LifeTimeStatusComponent,
    CustomerDealsComponent,
    UpcomingAppointmentsComponent,
    TasksComponent,
    DocumentsComponent,
    CollaboratorsComponent
  ]
})

export class CardsComponent {

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
