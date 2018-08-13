import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Router, ROUTER_CONFIGURATION } from '@angular/router';
import { OrderService } from '../order.service';
import { Options } from 'fullcalendar';
import * as $ from 'jquery';
import 'fullcalendar';
import * as moment from 'moment';
import { SharedService } from '../../../../../services/shared.service';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: [
    './availability.component.css',
    '../../../../../../../node_modules/fullcalendar/dist/fullcalendar.min.css'
  ]
})
export class AvailabilityComponent implements OnInit, AfterViewInit {
  @Input() startDate;
  @Input() endDate;
  @Output() resouceSelected: EventEmitter<any> = new EventEmitter;
  searchableList: any;
  selectedData: any = [];
  public res: any;
  availableStaff = [];
  queryString: any;

  public resourcesInfo = [
    // {
    //   name: 'Sepehr Shoarinejad',
    //   imageUrl: 'assets/users/man.png',
    //   available: true,
    //   selected: false,
    //   resourceEvents: {
    //     height: 600,
    //     header: {
    //       left:  'prev,next today',
    //       center: 'title',
    //       right:  'month, agendaWeek, agendaDay'
    //     },
    //     defaultView: 'agendaWeek',
    //     events: [
    //       {
    //         title: 'All Day Event',
    //         start: '2018-04-20'
    //       }
    //     ]
    //   }
    // },
    // {
    //   name: 'Tyler Labonte',
    //   imageUrl: 'assets/users/user2.png',
    //   available: true,
    //   selected: false,
    //   resourceEvents: {
    //     height: 600,
    //     header: {
    //       left:  'prev,next today',
    //       center: 'title',
    //       right:  'month, agendaWeek, agendaDay'
    //     },
    //     defaultView: 'agendaWeek',
    //     events: [
    //       {
    //         title: 'Work Order',
    //         start: '2018-4-18',
    //         color: 'lightgray'
    //       }
    //     ]
    //   }
    // },
    // {
    //   name: 'Michael Yuen',
    //   imageUrl: 'assets/users/user3.png',
    //   available: true,
    //   selected: false,
    //   resourceEvents: {
    //     height: 500,
    //     header: {
    //       left:  'prev,next today',
    //       center: 'title',
    //       right:  'month, agendaWeek, agendaDay'
    //     },
    //     defaultView: 'agendaWeek',
    //     events: [
    //       {
    //         title: 'Work Order',
    //         start: '2018-4-17',
    //         end: '2018-4-17',
    //         color: 'lightgray'
    //       }
    //     ]
    //   }
    // },
    // {
    //   name: 'Huisman Contracting',
    //   imageUrl: 'assets/users/user1.png',
    //   available: true,
    //   selected: false,
    //   resourceEvents: {
    //     height: 500,
    //     header: {
    //       left:  'prev,next today',
    //       center: 'title',
    //       right:  'month, agendaWeek, agendaDay'
    //     },
    //     defaultView: 'agendaWeek',
    //     events: [
    //       {
    //         title: 'Long Event',
    //         start: '2018-4-06',
    //         end: '2018-4-09'
    //       }
    //     ]
    //   }
    // }
  ];

  usersList = [];

  constructor(private orderService: OrderService, private sharedService: SharedService) {
    this.selectedData = this.resourcesInfo || [];
    this.searchableList = ['name'];
    this.availableStaff = this.resourcesInfo.filter( s => s.selected === true); // updated from '== true'
    this.orderService.postAvailableStaff(this.availableStaff);
  }

  ngOnInit() {
    // this.resourcesInfo.map( r => r.available = this.checkAvailability(r));
    // default should be false
    this.resouceSelected.emit(false);

    console.log('start times: ', this.startDate);

    this.sharedService.getUsersByTime(this.startDate, this.endDate).subscribe(res => {
      this.usersList = res.results;
      console.log('users: ', res);
      for (let i = 0; i < this.usersList.length; i ++) {
        const resource = {
          username: this.usersList[i].username,
          name: this.usersList[i].firstName + ' ' + this.usersList[i].lastName,
          imageUrl: this.usersList[i].pictureURI,
          available: this.usersList[i].isAvailable,
          selected: false,
          resourceEvents: {
            height: 500,
            header: {
              left:  'prev,next today',
              center: 'title',
              right:  'month, agendaWeek, agendaDay'
            },
            defaultView: 'agendaWeek',
            events: []
          }
        };
        this.resourcesInfo.push(resource);
      }
      setTimeout( () => {
        this.res = this.resourcesInfo[0];
        $('#calendar').fullCalendar(this.res.resourceEvents);
        $('#calendar').fullCalendar('gotoDate', this.startDate);
      });
    });
  }

  ngAfterViewInit() {

  }

  addResource(index) {
    if (this.resourcesInfo[index].available) {
      this.resourcesInfo[index].selected = true;

      const addedStaff = {
        imageUrl: this.resourcesInfo[index].imageUrl,
        name: this.resourcesInfo[index].name
      };
      this.availableStaff.push(addedStaff);
      this.orderService.postAvailableStaff(this.availableStaff);
      const availableUsers = this.resourcesInfo.filter(r => r.selected === true).map(r => r.username);
      this.resouceSelected.emit(availableUsers);
    }
  }

  removeResource(index) {
    this.resourcesInfo[index].selected = false;
    const removedIndex = this.availableStaff.map(a => a.name).indexOf(this.resourcesInfo[index].name);
    this.availableStaff.splice(removedIndex, 1);
    this.orderService.postRemovedStaff(this.availableStaff);
    const checkSelected = this.resourcesInfo.every(element => element.selected === false);
    const availableUsers = this.resourcesInfo.filter(r => r.selected === true).map(r => r.username);
    this.resouceSelected.emit(availableUsers);
  }

  selectResource(resource) {
    this.res = resource;
    $('#calendar').fullCalendar('removeEvents');
    $('#calendar').fullCalendar('addEventSource', resource.resourceEvents);
  }

  // checkAvailability(resource) {
  //   const exactStartTime = moment(this.startDate).format('YYYY-MM-DD') + 'T' + moment(this.startTime).format('HH:mm:ss');
  //   const exactEndTime = moment(this.endDate).format('YYYY-MM-DD') + 'T' + moment(this.endTime).format('HH:mm:ss');
  //   let flag = true;
  //   resource.resourceEvents.events.forEach(event => {
  //     if ((event.start >= exactStartTime) && (event.start <= exactEndTime) ||
  //         (exactStartTime >= event.start) && (exactStartTime <= event.end)) {
  //       flag = false;
  //     }
  //   });
  //   return flag;
  // }
}
