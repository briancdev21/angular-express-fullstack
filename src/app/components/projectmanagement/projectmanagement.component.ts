import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../../components/common/common.component';
import { PmBreadcrumbBarComponent } from './pmbreadcrumbbar/pmbreadcrumbbar.component';
import { PmService } from './pm.service';

@Component({
  selector: 'app-projectmanagement',
  templateUrl: './projectmanagement.component.html',
  styleUrls: [
    './projectmanagement.component.css'
  ],
  entryComponents: [
    PmBreadcrumbBarComponent,
    CommonComponent
  ]
})
export class ProjectManagementComponent implements OnInit {

  menuCollapsed = true;

  userInfo = {
    name: 'John Moss',
    role: 'Vice President / Sales Department',
    profileLink: 'assets/users/John Moss.jpg',
    email: 'john.moss@gmail.com',
    primaryphone: '4038935433',
    mobilephone: '4037101212',
    shippingaddress: '2222 Crescent Hill Dr SW Calgary, AB T3C 0J4',
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

  constructor() {

  }

  ngOnInit() {
  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }
}
