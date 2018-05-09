import { Component, Input, OnInit, HostListener, ViewChild, ElementRef, } from '@angular/core';
import { Router } from '@angular/router';
import { MultiKeywordSelectComponent } from '../../../profile/multikeywordselect/multikeywordselect.component';
import { CompleterService, CompleterData } from 'ng2-completer';
import { SharedService } from '../../../../services/shared.service';
import { CrmService } from '../../../../services/crm.service';
import * as moment from 'moment';
import { LeadModel } from '../../../../models/lead.model';
import { FilterService } from '../filter.service';

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

  constructor(private completerService: CompleterService, private sharedService: SharedService, private crmService: CrmService,
    private filterService: FilterService ) {
    this.dataService = completerService.local(this.searchData, 'color', 'color');
    this.keywords = [];
    this.contactAssociation = ['Danny Shibley', 'John Stephen'];
  }

  ngOnInit() {
    this.sharedService.getCurrencies().subscribe(data => {
      this.currencyList = data.results;
    });

    this.sharedService.getTerms().subscribe(res => {
      this.termsList = res.results;
    });

    this.sharedService.getPricingCategories().subscribe (res => {
      this.pricingCategoriesList = res.results;
    });

    this.sharedService.getContacts().subscribe(res => {
      this.contactsList = res;
    });

    this.sharedService.getUsers().subscribe(res => {
      this.usersList = res;
    });

    this.sharedService.getSources().subscribe(res => {
      this.sourcesList = res.results;
      this.sourcesNameList = res.results.map(n => n.source);
    });

    this.sharedService.getTerms().subscribe(res => {
      this.termsList = res.results;
    });

    this.sharedService.getPricingCategories().subscribe (res => {
      this.pricingCategoriesList = res.results;
    });

    this.sharedService.getContacts().subscribe(res => {
      this.contactsList = res;
    });

    this.sharedService.getUsers().subscribe(res => {
      this.usersList = res;
    });

    this.sharedService.getSources().subscribe(res => {
      this.sourcesList = res.results;
      this.sourcesNameList = res.results.map(n => n.source);
    });

    this.sharedService.getTerms().subscribe(res => {
      this.termsList = res.results;
    });

    this.sharedService.getPricingCategories().subscribe (res => {
      this.pricingCategoriesList = res.results;
    });

    this.sharedService.getContacts().subscribe(res => {
      this.contactsList = res;
    });

    this.sharedService.getUsers().subscribe(res => {
      this.usersList = res;
    });

    this.sharedService.getSources().subscribe(res => {
      this.sourcesList = res.results;
      this.sourcesNameList = res.results.map(n => n.source);
    });

    this.sharedService.getTerms().subscribe(res => {
      this.termsList = res.results;
    });

    this.sharedService.getPricingCategories().subscribe (res => {
      this.pricingCategoriesList = res.results;
    });

    this.sharedService.getContacts().subscribe(res => {
      this.contactsList = res;
    });

    this.sharedService.getUsers().subscribe(res => {
      this.usersList = res;
    });

    this.sharedService.getSources().subscribe(res => {
      this.sourcesList = res.results;
      this.sourcesNameList = res.results.map(n => n.source);
    });

    this.sharedService.getTerms().subscribe(res => {
      this.termsList = res.results;
    });

    this.sharedService.getPricingCategories().subscribe (res => {
      this.pricingCategoriesList = res.results;
    });

    this.sharedService.getTerms().subscribe(res => {
      this.termsList = res.results;
    });

    this.sharedService.getPricingCategories().subscribe (res => {
      this.pricingCategoriesList = res.results;
    });

    this.sharedService.getContacts().subscribe(res => {
      this.contactsList = res.results;
    });

    this.sharedService.getUsers().subscribe(res => {
      this.usersList = res.results;
    });

    this.sharedService.getSources().subscribe(res => {
      this.sourcesList = res.results;
    });

    this.sharedService.getTerms().subscribe(res => {
      this.termsList = res.results;
    });

    this.sharedService.getPricingCategories().subscribe (res => {
      this.pricingCategoriesList = res.results;
    });

    this.sharedService.getTerms().subscribe(res => {
      this.termsList = res.results;
    });

    this.sharedService.getPricingCategories().subscribe (res => {
      this.pricingCategoriesList = res.results;
    });

    this.sharedService.getContacts().subscribe(res => {
      this.contactsList = res.results;
      console.log('contacts: ', res);
    });

    this.sharedService.getUsers().subscribe(res => {
      this.usersList = res.results;
      console.log('users: ', res);
    });

    this.sharedService.getSources().subscribe(res => {
      this.sourcesList = res.results;
      console.log('sources: ', res.results);
    });
  }

  onAccountTypeChange(event) {
    this.invalidFirstname = false;
    this.invalidLastname = false;
    this.invalidBusinessName = false;
    this.invalidAccountType = false;
    this.invalidPrimaryNumber = false;
    this.invalidCity = false;
    this.invalidProvince = false;
    this.invalidCountry = false;
    this.invalidPostalCode = false;
    if (event === 'PERSON') {
      this.typeAccountTypeChange = true;
    }
  }

  clickIconShipping() {
    this.switchIconShipping = !this.switchIconShipping;
  }

  onEnter() {
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

  getKeywords(event) {
    this.keywordsIdList = event.map(k => k.id);
  }
  
  clickNext() {
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
    this.wrongEmailFormat = !this.checkEmailValidation(this.email);

    if (this.businessType === 'PERSON') {
      if (this.firstName && this.lastName && this.primaryNumber && this.email && !this.wrongEmailFormat && this.address &&
        this.city && this.province && this.country && this.postalCode) {
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
        if (!this.email || this.wrongEmailFormat) {
          this.invalidContactEmail = true;
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
        if (!this.postalCode) {
          this.invalidPostalCode = true;
        }
      }
    } else if (this.businessType === 'BUSINESS') {
      if (this.businessName && this.email && this.primaryNumber && !this.wrongEmailFormat && this.address &&
        this.city && this.province && this.country && this.postalCode) {
        this.tabActiveFirst = false;
        this.tabActiveSecond = true;
      } else {
        if (!this.businessName) {
          this.invalidBusinessName = true;
        }
        if (!this.primaryNumber) {
          this.invalidPrimaryNumber = true;
        }
        if (!this.email || this.wrongEmailFormat) {
          this.invalidContactEmail = true;
        }
        if (!this.email || this.wrongEmailFormat) {
          this.invalidContactEmail = true;
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
        if (!this.postalCode) {
          this.invalidPostalCode = true;
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
      if (!this.email || this.wrongEmailFormat) {
        this.invalidContactEmail = true;
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
      if (!this.postalCode) {
        this.invalidPostalCode = true;
      }
    }
    // check the switch and make billing address same as shipping address
    if (this.switchIconShipping) {
      this.billingAddress = this.address;
      this.billingCity = this.city;
      this.billingProvince = this.province;
      this.billingCountry = this.country;
      this.billingPostalCode = this.postalCode;
    } else {
      this.billingAddress = '';
      this.billingCity = '';
      this.billingProvince = '';
      this.billingCountry = '';
      this.billingPostalCode = '';
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
        this.invalidContactEmail = false;
        this.invalidAddress = false;
        this.invalidCity = false;
        this.invalidProvince = false;
        this.invalidCountry = false;
        this.invalidPostalCode = false;
        this.wrongEmailFormat = !this.checkEmailValidation(this.email);

        if (this.businessType === 'PERSON') {
          if (this.firstName && this.lastName && this.primaryNumber && this.email && !this.wrongEmailFormat && this.address &&
            this.city && this.province && this.country && this.postalCode) {
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
            if (!this.email || this.wrongEmailFormat) {
              this.invalidContactEmail = true;
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
            if (!this.postalCode) {
              this.invalidPostalCode = true;
            }
          }
        } else if (this.businessType === 'BUSINESS') {
          if (this.businessName  && this.primaryNumber && this.email && !this.wrongEmailFormat && this.address &&
            this.city && this.province && this.country && this.postalCode) {
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
            if (!this.email || this.wrongEmailFormat) {
              this.invalidContactEmail = true;
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
            if (!this.postalCode) {
              this.invalidPostalCode = true;
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
          if (!this.email || this.wrongEmailFormat) {
            this.invalidContactEmail = true;
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
          if (!this.postalCode) {
            this.invalidPostalCode = true;
          }
        }
        break;
      }
    }
  }

  checkEmailValidation(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  clearInputs() {
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
    this.invalidFirstname = false;
    this.invalidLastname = false;
    this.invalidBusinessName = false;
    this.invalidAccountType = false;
    this.firstName = '';
    this.lastName = '';
    this.businessName = '';
    this.defaultTerm = '';
    this.defaultCurrency = '';
    this.defaultPricing = '';
    this.primaryNumber = '';
    this.invalidDefaultTerm = false;
    this.invalidDefaultCurrency = false;
    this.invalidDefaultPricing = false;
    this.invalidPrimaryNumber = false;
    this.sourceValue = true;
    this.currencyList = [];
    this.keywordsIdList = [];
    this.headContact = undefined;
    this.jobTitle = '';
    this.email = '';
    this.notes = '';
    this.billingAddress = '';
    this.billingCity = '';
    this.billingProvince = '';
    this.billingCountry = '';
    this.billingPostalCode = '';
    this.secondaryNumber = '';
    this.selectedSourceId = undefined;
    this.businessAssociation = undefined;
    this.invalidContactEmail = false;
    this.wrongEmailFormat = false;
    this.invalidAddress = false;
    this.invalidCity = false;
    this.invalidProvince = false;
    this.invalidCountry = false;
    this.invalidPostalCode = false;
  }
  clickSaveLead() {
    this.invalidDefaultTerm = false;
    this.invalidDefaultCurrency = false;
    this.invalidDefaultPricing = false;
    if (this.defaultTerm && this.defaultCurrency && this.defaultPricing) {
      if (this.businessType === 'PERSON') {
        this.newLead = {
          'currencyId': parseInt(this.defaultCurrency, 10),
          'termId': parseInt(this.defaultTerm, 10),
          'sourceId': parseInt(this.selectedSourceId, 10),
          'pricingCategoryId': parseInt(this.defaultPricing, 10),
          'keywordIds': this.keywordsIdList,
          'owner': 'string',
          'followers': [
            'string'
          ],
          'type': this.businessType,
          'person': {
            'firstName': this.firstName,
            'lastName': this.lastName,
            'jobTitle': this.jobTitle ? this.jobTitle : 'a',
            'department': this.captain ? this.captain : 'a',
            'businessAssociation': parseInt(this.businessAssociation, 10),
          },
          'shippingAddress': {
            'address': this.address,
            'city': this.city,
            'province': this.province,
            'postalCode': this.postalCode,
            'country': this.country
          },
          'billingAddress': {
            'address': this.switchIconShipping ? this.address : this.billingAddress,
            'city': this.switchIconShipping ? this.city : this.billingCity,
            'province': this.switchIconShipping ? this.province : this.billingProvince,
            'postalCode': this.switchIconShipping ? this.postalCode : this.billingPostalCode,
            'country': this.switchIconShipping ? this.country : this.billingCountry
          },
          'email':  this.email,
          'socialMediaUrl': {
            'linkedIn': undefined,
            'facebook': undefined,
            'twitter': undefined
          },
          'phoneNumbers': {
            'primary': this.primaryNumber,
            'secondary': this.secondaryNumber,
          },
          'timezone': 1,
          'note': this.notes,
          'lastContacted': moment().format('YYYY-MM-DD')
        };
      } else {
        this.newLead = {
          'currencyId': parseInt(this.defaultCurrency, 10),
          'termId': parseInt(this.defaultTerm, 10),
          'sourceId': parseInt(this.selectedSourceId, 10),
          'pricingCategoryId': parseInt(this.defaultPricing, 10),
          'keywordIds': this.keywordsIdList,
          'owner': 'string',
          'followers': [
            'string'
          ],
          'type': this.businessType,
          'person': {
            'jobTitle': this.jobTitle ? this.jobTitle : 'a',
            'department': this.captain ? this.captain : 'a',
            'businessAssociation': parseInt(this.businessAssociation, 10),
          },
          'business': {
            'name': this.businessName,
            'headContact': parseInt(this.headContact, 10),
            'accountReceivable': 1,
            'personAssociations': [
              1
            ]
          },
          'shippingAddress': {
            'address': this.address,
            'city': this.city,
            'province': this.province,
            'postalCode': this.postalCode,
            'country': this.country
          },
          'billingAddress': {
            'address': this.switchIconShipping ? this.address : this.billingAddress,
            'city': this.switchIconShipping ? this.city : this.billingCity,
            'province': this.switchIconShipping ? this.province : this.billingProvince,
            'postalCode': this.switchIconShipping ? this.postalCode : this.billingPostalCode,
            'country': this.switchIconShipping ? this.country : this.billingCountry
          },
          'email':  this.email,
          'socialMediaUrl': {
            'linkedIn': undefined,
            'facebook': undefined,
            'twitter': undefined
          },
          'phoneNumbers': {
            'primary': this.primaryNumber,
            'secondary': this.secondaryNumber,
          },
          'timezone': 1,
          'note': this.notes,
          'lastContacted': moment().format('YYYY-MM-DD')
        };
      }

      if (isNaN(this.newLead.sourceId)) {
        delete this.newLead.sourceId;
      }

      if (isNaN(this.newLead.person.businessAssociation)) {
        delete this.newLead.person.businessAssociation;
      }
      this.crmService.createLead(JSON.stringify(this.newLead)).subscribe(data => {
        this.addLeadModalCollapsed = true;
        this.showAddLeadModal = false;
        this.tabActiveFirst = true;
        this.tabActiveSecond = false;
        this.clearInputs();
        this.filterService.saveClicked.next(true);
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
