import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectManagementService } from '../projectmanagement.service';
import { PmTasksData, TaskModel, SubTaskModel } from '../../../../models/pmtasksdata.model';
import * as moment from 'moment';

@Component({
  selector: 'app-pmschedule',
  templateUrl: './pmschedule.component.html',
  styleUrls: [
    './pmschedule.component.css',
  ]
})

export class PmScheduleComponent implements OnInit {
  @ViewChild('tabsRef', {read: ElementRef}) tabsRef: ElementRef;

  tasks = [];
  showDetailedTaskModal = false;
  newAddedTask: any;
  temp: number;
  subscription: any;
  updatingTaskPosition = [];
  pmBoardTableData = [];
  tabActiveFirst = true;
  tabActiveSecond = false;

  constructor( private pmService: ProjectManagementService ) {
    this.subscription = this.pmService.openDetailedTaskModal().subscribe(data => {
      this.showDetailedTaskModal = data.openModal;
      this.updatingTaskPosition = data.milestone;
    });
    this.pmService.closeTaskModal.subscribe(data => {
      this.showDetailedTaskModal = false;
    });

    this.pmService.deleteOpenedTask.subscribe(data => {
      if (data.length > 0) {
        this.showDetailedTaskModal = false;
        this.pmBoardTableData[data[0]].tasks.splice(data[1], 1);
      }
    });
  }

  ngOnInit() {
    // this.updateTasks();
  }
  minDate(arr) {
    let min = arr[0];
    arr.forEach(element => {
      if (Date.parse(element) < Date.parse(min)) {
        min = element;
      }
    });
    return min;
  }

  maxDate(arr) {
    let max = arr[0];
    arr.forEach(element => {
      if (Date.parse(element) > Date.parse(max)) {
        max = element;
      }
    });
    return max;
  }

  getMilestoneProgress(arr) {
    let progressSum = 0;
    arr.forEach(element => {
      progressSum += element.completion;
    });
    return progressSum / (arr.length * 100);
  }

  getUpdatedTask(event) {
    this.newAddedTask = event;
    event.id = this.pmBoardTableData[this.updatingTaskPosition[0]].tasks[this.updatingTaskPosition[1]].id;
    // event.dueDate = moment(event.dueDate).format('YYYY-MM-DD');
    this.pmBoardTableData[this.updatingTaskPosition[0]].tasks[this.updatingTaskPosition[1]] = event;
    this.pmBoardTableData.map( m => m.tasks.map(t => t.dueDate = moment(t.dueDate).format('YYYY-MM-DD')));
    this.updateTasks();
  }

  updateTasks() {
    const tasks = [];
    for (let i = 0; i < this.pmBoardTableData.length; i ++) {
      const midTk = {
        id: i,
        title: this.pmBoardTableData[i].title,
        start_date: moment(this.minDate(this.pmBoardTableData[i].tasks.map(t => t.startDate))).format('YYYY-MM-DD'),
        // tslint:disable-next-line:whitespace
        // tslint:disable-next-line:max-line-length
        end_date: moment(this.maxDate(this.pmBoardTableData[i].tasks.map(t => moment(t.startDate).add(t.duration, 'days').format('YYYY-MM-DD')))).format('YYYY-MM-DD'),
        progress: this.pmBoardTableData[i].completion / 100
      };
      tasks.push(midTk);
    }
    this.tasks = tasks;
  }

  getUpdatedGanttData(event) {
    const tasks = [];
    for (let i = 0; i < event.data.length; i ++) {
      if (event.data[i] !== undefined) {
        const panelTasks = event.data[i].tasks !== undefined ? event.data[i].tasks : [];
        const midTk = {
          id: i,
          title: event.data[i].title,
          start_date: moment(this.minDate(panelTasks.map(t => t.startDate))).format('YYYY-MM-DD'),
          // tslint:disable-next-line:max-line-length
          end_date: moment(this.maxDate(panelTasks.map(t => moment(t.startDate).add(t.duration, 'days').format('YYYY-MM-DD')))).format('YYYY-MM-DD'),
          progress: event.data[i].completion / 100
        };
        tasks.push(midTk);
      }
    }
    this.tasks = tasks;
  }
}
