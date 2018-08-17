import { Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectManagementService } from '../../../projectmanagement.service';
import { ProjectsService } from '../../../../../../services/projects.service';

@Component({
  selector: 'app-addchangelogsettings',
  templateUrl: './addchangelogsettings.component.html',
  styleUrls: [
    './addchangelogsettings.component.css'
  ]
})
export class AddChangeLogSettingsComponent implements OnDestroy {

  settingsCollapsed = true;
  showReminderModal = false;
  switchOn = false;
  newChangeLogData: any;
  currentProjectId: any;

  constructor(private router: Router, private projectManagementService: ProjectManagementService,
    private projectsService: ProjectsService) {
    this.currentProjectId = localStorage.getItem('current_projectId');
    this.projectManagementService.createdChangeLogData.subscribe(res => {
      this.newChangeLogData = res;
    });
  }

  saveChangeLog() {
    this.router.navigate(['./pm/pm-details/pm-progress/pm-logs-table/']);
    const sendSaveData = {
      isSendToCustomer: this.switchOn,
      saveClicked: true
    };
    this.projectManagementService.saveChangeLog.next({sendSaveData});
  }

  cancelChangeLog() {
    this.router.navigate(['./pm/pm-details/pm-progress/pm-logs-table/']);
  }

  onClickSendCustomer() {
    this.switchOn = !this.switchOn;
  }

  deleteChangeLog() {
    this.projectsService.deleteIndividualChangeLog(this.currentProjectId, this.newChangeLogData.id).subscribe(res => {
      console.log('deleted: ', res);
      this.router.navigate(['./pm/pm-details/pm-progress/pm-logs-table/']);
    });
  }

  ngOnDestroy() {
    const sendSaveData = {
      isSendToCustomer: this.switchOn,
      saveClicked: false
    };
    this.projectManagementService.saveChangeLog.next(sendSaveData);
  }
}
