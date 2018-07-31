import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../../components/common/common.component';
import { BreadcrumbBarComponent } from './breadcrumbbar/breadcrumbbar.component';
import { Router, ActivatedRoute } from '@angular/router';
import { CrmService } from '../../services/crm.service';
import * as moment from 'moment';
import { SharedService } from '../../services/shared.service';

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
  contactInfoIndex: any;
  contactsList: any;

  userInfo: any;
  public chartSetData: Array<Object> = [
    {
      title: 'Account Rating',
      percentage: 0,
    },
    {
      title: 'Loyalty Rating',
      percentage: 0,
    },
    {
      title: 'Deals Ratio',
      percentage: 0,
    },
    {
      title: 'Service Ratio',
      percentage: 0,
    }
  ];
   /**
    * Each item will have title,content,complete flag and icon
    * which will be displayed on the side. Icon is in html
    */
  public timelineData: Array<Object> = [
  ];
  public cards =
    {
      statusRevenue: 0,
      statusPoints: 0,
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
  public collaborators = [];

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
  currentContact: any;
  savingContact: any;

  dataRetrieved = false;
  leadsList = [];
  constructor(private router: Router, private route: ActivatedRoute, private crmService: CrmService, private sharedService: SharedService) {
    this.contactInfoIndex = this.route.snapshot.paramMap.get('id');
    this.crmService.getIndividualContact(this.contactInfoIndex).subscribe(res => {

      this.currentContact = res.data;
      console.log('current contact: ', res.data);
      this.collaborators =  this.currentContact.collaborators ? this.currentContact.collaborators : [];
      this.dataRetrieved = true;
      // Update userInfo
      this.userInfo = this.currentContact;
      this.userInfo.profileLink = res.data.pictureURI;
      this.userInfo.primaryphone  = res.data.phoneNumbers.primary;
      this.userInfo.mobilephone = res.data.phoneNumbers.secondary;
      this.userInfo.keywords = res.data.keywordIds ? res.data.keywordIds : [];
      this.userInfo.followers = res.data.followers ? res.data.followers : [];
      this.cards.statusRevenue = this.userInfo.revenue;
      this.cards.statusPoints = this.userInfo.points;
      if (this.userInfo.type === 'PERSON') {
        this.userInfo.name = this.userInfo.person.firstName + ' ' + this.userInfo.person.lastName;
      } else {
        this.userInfo.name = this.userInfo.business.name;
      }

      // Update donut chart info
      this.chartSetData[0]['percentage'] = res.data.accountRating;
      this.chartSetData[1]['percentage'] = res.data.loyaltyRating;
      this.chartSetData[2]['percentage'] = res.data.dealsRatio * 100;
      this.chartSetData[3]['percentage'] = res.data.serviceRatio * 100;

      this.crmService.getContactActivities(this.currentContact.id).subscribe(response => {
        const activities = response.results;
        this.timelineData = activities;
        // Update time line data
        this.timelineData.map(a => {
          a['title'] = a['type'];
          a['content'] = a['detail'];
          a['buttontitle'] = 'More Info';
          a['date'] = moment(a['createdAt']).format('YYYY-MM-DD');
          a['buttonClickEventHandlerName'] = 'getMoreInfo';
          a['subject'] = a['emailSubject'];

          switch (a['title']) {
            case 'NOTE':
              a['icon'] = 'fa-file-text-o';
              a['timelineBtnColor'] = 'lime-btn';
              break;
            case 'EMAIL':
              a['icon'] = 'fa fa-envelope-o';
              a['timelineBtnColor'] = 'orangered-btn';
            break;
            case 'CALL':
              a['icon'] = 'fa fa-phone';
              a['timelineBtnColor'] = 'orange-btn';
            break;
            default:
              a['icon'] = 'fa fa-home';
              break;
          }
        });
      });
    });

    this.sharedService.getContacts().subscribe(res => {
      this.crmService.getLeadsList().subscribe(lead => {
        this.leadsList = lead.results;
        this.contactsList = res.concat(this.leadsList);
        console.log('contaccts : ', this.contactsList);
        this.addContactName(this.contactsList);
      });
    });
  }

  ngOnInit() {
    this.activity = {
      title: 'NOTE',
      subject: undefined,
      contact: undefined,
      content: ''
    };
  }

  updateFollowers(event) {
    console.log('followers update: ', event);
    // name === username currently
    const followerUsernames = {
      followers: event.map(e => e.name),
    };

    if (event) {
      this.crmService.updateIndividualLead(this.currentContact.id, followerUsernames).subscribe( res => {
      console.log('updated lead: ', res);
    });
    }
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
      contact: this.activity.contact,
      type: this.activity.title
    };

    switch (nitem.title) {
      case 'NOTE':
        nitem.icon = 'fa-file-text-o';
        nitem.timelineBtnColor = 'lime-btn';
        break;
      case 'EMAIL':
        nitem.icon = 'fa fa-envelope-o';
        nitem.timelineBtnColor = 'orangered-btn';
      break;
      case 'CALL':
        nitem.icon = 'fa fa-phone';
        nitem.timelineBtnColor = 'orange-btn';
      break;
      default:
        nitem.icon = 'fa fa-home';
        break;
    }

    const savingActivityInfo = {
      'contactId':  nitem.contact ? parseInt(nitem.contact, 10) : undefined,
      'emailSubject': nitem.subject,
      'leadId': nitem.contact ? parseInt(nitem.contact, 10) : undefined,
      'type': nitem.title,
      'detail': nitem.content
    };

    this.crmService.createContactActivity(this.currentContact.id, savingActivityInfo).subscribe( res => {
    });
    this.timelineData.unshift(nitem);
    this.activity.subject = undefined;
  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }

  onChangedUserInfo(event) {
    this.savingContact = this.currentContact;
    console.log('changed User inf:', event);
    const userInfo = event.data;
    const nameArr = userInfo.name.split(' ');

    this.savingContact.shippingAddress.address = userInfo.shippingAddress.address;
    this.savingContact.shippingAddress.city = userInfo.shippingAddress.city;
    this.savingContact.shippingAddress.province = userInfo.shippingAddress.province;
    this.savingContact.shippingAddress.postalCode = userInfo.shippingAddress.postalCode;
    if (this.savingContact.billingAddress) {
      this.savingContact.billingAddress.address = userInfo.billingAddress.address;
      this.savingContact.billingAddress.city = userInfo.billingAddress.city;
      this.savingContact.billingAddress.province = userInfo.billingAddress.province;
      this.savingContact.billingAddress.postalCode = userInfo.billingAddress.postalCode;
    }
    this.savingContact.person.firstName = nameArr[0];
    this.savingContact.person.lastName = nameArr[1];
    this.savingContact.person.businessAssociation = 1;
    this.savingContact.email = userInfo.email;
    this.savingContact.phoneNumbers.primary = userInfo.primaryphone;
    this.savingContact.phoneNumbers.secondary = userInfo.mobilephone;
    this.savingContact['note'] = userInfo.customerNotes;
    this.savingContact.lastContacted = moment(this.savingContact.lastContacted).format('YYYY-MM-DD');
    this.savingContact.socialMediaUrl = {
      'linkedIn': 'string',
      'facebook': 'string',
      'twitter': 'string'
    };
    this.savingContact.keywordIds = userInfo.keywordIds;
    this.savingContact.followers = ['string'];
    delete this.savingContact.createdAt;
    delete this.savingContact.updatedAt;

    // remove Null fields to save lead
    if (this.savingContact.sourceId === null) {
      delete this.savingContact.sourceId;
    }
    if (this.savingContact.phoneNumbers.secondary === null) {
      delete this.savingContact.phoneNumbers.secondary;
    }
    this.crmService.updateIndividualContact(this.currentContact.id, this.savingContact).subscribe( res => {
      console.log('success: ', res);
    });
  }
}
