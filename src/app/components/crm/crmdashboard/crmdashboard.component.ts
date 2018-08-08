import { Component, ChangeDetectorRef, Input, OnInit, HostListener, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { SharedService } from '../../../services/shared.service';


@Component({
  selector: 'app-crmdashboard',
  templateUrl: './crmdashboard.component.html',
  styleUrls: [
    './crmdashboard.component.css',
  ],
  providers: []
})


export class CrmDashboardComponent implements OnInit {

  public newLeadsLine: any;

  public morrisDonutColors = ['#ffd97f', '#fab2c0', '#80dad8', '#a1abb8', '#38849B', '#6EB1DD', '#FF7E7E', '#F79E5D', '#6F7B83'];

  public morrisDonutInfo: any;

  public morrisSalesDonutColors = ['#ffd97f', '#fab2c0', '#80dad8', '#a1abb8', '#38849B', '#6EB1DD', '#FF7E7E', '#F79E5D', '#6F7B83'];

  public morrisSalesDonutInfo = [];

  public topCustomers = [
    {
      customerName: 'John Moss',
      customerRating: 93,
      totalValue: 25000
    },
    {
      customerName: 'Steve Rogers',
      customerRating: 95,
      totalValue: 22000
    },
    {
      customerName: 'Bruce Banner',
      customerRating: 85,
      totalValue: 21000
    },
    {
      customerName: 'Tony Stark',
      customerRating: 99,
      totalValue: 21500
    },
    {
      customerName: 'Tony Hawk',
      customerRating: 93,
      totalValue: 21000
    },
    {
      customerName: 'John Moss',
      customerRating: 93,
      totalValue: 20000
    }
  ];

  public salesConversion = [
    {
      member: 'Michael Yue',
      newLeads: 30,
      opportunity: 20,
      wonDeals: 5,
      conversionRate: 17
    },
    {
      member: 'Tyler labonte',
      newLeads: 100,
      opportunity: 30,
      wonDeals: 5,
      conversionRate: 5
    },
    {
      member: 'Sam Olson',
      newLeads: 400,
      opportunity: 150,
      wonDeals: 10,
      conversionRate: 4
    }
  ];

  public conversionRatio = {
    newLeads: 100,
    wonDeals: 5,
    lostDeals: 0
  };

  activitiesInfo = [
    {
      imgUrl: 'assets/users/user1.png',
      userName: 'Michael Yue',
      description: 'posted a new ticket',
      createdTimeAt: '5:30 pm',
      createdDateAt: '27.05.2018',
      passedDays: 'Yesterday'
    },
    {
      imgUrl: 'assets/users/user1.png',
      userName: 'Michael Yue',
      description: 'posted a new acticle in knowledgebase',
      createdTimeAt: '5:28 pm',
      createdDateAt: '27.05.2018',
      passedDays: 'Yesterday'
    },
    {
      imgUrl: 'assets/users/user1.png',
      userName: 'Michael Yue',
      description: 'posted a new ticket',
      createdTimeAt: '5:30 pm',
      createdDateAt: '27.05.2018',
      passedDays: 'Yesterday'
    },
    {
      imgUrl: 'assets/users/user1.png',
      userName: 'Michael Yue',
      description: 'posted a new ticket',
      createdTimeAt: '5:30 pm',
      createdDateAt: '27.05.2018',
      passedDays: 'Yesterday'
    },
    {
      imgUrl: 'assets/users/user1.png',
      userName: 'Michael Yue',
      description: 'posted a new ticket',
      createdTimeAt: '5:30 pm',
      createdDateAt: '27.05.2018',
      passedDays: 'Yesterday'
    },
    {
      imgUrl: 'assets/users/user1.png',
      userName: 'Michael Yue',
      description: 'posted a new acticle in knowledgebase',
      createdTimeAt: '5:28 pm',
      createdDateAt: '27.05.2018',
      passedDays: 'Yesterday'
    },
    {
      imgUrl: 'assets/users/user1.png',
      userName: 'Michael Yue',
      description: 'posted a new ticket',
      createdTimeAt: '5:30 pm',
      createdDateAt: '27.05.2018',
      passedDays: 'Yesterday'
    },
    {
      imgUrl: 'assets/users/user1.png',
      userName: 'Michael Yue',
      description: 'posted a new ticket',
      createdTimeAt: '5:30 pm',
      createdDateAt: '27.05.2018',
      passedDays: 'Yesterday'
    }
  ];

  menuCollapsed = true;
  donutTimePeriod = 'MONTHLY';
  conversionRate = undefined;
  conversionRatioTime = 'MONTHLY';
  salesPipelineTime = 'MONTHLY';
  salesConversionTime = 'MONTHLY';
  wonVsLost = (this.conversionRatio.wonDeals - this.conversionRatio.lostDeals) * 100 / this.conversionRatio.newLeads;

  newLeadsDonut: any;
  opportunityLeadsDonut: any;
  wonLeadsDonut: any;
  showChart = true;
  showSalesPipeChart = true;

  constructor( private sharedService: SharedService) {
    this.sharedService.getCrmStatistics(5, 0, 'MONTHLY', 'newLeadsOverTime').subscribe(res => {
      console.log('chart: ', res);
      this.newLeadsLine = res.newLeadsOverTime;
      this.newLeadsLine.forEach(ele => {
        ele.period = ele.frameUnit.toUpperCase().slice(0, 3);
        ele.lead = ele.frameValue;
      });
    });

    this.fetchLeadConversionData('MONTHLY');

    this.fetchSalesPipelineData('MONTHLY');

  }

  ngOnInit() {
    // const arr = this.morrisDonutInfo.map( v => v.value);
    // let total = 0;
    // const wonLead = this.morrisDonutInfo.filter( e => e.label === 'Won');
    // arr.forEach(element => {
    //   total = total + element;
    // });
    // if (total) {
    //   this.conversionRate = Math.floor(wonLead[0].value * 100 / total);
    // }
    // this.morrisDonutInfo.forEach(ele => {
    //   ele.value = Math.floor(ele.value * 100 / total);
    // });
  }

  fetchLeadConversionData(unit) {
    this.sharedService.getCrmStatistics(0, 0, unit, 'newLeadsOverTime').subscribe(res => {
      const frameUnit = res.newLeadsOverTime[0].frameUnit;
      let newLeadsValueTotal = 0;
      this.newLeadsDonut = res.newLeadsOverTime;
      this.newLeadsDonut.forEach(element => {
        newLeadsValueTotal = newLeadsValueTotal + element.frameValue;
      });
      // this.newLeadsDonut.forEach(ele => {
      //   ele.period = ele.frameUnit.toUpperCase().slice(0, 3);
      //   ele.lead = ele.frameValue;
      // });
      this.sharedService.getCrmStatistics(0, 0, unit, 'oppertunityLeadsOverTime').subscribe(oppo => {
        this.opportunityLeadsDonut = oppo.oppertunityLeadsOverTime;
        let oppoLeadsValueTotal = 0;
        this.opportunityLeadsDonut.forEach(element => {
          oppoLeadsValueTotal = oppoLeadsValueTotal + element.frameValue;
        });

        this.sharedService.getCrmStatistics(0, 0, unit, 'leadsWonOverTime').subscribe(won => {
          this.wonLeadsDonut = won.leadsWonOverTime;
          this.showChart = false;
          setTimeout(() => {
            this.showChart = true;
          });
          let wonLeadsValueTotal = 0;
          this.wonLeadsDonut.forEach(element => {
            wonLeadsValueTotal = wonLeadsValueTotal + element.frameValue;
          });
          const total = newLeadsValueTotal + oppoLeadsValueTotal + wonLeadsValueTotal;
          this.morrisDonutInfo = [
            {
              label: 'New Leads',
              value: (newLeadsValueTotal / total * 100).toFixed(0),
            }, {
              label: 'Opportunity',
              value: (oppoLeadsValueTotal / total * 100).toFixed(0)
            }, {
              label: 'Won',
              value: (wonLeadsValueTotal / total * 100).toFixed(0)
            }
          ];

        });
      });
    });
  }

  fetchSalesPipelineData(unit) {
    this.sharedService.getCrmStatistics(0, 0, unit, 'leadStatusOverTime').subscribe(oppo => {
      this.morrisSalesDonutInfo = oppo.leadStatusOverTime;
      this.showSalesPipeChart = false;
      setTimeout(() => {
        this.showSalesPipeChart = true;
      });
      this.morrisSalesDonutInfo.forEach(element => {
        element.label = element.status;
      });
    });
  }

  leadConversionChange(unit) {
    this.fetchLeadConversionData(unit);
  }

  salesPipeInfoChange(unit) {
    this.fetchSalesPipelineData(unit);
  }
}
