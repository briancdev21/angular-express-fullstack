import { Component, Input, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectManagementService } from '../../projectmanagement.service';

@Component({
  selector: 'app-pmboardtable',
  templateUrl: './pmboardtable.component.html',
  styleUrls: [
    './pmboardtable.component.css',
  ]
})

export class PmBoardTableComponent implements OnInit {
  @ViewChild('panel', { read: ElementRef }) public panel: ElementRef;

  @Input() pmBoardTableData;
  @Input() taskOwners;
  @Output() updatePmData: EventEmitter<any> = new EventEmitter;
  showDetailedTaskModal = false;
  newAddedTask: any;
  temp: number;
  leftReached = true;
  rightReached = false;

  constructor( private pmService: ProjectManagementService ) {

    // close detailed task modal
    this.pmService.closeTaskModal.subscribe(
      data => {
        this.showDetailedTaskModal = false;
      }
    );
  }

  colors = ['#FFE5CC', '#EDF3BF', '#FFD7D7', '#CBE0ED', '#E0BBCC', '#C4BBE0', '#BBC0E0', '#BBE0CC', '#E0BBBB', '#E8E3A7'];

  ngOnInit() {

    for (let i = 0; i < this.pmBoardTableData.length; i++) {
       //  color selection
       const pickColorId = i % 10;
       this.pmBoardTableData[i].color = this.colors[pickColorId];
    }


  }

  getTasksCount(owner, project) {
    const count = project.tasks.filter(t => t.profile.userId === owner.userId).length;
    return count;
  }

  getTasksCompletion(owner, project) {
    let total = 0;
    const newArr = project.tasks.filter(t => t.profile.userId === owner.userId);
    for (let i = 0; i < newArr.length; i++) {
      total = total + newArr[i].progress;
    }
    return total / newArr.length;
  }

  getDuration(owner, project) {
    let totalDuration = 0;
    // if total duration is smaller than 7 days, it will show by days and over 1 week, it will show by weeks
    const newArr = project.tasks.filter(t => t.profile.userId === owner.userId);
    for (let i = 0; i < newArr.length; i++) {
      totalDuration = totalDuration + newArr[i].duration;
    }
    if (totalDuration < 7) {
      if (totalDuration === 1) {
        return totalDuration + ' day';
      } else {
        return totalDuration + ' days';
      }
    } else {
      const weekCount = Math.floor(totalDuration / 7);
      if (weekCount === 1) {
        return weekCount + ' week';
      } else {
        return weekCount + ' weeks';
      }
    }
  }

  getDependenciesCount(owner, project) {
    let total = 0;
    const newArr = project.tasks.filter(t => t.profile.userId === owner.userId);
    for (let i = 0; i < newArr.length; i++) {
      total = total + newArr[i].dependency.length;
    }
    if (total < 2) {
      return total + ' dependency';
    } else {
      return total + ' dependencies';
    }
  }

  getOverDueTasksCount(owner, project) {
    let total = 0;
    const today = new Date();
    const newArr = project.tasks.filter(t => t.profile.userId === owner.userId);
    for (let i = 0; i < newArr.length; i++) {
      if (new Date(newArr[i].dueDate) < today) {
        total ++;
      }
    }
    return total;
  }

  getCompletedTasksCount(owner, project) {
    let total = 0;
    const newArr = project.tasks.filter(t => t.profile.userId === owner.userId);
    for (let i = 0; i < newArr.length; i++) {
      if (newArr[i].progress === 100) {
        total ++;
      }
    }
    return total;
  }

  onPreviousSearchPosition() {
    this.rightReached = false;
    const stepCount = 20;
    const limit = 420 / 20;
    let i = 0;
    const flag = this.panel.nativeElement.scrollLeft;
    const interval = setInterval(() => {
      this.panel.nativeElement.scrollLeft -= stepCount;
      i ++;
      if (i > limit) {
        clearInterval(interval);
      }
      if (flag === this.panel.nativeElement.scrollLeft) {
        this.leftReached = true;
      }
    }, 1);
  }

  onNextSearchPosition() {
    this.leftReached = false;
    const stepCount = 20;
    const limit = 420 / 20;
    let i = 0;
    const flag = this.panel.nativeElement.scrollLeft;
    const interval = setInterval(() => {
      this.panel.nativeElement.scrollLeft += stepCount;
      i ++;
      if (i > limit) {
        clearInterval(interval);
      }
      if (flag === this.panel.nativeElement.scrollLeft) {
        this.rightReached = true;
      }
    }, 1);
  }

  getNewTask(event) {
    this.newAddedTask = event;
    // assign new id to new task
    event.id = this.pmBoardTableData[this.temp].tasks.length + 1;
    this.pmBoardTableData[this.temp].tasks.push(event);
    this.updatePmData.emit(this.pmBoardTableData);
  }
}
