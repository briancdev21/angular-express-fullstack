import { Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectManagementService } from '../../../projectmanagement.service';

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

  constructor(private router: Router, private projectManagementService: ProjectManagementService) {
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

  ngOnDestroy() {
    const sendSaveData = {
      isSendToCustomer: this.switchOn,
      saveClicked: false
    };
    this.projectManagementService.saveChangeLog.next(sendSaveData);
  }
}
