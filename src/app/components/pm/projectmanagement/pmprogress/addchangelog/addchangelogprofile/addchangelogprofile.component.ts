import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectManagementService } from '../../../projectmanagement.service';
import * as moment from 'moment';
import { SharedService } from '../../../../../../services/shared.service';
import { ProjectsService } from '../../../../../../services/projects.service';
@Component({
  selector: 'app-addchangelogprofile',
  templateUrl: './addchangelogprofile.component.html',
  styleUrls: [
    './addchangelogprofile.component.css',
  ]
})

export class AddChangeLogProfileComponent implements OnInit {
  changeLogInfo = {
    customerName: 'John Moss',
    projectName: 'Remodel with a Nu Life',
    projectAddress: {
      street: '301, 1615 10th Ave SW',
      city: 'Calgary',
      state: 'Alberta',
      country: 'Canada',
      zipcode: 'T3C 0J7',
    },
    changeLogId: '',
    requestedBy: 'Sepehr Shoarinejad',
    ccContact: 'Danny Shibley',
    createdOn: '2017-11-20',
    lastUpdated: '2018-01-20',
    scopeDescriptionChange: '',
    scopeDetailsChange: '',
    updatePm: false,
    count: 0
  };

  changeLogList = [
    {
      id: 'ES 882302',
      typeName: 'Change of the TV location in Living Room',
      type: 'estimate',
      createdBy: 'Sepehr Shoarinejad',
      budgetImpact: 2000,
      scheduleImpact: 0,
      dateCreated: '2016-11-20',
      lastUpdated: '2017-01-20',
      dateApproved: '2017-01-20'
    },
    {
      id: 'WO 032321',
      typeName: 'Customer constantly changing his mind',
      type: 'workOrder',
      createdBy: 'Sepehr Shoarinejad',
      budgetImpact: 0,
      scheduleImpact: -1,
      dateCreated: '2016-12-15',
      lastUpdated: '2017-01-20',
      dateApproved: '2017-01-20'
    },
    {
      id: 'WO 023902',
      typeName: 'I don\'t know what to do anymore',
      type: 'workOrder',
      createdBy: 'Tyler Labonte',
      budgetImpact: 0,
      scheduleImpact: -4,
      dateCreated: '2016-01-20',
      lastUpdated: '2017-01-20',
      dateApproved: '2017-01-20'
    }
  ];


  changeLogStatus = 'inProgress';
  showConfirmModal = false;
  descriptionChange: any;
  detailsChange: any;
  usersList = [];
  currentProjectId: any;
  currentChangeLogId: any;

  constructor( private pmService: ProjectManagementService, private router: Router, private sharedService: SharedService,
    private projectsService: ProjectsService, private route: ActivatedRoute ) {
      this.currentProjectId = localStorage.getItem('project_id');
      this.currentChangeLogId = this.route.snapshot.paramMap.get('id');

      this.pmService.saveChangeLog.subscribe(data => {
        if (data['sendSaveData']) {
          console.log('save is clicked');
        }
      });

      console.log('project_id: ', this.currentProjectId, this.currentChangeLogId);
      this.sharedService.getUsers().subscribe(data => {
        this.usersList = data;
        this.addUserRealName(this.usersList);
        console.log('usersList: ', this.usersList);
        this.projectsService.getIndividualProjectChangeLog(this.currentProjectId, this.currentChangeLogId).subscribe(res => {
          this.changeLogInfo = res.results;
          this.changeLogInfo.customerName = this.getCustomerNameFromUsername(res.data.contactId);
          console.log('indi project: ', this.changeLogInfo);
        });

      });
  }

  ngOnInit() {

  }

  confirm() {
    this.router.navigate(['../estimate']);
  }

  addUserRealName(data) {
    data.forEach(element => {
      element.name = element.firstName + ' ' + element.lastName;
    });
    return data;
  }

  getCustomerNameFromUsername(username) {
    const selectedUser = this.usersList.filter(c => c.username === username)[0];
    return selectedUser.name;
  }

}
