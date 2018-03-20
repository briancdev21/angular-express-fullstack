import { Component, ChangeDetectorRef, Input, OnInit, HostListener, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { FilterService } from '../filter.service';
import { Ng2CompleterComponent } from '../../common/ng2completer/ng2completer.component';


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
  projectsList = [];
  items2: any[] = [
    {id: 0, payload: {label: 'Michael', imageUrl: 'assets/users/user1.png'}},
    {id: 1, payload: {label: 'Joseph', imageUrl: 'assets/users/user2.png'}},
    {id: 2, payload: {label: 'Danny', imageUrl: 'assets/users/user3.png'}},
    {id: 3, payload: {label: 'John', imageUrl: 'assets/users/man.png'}},
  ];
  config2: any = {'placeholder': 'Type here', 'sourceField': ['payload', 'label']};

  public selectedMoment = new Date();
  public createdMin;
  public createdMax;
  public originFilters;
  createdDateFrom: Date;
  createdDateTo: Date;
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
  maxOverdueDays = 120;
  overdueDaysFrom = 0;
  overdueDaysTo = 120;

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
    // Get projects list from Information list
    this. projectsList = this.workOrdersInfo.map( p => p.projectNumber);

    this.overdueDaysFrom = this.filters.overdueDaysFrom ? this.filters.overdueDaysFrom : 0;
    this.overdueDaysTo = this.filters.overdueDaysTo ? this.filters.overdueDaysTo : 120;
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

  overdueDaysRangeSliderChange(event) {
    this.overdueDaysFrom = event.from;
    this.overdueDaysTo = event.to;
  }

  onSelectedCustomer(val) {
    this.filters.selectCustomer = val;
    this.selectCustomer = val;
  }

  onSelectedProject(val) {
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

  selectCreatedFrom(event) {
    this.createdDateFrom = event.value;
    this.createdMin = this.createdDateFrom;
  }

  selectCreatedTo(event) {
    this.createdDateTo = event.value;
    this.createdMax = this.createdDateTo;
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
    this.overdueDaysFrom = 0;
    this.overdueDaysTo = this.maxOverdueDays;

    this.filters = {
      overdueDaysFrom : 0,
      overdueDaysTo : this.maxOverdueDays,
      createdFrom: '',
      createdTo: '',
      selectCustomer: '',
      selectProject: '',
      collaborators: '',
      workorderName: '',
      totalFrom: 0,
      totalTo: 0,
      estimatedFrom: 0,
      estimatedTo: 0,
    };
    this.ref.detectChanges();
  }

  applyFilter() {

    this.filters.overdueDaysFrom = this.overdueDaysFrom;
    this.filters.overdueDaysTo = this.overdueDaysTo;
    this.applyClicked = true;
    this.filteredWorkOrders = this.backUpWorkOrders;

    if (!this.overdueDaysFrom) { this.filters.overdueDaysFrom = 0; }
    if (!this.overdueDaysTo) { this.filters.overdueDaysTo = this.maxOverdueDays; }

    if (this.filters.totalFrom) {
      this.filteredWorkOrders = this.filteredWorkOrders.filter(workorder => workorder.projectTotal >= this.filters.totalFrom);
    }

    if (this.filters.totalTo) {
      this.filteredWorkOrders = this.filteredWorkOrders.filter(workorder => workorder.projectTotal <= this.filters.totalTo);
    }

    if (this.filters.estimatedFrom) {
      this.filteredWorkOrders = this.filteredWorkOrders.filter(workorder => workorder.estimatedBudget >= this.filters.estimatedFrom);
    }

    if (this.filters.estimatedTo) {
      this.filteredWorkOrders = this.filteredWorkOrders.filter(workorder => workorder.estimatedBudget <= this.filters.estimatedTo);
    }

    // if user does not set maximum overdue days, max value should be infinite
    if (this.filters.overdueDaysTo < 120) {
      this.filteredWorkOrders = this.filteredWorkOrders.filter(workorder =>
        workorder.timePassed >= this.filters.overdueDaysFrom && workorder.timePassed <= this.filters.overdueDaysTo);
    } else if (this.filters.overdueDaysTo === 120) {
      this.filteredWorkOrders = this.filteredWorkOrders.filter(workorder =>
        workorder.timePassed >= this.filters.overdueDaysFrom);
    }
    if (this.filters.selectCustomer) {
      this.filteredWorkOrders = this.filteredWorkOrders.filter(customer => customer.customerName === this.filters.selectCustomer);
    }
    if (this.filters.selectProject) {
      this.filteredWorkOrders = this.filteredWorkOrders.filter(project => project.projectNumber === this.filters.selectProject);
    }

    if (this.filters.createdFrom) {
      this.filteredWorkOrders = this.filteredWorkOrders.filter(
        workorder => Date.parse(workorder.createdDate) >= Number(this.filters.createdFrom)
      );
    }
    if (this.filters.createdTo) {
      this.filteredWorkOrders = this.filteredWorkOrders.filter(
        workorder => Date.parse(workorder.createdDate) <= Number(this.filters.createdTo)
      );
    }
    // remove duplicates from array
    this.filteredWorkOrders = Array.from(new Set(this.filteredWorkOrders));

    this.filterParent.emit({filtered: this.filteredWorkOrders, clicked: this.applyClicked});
  }
}
