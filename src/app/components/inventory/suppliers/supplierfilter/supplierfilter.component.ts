import { Component, ChangeDetectorRef, Input, OnInit, HostListener, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { FilterService } from '../filter.service';
import { Ng2CompleterComponent } from '../../../common/ng2completer/ng2completer.component';


@Component({
  selector: 'app-supplierfilter',
  templateUrl: './supplierfilter.component.html',
  styleUrls: [
    './supplierfilter.component.css',
  ],
  providers: [FilterService]
})


export class SupplierFilterComponent implements OnInit {

  @Input() suppliersListInfo;
  @Input() filters;
  @Input() supplierTags;
  @Input() supplierTerm;
  @Input() supplierCurrencies;
  @Input() allTags;
  @Output() filterParent: EventEmitter<any> = new EventEmitter;

  suppliersList = [];
  contactsList = [];
  config2: any = {'placeholder': 'Type here', 'sourceField': ''};

  public selectedMoment = new Date();
  public originFilters;
  public searchStr = 'asdasd';

  selectTag: string;
  accountNumber: string;
  selectTerm: string;
  filteredSuppliersList: any;
  applyClicked = false;
  filteredSuppliers: any;
  backUpSuppliers: any;
  editable: boolean;
  newKeyword: string;
  selectedItem: any = '';
  inputChanged: any = '';
  selectSupplier =  '';
  selectContact = '';
  filterClicked = false;

  constructor( private filterService: FilterService, private ref: ChangeDetectorRef ) {
    const comp = this;
    document.addEventListener('click', function() {
      comp.editable = false;
    });
  }

  ngOnInit() {
    this.filteredSuppliers = this.suppliersListInfo;
    this.backUpSuppliers = this.suppliersListInfo;
    this.originFilters = Object.assign({}, this.filters);

    // Get list and remove empty space
    this.suppliersList = this.suppliersListInfo.map(s => s.supplierName).filter(e => String(e).trim());
    this.contactsList = this.suppliersListInfo.map( s => s.contactName).filter(e => String(e).trim());
  }

  onSelect(item: any) {
    this.selectedItem = item;
    this.allTags = this.allTags.filter(function( obj ) {
      return obj !== item;
    });
    this.supplierTags.push(item);
  }

  onInputChangedEvent(val: string) {
    this.inputChanged = val;
  }

  removeUser(i: number) {
    const item = this.supplierTags[i];
    this.allTags.push(item);
    this.supplierTags.splice(i, 1);
  }

  filterTxt (arr, searchKey) {
    return arr.filter(function(obj){
      return Object.keys(obj).some(function(key) {
        return obj[key].toString().includes(searchKey);
      });
    });
  }

  onSelectedSupplier(val) {
    this.filters.selectSupplier = val;
    this.selectSupplier = val;
  }

  onSelectedContact(val) {
    this.filters.selectContact = val;
    this.selectContact = val;
  }

  resetFilter() {
    this.selectSupplier = '';
    this.selectContact = '';
    this.filters = {
      selectSupplier: '',
      selectContact: '',
      selectCurrency: '',
      accountNumber: '',
      selectTerm: '',
    };
    this.supplierTags = ['Control4'];
    this.ref.detectChanges();
  }

  applyFilter() {
    this.applyClicked = true;
    this.filteredSuppliers = this.backUpSuppliers;

    if (this.supplierTags[0]) {
      let tagFiltered = [];
      let tagFilteredList = [];
      for ( let i = 0; i <= this.supplierTags.length - 1; i ++) {
        tagFiltered = this.filterTxt(this.suppliersListInfo, this.supplierTags[i]);
        tagFilteredList = tagFilteredList.concat(tagFiltered);
      }
      this.filteredSuppliers = tagFilteredList;
    }

    if (this.filters.selectSupplier) {
      this.filteredSuppliers = this.filteredSuppliers.filter(supplier => supplier.supplierName === this.filters.selectSupplier);
    }

    if (this.filters.selectContact) {
      this.filteredSuppliers = this.filteredSuppliers.filter(supplier => supplier.contactName === this.filters.selectContact);
    }

    if (this.filters.accountNumber) {
      this.filteredSuppliers = this.filterTxt(this.suppliersListInfo, this.filters.accountNumber);
    }

    if (this.filters.selectTerm) {
      this.filteredSuppliers = this.filteredSuppliers.filter(supplier => supplier.term === this.filters.selectTerm);
    }

    if (this.filters.selectCurrency) {
      this.filteredSuppliers = this.filteredSuppliers.filter(supplier => supplier.currency === this.filters.selectCurrency);
    }

    // remove duplicates from array
    this.filteredSuppliers = Array.from(new Set(this.filteredSuppliers));

    this.filterParent.emit({filtered: this.filteredSuppliers, clicked: this.applyClicked});
  }
}
