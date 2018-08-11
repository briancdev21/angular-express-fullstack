import { Component, ChangeDetectorRef, Input, OnInit, HostListener, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { SharedService } from '../../../services/shared.service';


@Component({
  selector: 'app-salesdashboard',
  templateUrl: './salesdashboard.component.html',
  styleUrls: [
    './salesdashboard.component.css',
  ],
  providers: []
})


export class SalesDashboardComponent implements OnInit {

  revenueTime = 'MONTHLY';
  donutTimePeriod = 'MONTHLY';
  menuCollapsed = true;

  public revenueAreaChartInfo: any;

  public invoicingInfo = {
    openEstimate: 0,
    openInvoice: 0,
    proposalsTotal: 0,
    outstandingInvoices: 0
  };

  public proposalForecasting = {
    newProposal: 0,
    proposalInPipe: 0,
    approvalTime: 0,
    closed: 0
  };

  salesInfo: any;

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

  public morrisDonutColors = ['#ffd97f', '#fab2c0', '#80dad8', '#a1abb8', '#38849B', '#6EB1DD', '#FF7E7E', '#F79E5D', '#6F7B83'];

  public morrisDonutInfo: any;

  showDonutChart = true;
  showAreaChart = true;

  constructor(private sharedService: SharedService) {
    this.sharedService.getSalesStatistics(0, 0, 'MONTHLY', 'openEstimates').subscribe(res => {
      this.invoicingInfo.openEstimate = res.openEstimates;
    });

    this.sharedService.getSalesStatistics(0, 0, 'MONTHLY', 'openInvoices').subscribe(res => {
      this.invoicingInfo.openInvoice = res.openInvoices;
    });

    this.sharedService.getSalesStatistics(0, 0, 'MONTHLY', 'outstandingInvoices').subscribe(res => {
      this.invoicingInfo.outstandingInvoices = res.outstandingInvoices;
    });

    this.sharedService.getSalesStatistics(0, 0, 'MONTHLY', 'proposalsTotal').subscribe(res => {
      this.invoicingInfo.proposalsTotal = res.proposalsTotal;
    });

    this.sharedService.getSalesStatistics(0, 0, 'MONTHLY', 'userProposalPerformance').subscribe(res => {
      this.salesInfo = res.userProposalPerformance;
    });

    this.sharedService.getSalesStatistics(0, 0, 'MONTHLY', 'newProposals').subscribe(res => {
      this.proposalForecasting.newProposal = res.newProposals;
    });

    this.sharedService.getSalesStatistics(0, 0, 'MONTHLY', 'proposalsInPipeline').subscribe(res => {
      this.proposalForecasting.proposalInPipe = res.proposalsInPipeline;
    });

    this.sharedService.getSalesStatistics(0, 0, 'MONTHLY', 'averageProposalApprovalTime').subscribe(res => {
      this.proposalForecasting.approvalTime = res.averageProposalApprovalTime;
    });

    this.sharedService.getSalesStatistics(0, 0, 'MONTHLY', 'wonProposalCount').subscribe(res => {
      this.proposalForecasting.closed = res.wonProposalCount;
    });

    this.fetchPipelineData('MONTHLY');

    this.fetchRevenueData('MONTHLY');

  }
  ngOnInit() {
  }

  fetchPipelineData(unit) {
    this.sharedService.getSalesStatistics(0, 0, unit, 'salesPipelineOverTime').subscribe(sales => {
      this.morrisDonutInfo = sales.salesPipelineOverTime;
      this.showDonutChart = false;
      const total = this.morrisDonutInfo.map(h => h.value).reduce((a, b) => a + b, 0);
      setTimeout(() => {
        this.showDonutChart = true;
      });
      this.morrisDonutInfo.forEach(element => {
        element.label = element.status;
        element.value = (element.value / total * 100).toFixed(1);
      });
    });
  }

  fetchRevenueData(unit) {
    this.sharedService.getSalesStatistics(11, 0, unit, 'revenueOverTime').subscribe(sales => {
      this.revenueAreaChartInfo = sales.revenueOverTime;
      this.showAreaChart = false;
      setTimeout(() => {
        this.showAreaChart = true;
      });
      this.revenueAreaChartInfo.forEach(element => {
        element.revenue = element.frameValue;
        element.period = element.frameUnit;
      });
    });
  }
}
