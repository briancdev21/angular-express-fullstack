import { Component, ChangeDetectorRef, Input, OnInit, HostListener, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { FilterService } from '../filter.service';


@Component({
  selector: 'app-contactfilter',
  templateUrl: './contactfilter.component.html',
  styleUrls: [
    './contactfilter.component.css',
  ],
  providers: [FilterService]
})


export class ContactFilterComponent implements OnInit {

  @Input() contactsListInfo;
  @Input() filters;
  @Input() contactOwners;
  @Input() contactStatus;
  @Output() filterParent: EventEmitter<any> = new EventEmitter;

  public selectedMoment = new Date();
  public createdMin;
  public updatedMin;
  public createdMax;
  public updatedMax;
  public originFilters;
  scoreFrom = 28;
  scoreTo = 60;
  createdDateFrom: Date;
  createdDateTo: Date;
  updatedDateFrom: Date;
  updatedDateTo: Date;
  selectOwner: string;
  location: string;
  selectStatus: string;
  filteredContactsList: any;
  applyClicked = false;
  filteredContacts: any;
  backUpContacts: any;

  constructor( private filterService: FilterService, private ref: ChangeDetectorRef ) {
  }

  ngOnInit() {
    this.filteredContacts = this.contactsListInfo;
    this.backUpContacts = this.contactsListInfo;
    this.originFilters = Object.assign({}, this.filters);
    this.scoreFrom = this.filters.scoreFrom;
    this.scoreTo = this.filters.scoreTo;
  }

  rangeSliderChange(event) {
    this.scoreFrom = event.from;
    this.scoreTo = event.to;
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
        return obj[key].includes(searchKey);
      });
    });
  }

  resetFilter() {
    console.log('reset');
    this.scoreFrom = 0;
    this.scoreTo = 100;
    this.filters = {
      scoreFrom : 0,
      scoreTo : 100,
      createdDateFrom: '',
      createdDateTo: '',
      updatedDateFrom: '',
      updatedDateTo: '',
      selectOwner: '',
      location: '',
      selectStatus: '',
    };
    this.ref.detectChanges();
  }

  applyFilter() {
    console.log('filters:', this.filters);
    this.filters.scoreFrom = this.scoreFrom;
    this.filters.scoreTo = this.scoreTo;
    this.applyClicked = true;
    this.filteredContacts = this.backUpContacts;
    if (this.filters.location) {
      this.filteredContacts = this.filterTxt(this.contactsListInfo, this.filters.location);
    }

    this.filteredContacts = this.filteredContacts.filter(contact => contact.score >= this.filters.scoreFrom && contact.score <= this.filters.scoreTo);

    if (this.filters.selectStatus) {
      this.filteredContacts = this.filteredContacts.filter(contact => contact.status == this.filters.selectStatus);
    }

    if (this.filters.selectOwner) {
      this.filteredContacts = this.filteredContacts.filter(contact => contact.owner == this.filters.selectOwner);
    }

    if (this.filters.createdDateFrom) {
      this.filteredContacts = this.filteredContacts.filter(contact => Date.parse(contact.createDate) >= this.filters.createdDateFrom.valueOf());
    }

    if (this.filters.createdDateTo) {
      this.filteredContacts = this.filteredContacts.filter(contact => Date.parse(contact.createDate) <= this.filters.createdDateTo.valueOf());
    }

    if (this.filters.updatedDateFrom) {
      this.filteredContacts = this.filteredContacts.filter(contact => Date.parse(contact.createDate) >= this.filters.updatedDateFrom.valueOf());
    }

    if (this.filters.updatedDateTo) {
      this.filteredContacts = this.filteredContacts.filter(contact => Date.parse(contact.createDate) <= this.filters.updatedDateTo.valueOf());
    }

    this.filterParent.emit({filtered: this.filteredContacts, clicked: this.applyClicked});
  }

}
