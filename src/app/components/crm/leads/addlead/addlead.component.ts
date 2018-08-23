import { Component, Input, OnInit, HostListener, ViewChild, ElementRef, } from '@angular/core';
import { Router } from '@angular/router';
import { MultiKeywordSelectComponent } from '../../../profile/multikeywordselect/multikeywordselect.component';
import { CompleterService, CompleterData } from 'ng2-completer';
import { SharedService } from '../../../../services/shared.service';
import { CrmService } from '../../../../services/crm.service';
import * as moment from 'moment';
import { LeadModel } from '../../../../models/lead.model';
import { FilterService } from '../filter.service';
import * as countryList from 'country-list';
import { countries } from '../../../../../assets/json/countries';
import { provinces } from '../../../../../assets/json/provinces';
@Component({
  selector: 'app-addlead',
  templateUrl: './addlead.component.html',
  styleUrls: [
    './addlead.component.css',
  ]
})


export class AddLeadComponent implements OnInit {
  @ViewChild('tabsRef', {read: ElementRef}) tabsRef: ElementRef;
  @Input() leadsListInfo;
  @Input() leadOwners;
  @Input() leadStatus;
  searchStr: string;
  captain: string;
  captainSource: string;
  dataService: CompleterData;
  countriesSource: CompleterData;
  provincesSource: CompleterData;
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

  addLeadModalCollapsed = true;
  showAddLeadModal = false;
  switchIconShipping = true;
  address = '';
  city = '';
  province = '';
  postalCode = '';
  country = '';
  typeAccountTypeChange = false;
  keywords: any;
  contactAssociation: any;
  businessType = 'PERSON';
  tabActiveFirst = true;
  tabActiveSecond = false;
  invalidFirstname = false;
  invalidLastname = false;
  invalidBusinessName = false;
  invalidAccountType = false;
  invalidAddress = false;
  invalidCity = false;
  invalidProvince = false;
  invalidCountry = false;
  invalidPostalCode = false;
  firstName = '';
  lastName = '';
  businessName = '';
  defaultTerm = '';
  defaultCurrency = '';
  defaultPricing = '';
  primaryNumber = '';
  invalidDefaultTerm = false;
  invalidDefaultCurrency = false;
  invalidDefaultPricing = false;
  invalidPrimaryNumber = false;
  sourceValue = true;
  currencyList = [];
  keywordsIdList = [];
  headContact: any;
  jobTitle = '';
  email = '';
  notes = '';
  billingAddress = '';
  billingCity = '';
  billingProvince = '';
  billingCountry = '';
  billingPostalCode = '';
  secondaryNumber = '';
  termsList = [];
  pricingCategoriesList = [];
  contactsList = [];
  usersList = [];
  sourcesList = [];
  sourcesNameList = [];
  selectedSourceId: any;
  businessAssociation: any;
  newLead: any;
  invalidContactEmail = false;
  wrongEmailFormat = false;
  selectedCountry: any;
  selectedProvince: any;
  billingSelectedCountry: any;
  billingSelectedProvince: any;
  invalidPrimaryFormat = false;
  invalidSecondaryFormat = false;
  countriesNameList = countries.map(c => c.name);
  provincesNameList = provinces.map(p => p.name);
  provinceNotIncluded = false;
  selectedProvincesNameList = [];
  contactsSource: CompleterData;
  businessAss: any;

  constructor(private completerService: CompleterService, private sharedService: SharedService, private crmService: CrmService,
    private filterService: FilterService ) {
    this.dataService = completerService.local(this.searchData, 'color', 'color');
    this.countriesSource = completerService.local(countries, 'name', 'name');
    this.provincesSource = completerService.local(provinces, 'name', 'name');
    this.keywords = [];
    this.contactAssociation = ['Danny Shibley', 'John Stephen'];
    // this.countriesList = countries;
  }

  ngOnInit() {
    this.sharedService.getCurrencies().subscribe(data => {
      this.currencyList = data.results;
      this.defaultCurrency = data.results[0].id;
    });

    this.sharedService.getTerms().subscribe(res => {
      this.termsList = res.results;
      this.defaultTerm = res.results[0].id;
    });

    this.sharedService.getPricingCategories().subscribe (res => {
      this.pricingCategoriesList = res.results;
      this.defaultPricing = res.results[0].id;
    });

    this.sharedService.getContacts().subscribe(res => {
      this.contactsList = res;
      this.addContactName(this.contactsList);

      this.sharedService.getUsers().subscribe(user => {
        this.usersList = user;
        this.usersList.forEach(element => {
          element.name = element.username;
        });
        this.contactsSource = this.completerService.local(this.contactsList, 'name', 'name');
      });
    });


    this.sharedService.getSources().subscribe(res => {
      this.sourcesList = res.results;
      this.sourcesNameList = res.results.map(n => n.source);
    });

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
    this.addLeadModalCollapsed=true;
    this.showAddLeadModal=false;
    this.tabActiveFirst=true;
    this.tabActiveSecond=false;

    this.reset();
  }

  checkEmailValidation(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
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

  clickSave() {
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
      const newLead: any = {};
      newLead.currencyId = this.defaultCurrency;
      newLead.termId = this.defaultTerm;
      newLead.sourceId = this.selectedSourceId ? this.selectedSourceId : undefined;
      newLead.pricingCategoryId = this.defaultPricing ? this.defaultPricing : undefined;
      newLead.keywordIds = this.keywordsIdList;
      newLead.owner;
      newLead.type = this.businessType;
      newLead.shippingAddress = {
        'address': this.address,
        'city': this.city,
        'province': this.selectedProvince,
        'postalCode': this.postalCode,
        'country': this.selectedCountry
      };

      if (!this.switchIconShipping) {
        newLead.billingAddress = {
          'address': this.billingAddress,
          'city': this.billingCity,
          'province': this.billingSelectedProvince,
          'postalCode': this.billingPostalCode,
          'country': this.billingSelectedCountry
        };
      }

      newLead.email = this.email;
      newLead.socialMediaUrl = {
        'linkedIn': undefined,
        'facebook': undefined,
        'twitter': undefined
      };
      newLead.phoneNumbers = {
        'primary': this.primaryNumber,
        'secondary': this.secondaryNumber,
      };
      newLead.timezone = moment().utcOffset() / 60;
      newLead.note = this.notes;

      if (this.businessType === 'PERSON') {
        newLead.person = {
          'firstName': this.firstName,
          'lastName': this.lastName,
          'jobTitle': this.jobTitle ? this.jobTitle : undefined,
          'department': this.captain ? this.captain : undefined,
          'businessAssociation': this.businessAssociation && this.businessAssociation.length !== 0
            ? this.businessAssociation
            : undefined
        };
      } else {
        newLead.business = {
          'name': this.businessName,
          'headContact': this.headContact ? this.headContact : undefined,
          'accountReceivable': '',
          'personAssociations': [
            ''
          ]
        };
      }

      this.crmService.createLead(JSON.stringify(newLead)).subscribe(data => {
        this.filterService.saveClicked.next(true);
      });
      this.reset();
      this.addLeadModalCollapsed = true;
      this.showAddLeadModal = false;
      this.tabActiveFirst = true;
      this.tabActiveSecond = false;
    }
  }
}
