import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { CollaborationService } from '../../collaboration.service';

@Component({
  selector: 'app-teamupcomingevent',
  templateUrl: './teamupcomingevent.component.html',
  styleUrls: [
    './teamupcomingevent.component.css'
  ]
})

export class TeamUpcomingEventComponent implements OnInit {

  @Input() upcomingModalInfo;
  @Output() updatedEvent: EventEmitter<any> = new EventEmitter;

  showModal: boolean = false;
  switchIcon: boolean = false;
  selectedUser = '';
  selectedLocation = '';
  changedEventDate = '';
  timeClicked = false;
  availableUsers = [
    {
      id: 0,
      name: 'John Moss',
      imageUrl: 'assets/users/user1.png'
    },
    {
      id: 1,
      name: 'Michael Lee',
      imageUrl: 'assets/users/user2.png'
    },
    {
      id: 2,
      name: 'Sepher',
      imageUrl: 'assets/users/user3.png'
    },
  ];
  geoSettings = {
    inputPlaceholderText: 'Location',
    showSearchButton: false,
    showRecentSearch: false,
    noOfRecentSearchSave: 5
  };
  availableUserList = [];

  constructor( private collaborationService: CollaborationService) {

  }

  ngOnInit() {

    this.availableUserList = this.availableUsers.map( t => t.name);
    this.collaborationService.closeEvent.subscribe(
      data => {
        if (!data) {
          this.closeSidebar();
          // console.log('up: ', this.upcomingModalInfo);
          this.upcomingModalInfo.repeat = 'None';
          this.upcomingModalInfo.alert = '30 minutes before';
          this.upcomingModalInfo.showAs = 'Busy';
        } else {
          this.geoSettings['inputString'] = this.upcomingModalInfo.location;
          this.geoSettings['inputPlaceholderText'] = 'Location';
          this.geoSettings = Object.assign({}, this.geoSettings);
        }
      }
    );
  }

  onSelectUser(event) {
    if (event.title) {
      // find the item from list array to get index
      const index = this.availableUserList.indexOf(event.title);
      // push data to upcoming info array
      this.upcomingModalInfo.users.push({
        id: index,
        name: this.availableUsers[index].name,
        imageUrl: this.availableUsers[index].imageUrl
      });
      this.selectedUser = '';
    }
  }

  autoCompleteCallback(event) {
    if (event.data.formatted_address) {
      this.selectedLocation = event.data.formatted_address;
      this.upcomingModalInfo.Location = this.selectedLocation;
    }
  }

  changeEventDate(date) {
    this.upcomingModalInfo.week = moment(date.value).format('dddd');
    this.upcomingModalInfo.date = moment(date.value).format('MMMM d, YYYY');
  }

  changeTimeFormat(date) {
    // change time format according to momemt js time style
    const mid = date.split(':')[0] + date.split(':')[1];
    // get formated time
    this.upcomingModalInfo.end = moment(mid, 'hmm').format('hh:mm A');
    this.timeClicked = false;
  }

  closeSidebar() {
    if (this.upcomingModalInfo.start) {
      const sendData = this.upcomingModalInfo;
      const midStart = this.upcomingModalInfo.start;
      const midEnd = this.upcomingModalInfo.end;
      const replacingStart = (12 + parseInt(midStart.substring(0, 3), 10)).toString();
      const replacingEnd = (12 + parseInt(midEnd.substring(0, 3), 10)).toString();
      // change start and end time format
      console.log('000', this.upcomingModalInfo.start, this.upcomingModalInfo.end);
      if (midStart.slice(-2) === 'PM') {
        if (this.upcomingModalInfo.start === '12:00 PM') {
          this.upcomingModalInfo.start = this.upcomingModalInfo.start.slice(0, -3);
        } else {
          this.upcomingModalInfo.start = this.upcomingModalInfo.start.replace(
            this.upcomingModalInfo.start.substring(0, 2), replacingStart).slice(0, -3);
        }
      } else {
        this.upcomingModalInfo.start = this.upcomingModalInfo.start.slice(0, -3);
      }

      if (midEnd.slice(-2) === 'PM') {
        if (this.upcomingModalInfo.end === '12:00 PM') {
          this.upcomingModalInfo.end = this.upcomingModalInfo.start.slice(0, -3);
        } else {
          this.upcomingModalInfo.end = this.upcomingModalInfo.end.replace(
              this.upcomingModalInfo.end.substring(0, 2), replacingEnd).slice(0, -3);
        }
      } else {
        this.upcomingModalInfo.end = this.upcomingModalInfo.end.slice(0, -3);
      }

      if (this.switchIcon) {
        this.upcomingModalInfo.end = '24:00';
      }

      sendData.start = moment(this.upcomingModalInfo.date).format('YYYY-MM-DD') + 'T' + this.upcomingModalInfo.start;
      sendData.end = moment(this.upcomingModalInfo.date).format('YYYY-MM-DD') + 'T' + this.upcomingModalInfo.end;
      sendData.location = this.upcomingModalInfo.location;
      sendData.repeat = this.upcomingModalInfo.repeat;
      sendData.description = this.upcomingModalInfo.description;
      sendData.alert = this.upcomingModalInfo.alert;
      sendData.showAs = this.upcomingModalInfo.showAs;
      sendData.users = this.upcomingModalInfo.users;
      console.log('send Data: ', sendData);
      this.updatedEvent.emit(sendData);

      // refresh geo autocompletion input box
      this.geoSettings['inputPlaceholderText'] = 'Location';
      this.geoSettings['inputString'] = '';
      this.geoSettings = Object.assign({}, this.geoSettings);
    }
  }
}

