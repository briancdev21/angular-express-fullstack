import { Component, Input, ViewChild, ElementRef, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MultiKeywordSelectComponent } from '../../../profile/multikeywordselect/multikeywordselect.component';
import { Ng2TimelineComponent } from '../../../profile/ng2-timeline/ng2timeline.component';
import { ProposalService } from '../proposal.service';
import { ScheduleMultiKeywordComponent } from '../schedulemultikeyword/schedulemultikeyword.component';
import { ProductsService } from '../../../../services/inventory/products.service';
import { SharedService } from '../../../../services/shared.service';
import { ProposalsService } from '../../../../services/proposals.service';
import * as moment from 'moment';
import { CompleterService, CompleterData } from 'ng2-completer';
import { ProjectsService } from '../../../../services/projects.service';
import { SalesService } from '../../sales.service';

@Component({
  selector: 'app-projectdetails',
  templateUrl: './projectdetails.component.html',
  styleUrls: [
    './projectdetails.component.css',
  ]
})

export class ProjectDetailsComponent implements OnInit {
  @ViewChild('tabsRef', {read: ElementRef}) tabsRef: ElementRef;

  // @Input() set projectDetailsData(val) {
  //   if (val !== undefined) {
  //     this.projectDetails = val;
  //     console.log('project details with value:', this.projectDetails);
  //     // Get categories and Subcateogries
  //     this.categories = this.projectDetails['categoryIds'];
  //     this.subCategories = this.projectDetails['subcategoryIds'];
  //     this.clientNote = this.projectDetails.clientNote;
  //     this.internalNote = this.projectDetails.internalNote;
  //     this.shippingAddress = this.projectDetails.shippingAddress;
  //     this.collaborators = this.projectDetails.collaborators;
  //     this.projectManager = this.projectDetails.projectManager.username;
  //     // Get client project manager id:
  //     // tslint:disable-next-line:max-line-length
  //     const clientProjectManagerContact =
  //       this.contactsList.filter(contact => contact.id === parseInt(this.projectDetails.clientProjectManagerId.split('-').pop(), 10));
  //     this.clientProjectManager = clientProjectManagerContact[0]['name'];

  //     // Get client project manager id:
  //     // tslint:disable-next-line:max-line-length
  //     const accountReceivableData =
  //      this.contactsList.filter(contact => contact.id === parseInt(this.projectDetails.accountReceivableId.split('-').pop(), 10));
  //     this.selectReceivable = accountReceivableData[0]['name'];

  //     // Get customer name:
  //     // tslint:disable-next-line:max-line-length
  //     const contactData = this.contactsList.filter(contact =>
  //       contact.id === parseInt(this.projectDetails.contactId.split('-').pop(), 10));
  //     this.customerName = contactData[0].username;


  //     // Get Project Type
  //     // tslint:disable-next-line:max-line-length
  //     this.projectType = parseInt(this.projectDetails.accountReceivableId.split('-').pop(), 10);
  //    }
  // }

// Project Details Properties
clientNote: string;
internalNote: string;
customerName: string;
projectType: number;

shippingAddress = {
  address: '',
  city: '',
  province: '',
  country: '',
  postalCode: '',
};




projectDetails = {
  contactId: undefined,
  clientProjectManagerId: undefined,
  accountReceivableId: undefined,
  accountManager: {
    username: '',
    pictureURI: ''
  },
  projectManager: {
    username: '',
    pictureURI: ''
  },
  designer: {
    username: '',
    pictureURI: ''
  },
  discount: {
    value: '',
    unit: ''
  },
  projectCategoriesAll: undefined,
  projectSubCategoriesAll: undefined,
  name: '',
  internalNote: '',
  clientNote: '',
  address: '',
  city: '',
  province: '',
  country: '',
  postalCode: '',
  collaborators: [],
  customerName: '',
  projectName: '',
  projectId: undefined,
  paymentSchedule: []
};

  collaborators  = [];
  categories = [];
  subCategories = [];
  proposalInfo: any;
  sidebarCollapsed = true;
  ProposalInfoModalCollapsed = true;
  tabActiveFirst = true;
  tabActiveSecond = false;
  tabActiveThird = false;
  switchIconManagement = false;
  switchIconReceivable = false;
  switchIconShipping = true;
  receivable = '';
  showProposalInfo = false;
  scheduleRemain: number;
  showDialog = false;
  projectCategory = [];
  clientProjectManager: any;
  selectReceivable: any;

  invalidCustomerName = false;
  invalidCollaborators = false;
  invalidProjectName = false;
  invalidAddress = false;
  invalidCity = false;
  invalidProvince = false;
  invalidCountry = false;
  invalidPostalCode = false;
  invalidProjectId = false;
  invalidSchedule = false;
  invalidAccountManager = false;
  invalidProjectManager = false;
  isAutocompleteUpdated2 = false;
  isAutocompleteUpdated3 = false;
  isAutocompleteUpdated4 = false;
  isAutocompleteUpdated5 = false;
  invalidClientProjectManager = false;

  projectManager = '';
  editable: boolean;
  accountEditable: boolean;
  projectEditable: boolean;
  designerEditable: boolean;
  newKeyword: string;
  selectedItem: any = '';
  inputChanged: any = '';
  items2 = [];
  config2: any = {'placeholder': 'Type here', 'sourceField': 'label'};
  items3 = [];
  items4 = [];
  items5 = [];

  public timelineData: Array<Object> = [
  ];

  proposalId: any;
  contactsList = [];
  projectTypeList = [];
  proposalPricingList = [];

  //////////////////////////////////////////////

  today = new Date();

  proposalDetails = {
    discount: {
      value: 0,
      unit: 'AMOUNT'
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
    address: '',
    city: '',
    province: '',
    country: '',
    postalCode: '',
    pricing: undefined,
    projectName: '',
    projectType: undefined,
    collaborators: [
    ],
    accountManager: undefined,
    projectManager: undefined,
    designer: undefined,
    taxRateId: 1,
    pricingCategoryId: 1,
    internalNote: '',
    clientNote: '',
    clientProjectManagerId: '',
    accountReceivableId: '',
    collaboratorsData: undefined,
    projectTypeId: undefined
  };

  userInfo = {
    name: '',
    role: '',
    profileLink: '',
    email: '',
    primaryphone: '',
    mobilephone: '',
    address: '',
    city: '',
    province: '',
    country: '',
    postalCode: '',
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
  scopeEditorContent = 'Test';

  switchIconAutoId = false;
  showAddProposalModal = false;
  addProposalModalCollapsed = true;
  projectIDCount = [];
  invalidPricing = false;
  invalidProjectType = false;
  invalidScopeEditorContent = false;
  invalidAccountReceivable = false;
  invalidDesigner = false;
  invalidCategory = false;
  invalidSubCategory = false;
  selectProject = '';

  invalidFirstname = false;
  selectName: any;
  selectAssociation: any;
  selectType: any;
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

  // tslint:disable-next-line:max-line-length
  constructor( private proposalService: ProposalService, private route: ActivatedRoute, private sharedService: SharedService,
    private proposalsService: ProposalsService, private completerService: CompleterService, private projectsService: ProjectsService, private salesService: SalesService ) {
    this.proposalId = this.route.snapshot.paramMap.get('id');

    const comp = this;

    document.addEventListener('click', function() {
      comp.editable = false;
      comp.accountEditable = false;
      comp.projectEditable = false;
      comp.designerEditable = false;
    });

    this.sharedService.getPricingCategories().subscribe(res => {
      this.proposalPricingList = res.results;
    });

    this.sharedService.getProjectTypes().subscribe(res => {
      this.projectTypeList = res.results;
    });

    this.projectsService.getProjectsList().subscribe(project => {
      this.projectsList = project.results;
      this.projectsData = this.completerService.local(this.projectsList, 'name', 'name');

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

          this.proposalsService.getIndividualProposal(this.proposalId).subscribe(response => {
            this.proposalInfo = response.data;
            console.log('this proposalinf', response);
            this.proposalDetails = response.data;
            this.selectName = this.getContactCustomerNameFromId(this.proposalDetails.contactId);
            this.selectProject = this.getContactNameFromId(this.proposalDetails.clientProjectManagerId);
            this.selectReceivable = this.getContactNameFromId(this.proposalDetails.accountReceivableId);
            this.proposalDetails['collaboratorsData'] = [];
            this.proposalDetails.collaborators.forEach(ele => {
              const selectUser = this.usersList.filter(u => u.username === ele)[0];
              this.proposalDetails['collaboratorsData'].push(selectUser);
            });
            this.proposalDetails.address = this.proposalInfo.shippingAddress.address;
            this.proposalDetails.city = this.proposalInfo.shippingAddress.city;
            this.proposalDetails.province = this.proposalInfo.shippingAddress.province;
            this.proposalDetails.country = this.proposalInfo.shippingAddress.country;
            this.proposalDetails.postalCode = this.proposalInfo.shippingAddress.postalCode;

            this.proposalDetails.projectName = this.proposalInfo.name;
            this.proposalInfo.paySchedule = this.proposalDetails.paymentSchedule;
            this.proposalDetails.projectManager = this.usersList.filter(u => u.username === this.proposalDetails.projectManager)[0];
            this.proposalDetails.projectManager.imageUrl = this.proposalDetails.projectManager.pictureURI;
            this.proposalDetails.accountManager = this.usersList.filter(u => u.username === this.proposalDetails.accountManager)[0];
            this.proposalDetails.accountManager.imageUrl = this.proposalDetails.accountManager.pictureURI;
            this.proposalDetails.designer = this.usersList.filter(u => u.username === this.proposalDetails.designer)[0];
            this.proposalDetails.designer.imageUrl = this.proposalDetails.designer.pictureURI;
            console.log('$$$ ', this.proposalDetails);
          });
        });
      });
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
    this.proposalDetails.address = (this.switchIconShipping) ? this.selectedCustomer.shippingAddress.address : '';
    this.proposalDetails.city = (this.switchIconShipping) ? this.selectedCustomer.shippingAddress.city : '';
    this.proposalDetails.province = (this.switchIconShipping) ? this.selectedCustomer.shippingAddress.province : '';
    this.proposalDetails.country = (this.switchIconShipping) ? this.selectedCustomer.shippingAddress.country : '';
    this.proposalDetails.postalCode = (this.switchIconShipping) ? this.selectedCustomer.shippingAddress.postalCode : '';
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
    this.proposalDetails.collaboratorsData.push({name: item.label, imageUrl: item.imageUrl, username: item.username });
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

  // saveProjectDetails() {
  //   let total = 0;
  //   for (let i = 0; i < this.projectDetails.paymentSchedule.length ; i ++) {
  //     total = total + parseInt(this.projectDetails.paymentSchedule[i], 10);
  //   }

  //   if (total === 100) {
  //     this.ProposalInfoModalCollapsed = true;
  //     this.showProposalInfo = false;
  //     this.sharedService.postProposalDiscount(
  //       {
  //         amount: this.projectDetails.discount.amount,
  //         type: this.projectDetails.discount.type
  //       }
  //     );
  //   }
  // }

  saveProjectDetails() {
    this.invalidProjectId = false;
    this.invalidSchedule = false;
    this.invalidAccountManager = false;
    this.invalidProjectManager = false;
    if (this.projectDetails.projectId && (this.scheduleRemain === 0) && this.projectDetails.accountManager
      && this.projectDetails.projectManager) {
        this.ProposalInfoModalCollapsed = true;
        this.showProposalInfo = false;
    } else {
      if (!this.projectDetails.projectId) {
        this.invalidProjectId = true;
      }
      if (this.scheduleRemain !== 0) {
        this.invalidSchedule = true;
      }
      if (!this.projectDetails.accountManager) {
        this.invalidAccountManager = true;
      }
      if (!this.projectDetails.projectManager) {
        this.invalidProjectManager = true;
      }
    }
  }

  saveClientDetails() {
    this.invalidCustomerName = false;
    this.invalidCollaborators = false;
    this.invalidProjectName = false;
    this.invalidAddress = false;
    this.invalidCity = false;
    this.invalidProvince = false;
    this.invalidCountry = false;
    this.invalidPostalCode = false;
    this.invalidProjectType = false;
    this.invalidAccountReceivable = false;
    this.invalidClientProjectManager = false;

    if (this.proposalDetails.contactId && this.proposalDetails.collaborators.length
      && this.proposalDetails.projectName && this.proposalDetails.address && this.proposalDetails.city
      && this.proposalDetails.province && this.proposalDetails.country &&
      this.proposalDetails.postalCode && this.proposalDetails.projectTypeId) {
        this.ProposalInfoModalCollapsed = true;
        this.showProposalInfo = false;
        this.updateProjectDetails();
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
        if (!this.proposalDetails.address) {
          this.invalidAddress = true;
        }
        if (!this.proposalDetails.city) {
          this.invalidCity = true;
        }
        if (!this.proposalDetails.province) {
          this.invalidProvince = true;
        }
        if (!this.proposalDetails.country) {
          this.invalidCountry = true;
        }
        if (!this.proposalDetails.postalCode) {
          this.invalidPostalCode = true;
        }
        if (!this.proposalDetails.projectTypeId) {
          this.invalidProjectType = true;
        }
        if (!this.proposalDetails.projectManagementContact) {
          this.invalidClientProjectManager = true;
        }
        if (!this.proposalDetails.accountReceivable ) {
          this.invalidAccountReceivable = true;
        }
      }
  }

  onChangeInternalNote(event) {
    this.proposalDetails.internalNote = event.target.value;
    this.updateProjectDetails();
  }
  onChangeClientNote(event) {
    this.proposalDetails.clientNote = event.target.value;
    console.log('client notes: ', event);
    this.updateProjectDetails();
  }


  updateProjectDetails() {
    console.log('Updated Proposal data: ', this.proposalDetails);
    // console.log('project details are updating:', this.proposalDetails);
    // this.proposalDetails.contactId = parseInt(this.proposalDetails.contactId.toString().split('-').pop(), 10);
    // this.proposalDetails.clientProjectManagerId = parseInt(this.proposalDetails.clientProjectManagerId.split('-').pop(), 10);
    // this.proposalDetails.accountReceivableId = parseInt(this.proposalDetails.accountReceivableId.split('-').pop(), 10);
    // this.proposalDetails.clientNote = this.proposalDetails.clientNote ?  this.proposalDetails.clientNote : '';
    // this.proposalDetails.internalNote = this.proposalDetails.internalNote ? this.proposalDetails.internalNote : '';
    // this.proposalsService.updateIndividualProposal(this.proposalId, this.proposalDetails).subscribe(res => {
    //   console.log('proposal updated');
    // });
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

  selectCompletionDate(start) {
    this.proposalDetails.completionDate = moment(start.value).format('YYYY-MM-DD');
    // this.formattedStartDate = moment(start.value).format('MMMM DD, YYYY');
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
      this.invalidProvince = false;
      this.invalidCountry = false;
      this.invalidPostalCode = false;
      this.invalidProjectType = false;
      this.invalidAccountReceivable = false;
      this.invalidClientProjectManager = false;

      if (this.proposalDetails.contactId && this.proposalDetails.collaborators.length
        && this.proposalDetails.projectName && this.proposalDetails.address && this.proposalDetails.city
        && this.proposalDetails.province && this.proposalDetails.country &&
        this.proposalDetails.postalCode && this.proposalDetails.projectType) {
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
        if (!this.proposalDetails.address) {
          this.invalidAddress = true;
        }
        if (!this.proposalDetails.city) {
          this.invalidCity = true;
        }
        if (!this.proposalDetails.province) {
          this.invalidProvince = true;
        }
        if (!this.proposalDetails.country) {
          this.invalidCountry = true;
        }
        if (!this.proposalDetails.postalCode) {
          this.invalidPostalCode = true;
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
      this.invalidDesigner = false;
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
    const updatedId = parseInt(id.split('-').pop(), 10);
    const selectedContact = this.customerList.filter(c => c.id === updatedId)[0];
    return selectedContact.name;
  }

  getContactCustomerNameFromId(id) {
    const updatedId = parseInt(id.split('-').pop(), 10);
    this.selectedCustomer = this.customerList.filter(c => c.id === updatedId)[0];
    return this.selectedCustomer.name;
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
      'pricingCategoryId': this.proposalDetails.pricingCategoryId ?
        parseInt(this.proposalDetails.pricingCategoryId.toString(), 10) : undefined,
      'categoryIds': this.proposalDetails.projectCategoriesAll,
      'subcategoryIds': this.proposalDetails.projectSubCategoriesAll,
      'accountManager': this.proposalDetails.accountManager.username,
      'projectManager': this.proposalDetails.projectManager.username,
      'designer': this.proposalDetails.designer.username,
      'clientProjectManagerId': this.proposalDetails.projectManagementContact,
      'accountReceivableId': this.proposalDetails.accountReceivable,
      'name': this.proposalDetails.projectName,
      'shippingAddress': {
        'address': this.proposalDetails.address,
        'city': this.proposalDetails.city,
        'province': this.proposalDetails.province,
        'postalCode': this.proposalDetails.postalCode,
        'country': this.proposalDetails.country
      },
      'paymentSchedule': this.proposalDetails.paymentSchedule,
      'scopeOfWork': this.scopeEditorContent,
      'clientNote': this.extractStringFromEditor(this.clientNoteContent),
      'internalNote': this.extractStringFromEditor(this.internalNoteContent),
      'completionDate': this.proposalDetails.completionDate,
      'discount': {
        'value': this.proposalDetails.discount.value,
        'unit': this.proposalDetails.discount.unit
      },
      'collaborators': collaborators,
      'taxRateId': parseInt(this.proposalDetails.taxRateId.toString(), 10)
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
