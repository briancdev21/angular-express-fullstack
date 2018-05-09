import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PmService } from '../../pm.service';

@Component({
  selector: 'app-boardpanelright',
  templateUrl: './boardpanelright.component.html',
  styleUrls: [
    './boardpanelright.component.css',
  ]
})

export class BoardPanelRightComponent implements OnInit {
  @Input() projectInfo;
  @Input() pmBoardTableData;
  totalTasksCount = 0;
  totalOverdueTasksCount = 0;
  totalCompletedTasksCount = 0;
  today = new Date();

  ngOnInit() {
    // get Tasks Info from whole data
    this.pmBoardTableData.forEach(element => {
      // get total tasks count
      this.totalTasksCount = this.totalTasksCount + element.tasks.length;
      // get total overdue tasks count
      for (let i = 0; i < element.tasks.length; i++) {
        if (new Date(element.tasks[i].dueDate) < this.today) {
          this.totalOverdueTasksCount ++;
        }
      }
      // get total completed tasks count
      for (let i = 0; i < element.tasks.length; i++) {
        if (element.tasks[i].progress === 100) {
          this.totalCompletedTasksCount ++;
        }
      }
    });
  }

  getPerformanceColor(value) {
    if (value > 80) {
      return 'green';
    } else if (value > 60) {
      return 'orange';
    } else {
      return 'red';
    }
  }
}
