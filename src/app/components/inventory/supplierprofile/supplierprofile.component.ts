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
import * as moment from 'moment';

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

  constructor(private sharedSevice: SharedService, private route: ActivatedRoute, private router: Router) {

    this.currentSupplierId = this.route.snapshot.paramMap.get('id');
    this.getSupplierInfo();

  }


  userInfo: any;
  public chartSetData: Array<Object> = [
  ];
   /**
    * Each item will have title,content,complete flag and icon
    * which will be displayed on the side. Icon is in html
    */
  public timelineData = [];
  public cards =
    {
      lifeTimeStatus: undefined,
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
    // const date = new Date();
    // const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    // const nitem = {
    //   title: this.activity.title,
    //   content: this.activity.content,
    //   icon: 'fa fa-home',
    //   timelineBtnColor: 'green-btn',
    //   buttontitle: 'More Info',
    //   date: today,
    //   buttonClickEventHandlerName: 'getMoreInfo',
    //   subject: this.activity.subject,
    //   contact: this.activity.contact,
    //   type: this.activity.title
    // };

    // switch (nitem.title) {
    //   case 'Notes':
    //     nitem.icon = 'fa-file-text-o';
    //     nitem.timelineBtnColor = 'lime-btn';
    //     break;
    //   case 'Email':
    //     nitem.icon = 'fa fa-envelope-o';
    //     nitem.timelineBtnColor = 'orangered-btn';
    //   break;
    //   case 'Call':
    //     nitem.icon = 'fa fa-phone';
    //     nitem.timelineBtnColor = 'orange-btn';
    //   break;
    //   default:
    //     nitem.icon = 'fa fa-home';
    //     break;
    // }

    // const savingActivityInfo = {
    //   'contactId':  nitem.contact ? parseInt(nitem.contact, 10) : undefined,
    //   'emailSubject': nitem.subject,
    //   'leadId': this.userInfo.id,
    //   'type': nitem.title,
    //   'detail': nitem.content
    // };

    // this.sharedSevice.addSupplierActivity(this.userInfo.id, savingActivityInfo).subscribe( res => {
    //   console.log('activity created: ', res);
    // });

    // this.timelineData.unshift(nitem);
    // this.activity.subject = undefined;
  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }

  getSupplierInfo () {
    this.sharedSevice.getSupplier(this.currentSupplierId).subscribe(res => {
      console.log('current supplier: ', res);
      this.userInfo = res.data;
      this.cards.lifeTimeStatus = this.userInfo.lifeTimeStatus;
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

        this.sharedSevice.getSupplierActivities(this.userInfo.id).subscribe(response => {
          const activities = response.results;
          this.timelineData = activities.reverse();
          console.log('time line: ', response);
          // Update time line data
          this.timelineData.map(a => {
            a['title'] = a['type'];
            a['content'] = a['detail'];
            a['buttontitle'] = 'More Info';
            a['date'] = moment(a['createdAt']).format('YYYY-MM-DD');
            a['buttonClickEventHandlerName'] = 'getMoreInfo';
            a['subject'] = a['emailSubject'];
            a['type'] = 'NOTE';
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
                a['timelineBtnColor'] = 'orange-btn';
                break;
            }
          });

        });
    });

  }

  redirectToSuppliers() {
    this.router.navigate([`./inventory/suppliers`]);
  }
}
