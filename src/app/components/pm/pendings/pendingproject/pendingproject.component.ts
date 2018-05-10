import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../../../common/common.component';
import { PendingProjectBreadcrumbBarComponent } from './pendingprojectbreadcrumbbar/pendingprojectbreadcrumbbar.component';
import { PendingProjectService } from './pendingproject.service';

@Component({
  selector: 'app-pendingproject',
  templateUrl: './pendingproject.component.html',
  styleUrls: [
    './pendingproject.component.css'
  ],
  entryComponents: [
    PendingProjectBreadcrumbBarComponent,
    CommonComponent
  ]
})
export class PendingProjectComponent implements OnInit {

  menuCollapsed = true;

  public projectInformation = {
    customerName: 'John Moss',
    projectName: 'Remodel with a Nu Life',
    shippingAddress: {
      street: '301, 1615 10th Ave SW',
      city: 'Calgary',
      state: 'Alberta',
      country: 'Canada',
      zipcode: 'T3C 0J7'
    },
    billingaddress: {
      street: '301, 1615 10th Ave SW',
      city: 'Calgary',
      state: 'Alberta',
      country: 'Canada',
      zipcode: 'T3C 0J7'
    },
    projectNumber: 'NU8802-0159',
    proposalNumber: 'PR123460',
    startDate: '2016-12-05',
    endDate: '2017-02-24',
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
    accountManager: [{
      imageUrl: 'assets/users/user1.png',
      profileLink: 'crm/contacts/michael',
      name: 'Michael'
    },
    {
      imageUrl: 'assets/users/user2.png',
      profileLink: 'crm/contacts/joseph',
      name: 'Joseph'
    }],
    projectManager: [{
      imageUrl: 'assets/users/user1.png',
      profileLink: 'crm/contacts/michael',
      name: 'Michael'
    }],
    followers: [{
      imageUrl: 'assets/users/user1.png',
      profileLink: 'crm/contacts/michael',
      name: 'Michael'
    },
    {
      imageUrl: 'assets/users/user2.png',
      profileLink: 'crm/contacts/joseph',
      name: 'Joseph'
    }],
    contactAssociation: '',
    contactProjectManager: '',
    contactAccountReceivable: '',
    clientNotes: ''
  };

  constructor() {

  }

  ngOnInit() {
  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }
}
