import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../../../services/shared.service';
import { ProjectsService } from '../../../../../services/projects.service';
import { ProjectManagementService } from '../../projectmanagement.service';

@Component({
  selector: 'app-progressprojectbrief',
  templateUrl: './progressprojectbrief.component.html',
  styleUrls: [
    './progressprojectbrief.component.css',
  ]
})

export class ProgressProjectBriefComponent implements OnInit {

  currentProjectId: any;
  projectInfo: any;
  contactsList: any;

  constructor( private router: Router, private projectsService: ProjectsService, private sharedService: SharedService,
    private projectManagementService: ProjectManagementService) {
    this.currentProjectId = localStorage.getItem('current_projectId');
    this.sharedService.getContacts().subscribe(data => {
      this.contactsList = data;
      this.addContactName(this.contactsList);
      this.projectsService.getIndividualProject(this.currentProjectId).subscribe(res => {
        this.projectInfo = res.data;
        this.sharedService.getMulipleContacts(res.data.contactId).subscribe(contact => {
          const selectedContact = contact[0];
          this.projectInfo.contactName = this.getContactName(selectedContact);
        });
      });
    });
  }

  ngOnInit() {

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

  onChangeInternalNotes(event) {
    this.projectManagementService.progressInternalNoteChange.next(event);
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
