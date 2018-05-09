import { Component, Input, OnInit, HostListener, ViewChild, ElementRef, } from '@angular/core';
import { Router } from '@angular/router';
import { MultiKeywordSelectComponent } from '../../../profile/multikeywordselect/multikeywordselect.component';
import { CompleterService, CompleterData } from 'ng2-completer';
import { SharedService } from '../../../../services/shared.service';
import { CrmService } from '../../../../services/crm.service';
import * as moment from 'moment';

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
  switchIconShipping: boolean = true;
  address = '';
  city = '';
  province = '';
  postalCode = '';
  country: '';
  typeAccountTypeChange = false;
  keywords: any;
  contactAssociation: any;
  businessType: any;
  tabActiveFirst = true;
  tabActiveSecond = false;
  invalidFirstname = false;
  invalidLastname = false;
  invalidBusinessName = false;
  invalidAccountType = false;
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
  family: any;
  royalty: any;
  retail: any;
  euro: any;
  cad: any;
  usd: any;
  Test1: any;
  Test2: any;
  currencyList = [];
  keywordsIdList = [];
  headContact = '';
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

  constructor(private completerService: CompleterService, private sharedService: SharedService, private crmService: CrmService) {
    this.dataService = completerService.local(this.searchData, 'color', 'color');
    this.keywords = [];
    this.contactAssociation = ['Danny Shibley', 'John Stephen'];
  }

  ngOnInit() {
    this.sharedService.getCurrencies().subscribe(data => {
      this.currencyList = data.results;
      console.log('currency List: ', data.results);
    });

    this.sharedService.getTerms().subscribe(res => {
      this.termsList = res.results;
    });

    this.sharedService.getPricingCategories().subscribe (res => {
      this.pricingCategoriesList = res.results;
    });
  }

  onAccountTypeChange(event) {
    this.invalidFirstname = false;
    this.invalidLastname = false;
    this.invalidBusinessName = false;
    this.invalidAccountType = false;
    this.invalidPrimaryNumber = false;
    if (event === 'PERSON') {
      this.typeAccountTypeChange = false;
    } else if (event === 'BUSINESS') {
      this.typeAccountTypeChange = true;
    }
  }

  clickIconShipping() {
    this.switchIconShipping = !this.switchIconShipping;
    this.address = (this.switchIconShipping) ? 'test' : '';
  }

  onEnter() {
  }

  checkSource(event) {
    if (this.captainSource === 'Contact referal') {
      this.sourceValue = false;
    } else {
      this.sourceValue = true;
    }
  }

  getKeywords(event) {
    console.log('keywords: ', event);
    this.keywordsIdList = event.map(k => k.id);
  }

  clickNext() {
    this.invalidFirstname = false;
    this.invalidLastname = false;
    this.invalidBusinessName = false;
    this.invalidAccountType = false;
    this.invalidPrimaryNumber = false;
    if (this.businessType === 'PERSON') {
      if (this.firstName && this.lastName && this.primaryNumber) {
        this.tabActiveFirst = false;
        this.tabActiveSecond = true;
      } else {
        if (!this.firstName) {
          this.invalidFirstname = true;
        }
        if (!this.lastName) {
          this.invalidLastname = true;
        }
        if (!this.primaryNumber) {
          this.invalidPrimaryNumber = true;
        }
      }
    } else if (this.businessType === 'BUSINESS') {
      if (this.businessName) {
        this.tabActiveFirst = false;
        this.tabActiveSecond = true;
      } else {
        if (!this.businessName) {
          this.invalidBusinessName = true;
        }
        if (!this.primaryNumber) {
          this.invalidPrimaryNumber = true;
        }
      }
    } else {
      this.invalidAccountType = true;
      if (!this.firstName) {
        this.invalidFirstname = true;
      }
      if (!this.lastName) {
        this.invalidLastname = true;
      }
      if (!this.primaryNumber) {
        this.invalidPrimaryNumber = true;
      }
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
        this.tabActiveFirst = false;
        this.tabActiveSecond = true;
        this.invalidFirstname = false;
        this.invalidLastname = false;
        this.invalidBusinessName = false;
        this.invalidAccountType = false;
        this.invalidPrimaryNumber = false;

        if (this.businessType === 'PERSON') {
          if (this.firstName && this.lastName && this.primaryNumber) {
            this.tabActiveFirst = false;
            this.tabActiveSecond = true;
            break;
          } else {
            setTimeout(() => {
              this.tabActiveFirst = true;
              this.tabActiveSecond = false;
            });
            if (!this.firstName) {
              this.invalidFirstname = true;
            }
            if (!this.lastName) {
              this.invalidLastname = true;
            }
            if (!this.primaryNumber) {
              this.invalidPrimaryNumber = true;
            }
          }
        } else if (this.businessType === 'BUSINESS') {
          if (this.businessName) {
            this.tabActiveFirst = false;
            this.tabActiveSecond = true;
          } else {
            setTimeout(() => {
              this.tabActiveFirst = true;
              this.tabActiveSecond = false;
            });
            if (!this.businessName) {
              this.invalidBusinessName = true;
            }
            if (!this.primaryNumber) {
              this.invalidPrimaryNumber = true;
            }
          }
        } else {
          setTimeout(() => {
            this.tabActiveFirst = true;
            this.tabActiveSecond = false;
          });
          this.invalidAccountType = true;
          if (!this.firstName) {
            this.invalidFirstname = true;
          }
          if (!this.lastName) {
            this.invalidLastname = true;
          }
          if (!this.primaryNumber) {
            this.invalidPrimaryNumber = true;
          }
        }
        break;
      }
    }
  }
  clickSaveLead() {
    this.invalidDefaultTerm = false;
    this.invalidDefaultCurrency = false;
    this.invalidDefaultPricing = false;
    if (this.defaultTerm && this.defaultCurrency && this.defaultPricing) {
      
      // const newLead = {
      //   currencyId: this.defaultCurrency,
      //   termId: this.defaultTerm,
      //   sourceId: 1,
      //   pricingCategoryId: this.defaultPricing,
      //   keywordIds: this.keywordsIdList,
      //   type: this.businessType,
      //   person: {
      //     firstName: this.firstName,
      //     lastName: this.lastName,
      //     jobTitle: this.jobTitle,
      //     department: this.captain,
      //   },
      //   business: {
      //     name: this.businessName,
      //     headContact: 1,
      //     accountReceivable: 1,
      //     personAssociation: 1,
      //   },
      //   shippingAddress: {
      //     address: this.shippingAddress,
      //     city: this.shippingCity,
      //     province: this.shippingProvince,
      //     postalCode: this.shippingPostalCode,
      //     country: this.shippingCountry
      //   },
      //   email:c
      //   phoneNumbers: {
      //     primary: this.primaryNumber,
      //     secondary: this.secondaryNumber
      //   },
      //   note: this.notes
      // };

      const newLead = {
        // "currencyId": parseInt(this.defaultCurrency, 10),
        // "termId": parseInt(this.defaultTerm, 10),
        // "sourceId": 1,
        // "pricingCategoryId": parseInt(this.defaultPricing, 10),
        // "keywordIds": this.keywordsIdList,
        // "owner": "string",
        // "followers": [
        //   "string"
        // ],
        // "type": this.businessType,
        // "person": {
        //   "firstName": this.firstName,
        //   "lastName": this.lastName,
        //   "jobTitle": this.jobTitle,
        //   "department": this.captain,
        //   "businessAssociation": 0
        // },
        // "business": {
        //   "name": this.businessName,
        //   "headContact": 0,
        //   "accountReceivable": 0,
        //   "personAssociations": [
        //     0
        //   ]
        // },
        // "shippingAddress": {
        //   "address": this.address,
        //   "city": this.city,
        //   "province": this.province,
        //   "postalCode": this.postalCode,
        //   "country": this.country
        // },
        // "billingAddress": {
        //   "address": this.billingAddress,
        //   "city": this.billingCity,
        //   "province": this.billingProvince,
        //   "postalCode": this.billingPostalCode,
        //   "country": this.billingCountry
        // },
        // "email":  this.email,
        // "socialMediaUrl": {
        //   "linkedIn": "string",
        //   "facebook": "string",
        //   "twitter": "string"
        // },
        // "phoneNumbers": {
        //   "primary": this.primaryNumber,
        //   "secondary": this.secondaryNumber,
        // },
        // "timezone": 0,
        // "note": this.notes,
        // "lastContacted": moment().format('YYYY-MM-DD')
          "currencyId": 1,
          "termId": 1,
          "sourceId": 1,
          "pricingCategoryId": 1,
          "keywordIds": [
            1, 5
          ],
          "owner": "string",
          "followers": [
            "string"
          ],
          "type": "PERSON",
          "person": {
            "firstName": "string",
            "lastName": "string",
            "jobTitle": "string",
            "department": "string",
            "businessAssociation": 1
          },
          "business": {
            "name": "string",
            "headContact": 1,
            "accountReceivable": 1,
            "personAssociations": [
              1
            ]
          },
          "shippingAddress": {
            "address": "string",
            "city": "string",
            "province": "string",
            "postalCode": "string",
            "country": "string"
          },
          "billingAddress": {
            "address": "string",
            "city": "string",
            "province": "string",
            "postalCode": "string",
            "country": "string"
          },
          "email": "string",
          "socialMediaUrl": {
            "linkedIn": "string",
            "facebook": "string",
            "twitter": "string"
          },
          "phoneNumbers": {
            "primary": "43223423",
            "secondary": "423423432"
          },
          "timezone": 1,
          "note": "string",
          "lastContacted": "2018-05-08"
      };
      this.crmService.createLead(JSON.stringify(newLead)).subscribe(data => {
        console.log('data: ', data);
        this.addLeadModalCollapsed = true;
        this.showAddLeadModal = false;
        this.tabActiveFirst = true;
        this.tabActiveSecond = false;
      });
    } else {
      if (!this.defaultCurrency) {
        this.invalidDefaultCurrency = true;
      }
      if (!this.defaultTerm) {
        this.invalidDefaultTerm = true;
      }
      if (!this.defaultPricing) {
        this.invalidDefaultPricing = true;
      }
    }
  }
}
