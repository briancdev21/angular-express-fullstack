import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../../../components/common/common.component';
import { BreadcrumbBarComponent } from '../../profile/breadcrumbbar/breadcrumbbar.component';
import { ProfileInfoBarComponent } from '../../profile/profileInfobar/profileinfobar.component';
import { MultiKeywordSelectComponent } from '../../profile/multikeywordselect/multikeywordselect.component';
import { ContactAssociationComponent } from '../../profile/contactassociation/contactassociation.component';
import { CustomDonutChartComponent } from '../../profile/customdonutchart/customdonutchart.component';
import { CardsComponent } from '../../profile/cards/cards.component';
import { LifeTimeStatusComponent } from '../../profile/cards/lifetimestatus/lifetimestatus.component';
import { CustomerDealsComponent } from '../../profile/cards/customerdeals/customerdeals.component';
import { UpcomingAppointmentsComponent } from '../../profile/cards/upcomingappointments/upcomingappointments.component';
import { TasksComponent } from '../../profile/cards/tasks/tasks.component';
import { DocumentsComponent } from '../../profile/cards/documents/documents.component';
import { CollaboratorsComponent } from '../../profile/cards/collaborators/collaborators.component';
import { Router, ActivatedRoute, NavigationStart, RoutesRecognized, NavigationEnd } from '@angular/router';
import { CrmService } from '../../../services/crm.service';
import * as moment from 'moment';
import 'rxjs/add/operator/pairwise';

@Component({
  selector: 'app-leadprofile',
  templateUrl: './leadprofile.component.html',
  styleUrls: [
    './leadprofile.component.css'
  ],
  entryComponents: [
    BreadcrumbBarComponent,
    CommonComponent
  ]
})
export class LeadProfileComponent implements OnInit {

  menuCollapsed = true;
  leadInfoIndex: any;

  userInfo = {
  };
   /**
    * Each item will have title,content,complete flag and icon
    * which will be displayed on the side. Icon is in html
    */
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
      timelineBtnColor: 'lime-btn',
      buttontitle: 'Download document',
      date: '2018-1-9',
      buttonClickEventHandlerName: 'downloadDoc'
    },
    {
      title: 'Coffee Break',
      icon: 'fa-coffee',
      content: 'Conference on the sales for the previous year. Monica please examine sales\
       trends in marketing and products. Below please find the currnet status of the sale',
      timelineBtnColor: 'blue-btn',
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
      leadScore: 12,
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
  currentLead: any;
  savingLead: any;

  constructor(private router: Router, private route: ActivatedRoute, private crmService: CrmService) {
    this.leadInfoIndex = this.route.snapshot.paramMap.get('id');
    this.crmService.getIndividualLead(this.leadInfoIndex).subscribe(res => {
      this.currentLead = res.data;
      console.log('leadData: ', res.data);
      // Update userInfo
      this.userInfo = {
        name: res.data.person.firstName + ' ' + res.data.person.lastName,
        profileLink: 'assets/users/Random.jpg',
        email: res.data.email,
        primaryphone: res.data.phoneNumbers.primary,
        mobilephone: res.data.phoneNumbers.secondary,
        shippingaddress: res.data.shippingAddress.address + ', ' +
                          res.data.shippingAddress.city + ', ' +
                          res.data.shippingAddress.province + ', ' +
                          res.data.shippingAddress.postalCode,
        billingaddress: res.data.billingAddress.address + ', ' +
                        res.data.billingAddress.city + ', ' +
                        res.data.billingAddress.province + ', ' +
                        res.data.billingAddress.postalCode,
        keywords: res.data.keywordIds ? res.data.keywordIds : [],
        followers: res.data.followers ? res.data.followers : [],
        note: res.data.note
      };
      // Update cards info
      this.cards.leadScore = res.data.score;

    });
  }

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
        nitem.timelineBtnColor = 'lime-btn';
        break;
      case 'Email':
        nitem.icon = 'fa fa-envelope-o';
        nitem.timelineBtnColor = 'orangered-btn';
      break;
      case 'Call':
        nitem.icon = 'fa fa-phone';
        nitem.timelineBtnColor = 'orange-btn';
      break;
      default:
        nitem.icon = 'fa fa-home';
        break;
    }
    this.timelineData.unshift(nitem);
    this.activity.subject = undefined;
    this.activity.contact = undefined;
    this.activity.title = undefined;
  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }

  onChangedUserInfo(event) {
    this.savingLead = this.currentLead;
    console.log('changed User inf:', event);
    const userInfo = event.data;
    const shippingArr = userInfo.shippingaddress.split(',');
    const billingArr = userInfo.billingaddress.split(',');
    const nameArr = userInfo.name.split(' ');

    this.savingLead.shippingAddress.address = shippingArr[0];
    this.savingLead.shippingAddress.city = shippingArr[1];
    this.savingLead.shippingAddress.province = shippingArr[2];
    this.savingLead.shippingAddress.postalCode = shippingArr[3];
    this.savingLead.billingAddress.address = billingArr[0];
    this.savingLead.billingAddress.city = billingArr[0];
    this.savingLead.billingAddress.province = billingArr[0];
    this.savingLead.billingAddress.postalCode = billingArr[0];
    this.savingLead.person.firstName = nameArr[0];
    this.savingLead.person.lastName = nameArr[1];
    this.savingLead.person.businessAssociation = 1;
    this.savingLead.email = userInfo.email;
    this.savingLead.phoneNumbers.primary = userInfo.primaryphone;
    this.savingLead.phoneNumbers.secondary = userInfo.mobilephone;
    this.savingLead['note'] = userInfo.customerNotes;
    this.savingLead.lastContacted = moment(this.savingLead.lastContacted).format('YYYY-MM-DD');
    this.savingLead.socialMediaUrl = {
      'linkedIn': 'string',
      'facebook': 'string',
      'twitter': 'string'
    };
    this.savingLead.keywordIds = userInfo.keywordIds;
    this.savingLead.followers = ['string'];
    delete this.savingLead.createdAt;
    delete this.savingLead.updatedAt;
    this.crmService.updateIndividualLead(this.currentLead.id, this.savingLead).subscribe( res => {
      console.log('success: ', res);
    });
  }


}
