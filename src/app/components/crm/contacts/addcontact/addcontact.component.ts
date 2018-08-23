import { Component, Input, OnInit, HostListener, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MultiKeywordSelectComponent } from '../../../profile/multikeywordselect/multikeywordselect.component';
import { CompleterService, CompleterData } from 'ng2-completer';
import { CrmService } from '../../../../services/crm.service';
import * as moment from 'moment';
import { SharedService } from '../../../../services/shared.service';
import { FilterService } from '../filter.service';
import { countries } from '../../../../../assets/json/countries';
import { provinces } from '../../../../../assets/json/provinces';
import * as countryList from 'country-list';

@Component({
  selector: 'app-addcontact',
  templateUrl: './addcontact.component.html',
  styleUrls: [
    './addcontact.component.css',
  ]
})


export class AddContactComponent implements OnInit {
  @ViewChild('tabsRef', {read: ElementRef}) tabsRef: ElementRef;
  @Input() contactsListInfo;
  @Input() contactOwners;
  @Input() contactStatus;
  @Output() addToContactsList: EventEmitter<any> = new EventEmitter;
  searchStr = '';
  captain = '';
  captainSource: string;
  dataService: CompleterData;
  countriesSource: CompleterData;
  provincesSource: CompleterData;
  billingCountriesSource: CompleterData;
  billingProvincesSource: CompleterData;
  searchData = [
    { color: 'red', value: '#f00' },
    { color: 'green', value: '#0f0' },
    { color: 'blue', value: '#00f' },
    { color: 'cyan', value: '#0ff' },
    { color: 'magenta', value: '#f0f' },
    { color: 'yellow', value: '#ff0' },
    { color: 'black', value: '#000' }
  ];
  captains = ['Head Contact', 'Accounts Receivable'];
  captainsSource = ['Contact referal'];

  invalidFirstname = false;
  invalidLastname = false;
  invalidBusinessName = false;
  invalidAccountType = false;
  invalidContactEmail = false;
  invalidDefaultTerm = false;
  invalidDefaultCurrency = false;
  invalidDefaultPricing = false;
  invalidPrimaryNumber = false;
  invalidAddress = false;
  invalidCity = false;
  invalidProvince = false;
  invalidCountry = false;
  invalidPostalCode = false;
  invalidPrimaryFormat = false;
  invalidSecondaryFormat = false;
  wrongEmailFormat = false;
  provinceNotIncluded = false;

  addContactModalCollapsed = true;
  showAddContactModal = false;
  switchIconShipping = true;
  address = '';
  city = '';
  province = '';
  postalCode = '';
  country: any;
  typeAccountTypeChange = false;
  keywords: any;
  contactAssociation: any;
  businessType = 'PERSON';
  tabActiveFirst = true;
  tabActiveSecond = false;
  firstName = '';
  lastName = '';
  businessName = '';
  defaultTerm: any;
  defaultCurrency: any;
  defaultPricing: any;
  primaryNumber = '';
  sourceValue = true;
  newEmail = '';
  newAddress = '';
  selectOwner = '';

  currencyList = [];
  keywordsIdList = [];
  headContact = '';
  jobTitle = '';
  email = '';
  notes = '';
  billingAddress = undefined;
  billingCity = undefined;
  billingProvince = undefined;
  billingCountry = undefined;
  billingPostalCode = undefined;
  secondaryNumber = '';
  termsList = [];
  pricingCategoriesList = [];
  contactsList: any;
  usersList = [];
  sourcesList = [];
  sourcesNameList = [];
  selectedSourceId: any;
  businessAssociation: any;
  selectedCountry: any;
  selectedProvince: any;
  billingSelectedCountry: any;
  billingSelectedProvince: any;
  countriesNameList = countries.map(c => c.name);
  provincesNameList = provinces.map(p => p.name);
  selectedProvincesNameList = [];
  contactsSource: CompleterData;
  businessAss: any;

  constructor(private completerService: CompleterService, private sharedService: SharedService, private crmService: CrmService
    , private filterService: FilterService ) {
    this.dataService = completerService.local(this.searchData, 'color', 'color');
    this.keywords = [];
    this.contactAssociation = ['Danny Shibley', 'John Stephen'];
    this.countriesSource = completerService.local(countries, 'name', 'name');
    this.provincesSource = completerService.local(provinces, 'name', 'name');

    this.sharedService.getCurrencies().subscribe(data => {
      this.currencyList = data.results;
      this.defaultCurrency = this.getDefaultCurrency();
    });

    this.sharedService.getTerms().subscribe(res => {
      this.termsList = res.results;
      this.defaultTerm = this.getDefaultTerm();
    });

    this.sharedService.getPricingCategories().subscribe (res => {
      this.pricingCategoriesList = res.results;
      this.defaultPricing = this.getDefaultPricing();
    });

    this.sharedService.getContacts().subscribe(res => {
      this.contactsList = res;
      this.addContactName(this.contactsList);
      this.sharedService.getUsers().subscribe(user => {
        this.usersList = user;
        this.usersList.forEach(element => {
          element.name = element.username;
        });
        this.contactsSource = this.completerService.local(this.contactsList.filter(c => c.type === 'BUSINESS'), 'name', 'name');
      });
    });

    this.sharedService.getUsers().subscribe(res => {
      this.usersList = res;
    });

    this.sharedService.getSources().subscribe(res => {
      this.sourcesList = res.results;
      this.sourcesNameList = res.results.map(n => n.source);
    });
  }

  ngOnInit() {

  }

  onAccountTypeChange(event) {
    this.resetInputValidationFlags();

    if (event === 'PERSON') {
      this.typeAccountTypeChange = false;
    } else if (event === 'BUSINESS') {
      this.typeAccountTypeChange = true;
    }
  }

  clickIconShipping() {
    this.switchIconShipping = !this.switchIconShipping;
  }

  onEnter() {
  }

  onSelectCustomer(event) {
    this.businessAssociation = event.originalObject.id;
  }

  checkSource(event) {
    if (this.captainSource === 'Contact referal') {
      this.sourceValue = false;
    } else {
      this.sourceValue = true;
    }
    const pos = this.sourcesNameList.indexOf(event.title);
    this.selectedSourceId = this.sourcesList[pos].id;
  }

  onSelectCountry(event) {
    if(!event) {
      return;
    }

    this.selectedCountry = event.originalObject.code;
    const provincesSourceList = provinces.filter(p => p.country === this.selectedCountry);
    this.provincesSource = this.completerService.local(provincesSourceList, 'name', 'name');
  }

  onSelectProvince(event) {
    if(!event) {
      return;
    }

    this.selectedProvince = event.originalObject.short;
    // const countriesSourceList =  countries.filter(c => c.code === this.selectedProvince);
    this.selectedCountry = event.originalObject.country;
    this.country = countries.filter(c => c.code === this.selectedCountry)[0].name;
  }

  onSelectBillingCountry(event) {
    if(!event) {
      return;
    }

    this.billingSelectedCountry = event.originalObject.code;
    const provincesSourceList = provinces.filter(p => p.country === this.billingSelectedCountry);
    this.provincesSource = this.completerService.local(provincesSourceList, 'name', 'name');
  }

  onSelectBillingProvince(event) {
    if(!event) {
      return;
    }

    this.billingSelectedProvince = event.originalObject.short;
    // const countriesSourceList =  countries.filter(c => c.code === this.selectedProvince);
    this.billingSelectedCountry = event.originalObject.country;
    this.billingCountry = countries.filter(c => c.code === this.selectedCountry)[0].name;
  }

  getKeywords(event) {
    this.keywordsIdList = event.map(k => k.id);
  }

  resetInputValidationFlags() {
    this.invalidFirstname = false;
    this.invalidLastname = false;
    this.invalidBusinessName = false;
    this.invalidAccountType = false;
    this.invalidPrimaryNumber = false;
    this.invalidContactEmail = false;
    this.invalidAddress = false;
    this.invalidCity = false;
    this.invalidProvince = false;
    this.invalidCountry = false;
    this.invalidPostalCode = false;
    this.wrongEmailFormat = false;
    this.invalidPrimaryFormat = false;
    this.invalidSecondaryFormat = false;
    this.provinceNotIncluded = false;
    this.invalidCountry = false;
    this.invalidProvince = false;
    this.invalidDefaultTerm = false;
    this.invalidDefaultCurrency = false;
    this.invalidDefaultPricing = false;
  }

  clickNext() {
    this.resetInputValidationFlags();

    if (!this.businessName) {
      this.invalidBusinessName = true;
    }
    if (!this.firstName) {
      this.invalidFirstname = true;
    }
    if (!this.lastName) {
      this.invalidLastname = true;
    }
    if (!this.primaryNumber) {
      this.invalidPrimaryNumber = true;
    }
    if (!this.email || this.wrongEmailFormat) {
      this.invalidContactEmail = true;
    }

    this.wrongEmailFormat = !this.checkEmailValidation(this.email);
    this.invalidPrimaryFormat = !this.phoneNumberValidation(this.primaryNumber);
    if (this.secondaryNumber) {
      this.invalidSecondaryFormat = !this.phoneNumberValidation(this.secondaryNumber);
    }

    this.validateAddress(this.address, this.city, this.province, this.country, this.postalCode);

    if (this.primaryNumber && this.email && !this.wrongEmailFormat && this.address &&
      !this.provinceNotIncluded && this.city && this.province && this.country && this.postalCode &&
      !this.invalidPrimaryFormat && !this.invalidSecondaryFormat) {
        if (this.businessType === 'PERSON' && this.firstName && this.lastName) {
          this.tabActiveFirst = false;
          this.tabActiveSecond = true;
        } else if (this.businessType === 'BUSINESS' && this.businessName) {
          this.tabActiveFirst = false;
          this.tabActiveSecond = true;
        }
    }

    // check the switch and make billing address same as shipping address
    if (this.switchIconShipping) {
      this.billingAddress = this.address;
      this.billingCity = this.city;
      this.billingProvince = this.province;
      this.billingCountry = this.country;
      this.billingSelectedProvince = this.selectedProvince;
      this.billingSelectedCountry = this.selectedCountry;
      this.billingPostalCode = this.postalCode;
    }
  }

  tabChange(event) {
    switch (event.tabTitle) {
      case 'BASIC INFORMATION': {
        this.tabActiveFirst = true;
        this.tabActiveSecond = false;
        break;
      }
      case 'ADVANCED INFORMATION': {
        this.clickNext();

        // TODO: weird async issues requires us to do this
        if (this.tabActiveFirst === true && this.tabActiveSecond === false) {
          this.tabActiveFirst = false;
          this.tabActiveSecond = true;
          setTimeout(() => {
            this.tabActiveFirst = true;
            this.tabActiveSecond = false;
          });
        }
        break;
      }
    }
  }

  close() {
    this.addContactModalCollapsed=true;
    this.showAddContactModal=false;
    this.tabActiveFirst=true;
    this.tabActiveSecond=false;

    this.reset();
  }

  checkEmailValidation(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  getContactNameFromId(id) {
    const selectedContact = this.contactsList.filter(c => c.id === id)[0];
    return selectedContact.name;
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

  phoneNumberValidation(number) {
    const re =  /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/;
    return re.test(number);
  }

  getDefaultCurrency() {
    return this.currencyList[0].id;
  }

  getDefaultTerm() {
    return this.termsList[0].id;
  }

  getDefaultPricing() {
    return this.pricingCategoriesList[0].id;
  }

  validateAddress(address, city, province, country, postalCode) {
    if (!address) {
      this.invalidAddress = true;
    }
    if (!city) {
      this.invalidCity = true;
    }
    if (!province) {
      this.invalidProvince = true;
    }
    if (!country) {
      this.invalidCountry = true;
    }
    if (!postalCode) {
      this.invalidPostalCode = true;
    }

    if (!this.countriesNameList.includes(country)) {
      this.provinceNotIncluded = true;
      this.invalidCountry = true;
    } else if (!this.provincesNameList.includes(province)) {
      this.provinceNotIncluded = true;
      this.invalidProvince = true;
    }
  }

  reset() {
    this.resetInputValidationFlags();

    this.address = '';
    this.city = '';
    this.province = '';
    this.postalCode = '';
    this.country = '';
    this.typeAccountTypeChange = false;
    this.keywords = [];
    this.contactAssociation = undefined;
    this.businessType = 'PERSON';
    this.tabActiveFirst = true;
    this.tabActiveSecond = false;
    this.firstName = '';
    this.lastName = '';
    this.businessName = '';
    this.defaultTerm = this.getDefaultTerm();
    this.defaultCurrency = this.getDefaultCurrency();
    this.defaultPricing = this.getDefaultPricing();
    this.primaryNumber = '';
    this.sourceValue = true;
    this.keywordsIdList = [];
    this.headContact = undefined;
    this.jobTitle = '';
    this.email = '';
    this.notes = '';
    this.billingAddress = undefined;
    this.billingCity = undefined;
    this.billingProvince = undefined;
    this.billingCountry = undefined;
    this.billingPostalCode =undefined;
    this.secondaryNumber = '';
    this.selectedSourceId = undefined;
    this.businessAssociation = undefined;
  }

  clickSaveContact() {
    this.resetInputValidationFlags();
    if (!this.switchIconShipping) {
      this.validateAddress(
        this.billingAddress,
        this.billingCity,
        this.billingProvince,
        this.billingCountry,
        this.billingPostalCode
      );
    }
    if (!this.invalidAddress && !this.invalidCity && !this.invalidProvince
      && !this.invalidCountry && !this.invalidPostalCode && !this.invalidCountry
      && !this.invalidProvince && !this.provinceNotIncluded) {
      const newContact: any = {};
      newContact.currencyId = this.defaultCurrency;
      newContact.termId = this.defaultTerm;
      newContact.sourceId = this.selectedSourceId ? this.selectedSourceId : undefined;
      newContact.pricingCategoryId = this.defaultPricing ? this.defaultPricing : undefined;
      newContact.keywordIds = this.keywordsIdList;
      newContact.owner;
      newContact.type = this.businessType;
      newContact.shippingAddress = {
        'address': this.address,
        'city': this.city,
        'province': this.selectedProvince,
        'postalCode': this.postalCode,
        'country': this.selectedCountry
      };

      if (!this.switchIconShipping) {
        newContact.billingAddress = {
          'address': this.billingAddress,
          'city': this.billingCity,
          'province': this.billingSelectedProvince,
          'postalCode': this.billingPostalCode,
          'country': this.billingSelectedCountry
        };
      }

      newContact.email = this.email;
      newContact.socialMediaUrl = {
        'linkedIn': undefined,
        'facebook': undefined,
        'twitter': undefined
      };
      newContact.phoneNumbers = {
        'primary': this.primaryNumber,
        'secondary': this.secondaryNumber,
      };
      newContact.timezone = moment().utcOffset() / 60;
      newContact.note = this.notes;

      if (this.businessType === 'PERSON') {
        newContact.person = {
          'firstName': this.firstName,
          'lastName': this.lastName,
          'jobTitle': this.jobTitle ? this.jobTitle : undefined,
          'department': this.captain ? this.captain : undefined,
          'businessAssociation': this.businessAssociation && this.businessAssociation.length !== 0
            ? this.businessAssociation
            : undefined
        };
      } else {
        newContact.business = {
          'name': this.businessName,
          'headContact': this.headContact ? this.headContact : undefined,
          'accountReceivable': '',
          'personAssociations': [
            ''
          ]
        };
      }

      this.crmService.createContact(JSON.stringify(newContact)).subscribe(data => {
        this.filterService.saveClicked.next(true);
      });
      this.reset();
      this.addContactModalCollapsed = true;
      this.showAddContactModal = false;
      this.tabActiveFirst = true;
      this.tabActiveSecond = false;
    }
  }
}
