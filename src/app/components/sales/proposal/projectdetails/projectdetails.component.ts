import { Component, Input, ViewChild, ElementRef, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MultiKeywordSelectComponent } from '../../../profile/multikeywordselect/multikeywordselect.component';
import { Ng2TimelineComponent } from '../../../profile/ng2-timeline/ng2timeline.component';
import { SharedService } from '../shared.service';
import { ScheduleMultiKeywordComponent } from '../schedulemultikeyword/schedulemultikeyword.component';



@Component({
  selector: 'app-projectdetails',
  templateUrl: './projectdetails.component.html',
  styleUrls: [
    './projectdetails.component.css',
  ]
})

export class ProjectDetailsComponent implements OnInit {
  @ViewChild('tabsRef', {read: ElementRef}) tabsRef: ElementRef;
  @Input() projectCategory;
  @Input() projectSubCategory;
  @Input() proposalInfo;
  @Input() projectDetails;
  @Output() sendUpdatedCategories: EventEmitter<any> = new EventEmitter;
  @Output() sendUpdatedSubCategories: EventEmitter<any> = new EventEmitter;

  sidebarCollapsed = true;
  ProposalInfoModalCollapsed = true;
  tabActiveFirst = true;
  tabActiveSecond = false;
  tabActiveThird = false;
  switchIconManagement: boolean = true;
  switchIconReceivable: boolean = true;
  switchIconShipping: boolean = true;
  projectManager: string = '';
  receivable: string = '';
  showProposalInfo = false;
  scheduleRemain: any;
  showDialog = false;

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

  editable: boolean;
  accountEditable: boolean;
  projectEditable: boolean;
  designerEditable: boolean;
  newKeyword: string;
  selectedItem: any = '';
  inputChanged: any = '';
  items2: any[] = [
    {id: 0, label: 'Michael', imageUrl: 'assets/users/user1.png'},
    {id: 1, label: 'Joseph', imageUrl: 'assets/users/user2.png'},
    {id: 2, label: 'Danny', imageUrl: 'assets/users/user1.png'},
    {id: 3, label: 'John', imageUrl: 'assets/users/user3.png'},
  ];
  config2: any = {'placeholder': 'Type here', 'sourceField': 'label'};
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

  constructor( private sharedService: SharedService ) {
    const comp = this;
    document.addEventListener('click', function() {
      comp.editable = false;
      comp.accountEditable = false;
      comp.projectEditable = false;
      comp.designerEditable = false;
    });
  }

  clickIconShipping() {
    this.switchIconShipping = !this.switchIconShipping;
    this.projectDetails.shippingAddress = (this.switchIconShipping) ? this.userInfo.shippingaddress.address : '';
    this.projectDetails.city = (this.switchIconShipping) ? this.userInfo.shippingaddress.city : '';
    this.projectDetails.state = (this.switchIconShipping) ? this.userInfo.shippingaddress.state : '';
    this.projectDetails.country = (this.switchIconShipping) ? this.userInfo.shippingaddress.country : '';
    this.projectDetails.zipcode = (this.switchIconShipping) ? this.userInfo.shippingaddress.zipcode : '';
  }

  clickIconManagement() {
    this.switchIconManagement = !this.switchIconManagement;
    this.projectManager = (this.switchIconManagement) ? this.proposalInfo.contactName : '';
  }

  clickIconReceivable() {
    this.switchIconReceivable = !this.switchIconReceivable;
    this.receivable = (this.switchIconReceivable) ? this.proposalInfo.contactName : '';
  }

  ngOnInit() {
    this.projectManager = this.proposalInfo.contactName;
    this.receivable = this.proposalInfo.contactName;
    this.projectDetails.customerName = this.proposalInfo.customerName;
    this.projectDetails.projectName = this.proposalInfo.projectName;
    this.projectDetails.shippingAddress = this.userInfo.shippingaddress.address;
    this.projectDetails.city = this.userInfo.shippingaddress.city;
    this.projectDetails.state = this.userInfo.shippingaddress.state;
    this.projectDetails.country = this.userInfo.shippingaddress.country;
    this.projectDetails.zipcode = this.userInfo.shippingaddress.zipcode;

    this.editable = false;
    this.userInfo.followers.forEach(element => {
      this.items2 = this.items2.filter(function( obj ) {
        return obj.label !== element.name;
      });
    });

    // Update project id field with proposal info.
    this.projectDetails.projectId = this.proposalInfo.proposalId;
  }

  getSchduleRemain(event) {
    this.scheduleRemain = event;
  }

  onSelect(item: any) {
    this.selectedItem = item;
    this.items2 = this.items2.filter(function( obj ) {
      return obj.label !== item.label;
    });
    this.projectDetails.collaborators.push({name: item.label, imageUrl: item.imageUrl });
  }

  onSelectAccountManager(item: any) {
    this.selectedItem = item;
    this.items3 = this.items3.filter(function( obj ) {
      return obj.label !== item.label;
    });
    this.projectDetails.accountManager.push({name: item.label, imageUrl: item.imageUrl });
  }

  onSelectProjectManager(item: any) {
    this.selectedItem = item;
    this.items4 = this.items4.filter(function( obj ) {
      return obj.label !== item.label;
    });
    this.projectDetails.projectManager.push({name: item.label, imageUrl: item.imageUrl });
  }

  onSelectDesigner(item: any) {
    this.selectedItem = item;
    this.items5 = this.items5.filter(function( obj ) {
      return obj.label !== item.label;
    });
    this.projectDetails.designer.push({name: item.label, imageUrl: item.imageUrl });
  }


  onInputChangedEvent(val: string) {
    this.inputChanged = val;
  }

  removeUser(i: number) {
    const item = this.projectDetails.collaborators[i];
    this.items2.push({id: this.items2.length, label: item.name, imageUrl: item.imageUrl});
    this.projectDetails.collaborators.splice(i, 1);
  }

  removeAccountManager(i: number) {
    const item = this.projectDetails.accountManager[i];
    this.items2.push({id: this.items2.length, label: item.name, imageUrl: item.imageUrl});
    this.projectDetails.accountManager.splice(i, 1);
  }

  removeProjectManager (i: number) {
    const item = this.projectDetails.projectManager[i];
    this.items2.push({id: this.items2.length, label: item.name, imageUrl: item.imageUrl});
    this.projectDetails.projectManager.splice(i, 1);
  }

  removeDesigner (i: number) {
    const item = this.projectDetails.designer[i];
    this.items2.push({id: this.items2.length, label: item.name, imageUrl: item.imageUrl});
    this.projectDetails.designer.splice(i, 1);
  }

  getCategories(data) {
    this.sendUpdatedCategories.emit(data);
  }

  getSubCategories(data) {
    this.sendUpdatedSubCategories.emit(data);
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
    if (this.projectDetails.projectId && (this.scheduleRemain === 0) && this.projectDetails.accountManager.length
      && this.projectDetails.projectManager.length) {
        this.ProposalInfoModalCollapsed = true;
        this.showProposalInfo = false;
    } else {
      if (!this.projectDetails.projectId) {
        this.invalidProjectId = true;
      }
      if (this.scheduleRemain !== 0) {
        this.invalidSchedule = true;
      }
      if (!this.projectDetails.accountManager.length) {
        this.invalidAccountManager = true;
      }
      if (!this.projectDetails.projectManager.length) {
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
      && this.projectDetails.projectName && this.projectDetails.shippingAddress && this.projectDetails.city
      && this.projectDetails.state && this.projectDetails.country && this.projectDetails.zipcode) {
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
      if (!this.projectDetails.city) {
        this.invalidCity = true;
      }
      if (!this.projectDetails.state) {
        this.invalidState = true;
      }
      if (!this.projectDetails.country) {
        this.invalidCountry = true;
      }
      if (!this.projectDetails.zipcode) {
        this.invalidZipcode = true;
      }
    }
  }
}
