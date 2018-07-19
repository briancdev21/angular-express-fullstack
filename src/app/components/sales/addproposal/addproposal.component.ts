import { Component, Input, OnInit, HostListener, ViewChild, ElementRef, } from '@angular/core';
import { Router } from '@angular/router';
import { MultiKeywordSelectComponent } from '../../profile/multikeywordselect/multikeywordselect.component';
import { CompleterService, CompleterData } from 'ng2-completer';
import { ScheduleMultiKeywordComponent } from '../proposal/schedulemultikeyword/schedulemultikeyword.component';
import { InCreatedDateFieldComponent } from '../invoices/components/in-createddatefield/in-createddatefield.component';
import { SharedService } from '../../../services/shared.service';
import { ProposalsService } from '../../../services/proposals.service';
import * as moment from 'moment';
import { ProposalService } from '../proposal/proposal.service';
import { ProjectsService } from '../../../services/projects.service';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-addproposal',
  templateUrl: './addproposal.component.html',
  styleUrls: [
    './addproposal.component.css',
  ]
})


export class AddProposalComponent implements OnInit {
  @ViewChild('tabsRef', {read: ElementRef}) tabsRef: ElementRef;

  today = new Date();
  public proposalInfo;

  proposalDetails = {
    discount: {
      amount: 0,
      type: 'AMOUNT'
    },
    contactId : '',
    projectId: '',
    completionDate: moment(this.today).format('YYYY-MM-DD'),
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
    pricing: undefined,
    projectName: '',
    projectType: undefined,
    collaborators: [
    ],
    accountManager: undefined,
    projectManager: undefined,
    designer: undefined,
    taxRate: 1,
    pricingCategoryId: 1
  };

  userInfo = {
    name: '',
    role: '',
    profileLink: '',
    email: '',
    primaryphone: '',
    mobilephone: '',
    shippingaddress: '',
    city: '',
    state: '',
    country: '',
    zipcode: '',
    billingaddress: '',
    keywords: [
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

  customerList = [];
  proposalPricingList = [];
  projectTypeList = [];
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
  scheduleRemain: number;
  projectIDCount = [];
  invalidCustomerName = false;
  invalidCollaborators = false;
  invalidPricing = false;
  invalidProjectType = false;
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
  invalidClientProjectManager = false;
  invalidAccountReceivable = false;
  invalidDesigner = false;
  invalidCategory = false;
  invalidSubCategory = false;
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
  ];
  items3: any[] = [
  ];
  items4: any[] = [
  ];
  items5: any[] = [
  ];

  invalidFirstname = false;
  selectName: any;
  selectAssociation: any;
  selectType: any;
  isAutocompleteUpdated2 = false;
  isAutocompleteUpdated3 = false;
  isAutocompleteUpdated4 = false;
  isAutocompleteUpdated5 = false;
  selectedCustomer: any;
  emptyArr = [];
  usersList = [];
  internalNoteContent = '';
  clientNoteContent = '';
  customersData: CompleterData;
  projectsData: CompleterData;
  projectsList: any;
  projectId = '';
  proposalsList = [];
  taxRateList = [];

  constructor(private completerService: CompleterService, private sharedService: SharedService,
     private proposalsService: ProposalsService, private projectsService: ProjectsService, private salesService: SalesService) {
    const comp = this;

    document.addEventListener('click', function() {
      comp.editable = false;
      comp.accountEditable = false;
      comp.projectEditable = false;
      comp.designerEditable = false;
    });

    this.sharedService.getContacts()
      .subscribe(data => {
        console.log('userlist: ', data);
        this.customerList = data;
        this.customerList = this.addContactName(this.customerList);
        this.customersData = this.completerService.local(this.customerList, 'name', 'name');
        // Add collaborators list
        this.customerList.forEach( ele => {
          this.items2.push({
            id: ele.id,
            label: name,
            imageUrl: ele.pictureURI
          });
        });
      });

    this.sharedService.getUsers().subscribe(res => {
      this.usersList = res;
      this.usersList.forEach( ele => {
        this.items3.push({
          label: ele.firstName + ' ' + ele.lastName,
          imageUrl: ele.pictureURI,
          username: ele.username
        });
      });
      this.items4 = this.items5 = this.items3;
    });

    this.sharedService.getPricingCategories().subscribe(res => {
      this.proposalPricingList = res.results;
    });

    this.sharedService.getProjectTypes().subscribe(res => {
      this.projectTypeList = res.results;
    });

    this.projectsService.getProjectsList().subscribe(res => {
      this.projectsList = res.results;
      this.projectsData = this.completerService.local(this.projectsList, 'id', 'id');
    });

    this.proposalsService.getProposals().subscribe(res => {
      this.proposalsList = res.results;
    });

    this.sharedService.getTaxRates().subscribe(res => {
      this.taxRateList = res.results;
    });
  }

  clickIconShipping() {
    this.switchIconShipping = !this.switchIconShipping;
    this.proposalDetails.shippingAddress = (this.switchIconShipping) ? this.selectedCustomer.shippingAddress.address : '';
    this.proposalDetails.city = (this.switchIconShipping) ? this.selectedCustomer.shippingAddress.city : '';
    this.proposalDetails.state = (this.switchIconShipping) ? this.selectedCustomer.shippingAddress.province : '';
    this.proposalDetails.country = (this.switchIconShipping) ? this.selectedCustomer.shippingAddress.country : '';
    this.proposalDetails.zipcode = (this.switchIconShipping) ? this.selectedCustomer.shippingAddress.postalCode : '';
  }

  clickIconManagement() {
    this.proposalDetails.projectManagementContact = (!this.switchIconManagement) ? this.proposalDetails.contactId : '';
    this.selectProject = (!this.switchIconManagement) ? this.getContactNameFromId( this.proposalDetails.contactId) : '';
    this.switchIconManagement = !this.switchIconManagement;
  }

  clickIconReceivable() {
    this.proposalDetails.accountReceivable = (!this.switchIconReceivable) ? this.proposalDetails.contactId : '';
    this.selectReceivable = (!this.switchIconReceivable) ? this.getContactNameFromId( this.proposalDetails.contactId) : '';
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
    console.log('select customer: ', event);
    this.proposalDetails.contactId = event.originalObject.id;
    this.selectedCustomer = this.customerList.filter( c => c.id === event.originalObject.id)[0];
  }

  onSelectProjectManagementContact(event) {
    this.proposalDetails.projectManagementContact = event.originalObject.id;
  }

  onSelectAccountReceivable(event) {
    this.proposalDetails.accountReceivable = event.originalObject.id;
  }

  onSelectProjectId(event) {
    this.proposalDetails.projectName = event.originalObject.id;
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
    console.log('item: ', item, this.items3);
    // this.items3 = this.items3.filter(function( obj ) {
    //   return obj.username !== item.username;
    // });
    this.proposalDetails.collaborators.push({name: item.label, imageUrl: item.imageUrl, username: item.username });
  }

  onSelectAccountManager(item: any) {
    this.selectedItem = item;
    // this.items3 = this.items3.filter(function( obj ) {
    //   return obj.id !== item.id;
    // });
    this.proposalDetails.accountManager = item;
  }

  onSelectProjectManager(item: any) {
    this.selectedItem = item;
    this.proposalDetails.projectManager = item;
  }

  onSelectDesigner(item: any) {
    this.selectedItem = item;
    this.proposalDetails.designer = item;
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
      this.proposalDetails.projectId = undefined;
    }
  }

  getSchduleRemain(event) {
    this.scheduleRemain = event.remaining;
    this.proposalDetails.paymentSchedule = event.keywords;
  }

  generateAutoId() {
    let month: any;
    let year: any;
    let count: any;
    const today = new Date();
    // just name is count: it is project ids list
    this.projectIDCount = this.proposalsList.map(p => p.projectId);
    month = today.getMonth() + 1;
    if (month.toString().length) {
      month = '0' + month;
    }
    year = today.getFullYear().toString().slice(-2);
    if (this.projectIDCount.length > 0) {
      count = this.projectIDCount.length + 1;
    } else {
      count = 1;
    }
    if (count.toString().length === 1) {
      count = '0' + count;
    }
    const projectId = 'PR_' + month + year + count;
    return projectId;
  }

  moveToProjectDetails() {

  }

  saveproposalDetails() {
  }

  getProjectCategories(event) {
    const projectCategories = event.map( k => k.id);
    this.proposalDetails.projectCategoriesAll = projectCategories;
    console.log('categories: ', event, this.proposalDetails.projectCategoriesAll);
  }

  getProjectSubCategories(event) {

    const projectSubCategories = event.map( k => k.id);
    this.proposalDetails.projectSubCategoriesAll = projectSubCategories;
    console.log('subcategories: ', event, this.proposalDetails.projectSubCategoriesAll);
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
      this.invalidProjectName = false;
      this.invalidAddress = false;
      this.invalidCity = false;
      this.invalidState = false;
      this.invalidCountry = false;
      this.invalidZipcode = false;
      this.invalidProjectType = false;
      this.invalidAccountReceivable = false;
      this.invalidClientProjectManager = false;
      this.invalidDesigner = false;
      if (this.proposalDetails.contactId && this.proposalDetails.collaborators.length
        && this.proposalDetails.projectName && this.proposalDetails.shippingAddress && this.proposalDetails.city
        && this.proposalDetails.state && this.proposalDetails.country && this.proposalDetails.zipcode && this.proposalDetails.projectType) {
          this.tabActiveSecond = true;
          this.tabActiveFirst = false;
          this.tabActiveThird = false;
          console.log('tabone-click: ', this.proposalDetails);
      } else {
        console.log('tabone-click1: ', this.proposalDetails);
        if (!this.proposalDetails.contactId) {
          this.invalidCustomerName = true;
        }
        if (!this.proposalDetails.collaborators.length) {
          this.invalidCollaborators = true;
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
        if (!this.proposalDetails.projectType) {
          this.invalidProjectType = true;
        }
        if (!this.proposalDetails.projectManagementContact) {
          this.invalidClientProjectManager = true;
        }
        if (!this.proposalDetails.accountReceivable ) {
          this.invalidAccountReceivable = true;
        }
        setTimeout(() => {
          this.tabActiveSecond = false;
          this.tabActiveFirst = true;
          this.tabActiveThird = false;
        });
      }
    } else if (pos === 'tab-two') {
      this.invalidProjectId = false;
      this.invalidSchedule = false;
      this.invalidAccountManager = false;
      this.invalidProjectManager = false;
      this.invalidDesigner = false;
      this.invalidSubCategory = false;
      this.invalidCategory = false;
      if (this.proposalDetails.projectId && (this.scheduleRemain === 0) && this.proposalDetails.accountManager
        && this.proposalDetails.projectManager && this.proposalDetails.designer && this.proposalDetails.projectCategoriesAll.length > 0
        && this.proposalDetails.projectSubCategoriesAll.length > 0) {
          this.tabActiveThird = true;
          this.tabActiveFirst = false;
          this.tabActiveSecond = false;
          console.log('111', this.proposalDetails);
      } else {
        console.log('222', this.proposalDetails);
        if (!this.proposalDetails.projectId) {
          this.invalidProjectId = true;
        }
        if (this.scheduleRemain !== 0) {
          this.invalidSchedule = true;
        }
        if (!this.proposalDetails.accountManager) {
          this.invalidAccountManager = true;
        }
        if (!this.proposalDetails.projectManager) {
          this.invalidProjectManager = true;
        }
        if (!this.proposalDetails.designer) {
          this.invalidDesigner = true;
        }
        if (!this.proposalDetails.projectCategoriesAll.length) {
          this.invalidCategory = true;
        }
        if (!this.proposalDetails.projectSubCategoriesAll.length) {
          this.invalidSubCategory = true;
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

  extractStringFromEditor(str) {
    const md = str.slice(3);
    return md.slice(-3);
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

  getContactNameFromId(id) {
    const selectedContact = this.customerList.filter(c => c.id === id)[0];
    return selectedContact.name;
  }

  finishAddProposal() {
    this.invalidScopeEditorContent = false;
    const collaborators = this.proposalDetails.collaborators.map(collaborator => collaborator.username);
    const savingProposalData = {
      'currencyId': 1,
      'contactId': this.proposalDetails.contactId,
      // 'leadId': 0,
      'projectId': this.proposalDetails.projectId,
      'projectTypeId': parseInt(this.proposalDetails.projectType, 10),
      'pricingCategoryId': this.proposalDetails.pricing ? parseInt(this.proposalDetails.pricing, 10) : undefined,
      'categoryIds': this.proposalDetails.projectCategoriesAll,
      'subcategoryIds': this.proposalDetails.projectSubCategoriesAll,
      'accountManager': this.proposalDetails.accountManager.username,
      'projectManager': this.proposalDetails.projectManager.username,
      'designer': this.proposalDetails.designer.username,
      'clientProjectManagerId': this.proposalDetails.projectManagementContact,
      'accountReceivableId': this.proposalDetails.accountReceivable,
      'name': this.proposalDetails.projectName,
      'shippingAddress': {
        'address': this.proposalDetails.shippingAddress,
        'city': this.proposalDetails.city,
        'province': this.proposalDetails.state,
        'postalCode': this.proposalDetails.zipcode,
        'country': this.proposalDetails.country
      },
      'paymentSchedule': this.proposalDetails.paymentSchedule,
      'scopeOfWork': this.scopeEditorContent,
      'clientNote': this.extractStringFromEditor(this.clientNoteContent),
      'internalNote': this.extractStringFromEditor(this.internalNoteContent),
      'completionDate': this.proposalDetails.completionDate,
      'discount': {
        'value': this.proposalDetails.discount.amount,
        'unit': this.proposalDetails.discount.type
      },
      'collaborators': collaborators,
      'taxRateId': parseInt(this.proposalDetails.taxRate.toString(), 10)
    };

    if (this.scopeEditorContent) {
      console.log('saving_proposal: ', savingProposalData);
      this.proposalsService.createProposal(savingProposalData).subscribe(res => {
        console.log('created proposal: ', res);
        this.salesService.proposalAdded.next(true);
      });
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
