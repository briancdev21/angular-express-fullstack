import { Component, Input, OnInit, HostListener, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MultiKeywordSelectComponent } from '../../../profile/multikeywordselect/multikeywordselect.component';
import { CompleterService, CompleterData } from 'ng2-completer';
import { SharedService } from '../../../../services/shared.service';
import { countries } from '../../../../../assets/json/countries';
import { provinces } from '../../../../../assets/json/provinces';

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
  keywords = [];
  supplierAssociation: any;
  businessType: any;
  tabActiveFirst = true;
  tabActiveSecond = false;

  invalidSupplierName = false;
  invalidContactName = false;
  invalidSupplierPhone = false;
  invalidContactPhone = false;
  invalidContactEmail = false;
  invalidPayableEmail = false;
  invalidPayablePhone = false;
  invalidAddress = false;
  invalidCity = false;
  invalidProvince = false;
  invalidCountry = false;
  invalidPostalCode = false;
  invalidDefaultTerm = false;
  invalidDefaultCurrency = false;
  wrongEmailFormat = false;

  supplierName = '';
  contactName: any;
  supplierPhone: any;
  contactEmail: any;
  contactPhone: any;
  accountNumber = '';
  defaultTerm: any;
  defaultCurrency: any;
  sourceValue = true;
  address = '';
  country = '';
  province = '';
  city = '';
  postalCode = '';
  selectTag = '';
  payableEmail: any;
  payablePhone: any;
  businessNumber: any;
  productNotes: any;
  contacts = [];
  contactId: number;
  customersList: CompleterData;
  selectName: any;
  selectedCountry: any;
  selectProvince: any;
  countriesSource: CompleterData;
  provincesSource: CompleterData;
  selectedProvince: any;
  keywordsIdList = [];
  website: any;
  shippingCost: any;
  invalidUrl = false;

  constructor(private completerService: CompleterService, private sharedService: SharedService) {
    this.dataService = completerService.local(this.searchData, 'color', 'color');
    this.countriesSource = completerService.local(countries, 'name', 'name');
    this.provincesSource = completerService.local(provinces, 'name', 'name');
    this.supplierAssociation = ['Danny Shibley', 'John Stephen'];
    this.sharedService.getContacts().subscribe(contacts => {
      contacts = this.addContactName(contacts);
      this.contacts = contacts;
      this.customersList = completerService.local(this.contacts, 'name', 'name');
    });
    this.sharedService.getTerms().subscribe(terms => {
      this.supplierTerm = terms.results;
      this.defaultTerm = terms.results[0].id;
    });
    this.sharedService.getCurrencies().subscribe(currencies => {
      this.supplierCurrencies = currencies.results;
      this.defaultCurrency = currencies.results[0].id;
    });
  }

  ngOnInit() {
  }

  onEnter() {
  }

  onSelectCustomer(event) {
    console.log('customer name:', event);
    this.contactName = event.originalObject.name;
  }

  clickNext() {
    this.invalidSupplierName = false;
    this.invalidContactName = false;
    this.invalidSupplierPhone = false;
    this.invalidContactEmail = false;
    this.invalidAddress = false;
    this.invalidCity = false;
    this.invalidProvince = false;
    this.invalidPostalCode = false;
    this.invalidCountry = false;
    this.invalidSupplierPhone = !this.phoneNumberValidation(this.supplierPhone);
    if (this.contactEmail) {
      this.wrongEmailFormat = !this.checkEmailValidation(this.contactEmail);
    }
    if (this.payableEmail) {
      this.invalidPayableEmail = !this.checkEmailValidation(this.payableEmail);
    }
    if (this.contactPhone) {
      this.invalidContactPhone = !this.phoneNumberValidation(this.contactPhone);
    }
    if (this.payablePhone) {
      this.invalidPayablePhone = !this.phoneNumberValidation(this.payablePhone);
    }

    if (this.supplierName && this.supplierPhone && this.address
        && this.country && this.province && this.city && this.province && !this.wrongEmailFormat &&
        !this.invalidPayableEmail && !this.invalidSupplierPhone && !this.invalidContactPhone && !this.invalidPayablePhone) {

      this.tabActiveFirst = false;
      this.tabActiveSecond = true;
    } else {
      if (!this.supplierName) {
        this.invalidSupplierName = true;
      }
      if (!this.supplierPhone) {
        this.invalidSupplierPhone = true;
      }
      if (!this.address) {
        this.invalidAddress = true;
      }
      if (!this.city) {
        this.invalidCity = true;
      }
      if (!this.province) {
        this.invalidProvince = true;
      }
      if (!this.country) {
        this.invalidCountry = true;
      }
      if (!this.province) {
        this.invalidPostalCode = true;
      }
    }
  }

  checkEmailValidation(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  phoneNumberValidation(number) {
    const re =  /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/;
    return re.test(number);
  }

  validateURL(textval) {
    const urlregex = /^(https):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return urlregex.test(textval);
  }

  onSelectCountry(event) {
    console.log('country select: ', event);
    this.selectedCountry = event.originalObject.code;
    const provincesSourceList = provinces.filter(p => p.country === this.selectedCountry);
    this.provincesSource = this.completerService.local(provincesSourceList, 'name', 'name');
  }

  onSelectProvince(event) {
    this.selectedProvince = event.originalObject.short;
    // const countriesSourceList =  countries.filter(c => c.code === this.selectedProvince);
    this.selectedCountry = event.originalObject.country;
    this.country = countries.filter(c => c.code === this.selectedCountry)[0].name;
  }

  getKeywords(event) {
    this.keywordsIdList = event.map(k => k.id);
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
        this.invalidProvince = false;
        this.invalidPostalCode = false;
        this.invalidCountry = false;
        this.invalidSupplierPhone = !this.phoneNumberValidation(this.supplierPhone);
        if (this.payableEmail) {
          this.invalidPayableEmail = !this.checkEmailValidation(this.payableEmail);
        }
        if (this.contactEmail) {
          this.wrongEmailFormat = !this.checkEmailValidation(this.contactEmail);
        }
        if (this.contactPhone) {
          this.invalidContactPhone = !this.phoneNumberValidation(this.contactPhone);
        }
        if (this.payablePhone) {
          this.invalidPayablePhone = !this.phoneNumberValidation(this.payablePhone);
        }

        if (this.supplierName && this.supplierPhone &&
            this.address && this.country && this.province && this.city && this.province && !this.wrongEmailFormat &&
            !this.invalidPayableEmail && !this.invalidSupplierPhone && !this.invalidContactPhone && !this.invalidPayablePhone) {
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
          if (!this.supplierPhone) {
            this.invalidSupplierPhone = true;
          }
          if (!this.address) {
            this.invalidAddress = true;
          }
          if (!this.city) {
            this.invalidCity = true;
          }
          if (!this.province) {
            this.invalidProvince = true;
          }
          if (!this.country) {
            this.invalidCountry = true;
          }
          if (!this.province) {
            this.invalidPostalCode = true;
          }
        }
        break;
      }
    }
  }
  clickSaveSupplier() {
    const newSupplier = {
      'termId': this.defaultTerm,
      'currencyId': this.defaultCurrency,
      'keywordIds': this.keywordsIdList,
      'name': this.supplierName,
      'phoneNumber': this.supplierPhone,
      'accountPayableEmail': this.payableEmail,
      'accountPayablePhoneNumber': this.payablePhone,
      'contactName': this.contactName,
      'contactEmail': this.contactEmail,
      'contactPhoneNumber': this.contactPhone,
      'accountNumber': this.accountNumber,
      'businessNumber': this.businessNumber,
      'shippingAddress': {
        'address': this.address,
        'city': this.city,
        'province': this.selectedProvince,
        'postalCode': this.postalCode,
        'country': this.selectedCountry
      },
      'website': this.website,
      'prepaidShippingCost': this.shippingCost,
      'note': this.productNotes
    };

    Object.keys(newSupplier).forEach((key) => (newSupplier[key] == null) && delete newSupplier[key]);

    if (this.website) {
      this.invalidUrl = !this.validateURL(this.website);
    }
    this.invalidDefaultTerm = false;
    this.invalidDefaultCurrency = false;
    if (this.defaultTerm && this.defaultCurrency && !this.invalidUrl) {
      this.addSupplierModalCollapsed = true;
      this.showAddSupplierModal = false;
      this.tabActiveFirst = true;
      this.tabActiveSecond = false;
      this.addToSuppliersList.emit(newSupplier);
    } else {
      if (!this.defaultCurrency) {
        this.invalidDefaultCurrency = true;
      }
      if (!this.defaultTerm) {
        this.invalidDefaultTerm = true;
      }
    }
  }

  contactNameChanged (event) {
    const contact = this.contacts.filter(contactItem => contactItem.id.toString() === event.target.value).pop();
    this.contactEmail = contact['email'];
    this.contactPhone = contact['phoneNumbers'].primary;
    this.contactId = event.target.value;
  }
  addContactName(data) {
    data.forEach(element => {
      if (element.type === 'PERSON') {
        element.name = element.person.firstName + ' ' + element.person.lastName;
      } else {
        element.name = element.business.name;
      }
    });
    return data;
  }
}
