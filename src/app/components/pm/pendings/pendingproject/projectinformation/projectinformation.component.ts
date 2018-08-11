import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PendingProjectService } from '../pendingproject.service';
import { CompleterService, CompleterData } from 'ng2-completer';
import { ProjectsService } from '../../../../../services/projects.service';
import { SharedService } from '../../../../../services/shared.service';
import * as moment from 'moment';

@Component({
  selector: 'app-projectinformation',
  templateUrl: './projectinformation.component.html',
  styleUrls: [
    './projectinformation.component.css',
  ]
})

export class ProjectInformationComponent implements OnInit {

  projectInformation: any;

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
  ];
  items3: any[] = [
  ];
  associationList = ['John Moss', 'Latif', 'Dennis'];
  pmList: CompleterData;
  accountReceivableList: CompleterData;
  invalidStartDate = false;
  invalidEndDate = false;
  selectAssociation: any;
  selectPmManager: any;
  selectAccountReceivable: any;
  isAutocompleteUpdated1 = false;
  isAutocompleteUpdated2 = false;
  contactsList = [];
  usersList = [];
  currentProjectId: any;

  constructor( private router: Router, private pendingProjectService: PendingProjectService, private projectsService: ProjectsService,
    private sharedService: SharedService, private completerService: CompleterService ) {
    this.sharedService.getUsers().subscribe(user => {
      this.usersList = user;
      this.items2 = this.usersList;
      this.items2.forEach(ele => {
        ele.label = ele.username;
      });

      this.sharedService.getContacts().subscribe(data => {
        this.currentProjectId = localStorage.getItem('current_projectId');
        this.contactsList = data;
        this.addContactName(this.contactsList);
        this.pmList = completerService.local(this.contactsList, 'name', 'name');
        this.accountReceivableList = completerService.local(this.contactsList, 'name', 'name');
        this.projectsService.getIndividualProject(this.currentProjectId).subscribe(res => {
          this.projectInformation = res.data;
          const followersData = [];
          const contactAssociationData = [];
          let clientProjectManagerId;
          let accountReceivableId;
          // if (this.projectInformation.followers) {
          //   this.projectInformation.followers.forEach(element => {
          //     const selectedUser = this.usersList.filter(u => u.username === element)[0];
          //     followersData.push(selectedUser);
          //   });
          //   followersData.forEach(ele => {
          //     ele.label = ele.name;
          //   });
          // }
          this.projectInformation.followersData = followersData;
          if (this.projectInformation.contactId) {
            this.projectInformation.contactName = this.contactsList.filter(c => c.id === this.projectInformation.contactId)[0].name;
          }
          this.projectInformation.projectManagerData = this.usersList.filter(u => u.username === this.projectInformation.projectManager)[0];
          console.log('projectInformation: ', this.projectInformation.projectManagerData);
          this.projectInformation.accountManagerData = this.usersList.filter(u => u.username === this.projectInformation.accountManager)[0];
          this.formattedStart = moment(this.projectInformation.startDate).format('MMMM DD, YYYY');
          this.formattedEnd = moment(this.projectInformation.endDate).format('MMMM DD, YYYY');
          if ( this.projectInformation.clientProjectManagerId ) {
            clientProjectManagerId = this.projectInformation.clientProjectManagerId.split('-').pop();
          }
          if ( this.projectInformation.accountReceivableId ) {
            accountReceivableId = this.projectInformation.accountReceivableId.split('-').pop();
          }
          console.log('3333: ', this.projectInformation, accountReceivableId);
          this.projectInformation.accountReceivableName = this.contactsList.filter(c => c.id === accountReceivableId)[0].name;
          this.projectInformation.clientProjectManagerName = this.contactsList.filter(c => c.id === clientProjectManagerId)[0].name;
          if (this.projectInformation.contactAssociationIds) {
            this.projectInformation.contactAssociationIds.forEach(element => {
              contactAssociationData.push(this.contactsList.filter(c => c.id === element)[0]);
            });
            this.projectInformation.contactAssociationData = contactAssociationData;
          }
          console.log('projectInformation: ', this.projectInformation);
        });
      });
    });
  }

  ngOnInit() {
    // this.formattedStart = moment(this.projectInformation.startDate).format('MMMM DD, YYYY');
    // this.formattedEnd = moment(this.projectInformation.endDate).format('MMMM DD, YYYY');
    // this.startMax = this.projectInformation.endDate;
    // this.endMin = this.projectInformation.startDate;
    // const cmp = this;
    // for (let i = 0; i < this.projectInformation.projectManager.length; i++) {
    //   this.items2 = this.items2.filter(function( obj ) {
    //     return obj.name !== cmp.projectInformation.projectManager[i].name;
    //   });
    // }
    // for (let j = 0; j < this.projectInformation.accountManager.length; j++) {
    //   this.items3 = this.items3.filter(function( obj ) {
    //     return obj.name !== cmp.projectInformation.accountManager[j].name;
    //   });
    // }
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
    this.isAutocompleteUpdated1 = !this.isAutocompleteUpdated1;
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
    this.isAutocompleteUpdated2 = !this.isAutocompleteUpdated2;
  }

  closePmEditableModal() {
    this.editablePm = false;
  }

  closeAmEditableModal() {
    this.editableAm = false;
  }

  toProjectScope() {
    const savingData = {
      'projectManager': this.projectInformation.projectManager,
      'accountManager': this.projectInformation.accountManager,
      'clientProjectManagerId': this.projectInformation.clientProjectManager ?
        this.projectInformation.clientProjectManager : this.projectInformation.clientProjectManagerId.split('-').pop(),
      'accountReceivableId': this.projectInformation.clientProjectManager ?
        this.projectInformation.clientProjectManager : this.projectInformation.accountReceivableId.split('-').pop(),
      'status': this.projectInformation.status,
      'internalNote': this.projectInformation.internalNote,
      'followers': this.projectInformation.followers
    };
    if (!savingData.internalNote) {
      savingData.internalNote = '';
    }
    this.projectsService.updateIndividualProject(this.currentProjectId, savingData).subscribe(res => {
      console.log('updated: ', res);
      this.router.navigate(['./pm/pending-project/pending-scope']);
    });
  }

  toPendingProject() {
    this.router.navigate(['./pm/pending-projects']);
  }

  onSelectAssociation(event) {
    this.projectInformation.contactAssociation = event;
  }

  onSelectPmManager(event) {
    console.log('project manager', event);
    this.projectInformation.clientProjectManager = event.originalObject.id;
  }

  onSelectAccountReceivable(event) {
    this.projectInformation.contactAccountReceivable = event.originalObject.id;
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

}
