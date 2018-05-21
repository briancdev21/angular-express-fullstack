import { Component, ChangeDetectorRef, Input, OnInit, HostListener, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { FilterService } from '../filter.service';


@Component({
  selector: 'app-leadfilter',
  templateUrl: './leadfilter.component.html',
  styleUrls: [
    './leadfilter.component.css',
  ],
  providers: [FilterService]
})


export class LeadFilterComponent implements OnInit {

  @Input() leadsListInfo;
  @Input() filters;
  @Input() leadOwners;
  @Input() leadStatus;
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
  filteredLeadsList: any;
  applyClicked = false;
  filteredLeads: any;
  backUpLeads: any;
  filterClicked = false;

  constructor( private filterService: FilterService, private ref: ChangeDetectorRef ) {
  }

  ngOnInit() {
    this.filteredLeads = this.leadsListInfo;
    this.backUpLeads = this.leadsListInfo;
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
    this.filters.scoreFrom = this.scoreFrom;
    this.filters.scoreTo = this.scoreTo;
    this.applyClicked = true;
    this.filteredLeads = this.backUpLeads;
    if (this.filters.location) {
      this.filteredLeads = this.filterTxt(this.leadsListInfo, this.filters.location);
    }

    this.filteredLeads = this.filteredLeads.filter(lead => lead.score >= this.filters.scoreFrom && lead.score <= this.filters.scoreTo);

    if (this.filters.selectStatus) {
      this.filteredLeads = this.filteredLeads.filter(lead => lead.status == this.filters.selectStatus);
    }

    if (this.filters.selectOwner) {
      this.filteredLeads = this.filteredLeads.filter(lead => lead.owner == this.filters.selectOwner);
    }

    if (this.filters.createdDateFrom) {
      this.filteredLeads = this.filteredLeads.filter(lead => Date.parse(lead.createDate) >= this.filters.createdDateFrom.valueOf());
    }

    if (this.filters.createdDateTo) {
      this.filteredLeads = this.filteredLeads.filter(lead => Date.parse(lead.createDate) <= this.filters.createdDateTo.valueOf());
    }

    if (this.filters.updatedDateFrom) {
      this.filteredLeads = this.filteredLeads.filter(lead => Date.parse(lead.createDate) >= this.filters.updatedDateFrom.valueOf());
    }

    if (this.filters.updatedDateTo) {
      this.filteredLeads = this.filteredLeads.filter(lead => Date.parse(lead.createDate) <= this.filters.updatedDateTo.valueOf());
    }

    this.filterParent.emit({filtered: this.filteredLeads, clicked: this.applyClicked});
  }

}
