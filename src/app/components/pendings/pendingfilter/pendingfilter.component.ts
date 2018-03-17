import { Component, ChangeDetectorRef, Input, OnInit, HostListener, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { FilterService } from '../filter.service';
import { Ng2CompleterComponent } from '../../common/ng2completer/ng2completer.component';


@Component({
  selector: 'app-pendingfilter',
  templateUrl: './pendingfilter.component.html',
  styleUrls: [
    './pendingfilter.component.css',
  ],
  providers: [FilterService]
})


export class PendingFilterComponent implements OnInit {

  @Input() pendingsListInfo;
  @Input() filters;
  @Input() pendingTags;
  @Input() pendingStatus;
  @Input() pendingTypes;
  @Output() filterParent: EventEmitter<any> = new EventEmitter;

  customersList = [];
  items2: any[] = [
    'Home', 'Controller', 'Adaptive', 'Dimmer', 'Keypad', 'TV', 'Samsung', 'Service'
  ];
  config2: any = {'placeholder': 'Type here', 'sourceField': ''};

  public selectedMoment = new Date();
  public createdMin;
  public updatedMin;
  public createdMax;
  public updatedMax;
  public lastMax;
  public lastMin;
  public originFilters;
  // scoreFrom = 28;
  // scoreTo = 60;
  createdDateFrom: Date;
  createdDateTo: Date;
  updatedDateFrom: Date;
  updatedDateTo: Date;
  selectTag: string;
  pendingName: string;
  selectStatus: string;
  filteredPendingsList: any;
  applyClicked = false;
  filteredPendings: any;
  backUpPendings: any;
  editable: boolean;
  newKeyword: string;
  selectedItem: any = '';
  inputChanged: any = '';
  selectCustomer =  '';
  maxPending = 0;
  maxPendingBalance = 0;
  maxOverdueDays = 0;
  pendingScoreFrom = 0;
  pendingScoreTo = 0;
  pendingBalanceScoreFrom = 0;
  pendingBalanceScoreTo = 0;
  overdueDaysFrom = 0;
  overdueDaysTo = 0;

  constructor( private filterService: FilterService, private ref: ChangeDetectorRef ) {
    const comp = this;
    document.addEventListener('click', function() {
      comp.editable = false;
    });
  }

  ngOnInit() {
    this.filteredPendings = this.pendingsListInfo;
    this.backUpPendings = this.pendingsListInfo;
    this.originFilters = Object.assign({}, this.filters);

    // Get customer list from Information list and remove duplicated names
    const a = this.pendingsListInfo.map(i => i.customerName);
    this.customersList = a.filter(function(item, pos) {
      return a.indexOf(item) === pos;
    });
    // Get pending max value in pending info list
    this.maxPending = Math.max(...this.pendingsListInfo.map(i => i.total));

    // Get balance max value in pending info list
    this.maxPendingBalance = Math.max(...this.pendingsListInfo.map(i => i.balance));

    // Get max duedate range in pending info list
    this.pendingsListInfo.map(i => i.overdueDays = this.calcOverDueDays(i.dueDate, i.status));
    this.maxOverdueDays = Math.max(...this.pendingsListInfo.map(i => i.overdueDays));

    this.pendingScoreFrom = this.filters.pendingScoreFrom;
    this.pendingScoreTo = this.filters.pendingScoreTo;

    this.pendingBalanceScoreFrom = this.filters.pendingBalanceScoreFrom;
    this.pendingBalanceScoreTo = this.filters.pendingBalanceScoreTo;

    this.overdueDaysFrom = this.filters.overdueDaysFrom;
    this.overdueDaysTo = this.filters.overdueDaysTo;
  }

  calcOverDueDays(due, status) {
    const today = new Date();
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const dueDate = new Date(due);
    const diffDays = Math.round(Math.abs((today.getTime() - dueDate.getTime()) / (oneDay)));
    if (status === 'Paid' || status === 'Estimate') {
      return 0;
    }
    if (diffDays < 0) {
      return 0;
    } else {
      return diffDays;
    }
  }

  pendingRangeSliderChange(event) {
    this.pendingScoreFrom = event.from;
    this.pendingScoreTo = event.to;
  }

  pendingBalanceRangeSliderChange(event) {
    this.pendingBalanceScoreFrom = event.from;
    this.pendingBalanceScoreTo = event.to;
  }

  overdueDaysRangeSliderChange(event) {
    this.overdueDaysFrom = event.from;
    this.overdueDaysTo = event.to;
  }

  onSelectedCustomer(val) {
    this.filters.selectCustomer = val;
    this.selectCustomer = val;
  }

  onSelect(item: any) {
    this.selectedItem = item;
    this.items2 = this.items2.filter(function( obj ) {
      return obj !== item;
    });
    this.pendingTags.push(item);
  }

  onInputChangedEvent(val: string) {
    this.inputChanged = val;
  }

  removeUser(i: number) {
    const item = this.pendingTags[i];
    this.items2.push(item);
    this.pendingTags.splice(i, 1);
  }

  selectCreatedFrom(event) {
    this.createdDateFrom = event.value;
    this.createdMin = this.createdDateFrom;
  }

  selectCreatedTo(event) {
    this.createdDateTo = event.value;
    this.createdMax = this.createdDateTo;
  }

  selectUpdatedFrom(event) {
    this.updatedDateFrom = event.value;
    this.updatedMin = this.updatedDateFrom;
  }

  selectUpdatedTo(event) {
    this.updatedDateTo = event.value;
    this.updatedMax = this.updatedDateTo;
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
    this.pendingScoreFrom = 0;
    this.pendingScoreTo = this.maxPending;
    this.pendingBalanceScoreFrom = 0;
    this.pendingBalanceScoreTo = this.maxPendingBalance;
    this.overdueDaysFrom = 0;
    this.overdueDaysTo = this.maxOverdueDays;

    this.filters = {
      pendingScoreFrom : 0,
      pendingScoreTo : this.maxPending,
      pendingBalanceScoreFrom : 0,
      pendingBalanceScoreTo : this.maxPendingBalance,
      overdueDaysFrom : 0,
      overdueDaysTo : this.maxOverdueDays,
      createdFrom: '',
      createdTo: '',
      updatedFrom: '',
      updatedTo: '',
      selectCustomer: '',
      pendingTags: '',
      pendingName: '',
      selectStatus: '',
    };
    this.ref.detectChanges();
  }

  applyFilter() {

    this.filters.pendingScoreFrom = this.pendingScoreFrom;
    this.filters.pendingScoreTo = this.pendingScoreTo;
    this.filters.pendingBalanceScoreFrom = this.pendingBalanceScoreFrom;
    this.filters.pendingBalanceScoreTo = this.pendingBalanceScoreTo;
    this.filters.overdueDaysFrom = this.overdueDaysFrom;
    this.filters.overdueDaysTo = this.overdueDaysTo;
    this.applyClicked = true;
    this.filteredPendings = this.backUpPendings;

    if (!this.pendingScoreFrom) { this.filters.pendingScoreFrom = 0; }
    if (!this.pendingScoreTo) { this.filters.pendingScoreTo = this.maxPending; }
    if (!this.pendingBalanceScoreFrom) { this.filters.pendingBalanceScoreFrom = 0; }
    if (!this.pendingBalanceScoreTo) { this.filters.pendingBalanceScoreTo = this.maxPendingBalance; }
    if (!this.overdueDaysFrom) { this.filters.overdueDaysFrom = 0; }
    if (!this.overdueDaysTo) { this.filters.overdueDaysTo = this.maxOverdueDays; }

    this.filteredPendings = this.filteredPendings.filter(pending =>
      pending.total >= this.filters.pendingScoreFrom && pending.total <= this.filters.pendingScoreTo);
    this.filteredPendings = this.filteredPendings.filter(pending =>
      pending.balance >= this.filters.pendingBalanceScoreFrom && pending.balance <= this.filters.pendingBalanceScoreTo);

    this.filteredPendings = this.filteredPendings.filter(pending =>
      pending.overdueDays >= this.filters.overdueDaysFrom && pending.overdueDays <= this.filters.overdueDaysTo);

    if (this.filters.selectCustomer) {
      this.filteredPendings = this.filteredPendings.filter(customer => customer.customerName === this.filters.selectCustomer);
    }
    if (this.filters.selectStatus) {
      this.filteredPendings = this.filteredPendings.filter(pending => pending.status === this.filters.selectStatus);
    }

    if (this.filters.createdFrom) {
      this.filteredPendings = this.filteredPendings.filter(
        pending => Date.parse(pending.createdDate) >= Number(this.filters.createdFrom)
      );
    }
    if (this.filters.createdTo) {
      this.filteredPendings = this.filteredPendings.filter(
        pending => Date.parse(pending.createdDate) <= Number(this.filters.createdTo)
      );
    }

    if (this.filters.updatedFrom) {
      this.filteredPendings = this.filteredPendings.filter(
        pending => Date.parse(pending.dueDate) >= Number(this.filters.updatedFrom)
      );
    }
    if (this.filters.updatedTo) {
      this.filteredPendings = this.filteredPendings.filter(
        pending => Date.parse(pending.dueDate) <= Number(this.filters.updatedTo)
      );
    }

    // remove duplicates from array
    this.filteredPendings = Array.from(new Set(this.filteredPendings));

    this.filterParent.emit({filtered: this.filteredPendings, clicked: this.applyClicked});
  }
}
