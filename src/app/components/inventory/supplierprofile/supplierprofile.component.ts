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
import { SharedService } from '../../../services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-supplierprofile',
  templateUrl: './supplierprofile.component.html',
  styleUrls: [
    './supplierprofile.component.css'
  ],
  entryComponents: [
    BreadcrumbBarComponent,
    CommonComponent
  ]
})
export class SupplierProfileComponent implements OnInit {

  menuCollapsed = true;
  currentSupplierId: any;

  constructor(private sharedSevice: SharedService, private route: ActivatedRoute) {

    this.currentSupplierId = this.route.snapshot.paramMap.get('id');
    this.getSupplierInfo();

  }


  userInfo: any;
  public chartSetData: Array<Object> = [
    // {
    //   title: 'Supplier Rating',
    //   percentage: '120',
    // },
    // {
    //   title: 'Sensitivity Rating',
    //   percentage: '90',
    // },
    // {
    //   title: 'PO Ratio',
    //   percentage: '70',
    // },
    // {
    //   title: 'Efficiency Ratio',
    //   percentage: '50',
    // }
  ];
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
      lifeTimeStatus: 41566.24,
      orderList: [
        {
          orderNumber: 'PO 88031234',
          orderAmount: 12552.37,
          orderType: 'Partial Fulfillment',
          orderDate: '2017-01-15'
        },
        {
          orderNumber: 'PO 88031235',
          orderAmount: 2552.37,
          orderType: 'Open',
          orderDate: '2017-01-18'
        },
        {
          orderNumber: 'PO 88031236',
          orderAmount: 3230.75,
          orderType: 'Partial Fulfillment',
          orderDate: '2017-01-12'
        },
        {
          orderNumber: 'PO 88031237',
          orderAmount: 23230.75,
          orderType: 'Partial Fulfillment',
          orderDate: '2017-01-23'
        },
        {
          orderNumber: 'PO 88031238',
          orderAmount: 12552.37,
          orderType: 'Partial Fulfillment',
          orderDate: '2017-01-25'
        }
      ]
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

  getSupplierInfo () {
    this.sharedSevice.getSupplier(this.currentSupplierId).subscribe(res => {
      console.log('current supplier: ', res);
      this.userInfo = res.data;
      this.chartSetData = [
            {
              title: 'Supplier Rating',
              percentage: this.userInfo.supplierRating,
            },
            {
              title: 'Sensitivity Rating',
              percentage: this.userInfo.sensitivityRating,
            },
            {
              title: 'PO Ratio',
              percentage: this.userInfo.purchaseOrderRatio,
            },
            {
              title: 'Efficiency Ratio',
              percentage: this.userInfo.efficiencyRatio,
            }];
    });

  }
}
