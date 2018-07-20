import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { CompleterService, CompleterData } from 'ng2-completer';
import { SharedService } from '../../../../../../services/shared.service';
import { ProjectsService } from '../../../../../../services/projects.service';
import { ProjectManagementService } from '../../../projectmanagement.service';

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
    contactAssociation: [{
      imageUrl: 'assets/users/user1.png',
      name: 'Michael'
    },
    {
      imageUrl: 'assets/users/user2.png',
      name: 'Joseph'
    }],
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
  editableCa: boolean;
  inputChanged: any = '';
  selectedItem: any = '';
  config2: any = {'placeholder': 'Type here', 'sourceField': 'name'};
  config3: any = {'placeholder': 'Type here', 'sourceField': 'username'};
  items2: any[] = [
  ];
  items3: any[] = [
  ];
  items4: any[] = [
  ];
  associationList = ['John Moss', 'Latif', 'Dennis'];
  pmList = ['John Moss', 'Latif', 'Dennis'];
  availContactsList: CompleterData;
  isAutocompleteUpdated2 = false;
  isAutocompleteUpdated3 = false;
  isAutocompleteUpdated4 = false;
  invalidStartDate = false;
  invalidEndDate = false;
  selectAssociation: string;
  selectPmManager: string;
  selectAccountReceivable: string;
  currentProjectId: any;
  contactsList = [];
  projectInfo: any;
  usersList = [];
  internalNote = '';
  associationsData = [];
  projectManagerData: any;
  accountManagerData: any;

  constructor( private router: Router, private sharedService: SharedService, private projectManagementService: ProjectManagementService,
    private projectsService: ProjectsService, private route: ActivatedRoute, private completerService: CompleterService) {
    this.currentProjectId = localStorage.getItem('current_projectId');

    if (this.currentProjectId !== '') {
      this.sharedService.getUsers().subscribe(response => {
        this.usersList = response;
        this.items2 = response;
        this.items3 = response;
        console.log('item3 : ', this.items3);

        this.sharedService.getContacts().subscribe(data => {
          this.contactsList = data;
          this.addContactName(this.contactsList);
          this.availContactsList = completerService.local(this.contactsList, 'name', 'name');
          this.projectsService.getIndividualProject(this.currentProjectId).subscribe(res => {

            this.projectInfo = res.data;
            this.projectInfo.contactName = this.getContactNameFromId(res.data.contactId);
            console.log('indi project: ', this.projectInfo);
            this.formattedStart = moment(this.projectInfo.startDate).format('MMMM DD, YYYY');
            this.formattedEnd = moment(this.projectInfo.endDate).format('MMMM DD, YYYY');
            this.startMax = this.projectInfo.endDate;
            this.endMin = this.projectInfo.startDate;

            this.internalNote = this.projectInfo.internalNote;
            // one for display data, one for saving data for account receivable
            this.selectAccountReceivable = this.contactsList.filter(c =>
              c.id === this.changeContactIdFormat(this.projectInfo.accountReceivableId))[0].name;
            this.projectInfo.contactAccountReceivable = this.contactsList.filter(c =>
              c.id === this.changeContactIdFormat(this.projectInfo.accountReceivableId))[0].id;

            // one for display data, one for saving data for account receivable
            this.selectPmManager = this.contactsList.filter(c =>
              c.id === this.changeContactIdFormat(this.projectInfo.clientProjectManagerId))[0].name;
            this.projectInfo.contactProjectManager = this.contactsList.filter(c =>
              c.id === this.changeContactIdFormat(this.projectInfo.clientProjectManagerId))[0].id;

            // Contact association
            this.items4 = this.contactsList;
            if (this.projectInfo.contactAssociationIds !== null) {
              this.projectInfo.contactAssociationIds.forEach(element => {
                const contactData = this.contactsList.filter(c => c.id === element)[0];
                this.associationsData.push(contactData);
              });
            } else {
              this.projectInfo.contactAssociationIds = [];
            }

            // project manager
            this.projectManagerData = this.usersList.filter(u => u.username === this.projectInfo.projectManager)[0];
            console.log('project manager: ', this.projectManagerData);
            // account manager
            this.accountManagerData = this.usersList.filter(u => u.username === this.projectInfo.accountManager)[0];
          });

        });
      });
    } else {
      console.error('product id error');
    }

    this.projectManagementService.progressInternalNoteChange.subscribe(data => {
      if (data !== null) {
        this.internalNote = data;
      }
    });
  }

  ngOnInit() {

  }

  selectStartDate(event) {
    this.formattedStart = moment(event.value).format('MMMM DD, YYYY');
    console.log('event: ', this.projectInfo.startDate);
    this.endMin = this.projectInfo.startDate;
  }

  selectEndDate(event) {
    this.formattedEnd = moment(event.value).format('MMMM DD, YYYY');
    this.startMax = this.projectInfo.endDate;
  }

  onInputChangedEvent(val: string) {
    this.inputChanged = val;
  }

  onSelectProjectManager(item: any) {
    this.selectedItem = item;
    this.items2 = this.items2.filter(function( obj ) {
      return obj.username !== item.username;
    });
    this.projectInfo.projectManager = item.username;
    this.projectManagerData = item;
    console.log('pm selected: ', this.projectInfo, this.projectManagerData);
  }

  // removeProjectManager(i: number) {
  //   const item = this.projectInformation.projectManager[i];
  //   this.items2.push({id: this.items2.length, label: item.name, imageUrl: item.imageUrl});
  //   this.projectInformation.projectManager.splice(i, 1);
  //   this.isAutocompleteUpdated2 = !this.isAutocompleteUpdated2;
  // }

  onSelectAccountManager(item: any) {
    this.selectedItem = item;
    this.items3 = this.items3.filter(function( obj ) {
      return obj.username !== item.username;
    });
    this.projectInfo.accountManager = item.username;
    this.accountManagerData = item;
  }

  // removeAccountManager(i: number) {
  //   const item = this.projectInformation.accountManager[i];
  //   this.items4.push({id: this.items4.length, label: item.name, imageUrl: item.imageUrl});
  //   this.projectInformation.accountManager.splice(i, 1);
  //   this.isAutocompleteUpdated3 = !this.isAutocompleteUpdated3;
  // }

  onSelectContactAssociation(item: any) {
    console.log('associ', item);
    this.selectedItem = item;
    this.items4 = this.items4.filter(function( obj ) {
      return obj.id !== item.id;
    });
    this.projectInfo.contactAssociationIds.push(item.id);
    this.associationsData.push(item);
  }

  removeContactAssociation(i: number) {
    const item = this.associationsData[i];
    this.items4.push(item);
    this.projectInfo.contactAssociationIds.splice(i, 1);
    this.associationsData.splice(i, 1);
    this.isAutocompleteUpdated4 = !this.isAutocompleteUpdated4;

  }

  closePmEditableModal() {
    this.editablePm = false;
  }

  closeAmEditableModal() {
    this.editableAm = false;
  }

  closeCaEditableModal() {
    this.editableCa = false;
  }

  toProjectScope() {
    this.router.navigate(['./pm/pending-project/pending-scope']);
  }

  toPendingProject() {
    this.router.navigate(['./pm/pending-projects']);
  }

  onSelectAssociation(event) {
    this.projectInfo.contactAssociation = event;
  }

  onSelectPmManager(event) {
    this.projectInfo.contactProjectManager = event.originalObject.id;
    this.updateProject();
  }

  onSelectAccountReceivable(event) {
    console.log('selectedAr: ', event);
    this.projectInfo.contactAccountReceivable = event.originalObject.id;
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

  getContactNameFromId(id) {
    const selectedContact = this.contactsList.filter(c => c.id === id)[0];
    return selectedContact.name;
  }

  changeContactIdFormat(id) {
    // id format is PROJECT-PR-4-C-10 so need to split it to get id number
    const splitedArr = id.split('-');
    const idNumber = splitedArr[splitedArr.length - 1];
    return parseInt(idNumber, 10);
  }

  updateProject() {
    if (this.projectInfo.followers === null) {
      this.projectInfo.followers = [];
    }

    if (this.internalNote === null) {
      this.internalNote = '';
    }

    const savingData = {
      'projectManager': this.projectInfo.projectManager,
      'accountManager': this.projectInfo.accountManager,
      'clientProjectManagerId': this.projectInfo.contactProjectManager,
      'accountReceivableId': this.projectInfo.contactAccountReceivable,
      'followers': this.projectInfo.followers,
      'status': this.projectInfo.status,
      'internalNote': this.internalNote
    };

    this.projectsService.updateIndividualProject(this.currentProjectId, savingData).subscribe(res => {
      console.log('project updated', res);
    });

  }
}
