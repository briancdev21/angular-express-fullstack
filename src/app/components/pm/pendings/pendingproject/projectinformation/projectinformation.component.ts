import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PendingProjectService } from '../pendingproject.service';
import * as moment from 'moment';
import { CompleterService, CompleterData } from 'ng2-completer';

@Component({
  selector: 'app-projectinformation',
  templateUrl: './projectinformation.component.html',
  styleUrls: [
    './projectinformation.component.css',
  ]
})

export class ProjectInformationComponent implements OnInit {

  projectInformation = {
    customerName: 'John Moss',
    projectName: 'Remodel with a Nu Life',
    shippingAddress: {
      street: '301, 1615 10th Ave SW',
      city: 'Calgary',
      state: 'Alberta',
      country: 'Canada',
      zipcode: 'T3C 0J7'
    },
    billingaddress: {
      street: '301, 1615 10th Ave SW',
      city: 'Calgary',
      state: 'Alberta',
      country: 'Canada',
      zipcode: 'T3C 0J7'
    },
    projectNumber: 'NU8802-0159',
    proposalNumber: 'PR123460',
    startDate: '2016-12-05',
    endDate: '2017-02-24',
    keywords: [
      'control4',
      'theatre',
      'renovation'
    ],
    contactUser: 'Hayati Homes',
    subAssoUsers: [
      'Danny Shibley',
      'John Stephen'
    ],
    accountManager: [{
      imageUrl: 'assets/users/user1.png',
      name: 'Michael'
    },
    {
      imageUrl: 'assets/users/user2.png',
      name: 'Joseph'
    }],
    projectManager: [{
      imageUrl: 'assets/users/user1.png',
      name: 'Michael'
    }],
    followers: [{
      imageUrl: 'assets/users/user1.png',
      name: 'Michael'
    },
    {
      imageUrl: 'assets/users/user2.png',
      name: 'Joseph'
    }],
    contactAssociation: '',
    contactProjectManager: '',
    contactAccountReceivable: '',
    clientNotes: ''
  };

  formattedStart = '';
  formattedEnd = '';
  endMin = '';
  startMax = '';
  editablePm: boolean;
  editableAm: boolean;
  inputChanged: any = '';
  selectedItem: any = '';
  config2: any = {'placeholder': 'Type here', 'sourceField': ['payload', 'label']};
  items2: any[] = [
    {id: 0, payload: {label: 'Michael', imageUrl: 'assets/users/user1.png'}},
    {id: 1, payload: {label: 'Joseph', imageUrl: 'assets/users/user2.png'}},
    {id: 2, payload: {label: 'Dennis', imageUrl: 'assets/users/user3.png'}},
    {id: 3, payload: {label: 'Sepher', imageUrl: 'assets/users/man.png'}},
  ];
  items3: any[] = [
    {id: 0, payload: {label: 'Michael', imageUrl: 'assets/users/user1.png'}},
    {id: 1, payload: {label: 'Joseph', imageUrl: 'assets/users/user2.png'}},
    {id: 2, payload: {label: 'Dennis', imageUrl: 'assets/users/user3.png'}},
    {id: 3, payload: {label: 'Sepher', imageUrl: 'assets/users/man.png'}},
  ];
  associationList = ['John Moss', 'Latif', 'Dennis'];
  pmList = ['John Moss', 'Latif', 'Dennis'];
  accountReceivableList = ['John Moss', 'Latif', 'Dennis'];

  constructor( private router: Router, private pendingProjectService: PendingProjectService ) {
  }

  ngOnInit() {
    this.formattedStart = moment(this.projectInformation.startDate).format('MMMM DD, YYYY');
    this.formattedEnd = moment(this.projectInformation.endDate).format('MMMM DD, YYYY');
    this.startMax = this.projectInformation.endDate;
    this.endMin = this.projectInformation.startDate;
  }

  selectStartDate(event) {
    this.formattedStart = moment(event.value).format('MMMM DD, YYYY');
    console.log('event: ', this.projectInformation.startDate);
    this.endMin = this.projectInformation.startDate;
  }

  selectEndDate(event) {
    this.formattedEnd = moment(event.value).format('MMMM DD, YYYY');
    this.startMax = this.projectInformation.endDate;
  }

  onInputChangedEvent(val: string) {
    this.inputChanged = val;
  }

  onSelectProjectManager(item: any) {
    this.selectedItem = item;
    this.items2 = this.items2.filter(function( obj ) {
      return obj.payload.label !== item.payload.label;
    });
    this.projectInformation.projectManager.push({name: item.payload.label, imageUrl: item.payload.imageUrl });
  }

  removeProjectManager(i: number) {
    const item = this.projectInformation.projectManager[i];
    this.items2.push({id: this.items2.length, payload: {label: item.name, imageUrl: item.imageUrl}});
    this.projectInformation.projectManager.splice(i, 1);
  }

  onSelectAccountManager(item: any) {
    this.selectedItem = item;
    this.items3 = this.items3.filter(function( obj ) {
      return obj.payload.label !== item.payload.label;
    });
    this.projectInformation.accountManager.push({name: item.payload.label, imageUrl: item.payload.imageUrl });
  }

  removeAccountManager(i: number) {
    const item = this.projectInformation.accountManager[i];
    this.items3.push({id: this.items3.length, payload: {label: item.name, imageUrl: item.imageUrl}});
    this.projectInformation.accountManager.splice(i, 1);
  }

  closePmEditableModal() {
    this.editablePm = false;
  }

  closeAmEditableModal() {
    this.editableAm = false;
  }

  toProjectScope() {
    this.router.navigate(['./pm/pending-project/pending-scope']);
  }

  toPendingProject() {
    this.router.navigate(['./pm/pending-projects']);
  }

  onSelectAssociation(event) {
    this.projectInformation.contactAssociation = event;
  }

  onSelectPmManager(event) {
    this.projectInformation.contactProjectManager = event;
  }

  onSelectAccountReceivable(event) {
    this.projectInformation.contactAccountReceivable = event;
  }

}