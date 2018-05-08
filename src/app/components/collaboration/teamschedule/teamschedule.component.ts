import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CollaborationService } from '../collaboration.service';
import { TeamUpcomingEventComponent } from './teamupcomingevent/teamupcomingevent.component';
import * as moment from 'moment';
import * as $ from 'jquery';
import 'fullcalendar';
import {Options} from 'fullcalendar';
import * as _ from 'lodash';

@Component({
  selector: 'app-teamschedule',
  templateUrl: './teamschedule.component.html',
  styleUrls: [
    './teamschedule.component.css',
  ]
})
export class TeamScheduleComponent implements OnInit, AfterViewInit {

  searchableList: any;
  selectedData: any = [];
  availableStaff = [];
  showSidebar = false;
  editing = false;
  changingColor = false;
  eventColors = ['#6eb1dd', '#ffac58', '#ff7e7e', '#4fa352', '#4d3eff'];
  themeColor = '#6eb1dd';
  yourTeam = [];
  thirdPartyTeam = [];
  selectedResource: any;
  public upcomingModalInfo = {
  };
  public resourcesInfo = [
    {
      type: 'Your Team',
      name: 'You',
      imageUrl: 'assets/users/user1.png',
      available: true,
      selected: true,
      themeColor: this.eventColors[0],
      resourceEvents: {
        height: 700,
        header: {
          center:  'prev,next today',
          left: 'title',
          right:  'month, agendaWeek, agendaDay'
        },
        defaultView: 'agendaWeek',
        editable: true,
        allDay: false,
        eventClick: (calEvent) => {
          console.log('Selected Event: ', calEvent);
          this.eventClick(calEvent);
        },
        dayClick: (date, jsEvent, view) => {
          this.dayClick(date);
        },
        events: [
          {
            index: 0,
            title: 'Repeating Event',
            start: '2018-04-09T06:00:00',
            end: '2018-04-09T08:00:00',
            color: ''
          },
          {
            index: 1,
            title: 'Sam\'s Birthday',
            start: '2018-04-09T08:00:00',
            end: '2018-04-09T09:30:00',
            color: ''
          },
          {
            index: 2,
            title: 'Meeting',
            start: '2018-04-09T09:30:00',
            end: '2018-04-09T11:30:00',
            color: ''

          },
          {
            index: 3,
            title: 'Lunch',
            start: '2018-04-09T11:30:00',
            end: '2018-04-09T13:30:00',
            color: ''
          },
          {
            index: 4,
            title: 'Smartadmin Open Day',
            start: '2018-04-09T13:30:00',
            end: '2018-04-09T15:30:00',
            color: ''
          },
        ]
      }
    },
    {
      type: 'Your Team',
      name: 'Tyler Labonte',
      imageUrl: 'assets/users/user2.png',
      available: true,
      selected: true,
      themeColor: this.eventColors[1],
      resourceEvents: {
        height: 700,
        header: {
          center:  'prev,next today',
          left: 'title',
          right:  'month, agendaWeek, agendaDay'
        },
        defaultView: 'agendaWeek',
        editable: true,
        allDay: false,
        eventClick: (calEvent) => {
          console.log('Selected Event: ', calEvent);
          this.eventClick(calEvent);
        },
        dayClick: (date, jsEvent, view) => {
          this.dayClick(date);
        },
        events: [
          {
            index: 0,
            title: 'Repeating Event',
            start: '2018-04-09T06:00:00',
            end: '2018-04-09T08:00:00',
            color: ''
          },
          {
            index: 1,
            title: 'Sam\'s Birthday',
            start: '2018-04-09T08:00:00',
            end: '2018-04-09T10:30:00',
            color: ''
          },
          {
            index: 2,
            title: 'Meeting',
            start: '2018-04-09T10:30:00',
            end: '2018-04-09T11:30:00',
            color: ''

          },
          {
            index: 3,
            title: 'Lunch',
            start: '2018-04-09T11:30:00',
            end: '2018-04-09T12:30:00',
            color: ''
          },
          {
            index: 4,
            title: 'Smartadmin Open Day',
            start: '2018-04-09T13:30:00',
            end: '2018-04-09T15:30:00',
            color: ''
          },
        ]
      }
    },
    {
      type: 'Your Team',
      name: 'Michael Yue',
      imageUrl: 'assets/users/man.png',
      available: true,
      selected: true,
      themeColor: this.eventColors[2],
      resourceEvents: {
        height: 700,
        header: {
          center:  'prev,next today',
          left: 'title',
          right:  'month, agendaWeek, agendaDay'
        },
        defaultView: 'agendaWeek',
        editable: true,
        allDay: false,
        eventClick: (calEvent) => {
          console.log('Selected Event: ', calEvent);
          this.eventClick(calEvent);
        },
        dayClick: (date, jsEvent, view) => {
          this.dayClick(date);
        },
        events: [
          {
            index: 0,
            title: 'Repeating Event',
            start: '2018-04-09T06:00:00',
            end: '2018-04-09T07:00:00',
            color: ''
          },
          {
            index: 1,
            title: 'Sam\'s Birthday',
            start: '2018-04-09T08:00:00',
            end: '2018-04-09T10:00:00',
            color: ''
          },
          {
            index: 2,
            title: 'Meeting',
            start: '2018-04-09T10:00:00',
            end: '2018-04-09T11:30:00',
            color: ''

          },
          {
            index: 3,
            title: 'Lunch',
            start: '2018-04-09T11:30:00',
            end: '2018-04-09T13:30:00',
            color: ''
          },
          {
            index: 4,
            title: 'Smartadmin Open Day',
            start: '2018-04-09T13:30:00',
            end: '2018-04-09T15:30:00',
            color: ''
          },
        ]
      }
    },
    {
      type: 'Your Third Party Team',
      name: 'James Newton',
      imageUrl: 'assets/users/user3.png',
      available: true,
      selected: true,
      themeColor: this.eventColors[3],
      resourceEvents: {
        height: 700,
        header: {
          center:  'prev,next today',
          left: 'title',
          right:  'month, agendaWeek, agendaDay'
        },
        defaultView: 'agendaWeek',
        editable: true,
        allDay: false,
        eventClick: (calEvent) => {
          console.log('Selected Event: ', calEvent);
          this.eventClick(calEvent);
        },
        dayClick: (date, jsEvent, view) => {
          this.dayClick(date);
        },
        events: [
          {
            index: 0,
            title: 'Repeating Event',
            start: '2018-04-09T06:00:00',
            end: '2018-04-09T08:00:00',
            color: ''
          },
          {
            index: 1,
            title: 'Sam\'s Birthday',
            start: '2018-04-09T08:00:00',
            end: '2018-04-09T09:30:00',
            color: ''
          },
        ]
      }
    },
    {
      type: 'Your Third Party Team',
      name: 'Steve Johnson',
      imageUrl: 'assets/users/John Moss.jpg',
      available: true,
      selected: true,
      themeColor: this.eventColors[4],
      resourceEvents: {
        height: 700,
        header: {
          center:  'prev,next today',
          left: 'title',
          right:  'month, agendaWeek, agendaDay'
        },
        defaultView: 'agendaWeek',
        editable: true,
        allDay: false,
        eventClick: (calEvent) => {
          console.log('Selected Event: ', calEvent);
          this.eventClick(calEvent);
        },
        dayClick: (date, jsEvent, view) => {
          this.dayClick(date);
        },
        events: [
          {
            index: 0,
            title: 'Repeating Event',
            start: '2018-04-09T06:00:00',
            end: '2018-04-09T08:00:00',
            color: ''
          },
          {
            index: 1,
            title: 'Sam\'s Birthday',
            start: '2018-04-09T08:00:00',
            end: '2018-04-09T09:30:00',
            color: ''
          },
          {
            index: 2,
            title: 'Meeting',
            start: '2018-04-09T09:30:00',
            end: '2018-04-09T11:30:00',
            color: ''
          },
        ]
      }
    },

  ];

  constructor(private collaborationService: CollaborationService) {
  }

  ngOnInit() {
    this.selectedResource = this.resourcesInfo[0];
    this.resourcesInfo[0].resourceEvents.events.map(e => e.color = this.themeColor);
    // console.log("100ms after ngAfterViewInit ");
    $('.angular2-fullcalendar').fullCalendar(this.resourcesInfo[0].resourceEvents);

    this.yourTeam = this.resourcesInfo.filter( r => r.type === 'Your Team');
    this.thirdPartyTeam = this.resourcesInfo.filter( r => r.type === 'Your Third Party Team');
  }

  ngAfterViewInit() {

  }

  editingTitle() {
    this.editing = true;
  }

  changeColor() {
    this.changingColor = true;
  }

  // selectColor(color) {
  //   this.themeColor = color;
  //   this.resourcesInfo[0].resourceEvents.events.map(e => e.color = this.themeColor);
  //   const resInfo = {};
  //   this.editing = false;
  //   this.changingColor = false;
  //   this.updateEvents();
  // }

  updateEvents() {
    // Remove all events and add updated events
    $('.angular2-fullcalendar').fullCalendar('removeEvents');
    $('.angular2-fullcalendar').fullCalendar('addEventSource', this.selectedResource.resourceEvents.events);
  }

  closeDetailedSidebar() {
    this.showSidebar = false;
    this.collaborationService.closeSidebarModal(this.showSidebar);
  }

  getUpdatedEvent(data) {
      const eventIndex = this.selectedResource.resourceEvents.events.map(obj => obj.index).indexOf(data.index);
      // this.resourcesInfo[0].resourceEvents.events[data.index] = data;
      const arr = [];
      _.forEach(this.selectedResource.resourceEvents.events, (event, index) => {
        if (index === eventIndex) {
          arr.push(data);
          return;
        }
        arr.push(event);
      });
      this.selectedResource.resourceEvents.events = null;
      delete this.selectedResource.resourceEvents.events;
      this.selectedResource.resourceEvents.events = arr;
      this.updateEvents();
  }

  selectUser (resource) {
    this.selectedResource = resource;
    resource.resourceEvents.events.map( e => e.color = resource.themeColor );
    console.log('newEvents: ', resource.resourceEvents.events);
    $('.angular2-fullcalendar').fullCalendar('removeEvents');
    $('.angular2-fullcalendar').fullCalendar('addEventSource', resource.resourceEvents.events);
  }

  dayClick(date) {
    const addedEvent = {
      index: this.selectedResource.resourceEvents.events[this.selectedResource.resourceEvents.events.length - 1].index + 1,
      title: 'update title',
      start: moment(date).format('YYYY-MM-DD') + 'T' + moment(date).format('HH:mm:ss'),
      end: moment(date).add(0.5, 'hours').format('YYYY-MM-DD') + 'T' + moment(date).add(0.5, 'hours').format('HH:mm:ss') ,
      color: this.selectedResource.themeColor,
      week: moment(date).format('dddd').toString(),
      date: moment(date).format('MMMM DD, YYYY').toString(),
      duration: '0.5',
      users: [],
      location: '',
      description: '',
      repeat: '',
      alert: '',
      showAs: '',
    };
    addedEvent.title = 'Change Title';
    // Add new event to events list
    this.selectedResource.resourceEvents.events.push(addedEvent);
    const arr = [];
    Object.assign(arr, this.selectedResource.resourceEvents.events);
    this.selectedResource.resourceEvents.events = null;
    delete this.selectedResource.resourceEvents.events;
    this.selectedResource.resourceEvents.events = arr;
    // rerender events
    this.updateEvents();

    // add info on right sidebar
    // this.upcomingModalInfo = undefined;
    this.upcomingModalInfo = {
      'index': addedEvent.index,
      'title': addedEvent.title,
      'start': moment(date).format('hh:mm A'),
      'end': moment(date).add(0.5, 'hours').format('hh:mm A'),
      'week': moment(date).format('dddd'),
      'date': moment(date).format('MMMM DD, YYYY'),
      'duration': '0.5',
      color: this.selectedResource.themeColor,
      users: [],
      location: '',
      description: '',
      repeat: '',
      alert: '',
      showAs: ''
    };
    this.showSidebar = true;
    this.collaborationService.closeSidebarModal(this.showSidebar);
  }

  eventClick(calEvent) {
    let duration;
    if (calEvent.end) {
      duration = moment.duration(calEvent.end.diff(calEvent.start)).asHours().toString();
    } else {
      duration = undefined;
    }

    this.upcomingModalInfo = {
      'index': calEvent.index,
      'title': calEvent.title,
      'start': moment(calEvent.start).format('hh:mm A'),
      'end': moment(calEvent.end).format('hh:mm A'),
      'week': moment(calEvent.start).format('dddd'),
      'date': moment(calEvent.start).format('MMMM DD, YYYY'),
      'duration': duration,
      color: this.selectedResource.themeColor,
      users: calEvent.users,
      location: calEvent.location,
      description: calEvent.description,
      repeat: calEvent.repeat,
      alert: calEvent.alert,
      showAs: calEvent.showAs
    };
    this.showSidebar = true;
    this.collaborationService.closeSidebarModal(this.showSidebar);
  }
}
