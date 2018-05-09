import { Component, Input, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { PmService } from '../../projectmanagement/pm.service';

@Component({
  selector: 'app-subtasksmanagement',
  templateUrl: './subtasksmanagement.component.html',
  styleUrls: [
    './subtasksmanagement.component.css'
  ]
})
export class SubTasksManagementComponent implements OnInit {
  @Input() subTasks;
  @Input() selectedSubTasks;
  @Output() subTasksToParent: EventEmitter<any> = new EventEmitter;
  @Output() selectedSubTasksToParent: EventEmitter<any> = new EventEmitter;
  @Output() completenessToParent: EventEmitter<any> = new EventEmitter;
  @Output() changedMainTask: EventEmitter<any> = new EventEmitter;
  taskComplete = 0;
  mainTaskComplete = false;
  isShift = false;
  isCtrl = false;
  clicked = false;
  subscription: any;
  taskTitle = '';

  mainTaskContent = '';

  constructor( private pmService: PmService ) {

  }

  ngOnInit () {
    this.addSubTask();
    this.subscription = this.pmService.openDetailedTaskModal().subscribe(data => {
      // this.showDetailedTaskModal = data.openModal;
      this.taskComplete = data.task.progress;
      this.mainTaskComplete = data.task.progress === 100 ? true : false;
      this.subTasks = data.task.subTasks;
      this.taskTitle = data.task.taskTitle;
      this.mainTaskContent = data.task.mainTaskContent;
    });
  }

  @HostListener('window:keydown', ['$event'])
  keyDownEvent(event: KeyboardEvent) {
    // console.log(event.keyCode);
    // event.preventDefault();
    // event.stopPropagation();
    if (event.keyCode === 16) {
      this.isShift = true;
    }
    if (event.keyCode === 91) {
      this.isCtrl = true;
    }
    // clicking tab key would select next sub task
    if (event.keyCode === 9) {
      if (this.selectedSubTasks.length > 0) {
        this.selectedSubTasks = [this.selectedSubTasks[this.selectedSubTasks.length - 1] + 1];
      }
    }
    // click enter key would make it editable
    if (event.keyCode === 13) {
      if (this.selectedSubTasks.length > 0) {
        this.dblClickSubtask(event.keyCode, this.selectedSubTasks[this.selectedSubTasks.length - 1]);
      }
    }

  }

  @HostListener('window:keyup', ['$event'])
  keyUpEvent(event: KeyboardEvent) {
    this.isShift = false;
    this.isCtrl = false;
  }


  completeTask() {

  }

  outSideClicked() {

  }

  titleUpdate(index) {
    if (index === this.subTasks.length - 1) {
      this.addSubTask();
    }
  }

  addSubTask() {
    const newSub = {
      id: this.subTasks.length,
      title: '',
      complete: false,
      editable: true,
    };
    this.subTasks.push(newSub);
    this.subTasksToParent.emit(this.subTasks);
    // Update task completeness
    // no need because each sub task is not related to main task's completeness
    // this.checkTaskCompleteness();
  }

  removeSubtask(i) {
    this.subTasks.splice(i, 1);
    this.subTasksToParent.emit(this.subTasks);
    // Update task completeness
    // this.checkTaskCompleteness();
  }

  taskContentChange(data) {
    if (this.subTasks.length === 0) {
      this.addSubTask();
    }
    if (this.taskComplete.toString() === '100') {
      this.mainTaskComplete = true;
    } else {
      this.mainTaskComplete = false;
    }

    if (Number(this.taskComplete) > 100) {
      this.taskComplete = 0;
    }
    this.changedMainTask.emit({
      'mainTitle': this.taskTitle,
      'mainContent': this.mainTaskContent,
      'progress': + this.taskComplete
    });
  }

  completeAllTasks() {
    if (!this.mainTaskComplete) {
      this.subTasks.map(s => s.complete = true);
      this.subTasks[this.subTasks.length - 1].complete = false;
      this.taskComplete = 100;
    } else {
      this.subTasks.map(s => s.complete = false);
      this.taskComplete = 0;
    }
    this.completenessToParent.emit(this.taskComplete);
  }

  completeSubTask(task, index) {
    // this.checkTaskCompleteness();
  }

  // checkTaskCompleteness() {
  //   setTimeout(() => {
  //     const completedSubTasksCount = this.subTasks.filter(s => s.complete === true).length;
  //     if (completedSubTasksCount / (this.subTasks.length - 1) >= 1) {
  //       this.mainTaskComplete = true;
  //       this.taskComplete = 100;
  //     } else {
  //       this.mainTaskComplete = false;
  //       this.taskComplete = Number((completedSubTasksCount / (this.subTasks.length - 1) * 100).toFixed(2));
  //     }
  //     if (this.subTasks.length === 1) {
  //       this.taskComplete = 0;
  //     }
  //     this.completenessToParent.emit(this.taskComplete);
  //   });
  // }

  subTaskSelect(task, i) {
    if (task.title && !task.editable) {
      if (this.isCtrl) {
        const index = this.selectedSubTasks.indexOf(i);
        if (index !== -1) {
          this.selectedSubTasks.splice(index, 1);
        } else {
          this.selectedSubTasks.push(i);
        }
      } else if (this.isShift && this.selectedSubTasks.length > 0) {
        const test = Math.min(i, this.selectedSubTasks[0]);
        this.selectedSubTasks = _.range(Math.min(i, this.selectedSubTasks[0]), Math.max(i, this.selectedSubTasks[0]) + 1);
      } else {
        this.selectedSubTasks = [i];
      }
      this.selectedSubTasksToParent.emit(this.selectedSubTasks);
    }
  }

  onBlueSubtask(task, i) {
    this.subTasks[i].editable = false;
    if (i !== this.subTasks.length - 2) {
      this.selectedSubTasks = [i];
    }
  }

  dblClickSubtask(task, i) {
    this.subTasks[i].editable = true;
    this.selectedSubTasks = [];
    event.stopPropagation();
  }
}
