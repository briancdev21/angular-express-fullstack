import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectManagementService } from '../../projectmanagement.service';
import * as moment from 'moment';
import { CompleterService, CompleterData } from 'ng2-completer';
import { SharedService } from '../../../../../services/shared.service';
import { ProjectsService } from '../../../../../services/projects.service';
import { PmService } from '../../../pm.service';

@Component({
  selector: 'app-pmboardtopinfo',
  templateUrl: './pmboardtopinfo.component.html',
  styleUrls: [
    './pmboardtopinfo.component.css',
  ]
})

export class PmBoardTopInfoComponent implements OnInit {

  tDate: '';
  targetDate = '';
  nDate: '';
  nextPaymentDate = '';
  currentProjectId: any;
  contactsList = [];
  projectInfo: any;
  today = new Date();
  nearest: any;


  constructor( private router: Router, private sharedService: SharedService, private pmService: PmService,
    private projectsService: ProjectsService, private route: ActivatedRoute) {
    this.currentProjectId = localStorage.getItem('current_projectId');
    if (this.currentProjectId !== '') {
      this.sharedService.getContacts().subscribe(data => {
        this.contactsList = data;
        this.addContactName(this.contactsList);
        this.projectsService.getIndividualProject(this.currentProjectId).subscribe(res => {

          this.projectInfo = res.data;
          this.projectInfo.contactName = this.getContactNameFromId(res.data.contactId);
          this.projectInfo.startDate = moment(this.projectInfo.startDate).format('MMM DD, YYYY');
          this.projectInfo.endDate = moment(this.projectInfo.endDate).format('MMM DD, YYYY');
        });

        this.pmService.getNearestSchedule(this.currentProjectId).subscribe(res => {
          console.log('nearest : ', res);
          this.nearest = res.results[0];
          this.projectInfo.nextPaymentDate = moment(this.nearest.date).format('MMM DD, YYYY');
        });

      });
    } else {
      console.error('product id error');
    }
  }

  ngOnInit() {

  }

  getPerformanceColor(value) {
    if (value < 60) {
      return 'red';
    } else if (value < 80) {
      return 'orange';
    } else {
      return 'green';
    }
  }

  selectTargetDate(date) {
    this.projectInfo.targetDate = moment(date.value).format('MMM DD, YYYY');
  }

  selectNextPaymentDate(date) {
    this.projectInfo.nextPaymentDate = moment(date.value).format('MMM DD, YYYY');
    const updatingData = {
      date: moment(this.projectInfo.nextPaymentDate).format('YYYY-MM-DD')
    };
    this.projectsService.updateProjectPaymentSchedule(this.currentProjectId, this.nearest.id, updatingData).subscribe(res => {
      console.log('successfuly modified: ', res);
    });
  }

  addContactName(data) {
    data.forEach(element => {
      if (element.type === 'PERSON') {
        element.name = element.person.firstName + ' ' + element.person.lastName;
      } else {
        element.name = element.business.name;
      }
    });
    return data;
  }

  getContactNameFromId(id) {
    const selectedContact = this.contactsList.filter(c => c.id === id)[0];
    return selectedContact.name;
  }

}
