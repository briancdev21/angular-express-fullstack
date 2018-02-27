import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { BreadcrumbBarComponent } from './breadcrumbbar/breadcrumbbar.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: [
    './profile.component.css'
  ],
  entryComponents: [
    BreadcrumbBarComponent,
    CommonComponent
  ]
})
export class ProfileComponent implements OnInit {

  menuCollapsed = true;

  constructor() {

  }
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
  public chartSetData: Array<Object> = [
    {
      title: 'Account Rating',
      percentage: '120%',
    },
    {
      title: 'Loyalty Rating',
      percentage: '90%',
    },
    {
      title: 'Deals Ratio',
      percentage: '70%',
    },
    {
      title: 'Service Ratio',
      percentage: '50%',
    }
  ];
   /**
    * Each item will have title,content,complete flag and icon
    * which will be displayed on the side. Icon is in html
    */
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
  public cards =
    {
      statusRevenue: '$25,434.00',
      statusPoints: '5,078',
      dealsPrice: '$12,552.37',
      dealsDate: 'January 19, 2017',
      appointmentsDate: 'January 26, 2017',
      appointmentsAddress: '2222 Crescent Hill Dr SW Calgary, AB T3C 0J4',
      appointmentsTime: '9:00 AM - 5:00 PM',
    };

  public deals: Array<Object> = [
    {
      collaborators: [{
        imageUrl: 'assets/users/user1.png',
        profileLink: 'crm/contacts/michael',
        name: 'Michael'
      },
      {
        imageUrl: 'assets/users/user2.png',
        profileLink: 'crm/contacts/joseph',
        name: 'Joseph'
      }],
      projectName: 'Upgrade Security',
      id: '123460',
      status: 'assets/images/chili.png',
      dateCreated: 'January 5, 2017',
      dateModified: 'January 19, 2017',
      dealStage: 'Negotiation',
      total: '12,552.37'
    },
    {
      collaborators: [{
        imageUrl: 'assets/users/user1.png',
        profileLink: 'crm/contacts/michael',
        name: 'Michael'
      },
      {
        imageUrl: 'assets/users/user2.png',
        profileLink: 'crm/contacts/joseph',
        name: 'Joseph'
      }],
      projectName: 'Home Theatre Expansion',
      id: '123459',
      status: 'assets/images/snowflake.png',
      dateCreated: 'January 9, 2017',
      dateModified: 'January 9, 2017',
      dealStage: 'Follow-up',
      total: '9,579.38'
    },
    {
      collaborators: [{
        imageUrl: 'assets/users/user1.png',
        profileLink: 'crm/contacts/michael',
        name: 'Michael'
      }],
      projectName: 'Remodel with a Nu life V2',
      id: '123458',
      status: 'assets/images/icicle.png',
      dateCreated: 'December 12, 2017',
      dateModified: 'December 12, 2017',
      dealStage: 'Closed',
      total: '26,379.381'
    }
  ];
  public wonDeals: Array<Object> = [
    {
      collaborators: [{
        imageUrl: 'assets/users/user1.png',
        profileLink: 'crm/contacts/michael',
        name: 'Michael'
      },
      {
        imageUrl: 'assets/users/user2.png',
        profileLink: 'crm/contacts/joseph',
        name: 'Joseph'
      }],
      projectName: 'Control System Upgrade',
      id: '123457',
      dateCreated: 'December 23, 2017',
      dateModified: 'January 2, 2017',
      cycleTime: '10 days',
      status: 'Complete',
      total: '3110.33'
    },
    {
      collaborators: [{
        imageUrl: 'assets/users/user1.png',
        profileLink: 'crm/contacts/michael',
        name: 'Michael'
      }],
      projectName: 'Remodel with a Nu life',
      id: '123456',
      dateCreated: 'December 15, 2017',
      dateModified: 'December 20, 2017',
      cycleTime: '5 days',
      status: 'In progress',
      total: '22,323.67'
    },
  ];

  public tasks: Array<Object> = [
    {
      name: 'Edit Proposal for John',
      favorite: false,
      checkStatus: false,
      pm: [{
          imageUrl: 'assets/users/user1.png',
          profileLink: 'crm/contacts/michael',
          name: 'Michael'
        }]
    },
    {
      name: 'Sales walkthrough with PM',
      favorite: false,
      checkStatus: false,
      pm: [{
          imageUrl: 'assets/users/user1.png',
          profileLink: 'crm/contacts/michael',
          name: 'Michael'
        },
        {
          imageUrl: 'assets/users/user2.png',
          profileLink: 'crm/contacts/joseph',
          name: 'Joseph'
        }]
    }
  ];
  public collaborators = {
    projectManager: ['Michael Yue'],
    teamMembers: ['Sepher Shoarinejad', 'Tyler Labonte'],
    serviceTeam: [],
    otherMembers: [],
    collInfo: [{
      imageUrl: 'assets/users/user1.png',
      profileLink: 'crm/contacts/Tyler',
      name: 'Tyler'
    },
    {
      imageUrl: 'assets/users/user3.png',
      profileLink: 'crm/contacts/michael',
      name: 'Michael'
    },
    {
      imageUrl: 'assets/users/user2.png',
      profileLink: 'crm/contacts/joseph',
      name: 'Joseph'
    }]
  };

  public documents: Array<Object> = [
    {
      documentName: 'Nu Life Proposal',
      documentDate: 'January 2, 2017'
    },
    {
      documentName: 'Nu Life Contract',
      documentDate: 'January 5, 2017'
    },
    {
      documentName: 'Nu Life Project Brief',
      documentDate: 'January 7, 2017'
    }
  ];
  public upcomingModal: object = {
    week: 'WEDNESDAY',
    date: 'NOVEMBER 1, 2017',
    start: '9:30 AM',
    end: '11:00 AM',
    duration: '1 hr, 30 min'
  };

  activity: {
    title: string;
    subject: string;
    contact: string;
    content: string;
  };


  ngOnInit() {
    this.activity = {
      title: 'Notes',
      subject: undefined,
      contact: undefined,
      content: ''
    };
  }

  tabChanged(event) {
    this.activity.title = event.tabTitle;
  }

  addNewTimelineItem() {
    const date = new Date();
    const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    const nitem = {
      title: this.activity.title,
      content: this.activity.content,
      icon: 'fa fa-home',
      timelineBtnColor: 'green-btn',
      buttontitle: 'More Info',
      date: today,
      buttonClickEventHandlerName: 'getMoreInfo',
      subject: this.activity.subject,
      contact: this.activity.contact
    };

    switch (nitem.title) {
      case 'Notes':
        nitem.icon = 'fa-file-text-o';
        break;
      case 'Email':
        nitem.icon = 'fa fa-envelope-o';
      break;
      case 'Call':
        nitem.icon = 'fa fa-phone';
      break;
      default:
        nitem.icon = 'fa fa-home';
        break;
    }
    this.timelineData.unshift(nitem);
  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }
}
