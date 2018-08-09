import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CollaborationService } from '../collaboration.service';
import { PersonalUpcomingEventsComponent } from './personalupcomingevents/personalupcomingevents.component';
import * as moment from 'moment';
import * as _ from 'lodash';
import * as $ from 'jquery';
import 'fullcalendar';
import {Options} from 'fullcalendar';
import { CollaboratorsService } from '../../../services/collaborators.service';

@Component({
  selector: 'app-personalschedule',
  templateUrl: './personalschedule.component.html',
  styleUrls: [
    './personalschedule.component.css',
  ]
})
export class PersonalScheduleComponent implements OnInit, AfterViewInit {

  searchableList: any;
  selectedData: any = [];
  availableStaff = [];
  showSidebar = false;
  editing = false;
  changingColor = false;
  eventColors = ['#6eb1dd', '#ffac58', '#ff7e7e', '#4fa352', '#4d3eff'];
  themeColor = '#ffac58';
  public upcomingModalInfo = {};
  public resourcesInfo = [
    {
      name: 'Nu Automation',
      imageUrl: 'assets/users/man.png',
      available: true,
      selected: true,
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
          console.log('calevent: ', calEvent);
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
            color: this.themeColor,
            users: calEvent.users,
            location: calEvent.location,
            description: calEvent.description,
            repeat: calEvent.repeat,
            alert: calEvent.alert,
            showAs: calEvent.showAs
          };
          this.showSidebar = true;
          this.collaborationService.closeSidebarModal(this.showSidebar);
        },
        dayClick: (date, jsEvent, view) => {
          const addedEvent = {
            index: this.resourcesInfo[0].resourceEvents.events[this.resourcesInfo[0].resourceEvents.events.length - 1].index + 1,
            title: 'update title',
            start: moment(date).format('YYYY-MM-DD') + 'T' + moment(date).format('HH:mm:ss'),
            end: moment(date).add(0.5, 'hours').format('YYYY-MM-DD') + 'T' + moment(date).add(0.5, 'hours').format('HH:mm:ss') ,
            color: this.themeColor,
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
          this.resourcesInfo[0].resourceEvents.events.push(addedEvent);
          const arr = [];
          Object.assign(arr, this.resourcesInfo[0].resourceEvents.events);
          this.resourcesInfo[0].resourceEvents.events = null;
          delete this.resourcesInfo[0].resourceEvents.events;
          this.resourcesInfo[0].resourceEvents.events = arr;
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
            color: this.themeColor,
            users: [],
            location: '',
            description: '',
            repeat: '',
            alert: '',
            showAs: ''
          };
          this.showSidebar = true;
          this.collaborationService.closeSidebarModal(this.showSidebar);
        },
        events: [
          {
            index: 0,
            title: 'Repeating Event',
            start: '2018-04-09T06:00:00',
            end: '2018-04-09T08:00:00',
            color: ''
          }
        ]
      }
    }
  ];

  currentUser: any;
  currentCalendar: any;
  calendarEvents: any;

  constructor(private collaborationService: CollaborationService, private collaboratorsService: CollaboratorsService) {
    this.currentUser = 'koridor-dev';
    this.collaboratorsService.getCalendars().subscribe(res => {
      this.currentCalendar = res.results.filter(c => c.owner === this.currentUser)[0];
      this.collaboratorsService.getCalendarEvents(this.currentCalendar.id).subscribe(event => {
        this.calendarEvents = event.results;
        console.log('calender event: ', this.calendarEvents);
      });

      console.log('current calendar: ', this.currentCalendar);
    });
  }

  ngOnInit() {
    this.resourcesInfo[0].resourceEvents.events.map(e => e.color = this.themeColor);
    // console.log("100ms after ngAfterViewInit ");
    $('.angular2-fullcalendar').fullCalendar(this.resourcesInfo[0].resourceEvents);
  }

  ngAfterViewInit() {

  }

  editingTitle() {
    this.editing = true;
  }

  changeColor() {
    this.changingColor = true;
  }

  selectColor(color) {
    this.themeColor = color;
    this.resourcesInfo[0].resourceEvents.events.map(e => e.color = this.themeColor);
    const resInfo = {};
    this.editing = false;
    this.changingColor = false;
    this.updateEvents();
  }

  updateEvents() {
    // Remove all events and add updated events
    $('.angular2-fullcalendar').fullCalendar('removeEvents');
    $('.angular2-fullcalendar').fullCalendar('addEventSource', this.resourcesInfo[0].resourceEvents.events);
  }

  closeDetailedSidebar() {
    this.showSidebar = false;
    this.collaborationService.closeSidebarModal(this.showSidebar);
  }

  getUpdatedEvent(data) {
      const eventIndex = this.resourcesInfo[0].resourceEvents.events.map(obj => obj.index).indexOf(data.index);
      // this.resourcesInfo[0].resourceEvents.events[data.index] = data;
      const arr = [];
      _.forEach(this.resourcesInfo[0].resourceEvents.events, (event, index) => {
        if (index === eventIndex) {
          arr.push(data);
          return;
        }
        arr.push(event);
      });
      this.resourcesInfo[0].resourceEvents.events = null;
      delete this.resourcesInfo[0].resourceEvents.events;
      this.resourcesInfo[0].resourceEvents.events = arr;
      this.updateEvents();
  }
}
