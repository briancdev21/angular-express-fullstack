import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { CompleterService, CompleterData } from 'ng2-completer';

@Component({
  selector: 'app-progressprojectinformation',
  templateUrl: './progressprojectinformation.component.html',
  styleUrls: [
    './progressprojectinformation.component.css',
  ]
})

export class ProgressProjectInformationComponent implements OnInit {

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
  config2: any = {'placeholder': 'Type here', 'sourceField': 'label'};
  items2: any[] = [
    {id: 0, label: 'Michael', imageUrl: 'assets/users/user1.png'},
    {id: 1, label: 'Joseph', imageUrl: 'assets/users/user2.png'},
    {id: 2, label: 'Dennis', imageUrl: 'assets/users/user3.png'},
    {id: 3, label: 'Sepher', imageUrl: 'assets/users/man.png'},
  ];
  items3: any[] = [
    {id: 0, label: 'Michael', imageUrl: 'assets/users/user1.png'},
    {id: 1, label: 'Joseph', imageUrl: 'assets/users/user2.png'},
    {id: 2, label: 'Dennis', imageUrl: 'assets/users/user3.png'},
    {id: 3, label: 'Sepher', imageUrl: 'assets/users/man.png'},
  ];
  associationList = ['John Moss', 'Latif', 'Dennis'];
  pmList = ['John Moss', 'Latif', 'Dennis'];
  accountReceivableList = ['John Moss', 'Latif', 'Dennis'];
  isAutocompleteUpdated2 = false;
  isAutocompleteUpdated3 = false;
  invalidStartDate = false;
  invalidEndDate = false;
  selectAssociation: string;
  selectPmManager: string;
  selectAccountReceivable: string;

  constructor( private router: Router) {
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
      return obj.label !== item.label;
    });
    this.projectInformation.projectManager.push({name: item.label, imageUrl: item.imageUrl });
  }

  removeProjectManager(i: number) {
    const item = this.projectInformation.projectManager[i];
    this.items2.push({id: this.items2.length, label: item.name, imageUrl: item.imageUrl});
    this.projectInformation.projectManager.splice(i, 1);
    this.isAutocompleteUpdated2 = !this.isAutocompleteUpdated2;

  }

  onSelectAccountManager(item: any) {
    this.selectedItem = item;
    this.items3 = this.items3.filter(function( obj ) {
      return obj.label !== item.label;
    });
    this.projectInformation.accountManager.push({name: item.label, imageUrl: item.imageUrl });
  }

  removeAccountManager(i: number) {
    const item = this.projectInformation.accountManager[i];
    this.items3.push({id: this.items3.length, label: item.name, imageUrl: item.imageUrl});
    this.projectInformation.accountManager.splice(i, 1);
    this.isAutocompleteUpdated3 = !this.isAutocompleteUpdated3;

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
