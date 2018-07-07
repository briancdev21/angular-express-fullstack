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
import { CompleterService } from 'ng2-completer';

@Component({
  selector: 'app-projectdetails',
  templateUrl: './projectdetails.component.html',
  styleUrls: [
    './projectdetails.component.css',
  ]
})

export class ProjectDetailsComponent implements OnInit {
  @ViewChild('tabsRef', {read: ElementRef}) tabsRef: ElementRef;

  @Input() set projectDetailsData(val) {
    if (val !== undefined) {
      this.projectDetails = val;
      console.log('project details with value:', this.projectDetails);
      // Get categories and Subcateogries
      this.categories = this.projectDetails.projectCategoriesAll;
      this.subCategories = this.projectDetails.projectSubCategoriesAll;
      this.clientNote = this.projectDetails.clientNote;
      this.internalNote = this.projectDetails.internalNote;
      this.shippingAddress = this.projectDetails.shippingAddress;
      this.collaborators = this.projectDetails.collaborators;
      this.projectManager = this.projectDetails.projectManager.username;
      // Get client project manager id:
      // tslint:disable-next-line:max-line-length
      const clientProjectManagerContact = this.contactsList.filter(contact => contact.id === parseInt(this.projectDetails.clientProjectManagerId.split('-').pop(), 10));
      this.clientProjectManager = clientProjectManagerContact[0]['name'];

      // Get client project manager id:
      // tslint:disable-next-line:max-line-length
      const accountReceivableData = this.contactsList.filter(contact => contact.id === parseInt(this.projectDetails.accountReceivableId.split('-').pop(), 10));
      this.selectReceivable = accountReceivableData[0]['name'];

      // Get customer name:
      // tslint:disable-next-line:max-line-length
      const contactData = this.contactsList.filter(contact => contact.id === parseInt(this.projectDetails.contactId.split('-').pop(), 10));
      this.customerName = contactData[0].name;


      // Get Project Type
      // tslint:disable-next-line:max-line-length
      this.projectType = parseInt(this.projectDetails.accountReceivableId.split('-').pop(), 10);
     }
  }

  @Input() proposalDetails;

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
//
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
    type: '',
    amount: ''
  },
  projectCategoriesAll: undefined,
  projectSubCategoriesAll: undefined,
  name: '',
  internalNote: '',
  clientNote: '',
  shippingAddress: {
    address: '',
    city: '',
    province: '',
    country: '',
    postalCode: '',
  },
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
  scheduleRemain: any;
  showDialog = false;
  projectCategory = [];
  clientProjectManager: any;
  selectReceivable: any;

  invalidCustomerName = false;
  invalidCollaborators = false;
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
  customersData: any;

  userInfo = {
    name: 'John Moss',
    role: 'Vice President / Sales Department',
    profileLink: 'assets/users/John Moss.jpg',
    email: 'john.moss@gmail.com',
    primaryphone: '4038935433',
    mobilephone: '4037101212',
    shippingaddress: {
      address: '2222 Crescent Hill Dr SW',
      city: 'Calgary',
      state: 'AB',
      country: 'Canada',
      zipcode: 'T3C 0J4'
    },
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
      pictureURI: 'assets/users/user1.png',
      profileLink: 'crm/contacts/michael',
      name: 'Michael'
    },
    {
      pictureURI: 'assets/users/user2.png',
      profileLink: 'crm/contacts/joseph',
      name: 'Joseph'
    }]
  };

  public timelineData: Array<Object> = [
    {
      title: 'Meeting',
      icon: 'fa-home',
      content: 'Conference on the sales for the previous year. Monica please examine sales trends in marketing and products.\
       Below please find the currnet status of the sale',
      timelineBtnColor: 'green-btn',
      buttontitle: 'More Info',
      date: '2018-1-9',
      buttonClickEventHandlerName: 'getMoreInfo'
    },
    {
      title: 'Send Document to Mike',
      icon: 'fa-file-text-o',
      content: 'Conference on the sales for the previous year. Monica please examine sales trends in marketing and products.\
       Below please find the currnet status of the sale',
      timelineBtnColor: 'blue-btn',
      buttontitle: 'Download document',
      date: '2018-1-9',
      buttonClickEventHandlerName: 'downloadDoc'
    },
    {
      title: 'Coffee Break',
      icon: 'fa-coffee',
      content: 'Conference on the sales for the previous year. Monica please examine sales trends in marketing and products.\
       Below please find the currnet status of the sale',
      timelineBtnColor: 'lime-btn',
      buttontitle: 'Read more',
      date: '2018-1-8',
      buttonClickEventHandlerName: 'readMoreCoffee'
    },
    {
      title: 'Phone with Jeronimo',
      icon: 'fa-phone',
      content: 'Following step to complete',
      timelineBtnColor: 'orange-btn',
      buttontitle: 'Download doc',
      date: '2018-1-7',
      buttonClickEventHandlerName: 'downloadDoc'
    }
  ];

  proposalId: any;
  contactsList = [];
  projectTypeList = [];
  proposalPricingList = [];

  // tslint:disable-next-line:max-line-length
  constructor( private proposalService: ProposalService, private route: ActivatedRoute, private sharedService: SharedService, private completerService: CompleterService,
    private proposalsService: ProposalsService ) {
    this.proposalId = this.route.snapshot.paramMap.get('id');

    this.sharedService.getPricingCategories().subscribe(res => {
      this.proposalPricingList = res.results;
    });

    this.sharedService.getProjectTypes().subscribe(res => {
      this.projectTypeList = res.results;
    });

    this.sharedService.getContacts().subscribe(data => {
      data = this.addContactName(data);
      this.contactsList = data;
      this.customersData = this.completerService.local(this.contactsList, 'name', 'name');

      this.proposalsService.getIndividualProposal(this.proposalId).subscribe(res => {
        console.log('project details service: ', res);
        this.proposalInfo = res.data;
        // {
        //   proposalId : res.data.id,
        //   contactName : this.getContactNameFromId(res.data.contactId),
        //   projectName: res.data.name,
        //   projectType: 'New Construction',
        //   proposalAmount: res.data.total,
        //   dealStatus: res.data.status,
        //   revision: res.data.revision,
        //   createdDate: moment(res.data.updatedAt).format('MMMM DD, YYYY'),
        //   owner: [
        //     {
        //     pictureURI: 'assets/users/user1.png',
        //     profileLink: 'crm/contacts/michael',
        //     name: 'Michael'
        //     }
        //   ],
        // };
      });
    });
    // this.sharedService.getCategories().subscribe(data => {
    //   this.projectCategory = data.results;
    // });
    // this.sharedService.getSubCategories(this.categoryId).subscribe(data => {
    //   this.subCategories = data.results;
    // });
    console.log('proposals info: ', this.proposalInfo);
    const comp = this;
    document.addEventListener('click', function() {
      comp.editable = false;
      comp.accountEditable = false;
      comp.projectEditable = false;
      comp.designerEditable = false;
    });

    this.sharedService.getUsers().subscribe(res => {
      // this.userList = res;
      const details = [];
      const nameList = res.map(contact => {
        return {
          username: contact.username,
          pictureURI: contact.pictureURI
        };
      });
      console.log('nameList:', nameList);
      this.items2 = nameList;
      const itemList = [];
      this.items2.map(contact => {
        let hasSameValue = false;
        for (let i = 0; i < this.collaborators.length; i++) {
          if (contact.username === this.collaborators[i].username) {
            hasSameValue = true;
            break;
          }
        }
        if (!hasSameValue) {
          itemList.push(contact);
        }
      });
      this.items2 = itemList;
// Get AccountManagerList
      this.items3 = nameList;
      const accountManagerList = [];
      this.items3.map(contact => {
        let hasSameValue = false;
        if (contact.username === this.projectDetails.accountManager.username) {
          hasSameValue = true;
        }
        if (!hasSameValue) {
          accountManagerList.push(contact);
        }
      });
      this.items3 = accountManagerList;

    // Get projectManagerlist
      this.items4 = nameList;
      const projectManagerList = [];
      this.items4.map(contact => {
        let hasSameValue = false;
          if (contact.username === this.projectDetails.projectManager.username) {
            hasSameValue = true;
          }
        if (!hasSameValue) {
          projectManagerList.push(contact);
        }
      });
      this.items4 = projectManagerList;
    // Get Designer List
      this.items5 = nameList;
      const designerList = [];
      this.items5.map(contact => {
        let hasSameValue = false;
          if (contact.username === this.projectDetails.designer.username) {
            hasSameValue = true;
          }
        if (!hasSameValue) {
          designerList.push(contact);
        }
      });
      this.items5 = designerList;
    });
  }

  clickIconShipping() {
    this.switchIconShipping = !this.switchIconShipping;
    this.projectDetails.shippingAddress.address = (this.switchIconShipping) ? this.userInfo.shippingaddress.address : '';
    this.projectDetails.shippingAddress.city = (this.switchIconShipping) ? this.userInfo.shippingaddress.city : '';
    this.projectDetails.shippingAddress.province = (this.switchIconShipping) ? this.userInfo.shippingaddress.state : '';
    this.projectDetails.shippingAddress.country = (this.switchIconShipping) ? this.userInfo.shippingaddress.country : '';
    this.projectDetails.shippingAddress.postalCode = (this.switchIconShipping) ? this.userInfo.shippingaddress.zipcode : '';
  }

  clickIconManagement() {
    // tslint:disable-next-line:max-line-length
    this.proposalDetails.clientProjectManagerId = (this.switchIconManagement) ? this.proposalDetails.contactId : undefined;
    this.switchIconManagement = !this.switchIconManagement;
    this.clientProjectManager = (this.switchIconManagement) ? this.customerName : '';
  }

  clickIconReceivable() {
    // tslint:disable-next-line:max-line-length
    this.proposalDetails.accountReceivableId = (this.switchIconReceivable) ? this.proposalDetails.contactId : undefined;
    this.selectReceivable = (!this.switchIconReceivable) ? this.getContactNameFromId( this.proposalDetails.contactId) : '';
    this.switchIconReceivable = !this.switchIconReceivable;
  }

  ngOnInit() {
    this.editable = false;
    this.userInfo.followers.forEach(element => {
      this.items2 = this.items2.filter(function( obj ) {
        return obj.username !== element.name;
      });
    });

    // Update project id field with proposal info.
    // this.projectDetails.projectId = this.proposalInfo.proposalId;
  }

  getSchduleRemain(event) {
    this.scheduleRemain = event;
    this.proposalDetails.paymentSchedule = event;
    this.updateProjectDetails();
  }

  onSelect(item: any) {
    console.log('selected user:', item);
    this.selectedItem = item;
    this.items2 = this.items2.filter(function( obj ) {
      return obj.username !== item.username;
    });
    this.collaborators.push({username: item.username, pictureURI: item.pictureURI });
    this.proposalDetails.collaborators.push(item.username);
    this.updateProjectDetails();
  }

  onSelectAccountManager(item: any) {
    this.selectedItem = item;
    this.items3 = this.items3.filter(function( obj ) {
      return obj.username !== item.username;
    });
    this.projectDetails.accountManager = {username: item.username, pictureURI: item.pictureURI };
    this.proposalDetails.accountManager = item.username;
    this.updateProjectDetails();
  }

  onSelectProjectManager(item: any) {
    this.selectedItem = item;
    this.items4 = this.items4.filter(function( obj ) {
      return obj.username !== item.username;
    });
    this.projectDetails.projectManager = {username: item.username, pictureURI: item.pictureURI };
    this.proposalDetails.projectManager = item.username;
    this.updateProjectDetails();
  }

  onSelectDesigner(item: any) {
    this.selectedItem = item;
    this.items5 = this.items5.filter(function( obj ) {
      return obj.username !== item.username;
    });
    this.projectDetails.designer = {username: item.username, pictureURI: item.pictureURI };
    this.proposalDetails.designer = item.username;
    this.updateProjectDetails();
  }


  onInputChangedEvent(val: string) {
    this.inputChanged = val;
  }

  removeUser(i: number) {
    const item = this.projectDetails.collaborators[i];
    this.items2.push({id: this.items2.length, username: item.username, pictureURI: item.pictureURI});
    this.projectDetails.collaborators.splice(i, 1);
    this.isAutocompleteUpdated2 = !this.isAutocompleteUpdated2;
  }

  removeAccountManager(i: number) {
    const item = this.projectDetails.accountManager;
    this.items2.push({id: this.items2.length, username: item.username, pictureURI: item.pictureURI});
    this.projectDetails.accountManager = undefined;
    this.isAutocompleteUpdated3 = !this.isAutocompleteUpdated3;
  }

  removeProjectManager (i: number) {
    const item = this.projectDetails.projectManager;
    this.items2.push({id: this.items2.length, username: item.username, pictureURI: item.pictureURI});
    this.projectDetails.projectManager = undefined;
    this.isAutocompleteUpdated4 = !this.isAutocompleteUpdated4;
  }

  removeDesigner (i: number) {
    const item = this.projectDetails.designer;
    this.items2.push({id: this.items2.length, username: item.username, pictureURI: item.pictureURI});
    this.projectDetails.designer = undefined;
    this.isAutocompleteUpdated5 = !this.isAutocompleteUpdated5;
  }


  getProjectCategories(event) {
    const projectCategories = event.map( k => k.id);
    this.projectDetails.projectCategoriesAll = projectCategories;
    console.log('categories: ', event, this.projectDetails.projectCategoriesAll);
    this.updateProjectDetails();
  }

  getProjectSubCategories(event) {

    const projectSubCategories = event.map( k => k.id);
    this.projectDetails.projectSubCategoriesAll = projectSubCategories;
    console.log('subcategories: ', event, this.projectDetails.projectSubCategoriesAll);
    this.updateProjectDetails();
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

  getContactNameFromId(id) {
    const idCroped = id.slice(-1);
    const selectedContact = this.contactsList.filter(c => c.id.toString() === idCroped)[0];
    if (selectedContact.type === 'PERSON') {
      return selectedContact.person.firstName + ' ' + selectedContact.person.lastName;
    } else {
      return selectedContact.business.name;
    }
  }

  onSelectCustomer(event) {
    console.log('select customer: ', event);
    this.proposalDetails.contactId = event.originalObject.id;
    this.customerName = event.originalObject.name;
  }

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
    this.invalidState = false;
    this.invalidCountry = false;
    this.invalidZipcode = false;
    if (this.projectDetails.customerName && this.projectDetails.collaborators.length
      && this.projectDetails.projectName && this.projectDetails.shippingAddress && this.projectDetails.shippingAddress.city
      && this.projectDetails.shippingAddress.province
      && this.projectDetails.shippingAddress.country &&
      this.projectDetails.shippingAddress.postalCode) {
        this.ProposalInfoModalCollapsed = true;
        this.showProposalInfo = false;
    } else {
      if (!this.projectDetails.customerName) {
        this.invalidCustomerName = true;
      }
      if (!this.projectDetails.collaborators.length) {
        this.invalidCollaborators = true;
      }
      if (!this.projectDetails.projectName) {
        this.invalidProjectName = true;
      }
      if (!this.projectDetails.shippingAddress) {
        this.invalidAddress = true;
      }
      if (!this.projectDetails.shippingAddress.city) {
        this.invalidCity = true;
      }
      if (!this.projectDetails.shippingAddress.province) {
        this.invalidState = true;
      }
      if (!this.projectDetails.shippingAddress.country) {
        this.invalidCountry = true;
      }
      if (!this.projectDetails.shippingAddress.postalCode) {
        this.invalidZipcode = true;
      }
    }
  }

  onChangeInternalNote(event) {
    this.proposalDetails.internalNote = event.target.value;
    this.updateProjectDetails();
  }
  onChangeClientNote(event) {
    this.proposalDetails.clientNote = event.target.value;
    this.updateProjectDetails();
  }
  onChangeCustomerName(event) {
    this.proposalDetails.name = event.target.value;
    this.updateProjectDetails();
  }
  onSelectProjectManagementContact(event) {
    console.log('client project manager id:', event.originalObject);
    this.proposalDetails.clientProjectManagerId = event.originalObject.id;
    this.clientProjectManager = event.originalObject.name;
    this.updateProjectDetails();
  }

  onSelectAccountReceivable(event) {
    this.proposalDetails.accountReceivableId = event.originalObject.id;
    this.selectReceivable = event.originalObject.name;
    this.updateProjectDetails();
  }

  onSelectAssociation(event) {
    this.proposalDetails.association = event.target.value;
  }
  onChangePricingCategory(event) {
    this.updateProjectDetails();
  }
  onChangeProjectName(event) {
    this.proposalDetails.name = event.target.value;
    this.updateProjectDetails();
  }
  onChangeProjectType(event) {
    this.proposalDetails.projectTypeId = parseInt(event.target.value, 10);
    this.updateProjectDetails();
  }
  onChangeShippingAddress(event, type) {
    this.proposalDetails.shippingAddress[type] = event.target.value;
    this.updateProjectDetails();
  }

  updateProjectDetails() {
    console.log('project details are updating:', this.proposalDetails);
    this.proposalDetails.contactId = parseInt(this.proposalDetails.toString().split('-').pop(), 10);
    this.proposalDetails.clientProjectManagerId = parseInt(this.proposalDetails.clientProjectManagerId.split('-').pop(), 10);
    this.proposalDetails.accountReceivableId = parseInt(this.proposalDetails.accountReceivableId.split('-').pop(), 10);
    this.proposalDetails.clientNote = this.proposalDetails.clientNote ?  this.proposalDetails.clientNote : '';
    this.proposalDetails.internalNote = this.proposalDetails.internalNote ? this.proposalDetails.internalNote : '';
    this.proposalsService.updateIndividualProposal(this.proposalId, this.proposalDetails).subscribe(res => {
      console.log('proposal updated');
    });
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
