import { Component, Input, OnInit, HostListener, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MultiKeywordSelectComponent } from '../../profile/multikeywordselect/multikeywordselect.component';
import { CompleterService, CompleterData } from 'ng2-completer';

@Component({
  selector: 'app-addsupplier',
  templateUrl: './addsupplier.component.html',
  styleUrls: [
    './addsupplier.component.css',
  ]
})


export class AddSupplierComponent implements OnInit {
  @ViewChild('tabsRef', {read: ElementRef}) tabsRef: ElementRef;
  @Input() suppliersListInfo;
  @Input() supplierTags;
  @Input() supplierTerm;
  @Input() supplierCurrencies;
  @Output() addToSuppliersList: EventEmitter<any> = new EventEmitter;
  protected searchStr: string;
  protected captain: string;
  protected captainSource: string;
  protected dataService: CompleterData;
  protected searchData = [
    { color: 'red', value: '#f00' },
    { color: 'green', value: '#0f0' },
    { color: 'blue', value: '#00f' },
    { color: 'cyan', value: '#0ff' },
    { color: 'magenta', value: '#f0f' },
    { color: 'yellow', value: '#ff0' },
    { color: 'black', value: '#000' }
  ];

  addSupplierModalCollapsed = true;
  showAddSupplierModal = false;
  switchIconShipping = true;
  typeAccountTypeChange = false;
  keywords: any;
  supplierAssociation: any;
  businessType: any;
  tabActiveFirst = true;
  tabActiveSecond = false;

  invalidSupplierName = false;
  invalidContactName = false;
  invalidSupplierPhone = false;
  invalidContactEmail = false;
  invalidAddress = false;
  invalidCity = false;
  invalidState = false;
  invalidCountry = false;
  invalidZipcode = false;
  invalidDefaultTerm = false;
  invalidAccountNumber = false;
  invalidDefaultCurrency = false;
  wrongEmailFormat = true;

  supplierName = '';
  contactName = '';
  supplierPhone = '';
  contactEmail = '';
  contactPhone = '';
  accountNumber = '';
  defaultTerm = '';
  defaultCurrency = '';
  sourceValue = true;
  newEmail = '';
  newAddress = '';
  newCountry = '';
  newState = '';
  newCity = '';
  newZipcode = '';
  selectTag = '';

  constructor(private completerService: CompleterService) {
    this.dataService = completerService.local(this.searchData, 'color', 'color');
    this.keywords = ['control4', 'theatre', 'renovation'];
    this.supplierAssociation = ['Danny Shibley', 'John Stephen'];
  }

  ngOnInit() {
  }

  onEnter() {
  }

  clickNext() {
    this.invalidSupplierName = false;
    this.invalidContactName = false;
    this.invalidSupplierPhone = false;
    this.invalidContactEmail = false;
    this.invalidAddress = false;
    this.invalidCity = false;
    this.invalidState = false;
    this.invalidZipcode = false;
    this.invalidCountry = false;
    this.wrongEmailFormat = this.checkEmailValidation(this.contactEmail);

    if (this.supplierName && this.contactName && this.supplierPhone && this.contactEmail && this.newAddress
        && this.newCountry && this.newState && this.newCity && this.newZipcode && this.wrongEmailFormat) {

      this.tabActiveFirst = false;
      this.tabActiveSecond = true;
    } else {
      if (!this.supplierName) {
        this.invalidSupplierName = true;
      }
      if (!this.contactName) {
        this.invalidContactName = true;
      }
      if (!this.supplierPhone) {
        this.invalidSupplierPhone = true;
      }
      if (!this.contactEmail) {
        this.invalidContactEmail = true;
      }
      if (!this.newAddress) {
        this.invalidAddress = true;
      }
      if (!this.newCity) {
        this.invalidCity = true;
      }
      if (!this.newState) {
        this.invalidState = true;
      }
      if (!this.newCountry) {
        this.invalidCountry = true;
      }
      if (!this.newZipcode) {
        this.invalidZipcode = true;
      }
      if (!this.wrongEmailFormat) {
        this.invalidContactEmail = true;
      }
    }
  }

  checkEmailValidation(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  tabChange(event) {
    switch (event.tabTitle) {
      case 'CONTACT DETAILS': {
        this.tabActiveFirst = true;
        this.tabActiveSecond = false;
        break;
      }
      case 'SUPPLIER DETAILS': {
        this.tabActiveFirst = false;
        this.tabActiveSecond = true;
        this.invalidSupplierName = false;
        this.invalidContactName = false;
        this.invalidSupplierPhone = false;
        this.invalidContactEmail = false;
        this.invalidAddress = false;
        this.invalidCity = false;
        this.invalidState = false;
        this.invalidZipcode = false;
        this.invalidCountry = false;
        this.wrongEmailFormat = this.checkEmailValidation(this.contactEmail);

        if (this.supplierName && this.contactName && this.supplierPhone && this.contactEmail &&
            this.newAddress && this.newCountry && this.newState && this.newCity && this.newZipcode && this.wrongEmailFormat) {
          this.tabActiveFirst = false;
          this.tabActiveSecond = true;
          break;
        } else {
          setTimeout(() => {
            this.tabActiveFirst = true;
            this.tabActiveSecond = false;
          });
          if (!this.supplierName) {
            this.invalidSupplierName = true;
          }
          if (!this.contactName) {
            this.invalidContactName = true;
          }
          if (!this.supplierPhone) {
            this.invalidSupplierPhone = true;
          }
          if (!this.contactEmail) {
            this.invalidContactEmail = true;
          }
          if (!this.newAddress) {
            this.invalidAddress = true;
          }
          if (!this.newCity) {
            this.invalidCity = true;
          }
          if (!this.newState) {
            this.invalidState = true;
          }
          if (!this.newCountry) {
            this.invalidCountry = true;
          }
          if (!this.newZipcode) {
            this.invalidZipcode = true;
          }
          if (!this.wrongEmailFormat) {
            this.invalidContactEmail = true;
          }
        }
        break;
      }
    }
  }
  clickSaveSupplier() {
    const newSupplier = {
      id: this.suppliersListInfo.length,
      supplierName: this.supplierName,
      contactName: this.contactName,
      supplierPhone: this.supplierPhone,
      supplierEmail: this.contactEmail,
      contactPhone: this.contactPhone,
      contactEmail: this.contactEmail,
      address: this.newAddress,
      term: this.defaultTerm,
      accountNumber: this.accountNumber,
      currency: this.defaultCurrency,
      country: this.newCountry,
      state: this.newState,
      tag: this.keywords,
    };

    this.invalidDefaultTerm = false;
    this.invalidDefaultCurrency = false;
    this.invalidAccountNumber = false;
    if (this.defaultTerm && this.defaultCurrency && this.accountNumber) {
      this.addSupplierModalCollapsed = true;
      this.showAddSupplierModal = false;
      this.tabActiveFirst = true;
      this.tabActiveSecond = false;
      this.addToSuppliersList.emit({data: newSupplier});
    } else {
      if (!this.defaultCurrency) {
        this.invalidDefaultCurrency = true;
      }
      if (!this.defaultTerm) {
        this.invalidDefaultTerm = true;
      }
      if (!this.accountNumber) {
        this.invalidAccountNumber = true;
      }
    }
  }
}
