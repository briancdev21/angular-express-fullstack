import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ProjectsService } from '../../../../../services/projects.service';
import { SharedService } from '../../../../../services/shared.service';
import * as moment from 'moment';

@Component({
  selector: 'app-pendingprojectbreadcrumbbar',
  templateUrl: './pendingprojectbreadcrumbbar.component.html',
  styleUrls: [
    './pendingprojectbreadcrumbbar.component.css'
  ]
})
export class PendingProjectBreadcrumbBarComponent implements OnInit {
  editable: boolean;
  newKeyword: string;
  selectedItem: any = '';
  inputChanged: any = '';
  data = ['Projects', ''];
  link = '/pm/pending-projects';
  items2: any[] = [
  ];
  config2: any = {'placeholder': 'Type here', 'sourceField': 'label'};
  isAutocompleteUpdated = false;
  projectInformation: any;
  contactsList = [];
  usersList = [];
  currentProjectId: any;

  constructor(private projectsService: ProjectsService, private router: Router,
    private sharedService: SharedService) {
    const comp = this;
    document.addEventListener('click', function() {
      comp.editable = false;
    });

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
        this.projectsService.getIndividualProject(this.currentProjectId).subscribe(res => {
          this.projectInformation = res.data;
          const followersData = [];
          if (this.projectInformation.followers) {
            this.projectInformation.followers.forEach(element => {
              const selectedUser = this.usersList.filter(u => u.username === element)[0];
              followersData.push(selectedUser);
              this.items2 = this.items2.filter(i => i.label !== element);
            });
            followersData.forEach(ele => {
              ele.label = ele.name;
            });
          }
          this.projectInformation.followersData = followersData;
          if (this.projectInformation.contactId) {
            // this.projectInformation.contactName = this.contactsList.filter(c => c.id === this.projectInformation.contactId)[0].name;
            this.sharedService.getMulipleContacts(this.projectInformation.contactId).subscribe(contact => {
              const selectedContact = contact[0];
              this.projectInformation.contactName = this.getContactName(selectedContact);
            });
          }
          this.data = ['Projects', this.projectInformation.name];
        });
      });
    });
  }

  ngOnInit() {
    this.editable = false;
    // this.projectInformation.followers.forEach(element => {
    //   this.items2 = this.items2.filter(function( obj ) {
    //     return obj.label !== element.name;
    //   });
    // });
  }

  onSelect(item: any) {
    this.selectedItem = item;
    this.items2 = this.items2.filter(function( obj ) {
      return obj.label !== item.label;
    });
    this.projectInformation.followersData.push(item);
    const savingData = {
      'projectManager': this.projectInformation.projectManager,
      'accountManager': this.projectInformation.accountManager,
      'clientProjectManagerId': this.projectInformation.clientProjectManagerId,
      'accountReceivableId': this.projectInformation.accountReceivableId,
      'status': this.projectInformation.status,
      'internalNote': this.projectInformation.internalNote,
      'followers': []
    };
    savingData.followers = this.projectInformation.followersData.map(f => f.username);
    if (!savingData.internalNote) {
      savingData.internalNote = '';
    }
    savingData.clientProjectManagerId = this.projectInformation.clientProjectManagerId;
    savingData.accountReceivableId = this.projectInformation.accountReceivableId;
    this.projectsService.updateIndividualProject(this.currentProjectId, savingData).subscribe(res => {
      console.log('updated: ', res);
    });
  }


  onInputChangedEvent(val: string) {
    this.inputChanged = val;
  }

  addUser() {
    // Click 'Add User' Button
  }

  editUser() {
    // Click 'Edit User' Button
  }

  removeUser(i: number) {
    const item = this.projectInformation.followersData[i];
    this.items2.push(item);
    this.projectInformation.followersData.splice(i, 1);
    this.isAutocompleteUpdated = !this.isAutocompleteUpdated;
    const savingData = {
      'projectManager': this.projectInformation.projectManager,
      'accountManager': this.projectInformation.accountManager,
      'clientProjectManagerId': this.projectInformation.clientProjectManagerId,
      'accountReceivableId': this.projectInformation.accountReceivableId,
      'status': this.projectInformation.status,
      'internalNote': this.projectInformation.internalNote,
      'followers': []
    };
    savingData.followers = this.projectInformation.followersData.map(f => f.username);
    if (!savingData.followers) {
      savingData.followers = [];
    }
    this.projectsService.updateIndividualProject(this.currentProjectId, savingData).subscribe(res => {
      console.log('updated: ', res);
    });
  }

  tabChange(event) {
    console.log('event: ', event);
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

  getContactName(selectedContact) {
    if (selectedContact.type === 'PERSON') {
      selectedContact.name = selectedContact.person.firstName + ' ' + selectedContact.person.lastName;
    } else {
      selectedContact.name = selectedContact.business.name;
    }
    return selectedContact.name;
  }
}
