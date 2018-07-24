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
import { SharedService } from '../../../services/shared.service';
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

  userInfo: any;
   /**
    * Each item will have title,content,complete flag and icon
    * which will be displayed on the side. Icon is in html
    */
  public timelineData: Array<Object> = [
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
  contactsList: any;
  leadsList = [];

  constructor(private router: Router, private route: ActivatedRoute, private crmService: CrmService, private sharedService: SharedService) {
    this.leadInfoIndex = this.route.snapshot.paramMap.get('id');
    this.crmService.getIndividualLead(this.leadInfoIndex).subscribe(res => {
      this.currentLead = res.data;
      console.log('current lead: ', this.currentLead);
      // Update userInfo
      this.userInfo = {
        name: res.data.person ? res.data.person.firstName + ' ' + res.data.person.lastName : res.data.business.name,
        profileLink: res.data.pictureURI,
        email: res.data.email,
        primaryphone: res.data.phoneNumbers.primary,
        mobilephone: res.data.phoneNumbers.secondary,
        // shippingaddress: res.data.shippingAddress.address + ', ' +
        //                   res.data.shippingAddress.city + ', ' +
        //                   res.data.shippingAddress.province + ', ' +
        //                   res.data.shippingAddress.postalCode,
        // billingaddress: res.data.billingAddress ? res.data.billingAddress.address + ', ' +
        //                 res.data.billingAddress.city + ', ' +
        //                 res.data.billingAddress.province + ', ' +
        //                 res.data.billingAddress.postalCode : '',
        keywords: res.data.keywordIds ? res.data.keywordIds : [],
        followers: res.data.followers ? res.data.followers : [],
        note: res.data.note,
        shippingaddress: this.currentLead.shippingAddress,
        billingaddress: this.currentLead.billingAddress
      };
      // Update cards info
      this.cards.leadScore = res.data.score;

      this.crmService.getLeadActivities(this.currentLead.id).subscribe(response => {
        const activities = response.results;
        this.timelineData = activities.reverse();
        // Update time line data
        this.timelineData.map(a => {
          a['title'] = a['type'];
          a['content'] = a['detail'];
          a['buttontitle'] = 'More Info';
          a['date'] = moment(a['createdAt']).format('YYYY-MM-DD');
          a['buttonClickEventHandlerName'] = 'getMoreInfo';
          a['subject'] = a['emailSubject'];
          // a['contact'] = a['']

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
      contact: this.activity.contact
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
      'leadId': this.currentLead.id,
      'type': nitem.title,
      'detail': nitem.content
    };

    this.crmService.createLeadActivity(this.currentLead.id, savingActivityInfo).subscribe( res => {
      console.log('activity created: ', res);
    });
    this.timelineData.unshift(nitem);
    this.activity.subject = undefined;
  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }

  onChangedUserInfo(event) {
    this.savingLead = this.currentLead;
    const userInfo = event.data;
    // const shippingArr = userInfo.shippingaddress.split(',');
    // const billingArr = userInfo.billingaddress.split(',');
    const nameArr = userInfo.name.split(' ');

    this.savingLead.shippingAddress.address = userInfo.shippingaddress.address;
    this.savingLead.shippingAddress.city = userInfo.shippingaddress.city;
    this.savingLead.shippingAddress.province = userInfo.shippingaddress.province;
    this.savingLead.shippingAddress.postalCode = userInfo.shippingaddress.postalCode;
    if (this.savingLead.billingAddress) {
      this.savingLead.billingAddress.address = userInfo.billingaddress.address;
      this.savingLead.billingAddress.city = userInfo.billingaddress.city;
      this.savingLead.billingAddress.province = userInfo.billingaddress.province;
      this.savingLead.billingAddress.postalCode = userInfo.billingaddress.postalCode;
    }
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

    // remove Null fields to save lead
    if (this.savingLead.sourceId === null) {
      delete this.savingLead.sourceId;
    }
    if (this.savingLead.phoneNumbers.secondary === null) {
      delete this.savingLead.phoneNumbers.secondary;
    }
    this.crmService.updateIndividualLead(this.currentLead.id, this.savingLead).subscribe( res => {
    });
  }


}
