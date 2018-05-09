import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PmService } from '../../pm.service';

@Component({
  selector: 'app-changelogdetails',
  templateUrl: './changelogdetails.component.html',
  styleUrls: [
    './changelogdetails.component.css'
  ]
})
export class ChangeLogDetailsComponent implements OnInit {

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

  constructor( private pmService: PmService ) {

  }

  ngOnInit () {
    const options = { month: 'long', year: 'numeric', day: 'numeric' };
    this.createChangeLogId();
    // this.startDateValue = new Date(this.changeLogInfo.startDate);
    // this.endDateValue = new Date(this.changeLogInfo.endDate);
    // this.startTimeValue = new Date(this.changeLogInfo.startTime);
    // this.endTimeValue = new Date(this.changeLogInfo.startEnd);
  }

  clickIconShipping() {
    this.switchIconAddress = !this.switchIconAddress;
    this.street = (this.switchIconAddress) ? this.changeLogInfo.projectAddress.street : '';
    this.city = (this.switchIconAddress) ? this.changeLogInfo.projectAddress.city : '';
    this.state = (this.switchIconAddress) ? this.changeLogInfo.projectAddress.state : '';
    this.country = (this.switchIconAddress) ? this.changeLogInfo.projectAddress.country : '';
    this.zipcode = (this.switchIconAddress) ? this.changeLogInfo.projectAddress.zipcode : '';
  }

  onCreatedDate(event) {
    // this.startDateValue = event.value;
    // this.endMin = this.startDateValue;
    // this.orderService.postTimelineData({title: this.startDateValue.toDateString(), type: 'startDate'});
  }

  onUpdatedDate(event) {
    // this.orderService.postTimelineData({title: this.endDateValue.toDateString(), type: 'endDate'});
  }

  createChangeLogId() {
    const today = new Date();
    const year = today.getFullYear().toString().slice(-2);
    let month = (today.getMonth() + 1).toString();
    if (month.length === 1) {
      month = '0' + month;
    }
    const day = today.getDate();
    let lastIndex = this.changeLogInfo.count + 1;
    if (lastIndex.toString().length === 1) {
      lastIndex = '0' + lastIndex;
    }
    const changeLogId = 'CL' + year + month + day + '-' + lastIndex;
    this.changeLogInfo.changeLogId = changeLogId;
  }

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

}
