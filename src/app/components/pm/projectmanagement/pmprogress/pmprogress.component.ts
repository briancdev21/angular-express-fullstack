import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PmService } from '../pm.service';
import { ChangeLogListTableComponent } from './changeloglisttable/changeloglisttable.component';

@Component({
  selector: 'app-pmprogress',
  templateUrl: './pmprogress.component.html',
  styleUrls: [
    './pmprogress.component.css',
  ]
})

export class PmProgressComponent implements OnInit {
  public changelogListInfo: Array<Object> = [
    {
      logId: 'CL0159-01',
      logName: 'Changing of the TV location in Living Room',
      priority: 1,
      requestedBy: 'Sepehr Shoarinejad',
      budgetImpact: 2000,
      scheduleImpact: -14,
      dateCreated: 'November 20, 2016',
      lastUpdated: 'January 20, 2017',
      dateApproved: 'January 20, 2017',
    },
    {
      logId: 'CL0159-02',
      logName: 'Customer constantly changing his mind',
      priority: 1,
      requestedBy: 'Sepehr Shoarinejad',
      budgetImpact: -2000,
      scheduleImpact: 2,
      dateCreated: 'December 15, 2016',
      lastUpdated: 'March 20, 2017',
      dateApproved: 'April 20, 2017',
    },
    {
      logId: 'CL0159-03',
      logName: 'I don\'t know what to do anymore',
      priority: 1,
      requestedBy: 'Tyler Labonte',
      budgetImpact: 3500,
      scheduleImpact: 4,
      dateCreated: 'January 20, 2016',
      lastUpdated: 'June 20, 2017',
      dateApproved: 'June 20, 2017',
    },
  ];


  constructor( private pmService: PmService ) {
  }

  ngOnInit() {

  }

}
