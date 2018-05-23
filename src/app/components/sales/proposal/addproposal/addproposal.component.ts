import { Component, Input, OnInit, HostListener, ViewChild, ElementRef, } from '@angular/core';
import { Router } from '@angular/router';
import { MultiKeywordSelectComponent } from '../../../profile/multikeywordselect/multikeywordselect.component';
import { CompleterService, CompleterData } from 'ng2-completer';
import { ScheduleMultiKeywordComponent } from '../../proposal/schedulemultikeyword/schedulemultikeyword.component';
import { InCreatedDateFieldComponent } from '../../invoices/components/in-createddatefield/in-createddatefield.component';

@Component({
  selector: 'app-addproposal',
  templateUrl: './addproposal.component.html',
  styleUrls: [
    './addproposal.component.css',
  ]
})


export class AddProposalComponent implements OnInit {
  @ViewChild('tabsRef', {read: ElementRef}) tabsRef: ElementRef;

  public proposalInfo: any = {
    proposalId : '',
    contactName : '',
    projectName: '',
    projectType: '',
    proposalAmount: 0,
    dealStatus: 'New',
    revision: '0',
    createdDate: '',
    owner: [
      {
      imageUrl: 'assets/users/user1.png',
      profileLink: 'crm/contacts/michael',
      name: 'Michael'
      }
    ],
  };

  proposalDetails = {
    discount: {
      amount: 0,
      type: ['$']
    },
    contactName : '',
    projectId: '',
    completionDate: '',
    paymentSchedule: [],
    projectCategoriesAll: [],
    projectSubCategoriesAll: [],
    projectManagementContact: '',
    accountReceivable: '',
    association: '',
    shippingAddress: '',
    city: '',
    state: '',
    country: '',
    zipcode: '',
    pricing: '',
    projectName: '',
    projectType: '',
    collaborators: [
    ],
    accountManager: [
    ],
    projectManager: [
    ],
    designer: [
    ]
  };

  userInfo = {
    name: 'John Moss',
    role: 'Vice President / Sales Department',
    profileLink: 'assets/users/John Moss.jpg',
    email: 'john.moss@gmail.com',
    primaryphone: '4038935433',
    mobilephone: '4037101212',
    shippingaddress: '2222 Crescent Hill Dr SW',
    city: 'Calgary',
    state: 'AB',
    country: 'Canada',
    zipcode: 'T3C 0J4',
    billingaddress: '2893 Crescent Hill Dr SW Calgary, AB T3C 0J4',
    keywords: [
      'control4',
      'theatre',
      'renovation'
    ],
    contactUser: 'Hayati Homes',
    subAssoUsers: [
      'Danny Shibley',
      'John Stephen'
    ],
    followers: [{
      imageUrl: 'assets/users/user1.png',
      profileLink: 'crm/contacts/michael',
      name: 'Michael'
    },
    {
      imageUrl: 'assets/users/user2.png',
      profileLink: 'crm/contacts/joseph',
      name: 'Joseph'
    }]
  };

  customerList = ['customer1', 'customer2', 'customer3'];
  projectManagerList = ['Manager1', 'Manager2', 'Manager3'];
  accountReceivableList = ['Account Receivable 1', 'Account Receivable 2', 'Account Receivable 3'];
  associationList = ['Associatioin 1', 'Associatioin 2', 'Associatioin 3'];
  proposalPricingList = ['Friend & Family', 'Royalty Program', 'Retail', 'Builders Program', 'Wholesale', 'Cost'];
  projectTypeList = ['Project Type 1', 'Project Type 2', 'Project Type 3'];
  scopeEditorContent = 'Test';

  sidebarCollapsed = true;
  ProposalInfoModalCollapsed = true;
  tabActiveFirst = true;
  tabActiveSecond = false;
  tabActiveThird = false;
  switchIconManagement = false;
  switchIconReceivable = false;
  switchIconShipping = false;
  switchIconAutoId = false;
  projectManager = '';
  receivable = '';
  showProposalInfo = false;
  showAddProposalModal = false;
  addProposalModalCollapsed = true;
  scheduleRemain: any;
  projectIDCount = [];
  invalidCustomerName = false;
  invalidCollaborators = false;
  invalidPricing = false;
  invalidProjectName = false;
  invalidAddress = false;
  invalidCity = false;
  invalidState = false;
  invalidCountry = false;
  invalidZipcode = false;
  invalidProjectId = false;
  invalidSchedule = false;
  invalidAccountManager = false;
  invalidProjectManager = false;
  invalidScopeEditorContent = false;
  selectProject = '';
  selectReceivable = '';

  editable: boolean;
  accountEditable: boolean;
  projectEditable: boolean;
  designerEditable: boolean;
  newKeyword: string;
  selectedItem: any = '';
  inputChanged: any = '';
  config2: any = {'placeholder': 'Type here', 'sourceField': 'label'};
  items2: any[] = [
    {id: 0, label: 'Michael', imageUrl: 'assets/users/user1.png'},
    {id: 1, label: 'Joseph', imageUrl: 'assets/users/user2.png'},
    {id: 2, label: 'Danny', imageUrl: 'assets/users/user1.png'},
    {id: 3, label: 'John', imageUrl: 'assets/users/user3.png'},
  ];
  items3: any[] = [
    {id: 0, label: 'Michael', imageUrl: 'assets/users/user1.png'},
    {id: 1, label: 'Joseph', imageUrl: 'assets/users/user2.png'},
    {id: 2, label: 'Danny', imageUrl: 'assets/users/user1.png'},
    {id: 3, label: 'John', imageUrl: 'assets/users/user3.png'},
  ];
  items4: any[] = [
    {id: 0, label: 'Michael', imageUrl: 'assets/users/user1.png'},
    {id: 1, label: 'Joseph', imageUrl: 'assets/users/user2.png'},
    {id: 2, label: 'Danny', imageUrl: 'assets/users/user1.png'},
    {id: 3, label: 'John', imageUrl: 'assets/users/user3.png'},
  ];
  items5: any[] = [
    {id: 0, label: 'Michael', imageUrl: 'assets/users/user1.png'},
    {id: 1, label: 'Joseph', imageUrl: 'assets/users/user2.png'},
    {id: 2, label: 'Danny', imageUrl: 'assets/users/user1.png'},
    {id: 3, label: 'John', imageUrl: 'assets/users/user3.png'},
  ];

  invalidFirstname = false;
  selectName: any;
  selectAssociation: any;
  selectType: any;
  isAutocompleteUpdated2 = false;
  isAutocompleteUpdated3 = false;
  isAutocompleteUpdated4 = false;
  isAutocompleteUpdated5 = false;

  constructor(private completerService: CompleterService) {
    const comp = this;
    document.addEventListener('click', function() {
      comp.editable = false;
      comp.accountEditable = false;
      comp.projectEditable = false;
      comp.designerEditable = false;
    });
  }

  clickIconShipping() {
    this.proposalDetails.shippingAddress = (!this.switchIconShipping) ? this.userInfo.shippingaddress : '';
    this.proposalDetails.city = (!this.switchIconShipping) ? this.userInfo.city : '';
    this.proposalDetails.state = (!this.switchIconShipping) ? this.userInfo.state : '';
    this.proposalDetails.country = (!this.switchIconShipping) ? this.userInfo.country : '';
    this.proposalDetails.zipcode = (!this.switchIconShipping) ? this.userInfo.zipcode : '';
    this.switchIconShipping = !this.switchIconShipping;
  }

  clickIconManagement() {
    this.proposalDetails.projectManagementContact = (!this.switchIconManagement) ? this.proposalDetails.contactName : '';
    this.selectProject = (!this.switchIconManagement) ? this.proposalDetails.contactName : '';
    this.switchIconManagement = !this.switchIconManagement;
  }

  clickIconReceivable() {
    this.proposalDetails.accountReceivable = (!this.switchIconReceivable) ? this.proposalDetails.contactName : '';
    this.selectReceivable = (!this.switchIconReceivable) ? this.proposalDetails.contactName : '';
    this.switchIconReceivable = !this.switchIconReceivable;
  }

  ngOnInit() {
    this.scheduleRemain = 100;
    this.editable = false;
    this.userInfo.followers.forEach(element => {
      this.items2 = this.items2.filter(function( obj ) {
        return obj.label !== element.name;
      });
    });
  }

  onSelectCustomer(event) {
    this.proposalDetails.contactName = event;
  }

  onSelectProjectManagementContact(event) {
    this.proposalDetails.projectManagementContact = event;
  }

  onSelectAccountReceivable(event) {
    this.proposalDetails.accountReceivable = event;
  }

  onSelectAssociation(event) {
    this.proposalDetails.association = event;
  }

  onSelectProjectType(event) {
    this.proposalDetails.projectType = event;
  }

  onAccountTypeChange(event) {
  }

  onSelect(item: any) {
    this.selectedItem = item;
    this.items2 = this.items2.filter(function( obj ) {
      return obj.label !== item.label;
    });
    this.proposalDetails.collaborators.push({name: item.label, imageUrl: item.imageUrl });
  }

  onSelectAccountManager(item: any) {
    this.selectedItem = item;
    this.items3 = this.items3.filter(function( obj ) {
      return obj.label !== item.label;
    });
    this.proposalDetails.accountManager.push({name: item.label, imageUrl: item.imageUrl });
  }

  onSelectProjectManager(item: any) {
    this.selectedItem = item;
    this.items4 = this.items4.filter(function( obj ) {
      return obj.label !== item.label;
    });
    this.proposalDetails.projectManager.push({name: item.label, imageUrl: item.imageUrl });
  }

  onSelectDesigner(item: any) {
    this.selectedItem = item;
    this.items5 = this.items5.filter(function( obj ) {
      return obj.label !== item.label;
    });
    this.proposalDetails.designer.push({name: item.label, imageUrl: item.imageUrl });
  }


  onInputChangedEvent(val: string) {
    this.inputChanged = val;
  }

  removeUser(i: number) {
    const item = this.proposalDetails.collaborators[i];
    this.items2.push({id: this.items2.length, label: item.name, imageUrl: item.imageUrl});
    this.proposalDetails.collaborators.splice(i, 1);
    this.isAutocompleteUpdated2 = !this.isAutocompleteUpdated2;
  }

  removeAccountManager(i: number) {
    const item = this.proposalDetails.accountManager[i];
    this.items2.push({id: this.items2.length, label: item.name, imageUrl: item.imageUrl});
    this.proposalDetails.accountManager.splice(i, 1);
    this.isAutocompleteUpdated3 = !this.isAutocompleteUpdated3;
  }

  removeProjectManager (i: number) {
    const item = this.proposalDetails.projectManager[i];
    this.items2.push({id: this.items2.length, label: item.name, imageUrl: item.imageUrl});
    this.proposalDetails.projectManager.splice(i, 1);
    this.isAutocompleteUpdated4 = !this.isAutocompleteUpdated4;
  }

  removeDesigner (i: number) {
    const item = this.proposalDetails.designer[i];
    this.items2.push({id: this.items2.length, label: item.name, imageUrl: item.imageUrl});
    this.proposalDetails.designer.splice(i, 1);
    this.isAutocompleteUpdated5 = !this.isAutocompleteUpdated5;
  }

  clickIconAutoId() {
    this.switchIconAutoId = !this.switchIconAutoId;
    if (this.switchIconAutoId) {
      this.proposalDetails.projectId = this.generateAutoId();
    } else {
      this.proposalDetails.projectId = '';
    }
  }

  getSchduleRemain(event) {
    this.scheduleRemain = event;
  }

  generateAutoId() {
    let month: any;
    let year: any;
    let count: any;
    const today = new Date();
    month = today.getMonth() + 1;
    if (month.toString().length) {
      month = '0' + month;
    }
    year = today.getFullYear().toString().slice(-2);
    if (this.projectIDCount.length > 0) {
      count = this.projectIDCount[this.projectIDCount.length] + 1;
    } else {
      count = 1;
    }
    if (count.toString().length === 1) {
      count = '0' + count;
    }
    console.log('333', month, year);
    const projectId = 'PR ' + month + year + count;
    return projectId;
  }

  moveToProjectDetails() {

  }

  saveproposalDetails() {
  }

  tabChange(event) {
    switch (event.tabTitle) {
      case 'CLIENT DETAILS': {
        this.tabActiveSecond = false;
        this.tabActiveFirst = true;
        this.tabActiveThird = false;
        break;
      }
      case 'PROJECT DETAILS': {
        this.tabActiveSecond = true;
        this.tabActiveFirst = false;
        this.tabActiveThird = false;
        this.clickNext('tab-one');
        break;
      }
      case 'PROJECT SCOPE': {
        this.tabActiveSecond = false;
        this.tabActiveFirst = false;
        this.tabActiveThird = true;
        this.clickNext('tab-two');
        break;
      }
    }
  }

  clickNext(pos) {
    if (pos === 'tab-one') {
      this.invalidCustomerName = false;
      this.invalidCollaborators = false;
      this.invalidPricing = false;
      this.invalidProjectName = false;
      this.invalidAddress = false;
      this.invalidCity = false;
      this.invalidState = false;
      this.invalidCountry = false;
      this.invalidZipcode = false;
      if (this.proposalDetails.contactName && this.proposalDetails.collaborators.length && this.proposalDetails.pricing
        && this.proposalDetails.projectName && this.proposalDetails.shippingAddress && this.proposalDetails.city
        && this.proposalDetails.state && this.proposalDetails.country && this.proposalDetails.zipcode) {
          this.tabActiveSecond = true;
          this.tabActiveFirst = false;
          this.tabActiveThird = false;
      } else {
        if (!this.proposalDetails.contactName) {
          this.invalidCustomerName = true;
        }
        if (!this.proposalDetails.collaborators.length) {
          this.invalidCollaborators = true;
        }
        if (!this.proposalDetails.pricing) {
          this.invalidPricing = true;
        }
        if (!this.proposalDetails.projectName) {
          this.invalidProjectName = true;
        }
        if (!this.proposalDetails.shippingAddress) {
          this.invalidAddress = true;
        }
        if (!this.proposalDetails.city) {
          this.invalidCity = true;
        }
        if (!this.proposalDetails.state) {
          this.invalidState = true;
        }
        if (!this.proposalDetails.country) {
          this.invalidCountry = true;
        }
        if (!this.proposalDetails.zipcode) {
          this.invalidZipcode = true;
        }
        setTimeout(() => {
          this.tabActiveSecond = false;
          this.tabActiveFirst = true;
          this.tabActiveThird = false;
        });
      }
    } else if (pos === 'tab-two') {
      console.log('111', this.scheduleRemain);
      this.invalidProjectId = false;
      this.invalidSchedule = false;
      this.invalidAccountManager = false;
      this.invalidProjectManager = false;
      if (this.proposalDetails.projectId && (this.scheduleRemain === 0) && this.proposalDetails.accountManager.length
        && this.proposalDetails.projectManager.length) {
          this.tabActiveThird = true;
          this.tabActiveFirst = false;
          this.tabActiveSecond = false;
      } else {
        if (!this.proposalDetails.projectId) {
          this.invalidProjectId = true;
        }
        if (this.scheduleRemain !== 0) {
          this.invalidSchedule = true;
        }
        if (!this.proposalDetails.accountManager.length) {
          this.invalidAccountManager = true;
        }
        if (!this.proposalDetails.projectManager.length) {
          this.invalidProjectManager = true;
        }
        setTimeout(() => {
          this.tabActiveSecond = true;
          this.tabActiveFirst = false;
          this.tabActiveThird = false;
        });
      }
    }
  }

  clickBack(pos) {
    if (pos === 'tab-one') {
      this.showAddProposalModal = false;
      this.addProposalModalCollapsed = true;
    } else if (pos === 'tab-two') {
      this.tabActiveThird = false;
      this.tabActiveFirst = true;
      this.tabActiveSecond = false;
    } else if (pos === 'tab-three') {
      this.tabActiveThird = false;
      this.tabActiveFirst = false;
      this.tabActiveSecond = true;
    }
  }

  openAddProposalModal() {
    this.tabActiveFirst = true;
    this.tabActiveSecond = false;
    this.tabActiveThird = false;
    this.showAddProposalModal = true;
    this.addProposalModalCollapsed = false;
  }

  finishAddProposal() {
    this.invalidScopeEditorContent = false;
    if (this.scopeEditorContent) {
      this.tabActiveThird = false;
      this.tabActiveFirst = true;
      this.tabActiveSecond = false;
      this.showAddProposalModal = false;
      this.addProposalModalCollapsed = true;
    } else {
      this.invalidScopeEditorContent = true;
    }
  }
}
