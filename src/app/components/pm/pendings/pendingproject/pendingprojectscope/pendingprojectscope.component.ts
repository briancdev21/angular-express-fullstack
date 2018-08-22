import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PendingProjectService } from '../pendingproject.service';
import { ProjectsService } from '../../../../../services/projects.service';

@Component({
  selector: 'app-pendingprojectscope',
  templateUrl: './pendingprojectscope.component.html',
  styleUrls: [
    './pendingprojectscope.component.css',
  ]
})

export class PendingProjectScopeComponent implements OnInit {
  projectScope = {
    workScope: '',
    internalNotes: ''
  };
  projectInformation: any;
  currentProjectId: any;
  savedInternalNote: any;

  constructor( private router: Router, private pendingProjectService: PendingProjectService, private projectsService: ProjectsService ) {
    this.currentProjectId = localStorage.getItem('current_projectId');
    this.projectsService.getIndividualProject(this.currentProjectId).subscribe(res => {
      this.projectInformation = res.data;
      console.log('projectInformation: ', this.projectInformation);
      this.savedInternalNote = this.projectInformation.internalNote;
    });
  }

  ngOnInit() {

  }

  toProjectInfo() {
    this.updateProjectInfo();
    this.router.navigate(['./pm/pending-project/pending-information']);
  }

  toProjectTasks() {
    this.updateProjectInfo();
    this.router.navigate(['./pm/pending-project/pending-tasks']);
  }

  updateProjectInfo() {
    if (this.savedInternalNote !== this.projectInformation.internalNote) {
      const savingData = {
        'projectManager': this.projectInformation.projectManager,
        'accountManager': this.projectInformation.accountManager,
        'clientProjectManagerId': this.projectInformation.clientProjectManagerId.split('-').pop(),
        'accountReceivableId': this.projectInformation.accountReceivableId.split('-').pop(),
        'status': this.projectInformation.status,
        'internalNote': this.projectInformation.internalNote,
        'followers': this.projectInformation.followers
      };
      if (!savingData.internalNote) {
        savingData.internalNote = '';
      }
      if (!savingData.followers) {
        savingData.followers = [];
      }
      this.projectsService.updateIndividualProject(this.currentProjectId, savingData).subscribe(res => {
        console.log('updated: ', res);
        this.savedInternalNote = res.data.internalNote;
      });
    }
  }

  editorChange(event) {
    console.log('changed: ', event);
  }

  editorBlurred(event) {
    console.log('blurred: ', event);
  }

}
