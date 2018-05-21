import { Component, ChangeDetectorRef, Input, OnInit, HostListener, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { FilterService } from '../filter.service';
import { Ng2CompleterComponent } from '../../../common/ng2completer/ng2completer.component';


@Component({
  selector: 'app-purchaseorderlistfilter',
  templateUrl: './purchaseorderlistfilter.component.html',
  styleUrls: [
    './purchaseorderlistfilter.component.css',
  ],
  providers: [FilterService]
})


export class PurchaseOrderListFilterComponent implements OnInit {

  @Input() purchaseOrdersInfo;
  @Input() filters;
  @Input() purchaseorderStatus;
  @Input() purchaseOrderTypes;
  @Output() filterParent: EventEmitter<any> = new EventEmitter;
  @ViewChild('autofocus')
  private elementRef: ElementRef;

  customersList = [];
  purchaseOrdersList = [];
  items2: any[] = [
    {id: 0, label: 'Partial Fulfilment'},
    {id: 1, label: 'Open'},
    {id: 2, label: 'Transfered'},
    {id: 3, label: 'Adjustment'},
    {id: 3, label: 'Fulfilled'},
    {id: 3, label: 'Partially Delivered'},
    {id: 3, label: 'Delivered'},
  ];
  config2: any = {'placeholder': 'No Result', 'sourceField': 'label'};

  public selectedMoment = new Date();
  public startedMin;
  public startedMax;
  public updatedMin;
  public updatedMax;
  public originFilters;
  startedDateFrom: Date;
  startedDateTo: Date;
  updatedDateFrom: Date;
  updatedDateTo: Date;
  filteredPurchaseOrders: any;
  applyClicked = false;
  backUpPurchaseOrders: any;
  newKeyword: string;
  selectedItem: any = '';
  inputChanged: any = '';
  selectCustomer =  '';
  selectOrder = '';
  maxTotal = 0;
  totalFrom = 0;
  totalTo = 0;
  editable = false;
  filterClicked: any;

  constructor( private filterService: FilterService, private ref: ChangeDetectorRef ) {
    const comp = this;
    document.addEventListener('click', function() {
      comp.editable = false;
    });
  }

  ngOnInit() {
    this.filteredPurchaseOrders = this.purchaseOrdersInfo;
    this.backUpPurchaseOrders = this.purchaseOrdersInfo;
    this.originFilters = Object.assign({}, this.filters);

    // Get work order list from Information list and remove empty and duplicates
    this.purchaseOrdersList = this.purchaseOrdersInfo.map( p => p.source);
    const m = this.purchaseOrdersList.filter(p => p !== '');
    this.purchaseOrdersList = m.filter(function(item, pos) {
      return m.indexOf(item) === pos;
    });
    // const a = this.pendingsListInfo.map(i => i.customerName);
    // this.customersList = a.filter(function(item, pos) {
    //   return a.indexOf(item) === pos;
    // });

    // Get total max value in projectsListInfo
    this.maxTotal = Math.max(...this.purchaseOrdersInfo.map(i => i.totalCost));

    this.totalFrom = this.filters.totalFrom ? this.filters.totalFrom : 0;
    this.totalTo = this.filters.totalTo ? this.filters.totalTo : this.maxTotal;
  }

  editStatus() {
    this.editable = true;
    setTimeout(() => this.elementRef.nativeElement.focus());
  }

  totalRangeSliderChange(event) {
    this.totalFrom = event.from;
    this.totalTo = event.to;
  }

  onSelectedOrder(val) {
    this.filters.selectOrder = val;
    this.selectOrder = val;
  }

  onSelect(item: any) {
    this.selectedItem = item;
    this.items2 = this.items2.filter(function( obj ) {
      return obj.label !== item.label;
    });
    this.purchaseorderStatus.push(item.label);
  }

  onInputChangedEvent(val: string) {
    this.inputChanged = val;
  }

  removeStatus(i: number) {
    const item = this.purchaseorderStatus[i];
    this.items2.push({id: this.items2.length, label: item.name, imageUrl: item.imageUrl});
    this.purchaseorderStatus.splice(i, 1);
  }

  selectStartedFrom(event) {
    this.startedDateFrom = event.value;
    this.startedMin = this.startedDateFrom;
  }

  selectStartedTo(event) {
    this.startedDateTo = event.value;
    this.startedMax = this.startedDateTo;
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
    this.selectOrder = '';
    this.totalFrom = 0;
    this.totalTo = this.maxTotal;

    this.filters = {
      totalFrom : 0,
      totalTo : this.maxTotal,
      startedFrom: '',
      startedTo: '',
      updatedFrom: '',
      updatedTo: '',
      selectOrder: '',
      purchaseorderStatus: [],
      type: ''
    };
    this.ref.detectChanges();
  }

  applyFilter() {

    this.filters.totalFrom = this.totalFrom;
    this.filters.totalTo = this.totalTo;
    this.applyClicked = true;
    this.filteredPurchaseOrders = this.backUpPurchaseOrders;
    if (this.purchaseorderStatus[0]) {
      const statusFiltered = [];
      let statusFilteredList = [];
      for (let j = 0; j <= this.filteredPurchaseOrders.length - 1; j ++) {
        for ( let i = 0; i <= this.purchaseorderStatus.length - 1; i ++) {
          if (this.filteredPurchaseOrders[j].status === this.purchaseorderStatus[i]) {
            statusFilteredList = statusFilteredList.concat(this.filteredPurchaseOrders[j]);
          }
        }
      }
      this.filteredPurchaseOrders = statusFilteredList;
    }
    if (!this.totalFrom) { this.filters.totalFrom = 0; }
    if (!this.totalTo) { this.filters.totalTo = this.maxTotal; }

    this.filteredPurchaseOrders = this.filteredPurchaseOrders.filter(purchaseorder =>
      purchaseorder.totalCost >= this.filters.totalFrom && purchaseorder.totalCost <= this.filters.totalTo);
    if (this.filters.selectOrder) {
      this.filteredPurchaseOrders = this.filteredPurchaseOrders.filter(
        project => project.source === this.filters.selectOrder
      );
    }
    if (this.filters.type) {
      this.filteredPurchaseOrders = this.filteredPurchaseOrders.filter(project => project.type === this.filters.type);
    }

    if (this.filters.startedFrom) {
      this.filteredPurchaseOrders = this.filteredPurchaseOrders.filter(
        purchaseorder => Date.parse(purchaseorder.dueDate) >= Number(this.filters.startedFrom)
      );
    }
    if (this.filters.startedTo) {
      this.filteredPurchaseOrders = this.filteredPurchaseOrders.filter(
        purchaseorder => Date.parse(purchaseorder.dueDate) <= Number(this.filters.startedTo)
      );
    }
    if (this.filters.updatedFrom) {
      this.filteredPurchaseOrders = this.filteredPurchaseOrders.filter(
        purchaseorder => Date.parse(purchaseorder.lastUpdated) >= Number(this.filters.updatedFrom)
      );
    }
    if (this.filters.updatedTo) {
      this.filteredPurchaseOrders = this.filteredPurchaseOrders.filter(
        purchaseorder => Date.parse(purchaseorder.lastUpdated) <= Number(this.filters.updatedTo)
      );
    }
    // remove duplicates from array
    this.filteredPurchaseOrders = Array.from(new Set(this.filteredPurchaseOrders));

    this.filterParent.emit({filtered: this.filteredPurchaseOrders, clicked: this.applyClicked});
  }
}
