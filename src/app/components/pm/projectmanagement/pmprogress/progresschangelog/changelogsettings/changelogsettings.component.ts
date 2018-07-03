import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectManagementService } from '../../../projectmanagement.service';
import { ProjectsService } from '../../../../../../services/projects.service';

@Component({
  selector: 'app-changelogsettings',
  templateUrl: './changelogsettings.component.html',
  styleUrls: [
    './changelogsettings.component.css'
  ]
})
export class ChangeLogSettingsComponent {

  settingsCollapsed = true;
  showReminderModal = false;
  switchOn = false;
  currentProjectId: any;
  currentChangeLogId: any;

  constructor(private router: Router, private projectManagementService: ProjectManagementService, private route: ActivatedRoute,
    private projectsService: ProjectsService) {
    this.currentProjectId = localStorage.getItem('current_projectId');
    this.currentChangeLogId = this.route.snapshot.paramMap.get('id');
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
    if (this.switchOn) {
      this.projectsService.sendChangeLogEmail(this.currentProjectId, this.currentChangeLogId).subscribe(res => {
        console.log('email sent: ', res);
      });
    }
  }
}
