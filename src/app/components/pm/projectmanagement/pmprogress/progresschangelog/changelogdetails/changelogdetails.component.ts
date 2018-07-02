import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectManagementService } from '../../../projectmanagement.service';
import { SharedService } from '../../../../../../services/shared.service';

@Component({
  selector: 'app-changelogdetails',
  templateUrl: './changelogdetails.component.html',
  styleUrls: [
    './changelogdetails.component.css'
  ]
})
export class ChangeLogDetailsComponent implements OnInit, AfterViewInit {

  @Input() changeLogList;
  @Input() changeLogInfo;
  switchIconAddress = false;
  switchIconPm = false;
  street = '';
  city = '';
  state = '';
  country = '';
  zipcode = '';
  public endMin;
  public startMax;
  contactsList = [];
  usersList = [];
  logStatus: any;
  title = '';

  constructor( private projectManagementService: ProjectManagementService, private sharedService: SharedService ) {
    this.sharedService.getContacts().subscribe(data => {
      this.contactsList = data;
      this.addContactName(this.contactsList);
    });

    this.sharedService.getUsers().subscribe(res => {
      this.usersList = res;
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

  }

  ngOnInit () {
    const options = { month: 'long', year: 'numeric', day: 'numeric' };
    // no need to create id because it will come from back end.
    // this.createChangeLogId();

    // comment for now because it cause some console error. Will reactivate after back end is ready

   


    // this.startDateValue = new Date(this.changeLogInfo.startDate);
    // this.endDateValue = new Date(this.changeLogInfo.endDate);
    // this.startTimeValue = new Date(this.changeLogInfo.startTime);
    // this.endTimeValue = new Date(this.changeLogInfo.startEnd);
  }

  clickIconShipping() {

    this.switchIconAddress = !this.switchIconAddress;
    this.changeLogInfo.shippingAddress.address = (this.switchIconAddress) ? this.street :
    this.changeLogInfo.selectedContact.shippingAddress.city;
    this.changeLogInfo.shippingAddress.city = (this.switchIconAddress) ? this.city :
    this.changeLogInfo.selectedContact.shippingAddress.city;
    this.changeLogInfo.shippingAddress.province = (this.switchIconAddress) ? this.state :
    this.changeLogInfo.selectedContact.shippingAddress.province;
    this.changeLogInfo.shippingAddress.country = (this.switchIconAddress) ? this.country :
    this.changeLogInfo.selectedContact.shippingAddress.country;
    this.changeLogInfo.shippingAddress.postalCode = (this.switchIconAddress) ? this.zipcode :
    this.changeLogInfo.selectedContact.shippingAddress.postalCode;
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

  ngAfterViewInit() {
    this.street = this.changeLogInfo.shippingAddress.address;
    this.city = this.changeLogInfo.shippingAddress.city;
    this.state = this.changeLogInfo.shippingAddress.province;
    this.country = this.changeLogInfo.shippingAddress.country;
    this.zipcode = this.changeLogInfo.shippingAddress.postalCode;
  }
}
