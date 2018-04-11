import { Component, ChangeDetectorRef, Input, OnInit, HostListener, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { FilterService } from '../filter.service';
import { Ng2CompleterComponent } from '../../../common/ng2completer/ng2completer.component';


@Component({
  selector: 'app-workorderfilter',
  templateUrl: './workorderfilter.component.html',
  styleUrls: [
    './workorderfilter.component.css',
  ],
  providers: [FilterService]
})


export class WorkOrderFilterComponent implements OnInit {

  @Input() workOrdersInfo;
  @Input() filters;
  @Input() collaborators;
  @Input() workorderStatus;
  @Input() workorderTypes;
  @Output() filterParent: EventEmitter<any> = new EventEmitter;

  customersList = [];
  workOrdersList = [];
  items2: any[] = [
    {id: 0, payload: {label: 'John Moss', imageUrl: 'assets/users/user1.png'}},
    {id: 1, payload: {label: 'Michael', imageUrl: 'assets/users/user2.png'}},
    {id: 2, payload: {label: 'Agile Smith', imageUrl: 'assets/users/user3.png'}},
    {id: 3, payload: {label: 'Joseph', imageUrl: 'assets/users/man.png'}},
  ];
  config2: any = {'placeholder': 'Type here', 'sourceField': ['payload', 'label']};

  public selectedMoment = new Date();
  public startedMin;
  public startedMax;
  public originFilters;
  startedDateFrom: Date;
  startedDateTo: Date;
  workorderName: string;
  filteredWorkOrders: any;
  applyClicked = false;
  backUpWorkOrders: any;
  editable: boolean;
  newKeyword: string;
  selectedItem: any = '';
  inputChanged: any = '';
  selectCustomer =  '';
  selectProject = '';
  maxCompletion = 120;
  completionFrom = 0;
  completionTo = 120;
  selectStatus: string;

  constructor( private filterService: FilterService, private ref: ChangeDetectorRef ) {
    const comp = this;
    document.addEventListener('click', function() {
      comp.editable = false;
    });
  }

  ngOnInit() {
    this.filteredWorkOrders = this.workOrdersInfo;
    this.backUpWorkOrders = this.workOrdersInfo;
    this.originFilters = Object.assign({}, this.filters);

    // Get customer list from Information list and remove duplicated names
    const a = this.workOrdersInfo.map(i => i.customerName);
    this.customersList = a.filter(function(item, pos) {
      return a.indexOf(item) === pos;
    });

    this.workOrdersInfo.map(i => i.timePassed = this.calcTimePassedDays(i.signedDate, i.status));
    // Get work order list from Information list
    this. workOrdersList = this.workOrdersInfo.map( p => p.workOrderNumber);

    this.completionFrom = this.filters.completionFrom ? this.filters.completionFrom : 0;
    this.completionTo = this.filters.completionTo ? this.filters.completionTo : 120;
  }

  calcTimePassedDays(sign, status) {
    const today = new Date();
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const signDate = new Date(sign);
    const diffDays = Math.round((today.getTime() - signDate.getTime()) / (oneDay));
    if (diffDays < 0) {
      return 0;
    } else {
      return diffDays;
    }
  }

  completionRangeSliderChange(event) {
    this.completionFrom = event.from;
    this.completionTo = event.to;
  }

  onSelectedCustomer(val) {
    this.filters.selectCustomer = val;
    this.selectCustomer = val;
  }

  onSelectedOrder(val) {
    this.filters.selectProject = val;
    this.selectProject = val;
  }

  onSelect(item: any) {
    this.selectedItem = item;
    this.items2 = this.items2.filter(function( obj ) {
      return obj.payload.label !== item.payload.label;
    });
    this.collaborators.push({name: item.payload.label, imageUrl: item.payload.imageUrl});
  }

  onInputChangedEvent(val: string) {
    this.inputChanged = val;
  }

  removeUser(i: number) {
    const item = this.collaborators[i];
    this.items2.push({id: this.items2.length, payload: {label: item.name, imageUrl: item.imageUrl}});
    this.collaborators.splice(i, 1);
  }

  selectStartedFrom(event) {
    this.startedDateFrom = event.value;
    this.startedMin = this.startedDateFrom;
  }

  selectStartedTo(event) {
    this.startedDateTo = event.value;
    this.startedMax = this.startedDateTo;
  }

  filterTxt (arr, searchKey) {
    return arr.filter(function(obj){
      return Object.keys(obj).some(function(key) {
        return obj[key].toString().includes(searchKey);
      });
    });
  }

  resetFilter() {
    this.selectCustomer = '';
    this.selectProject = '';
    this.completionFrom = 0;
    this.completionTo = 100;

    this.filters = {
      completionFrom : 0,
      completionTo : 100,
      startedFrom: '',
      startedTo: '',
      selectCustomer: '',
      selectProject: '',
      collaborators: '',
      workorderName: '',
      startTimeFrom: 0,
      startTimeTo: 0,
      selectStatus: ''
    };
    this.ref.detectChanges();
  }

  applyFilter() {

    this.filters.completionFrom = this.completionFrom;
    this.filters.completionTo = this.completionTo;
    this.applyClicked = true;
    this.filteredWorkOrders = this.backUpWorkOrders;

    if (this.collaborators[0]) {
      let collaboratorFiltered = [];
      let collaboratorFilteredList = [];
      this.filteredWorkOrders.forEach(element => {
        for ( let i = 0; i <= this.collaborators.length - 1; i ++) {
          collaboratorFiltered = this.filterTxt(element.collaborators, this.collaborators[i].name);
          if (collaboratorFiltered.length > 0) {
            collaboratorFilteredList = collaboratorFilteredList.concat(element);
          }
        }
      });
      this.filteredWorkOrders = collaboratorFilteredList;
    }
    if (!this.completionFrom) { this.filters.completionFrom = 0; }
    if (!this.completionTo) { this.filters.completionTo = 100; }
    if (this.filters.startTimeFrom) {
      this.filteredWorkOrders = this.filteredWorkOrders.filter(
        workorder => this.compareStartTime(workorder.scheduledStart, this.filters.startTimeFrom)
      );
    }
    if (this.filters.startTimeTo) {
      this.filteredWorkOrders = this.filteredWorkOrders.filter(
        workorder => this.compareEndTime(workorder.scheduledEnd, this.filters.startTimeTo)
      );
    }

    this.filteredWorkOrders = this.filteredWorkOrders.filter(workorder =>
      workorder.completion >= this.filters.completionFrom && workorder.completion <= this.filters.completionTo);
    if (this.filters.selectCustomer) {
      this.filteredWorkOrders = this.filteredWorkOrders.filter(customer => customer.customerName === this.filters.selectCustomer);
    }

    if (this.filters.selectProject) {
      this.filteredWorkOrders = this.filteredWorkOrders.filter(project => project.workOrderNumber === this.filters.selectProject);
    }

    if (this.filters.selectStatus) {
      this.filteredWorkOrders = this.filteredWorkOrders.filter(project => project.status === this.filters.selectStatus);
    }

    if (this.filters.startedFrom) {
      this.filteredWorkOrders = this.filteredWorkOrders.filter(
        workorder => Date.parse(workorder.startDate) >= Number(this.filters.startedFrom)
      );
    }
    if (this.filters.startedTo) {
      this.filteredWorkOrders = this.filteredWorkOrders.filter(
        workorder => Date.parse(workorder.startDate) <= Number(this.filters.startedTo)
      );
    }
    // remove duplicates from array
    this.filteredWorkOrders = Array.from(new Set(this.filteredWorkOrders));

    this.filterParent.emit({filtered: this.filteredWorkOrders, clicked: this.applyClicked});
  }

  compareStartTime (time1, time2) {
    let midHour1 = Number(time1.split(':')[0]);
    const midHour2 = Number(time2.split(':')[0]);
    if (time1.split(':')[1].split(' ')[1] === 'PM') {
      midHour1 = 12 + midHour1;
    }
    const midMin1 = Number(time1.split(':')[1].slice(0, -2));
    const midMin2 = Number(time2.split(':')[1]);
    if (midHour2 > midHour1) {
      return false;
    } else if (midHour1 === midHour2) {
      if (midMin2 > midMin1) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  compareEndTime (time1, time2) {
    let midHour1 = Number(time1.split(':')[0]);
    const midHour2 = Number(time2.split(':')[0]);
    if (time1.split(':')[1].split(' ')[1] === 'PM') {
      midHour1 = 12 + midHour1;
    }
    const midMin1 = Number(time1.split(':')[1].slice(0, -2));
    const midMin2 = Number(time2.split(':')[1]);
    if (midHour2 > midHour1) {
      return true;
    } else if (midHour1 === midHour2) {
      if (midMin2 >= midMin1) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
