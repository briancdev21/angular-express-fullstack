import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PmService } from '../pm.service';

@Component({
  selector: 'app-pmprogress',
  templateUrl: './pmprogress.component.html',
  styleUrls: [
    './pmprogress.component.css',
  ]
})

export class PmProgressComponent implements OnInit {
  public changeLogInfo = {
    customerName: 'John Moss',
    projectName: 'Remodel with a Nu Life',
    projectAddress: {
      street: '301, 1615 10th Ave SW',
      city: 'Calgary',
      state: 'Alberta',
      country: 'Canada',
      zipcode: 'T3C 0J7',
    },
    changeLogId: '',
    requestedBy: 'Sepehr Shoarinejad',
    ccContact: 'Danny Shibley',
    createdOn: '2017-11-20',
    lastUpdated: '2018-01-20',
    scopeDescriptionChange: '',
    scopeDetailsChange: '',
    updatePm: false,
    count: 0
  };

  public changeLogList = [
    {
      id: 'ES 882302',
      typeName: 'Change of the TV location in Living Room',
      type: 'estimate',
      createdBy: 'Sepehr Shoarinejad',
      budgetImpact: 2000,
      scheduleImpact: 0,
      dateCreated: '2016-11-20',
      lastUpdated: '2017-01-20',
      dateApproved: '2017-01-20'
    },
    {
      id: 'WO 032321',
      typeName: 'Customer constantly changing his mind',
      type: 'workOrder',
      createdBy: 'Sepehr Shoarinejad',
      budgetImpact: 0,
      scheduleImpact: -1,
      dateCreated: '2016-12-15',
      lastUpdated: '2017-01-20',
      dateApproved: '2017-01-20'
    },
    {
      id: 'WO 023902',
      typeName: 'I don\'t know what to do anymore',
      type: 'workOrder',
      createdBy: 'Tyler Labonte',
      budgetImpact: 0,
      scheduleImpact: -4,
      dateCreated: '2016-01-20',
      lastUpdated: '2017-01-20',
      dateApproved: '2017-01-20'
    }
  ];

  constructor( private pmService: PmService ) {
  }

  ngOnInit() {

  }

}
