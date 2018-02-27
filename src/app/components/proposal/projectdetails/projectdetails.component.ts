import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MultiKeywordSelectComponent } from '../../profile/multikeywordselect/multikeywordselect.component';
import { Ng2TimelineComponent } from '../../profile/ng2-timeline/ng2timeline.component';

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

  sidebarCollapsed = true;
  ProposalInfoModalCollapsed = true;
  oneSide = true;
  tabActiveFirst = true;
  tabActiveSecond = false;
  tabActiveThird = false;
  switchIconManagement: boolean = true;
  switchIconReceivable: boolean = true;
  switchIconShipping: boolean = true;
  projectManager: string = '';
  receivable: string = '';
  shippingAddress: string = '';

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

  public timelineData: Array<Object> = [
    {
      title: 'Meeting',
      icon: 'fa-home',
      content: 'Conference on the sales for the previous year. Monica please examine sales trends in marketing and products. Below please find the currnet status of the sale',
      timelineBtnColor: 'green-btn',
      buttontitle: 'More Info',
      date: '2018-1-9',
      buttonClickEventHandlerName: 'getMoreInfo'
    },
    {
      title: 'Send Document to Mike',
      icon: 'fa-file-text-o',
      content: 'Conference on the sales for the previous year. Monica please examine sales trends in marketing and products. Below please find the currnet status of the sale',
      timelineBtnColor: 'blue-btn',
      buttontitle: 'Download document',
      date: '2018-1-9',
      buttonClickEventHandlerName: 'downloadDoc'
    },
    {
      title: 'Coffee Break',
      icon: 'fa-coffee',
      content: 'Conference on the sales for the previous year. Monica please examine sales trends in marketing and products. Below please find the currnet status of the sale',
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

  constructor() {
  }

  clickIconShipping() {
    this.switchIconShipping = !this.switchIconShipping;
    this.shippingAddress = (this.switchIconShipping) ? this.userInfo.shippingaddress : '';
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
    this.shippingAddress = this.userInfo.shippingaddress;
  }
}
