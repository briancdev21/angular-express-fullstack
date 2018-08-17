import { Component, ChangeDetectorRef, Input, OnInit, HostListener, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import * as moment from 'moment';
import { SharedService } from '../../../services/shared.service';
import { ProjectsService } from '../../../services/projects.service';

@Component({
  selector: 'app-inventorydashboard',
  templateUrl: './inventorydashboard.component.html',
  styleUrls: [
    './inventorydashboard.component.css',
  ],
  providers: []
})


export class InventoryDashboardComponent implements OnInit {
  public inventoryValues: any;

  public inventoryLevel = {
    noStock: 0,
    placeOrder: 0,
    totalPhysical: 0,
    belowLevel: 0
  };

  public pendingOrders = [];

  public areaChartInfo: any;

  public morrisDonutInfo = [];

  public morrisDonutColors = ['#ffd97f', '#fab2c0', '#80dad8', '#a1abb8', '#38849B', '#6EB1DD', '#FF7E7E', '#F79E5D', '#6F7B83'];

  public morrisLineChartInfo: any;

  public activitiesInfo = [
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
  showDonutChart = true;
  projectsList = [];

  constructor( private sharedService: SharedService, private projectsService: ProjectsService) {
    this.sharedService.getInventoryStatistics(5, 0, 'MONTHLY', 'purchaseOrderValuesOverTime').subscribe(res => {
      this.morrisLineChartInfo = res.purchaseOrderValuesOverTime;
      this.morrisLineChartInfo.forEach(ele => {
        ele.period = ele.frameUnit.toUpperCase().slice(0, 3);
        ele.revenue = ele.frameValue;
      });
    });

    this.projectsService.getProjectsList().subscribe(projects => {
      this.projectsList = projects.results.filter(p => p.status === 'IN_PROGRESS');
      console.log('in progress pro: ', this.projectsList);
      this.projectsList.forEach(ele => {
        this.sharedService.getPurchaseOrdersByProjectId(ele.id).subscribe(res => {
          this.pendingOrders = this.pendingOrders.concat(res.results);
          this.pendingOrders.forEach(element => {
            element.formatedDueDate = moment(element.dueDate).format('MMMM DD, YYYY');
          });
        });
      });
      console.log('pendingOrders: ', this.pendingOrders);
      this.sortDateArray('dueDate');
    });

    this.sharedService.getInventoryStatistics(11, 0, 'MONTHLY', 'grossMarginsOverTime').subscribe(res => {
      const areaData = res.grossMarginsOverTime;
      this.areaChartInfo = [];
      for (let i = 0; i < 12; i ++) {
        const addingIndi = {
          Actual: areaData.actual[i].frameValue,
          Estimate: areaData.estimate[i].frameValue,
          period: areaData.actual[i].frameUnit,
        };
        this.areaChartInfo.push(addingIndi);
      }
    });

    this.fetchSupplierPurchaseData('MONTHLY');

    this.sharedService.getInventoryStatistics(0, 0, 'MONTHLY', 'noStockLevel').subscribe(res => {
      this.inventoryLevel.noStock = res.noStockLevel;
    });

    this.sharedService.getInventoryStatistics(0, 0, 'MONTHLY', 'placeOrderLevel').subscribe(res => {
      this.inventoryLevel.placeOrder = res.placeOrderLevel;
    });

    this.sharedService.getInventoryStatistics(0, 0, 'MONTHLY', 'physicalInventory').subscribe(res => {
      this.inventoryLevel.totalPhysical = res.physicalInventory;
    });

    this.sharedService.getInventoryStatistics(0, 0, 'MONTHLY', 'belowStockLevel').subscribe(res => {
      this.inventoryLevel.belowLevel = res.belowStockLevel;
    });

    this.sharedService.getInventoryStatistics(0, 0, 'MONTHLY', 'agingInventory').subscribe(res => {
      this.inventoryValues = {
        lessThirty: res.agingInventory['30'],
        thirtyToSixty: res.agingInventory['60'],
        overSixty: res.agingInventory['90'],
      };
      this.sharedService.getInventoryStatistics(0, 0, 'MONTHLY', 'inventoryTurnOver').subscribe(data => {
        this.inventoryValues.turnover = data.inventoryTurnOver;
      });
    });
  }

  ngOnInit() {
    // this.pendingOrders.map( p => p.dueDate = moment(p.dueDate).format('MMMM DD, YYYY'));
    // // change to percentage
    // const arr = this.morrisDonutInfo.map( v => v.value);
    // let total = 0;
    // arr.forEach(element => {
    //   total = total + element;
    // });
    // this.morrisDonutInfo.forEach(ele => {
    //   ele.value = Math.floor(ele.value * 100 / total);
    // });
  }

  sortDateArray(field) {
    this.pendingOrders.sort( function(name1, name2) {
      if ( Date.parse(name1[field]) < Date.parse(name2[field]) ) {
        return -1;
      } else if ( Date.parse(name1[field]) > Date.parse(name2[field])) {
        return 1;
      } else {
        return 0;
      }
    });
    this.pendingOrders.reverse();
  }

  fetchSupplierPurchaseData(unit) {
    this.sharedService.getInventoryStatistics(0, 0, unit, 'supplierPurchasesOverTime').subscribe(sales => {
      this.morrisDonutInfo = sales.supplierPurchasesOverTime;
      this.showDonutChart = false;
      setTimeout(() => {
        this.showDonutChart = true;
      });
      this.morrisDonutInfo.forEach(element => {
        element.label = element.supplier;
      });
    });
  }

  donutTimeChange(unit) {
    this.fetchSupplierPurchaseData(unit);
  }
}
