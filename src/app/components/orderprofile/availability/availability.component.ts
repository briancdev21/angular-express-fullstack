import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../order.service'

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: [
    './availability.component.css',
    '../../../../../node_modules/fullcalendar/dist/fullcalendar.min.css'
  ]
})
export class AvailabilityComponent {
  searchableList: any;
  selectedData: any = [];
  public res: any;
  availableStaff = [];
  public resourcesInfo = [
    {
      name: 'Sepehr Shoarinejad',
      imageUrl: 'assets/users/man.png',
      available: true,
      selected: true,
      resourceEvents: {
        height: 600,
        header: {
          left:  'prev,next today',
          center: 'title',
          right:  'month, agendaWeek, agendaDay'
        },
        defaultView: 'agendaWeek',
        events: [
          {
            title: 'All Day Event',
            start: '2018-02-20'
          },
          {
            title: 'Long Event',
            start: '2018-2-19',
            end: '2018-2-20'
          },
          {
            title: 'Work Order',
            start: '2018-2-17',
            end: '2018-2-17',
            color: 'lightgray'
          },
          {
            id: 999,
            title: 'Repeating Event',
            start: '2018-02-19T16:00:00'
          },
          {
            id: 999,
            title: 'Repeating Event',
            start: '2018-02-19T16:00:00'
          },
          {
            title: 'Conference',
            start: '2018-02-19',
            end: '2018-09-13'
          },
          {
            title: 'Meeting',
            start: '2018-02-12T10:30:00',
            end: '2018-02-13T12:30:00'
          },
          {
            title: 'Lunch',
            start: '2018-02-19T12:00:00'
          },
          {
            title: 'Click for Google',
            url: 'http://google.com/',
            start: '2016-09-28'
          }
        ]
      }
    },
    {
      name: 'Tyler Labonte',
      imageUrl: 'assets/users/user2.png',
      available: true,
      selected: false,
      resourceEvents: {
        height: 600,
        header: {
          left:  'prev,next today',
          center: 'title',
          right:  'month, agendaWeek, agendaDay'
        },
        defaultView: 'agendaWeek',
        events: [
          {
            title: 'Work Order',
            start: '2018-2-18',
            color: 'lightgray'
          },
          {
            id: 995,
            title: 'Repeating Event',
            start: '2018-02-19T12:00:00'
          },
          {
            id: 995,
            title: 'Repeating Event',
            start: '2018-02-19T12:00:00'
          },
          {
            title: 'Conference',
            start: '2018-02-18',
            end: '2018-02-19'
          },
          {
            title: 'Meeting',
            start: '2018-02-12T10:30:00',
            end: '2018-02-13T12:30:00'
          },
          {
            title: 'Lunch',
            start: '2018-02-19T13:00:00'
          },
        ]
      }
    },
    {
      name: 'Michael Yuen',
      imageUrl: 'assets/users/user3.png',
      available: false,
      selected: false,
      resourceEvents: {
        height: 500,
        header: {
          left:  'prev,next today',
          center: 'title',
          right:  'month, agendaWeek, agendaDay'
        },
        defaultView: 'agendaWeek',
        events: [
          {
            title: 'Work Order',
            start: '2018-2-17',
            end: '2018-2-17',
            color: 'lightgray'
          },
          {
            id: 999,
            title: 'Repeating Event',
            start: '2018-02-19T19:00:00'
          },
          {
            id: 999,
            title: 'Repeating Event',
            start: '2018-02-19T19:00:00'
          },
          {
            title: 'Test',
            start: '2018-02-18',
            end: '2018-02-18'
          },
          {
            title: 'Meeting',
            start: '2018-02-16T10:30:00',
            end: '2018-02-17T12:30:00'
          },
          {
            title: 'Lunch',
            start: '2018-02-20T12:00:00'
          },
        ]
      }
    },
    {
      name: 'Huisman Contracting',
      imageUrl: 'assets/users/user1.png',
      available: true,
      selected: false,
      resourceEvents: {
        height: 500,
        header: {
          left:  'prev,next today',
          center: 'title',
          right:  'month, agendaWeek, agendaDay'
        },
        defaultView: 'agendaWeek',
        events: [
          {
            title: 'Long Event',
            start: '2018-2-16',
            end: '2018-2-19'
          },
          {
            title: 'Work Order',
            start: '2018-2-18',
            end: '2018-2-18',
            color: 'lightgray'
          },
          {
            id: 999,
            title: 'Repeating Event',
            start: '2018-02-19T16:00:00'
          },
          {
            id: 999,
            title: 'Repeating Event',
            start: '2018-02-19T16:00:00'
          },
          {
            title: 'Lunch',
            start: '2018-02-19T12:00:00'
          },
          {
            title: 'Click for Google',
            url: 'http://google.com/',
            start: '2017-02-21'
          }
        ]
      }
    }
  ];

  constructor(private orderService: OrderService) {
    this.selectedData = this.resourcesInfo || [];
    this.searchableList = ['name'];
    this.availableStaff = this.resourcesInfo.filter( s => s.selected == true);
    this.orderService.postAvailableStaff(this.availableStaff);
  }

  ngOnInit() {
    this.res = this.resourcesInfo[0];
    
  }

  addResource(index) {
    if (this.resourcesInfo[index].available) {
      this.resourcesInfo[index].selected = true;

      const addedStaff = {
        imageUrl: this.resourcesInfo[index].imageUrl,
        name: this.resourcesInfo[index].name
      }
      this.availableStaff.push(addedStaff);
      this.orderService.postAvailableStaff(this.availableStaff);
    }
  }

  removeResource(index) {
    this.resourcesInfo[index].selected = false;
    const removedIndex = this.availableStaff.map(a => a.name).indexOf(this.resourcesInfo[index].name);
    this.availableStaff.splice(removedIndex, 1);
    this.orderService.postRemovedStaff(this.availableStaff);
  }

  selectResource(resource) {
    this.res = resource;
  }
}
