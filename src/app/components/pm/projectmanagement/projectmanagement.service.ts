import { Injectable, Output, Input, } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()

export class ProjectManagementService {

  private closeDetailedTaskModal = new BehaviorSubject<boolean>(false);
  private deleteTask = new BehaviorSubject<any>([]);
  private updateChart = new BehaviorSubject<any>([]);
  private subject = new Subject<any>();
  saveChangeLog: BehaviorSubject<object> = new BehaviorSubject({});
  progressInternalNoteChange: BehaviorSubject<string> = new BehaviorSubject('');

  closeTaskModal = this.closeDetailedTaskModal.asObservable();
  deleteOpenedTask = this.deleteTask.asObservable();
  ganttUpdated = this.updateChart.asObservable();

  constructor() {

  }

  hideDetailedTaskModal(data) {
    this.closeDetailedTaskModal.next(data);
  }

  sendTaskData (data) {
    this.subject.next(data);
  }
  openDetailedTaskModal(): Observable<any> {
    return this.subject.asObservable();
  }

  deleteOpenedModal(value) {
    this.deleteTask.next(value);
  }

  updateGantt(value) {
    this.updateChart.next(value);
  }
}
