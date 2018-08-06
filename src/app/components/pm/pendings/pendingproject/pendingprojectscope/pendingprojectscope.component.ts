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

  constructor( private router: Router, private pendingProjectService: PendingProjectService, private projectsService: ProjectsService ) {
    this.currentProjectId = localStorage.getItem('pending_projectId');
    this.projectsService.getIndividualProject(this.currentProjectId).subscribe(res => {
      this.projectInformation = res.data;
      console.log('projectInformation: ', this.projectInformation);
    });
  }

  ngOnInit() {

  }

  toProjectInfo() {
    this.router.navigate(['./pm/pending-project/pending-information']);
  }

  toProjectTasks() {
    const savingData = {
      'projectManager': this.projectInformation.projectManager,
      'accountManager': this.projectInformation.accountManager,
      'clientProjectManagerId': Number(this.projectInformation.clientProjectManagerId.split('-').pop()),
      'accountReceivableId': Number(this.projectInformation.accountReceivableId.split('-').pop()),
      'status': this.projectInformation.status,
      'internalNote': this.projectInformation.internalNote,
      'followers': this.projectInformation.followers
    };
    if (!savingData.internalNote) {
      savingData.internalNote = '';
    }
    this.projectsService.updateIndividualProject(this.currentProjectId, savingData).subscribe(res => {
      console.log('updated: ', res);
      this.router.navigate(['./pm/pending-project/pending-tasks']);
    });
  }

}
