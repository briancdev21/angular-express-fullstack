import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectManagementService } from '../../../projectmanagement.service';
import { SharedService } from '../../../../../../services/shared.service';
import { ProjectsService } from '../../../../../../services/projects.service';
import * as moment from 'moment';

@Component({
  selector: 'app-addchangelogdetails',
  templateUrl: './addchangelogdetails.component.html',
  styleUrls: [
    './addchangelogdetails.component.css'
  ]
})
export class AddChangeLogDetailsComponent implements OnInit {

  changeLogInfo: any;
  switchIconAddress = false;
  switchIconPm = false;
  address = '';
  city = '';
  province = '';
  country = '';
  postalCode = '';
  public endMin;
  public startMax;
  contactsList = [];
  usersList = [];
  customerName = '';
  currentProjectId = '';
  logId = '';
  requestedBy = '';
  ccContact = '';
  createdAt: any;
  updatedAt: any;
  updatePm = false;
  projectInfo: any;
  projectName = '';
  selectedContact; any;
  createdChangeLog: any;
  title = '';
  logStatus = 'NEW';

  constructor( private projectManagementService: ProjectManagementService, private sharedService: SharedService,
    private projectsService: ProjectsService ) {
    this.currentProjectId = localStorage.getItem('current_projectId');
    const savingMockData = {
      title: '',
      description: '',
      newScopeOfWork: ''
    };

    this.projectManagementService.saveChangeLog.subscribe(data => {
      if (data['sendSaveData']) {
        console.log('save is clicked');
      }
    });

    this.projectManagementService.logStatusChange.subscribe(data => {
      if (data) {
        this.logStatus = data;
      }
    });

    this.projectManagementService.logTitleChange.subscribe(data => {
      if (data) {
        this.title = data;
      }
    });

    this.projectsService.createProjectChangeLog(this.currentProjectId, savingMockData).subscribe(data => {
      this.createdChangeLog = data.data;
      console.log('createdChangeLog', data);
    });

    this.sharedService.getContacts().subscribe(data => {
      this.contactsList = data;
      this.addContactName(this.contactsList);

      this.projectsService.getIndividualProject(this.currentProjectId).subscribe(res => {
        this.projectInfo = res.data;
        console.log('project info: ', this.currentProjectId, this.projectInfo);
        this.customerName = this.getContactNameFromId(this.projectInfo.contactId);
        this.projectName = this.projectInfo.name;
        this.address = this.projectInfo.shippingAddress.address;
        this.city = this.projectInfo.shippingAddress.city;
        this.province = this.projectInfo.shippingAddress.province;
        this.country = this.projectInfo.shippingAddress.country;
        this.postalCode = this.projectInfo.shippingAddress.postalCode;
        this.requestedBy = this.projectInfo.projectManager;
        this.createdAt = moment(this.projectInfo.createdAt).format('MMMM DD, YYYY');
        this.updatedAt = moment(this.projectInfo.updatedAt).format('MMMM DD, YYYY');
      });
    });

    this.sharedService.getUsers().subscribe(res => {
      this.usersList = res;
    });

  }

  ngOnInit () {
    const options = { month: 'long', year: 'numeric', day: 'numeric' };
    // no need to create id because it will come from back end.
    // this.createChangeLogId();

    // comment for now because it cause some console error. Will reactivate after back end is ready

    // this.street = this.changeLogInfo.shippingAddress.address;
    // this.city = this.changeLogInfo.shippingAddress.city;
    // this.state = this.changeLogInfo.shippingAddress.province;
    // this.country = this.changeLogInfo.shippingAddress.country;
    // this.zipcode = this.changeLogInfo.shippingAddress.postalCode;


    // this.startDateValue = new Date(this.changeLogInfo.startDate);
    // this.endDateValue = new Date(this.changeLogInfo.endDate);
    // this.startTimeValue = new Date(this.changeLogInfo.startTime);
    // this.endTimeValue = new Date(this.changeLogInfo.startEnd);
  }

  clickIconShipping() {
    // this.switchIconAddress = !this.switchIconAddress;
    this.address = (this.switchIconAddress) ? this.projectInfo.shippingAddress.address :
    this.selectedContact.shippingAddress.city;
    this.city = (this.switchIconAddress) ? this.projectInfo.shippingAddress.city :
    this.selectedContact.shippingAddress.city;
    this.province = (this.switchIconAddress) ? this.projectInfo.shippingAddress.province :
    this.selectedContact.shippingAddress.province;
    this.country = (this.switchIconAddress) ? this.projectInfo.shippingAddress.country :
    this.selectedContact.shippingAddress.country;
    this.postalCode = (this.switchIconAddress) ? this.projectInfo.shippingAddress.postalCode :
    this.selectedContact.shippingAddress.postalCode;
    this.switchIconAddress = !this.switchIconAddress;
  }

  onCreatedDate(event) {
    // this.startDateValue = event.value;
    // this.endMin = this.startDateValue;
    // this.orderService.postTimelineData({title: this.startDateValue.toDateString(), type: 'startDate'});
  }

  onUpdatedDate(event) {
    // this.orderService.postTimelineData({title: this.endDateValue.toDateString(), type: 'endDate'});
  }

  // createChangeLogId() {
  //   const today = new Date();
  //   const year = today.getFullYear().toString().slice(-2);
  //   let month = (today.getMonth() + 1).toString();
  //   if (month.length === 1) {
  //     month = '0' + month;
  //   }
  //   const day = today.getDate();
  //   let lastIndex = this.changeLogInfo.count + 1;
  //   if (lastIndex.toString().length === 1) {
  //     lastIndex = '0' + lastIndex;
  //   }
  //   const changeLogId = 'CL' + year + month + day + '-' + lastIndex;
  //   this.changeLogInfo.changeLogId = changeLogId;
  // }

  // onTimeChange() {
  //   let timeSplit = this.startTimeValue.split(':'), hours, minutes, meridian;
  //   hours = timeSplit[0];
  //   minutes = timeSplit[1];
  //   if (hours > 12) {
  //     meridian = 'PM';
  //     hours -= 12;
  //   } else if (hours < 12) {
  //     meridian = 'AM';
  //     if (hours == 0) {
  //       hours = 12;
  //     }
  //   } else {
  //     meridian = 'PM';
  //   }
  //   this.startTimeValue = (hours + ':' + minutes + ' ' + meridian);
  // }

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

  updatePmProfile() {
    this.switchIconPm = !this.switchIconPm;
    this.updatePm = this.switchIconPm;
  }

  getContactNameFromId(id) {
    this.selectedContact = this.contactsList.filter(c => c.id === id)[0];
    return this.selectedContact.name;
  }

  getCustomerNameFromUsername(username) {
    const selectedUser = this.usersList.filter(c => c.username === username)[0];
    return selectedUser.name;
  }

}
