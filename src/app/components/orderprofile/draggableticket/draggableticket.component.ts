import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DragulaService } from 'ng2-dragula';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-draggableticket',
  templateUrl: './draggableticket.component.html',
  styleUrls: [
    './draggableticket.component.css',
    '../../../../../node_modules/dragula/dist/dragula.css'
  ]
})
export class DraggableTicketComponent implements OnInit {

  @Input() orderProfileInfo;
  @Input() taskTicketInfo;
  notStarted = [];
  inProgress = [];
  complete = [];
  notComplete = [];
  selectedColumn: any;
  currentInfoId: any;
  currentColumnId: any;
  showDeleteConfirmModal = false;
  timeEstimationModalCollapsed = [];
  showTimeEstimationModal = false;
  dependencyModalCollapsed = [];
  showDependencyModal = false;
  priorityModalCollapsed = [];
  showPriorityModal = false;
  descList = [];
  selectedDependency = 'default';
  selectedPriority = 'default';
  issueTickets = [];

  constructor(private dragulaService: DragulaService, private orderService: OrderService) {
    dragulaService.dropModel.subscribe((value) => {
      this.onDropModel(value.slice(1));
    });
  }

  private onDropModel(args) {
    const [el, target, source] = args;
    this.notStarted.map(t => t.status = 'notStarted');
    this.inProgress.map(t => t.status = 'inProgress');
    this.notComplete.map(t => t.status = 'notComplete');
    this.complete.map(t => t.status = 'complete');
  }


  ngOnInit() {
    this.notStarted = this.taskTicketInfo.filter(t => t.status === 'notStarted');
    this.inProgress = this.taskTicketInfo.filter(t => t.status === 'inProgress');
    this.complete = this.taskTicketInfo.filter(t => t.status === 'complete');
    this.notComplete = this.taskTicketInfo.filter(t => t.status === 'notComplete');
    this.taskTicketInfo.map(t => t.visibility = true);
    this.notStarted.map(t => t.visibility = true);
    this.issueTickets.map(t => t.visibility = true);
  }

  openTimeEstimationModal(index, task) {
    this.timeEstimationModalCollapsed[index] = true;
    this.closeDependencyModal(index);
    this.closePriorityModal(index);
  }

  closeTimeEstimationModal(i) {
    this.timeEstimationModalCollapsed[i] = false;
  }

  openDependencyModal(index, task) {
    this.dependencyModalCollapsed[index] = true;
    this.closeTimeEstimationModal(index);
    this.closePriorityModal(index);
  }

  closeDependencyModal(i) {
    this.dependencyModalCollapsed[i] = false;
  }

  openPriorityModal(index) {
    this.priorityModalCollapsed[index] = true;
    this.closeTimeEstimationModal(index);
    this.closeDependencyModal(index);
  }

  closePriorityModal(i) {
    this.priorityModalCollapsed[i] = false;
  }

  getColor(task) {
    if (task.priority === 'level1') return 'green';
    else if (task.priority === 'level2') return 'orange';
    else return 'red';
  }

  deleteTicket(task) {
    this.checkColumnIn(task);
    const currentTask = this.taskTicketInfo.filter(t => t.id === task.id);
    this.currentInfoId = this.taskTicketInfo.map(t => t.id).indexOf(currentTask[0].id);
    this.currentColumnId = this.selectedColumn.map(t => t.id).indexOf(currentTask[0].id);
    this.showDeleteConfirmModal = true;
  }

  confirmDelete() {
    this.taskTicketInfo.splice(this.currentInfoId, 1);
    this.selectedColumn.splice(this.currentColumnId, 1);
    this.showDeleteConfirmModal = false;
  }

  changeVisibility(task) {
    this.checkColumnIn(task);
    const currentTask = this.selectedColumn.filter(t => t.id === task.id);
    this.currentColumnId = this.selectedColumn.map(t => t.id).indexOf(currentTask[0].id);
    this.selectedColumn[this.currentColumnId].visibility = false;
  }

  checkColumnIn(task) {
    switch (task.status) {
      case 'notStarted':
        this.selectedColumn = this.notStarted;
        break;
      case 'inProgress':
        this.selectedColumn = this.inProgress;
        break;
      case 'complete':
        this.selectedColumn = this.complete;
        break;
      case 'notComplete':
        this.selectedColumn = this.notComplete;
        break;
    }
  }

  changeIssueVisibility(issue, i) {
    this.issueTickets[i].visibility = false;
  }

  onClickedOutside(i, task) {
    this.checkColumnIn(task);
    const currentTask = this.selectedColumn.filter(t => t.id === task.id);
    this.currentColumnId = this.selectedColumn.map(t => t.id).indexOf(currentTask[0].id);
    this.selectedColumn[this.currentColumnId].visibility = true;

    if (this.selectedColumn[this.currentColumnId].pending) {
      this.selectedColumn[this.currentColumnId].pending = false;
      this.orderService.postTimelineData({title: this.selectedColumn[this.currentColumnId].description, type: 'newTask'});
    }
    if (this.selectedColumn[this.currentColumnId].new) {
      this.selectedColumn[this.currentColumnId].visibility = false;
      this.selectedColumn[this.currentColumnId].new = false;
      this.selectedColumn[this.currentColumnId].pending = true;
    }
    this.closeTimeEstimationModal(i);
    this.closeDependencyModal(i);
    this.closePriorityModal(i);
  }

  onIssueClickedOutside(i, task) {
    this.issueTickets[i].visibility = true;

    if (this.issueTickets[i].pending) {
      this.issueTickets[i].pending = false;
      this.orderService.postTimelineData({title: this.issueTickets[i].description, type: 'newTicket'});
    }
    if (this.issueTickets[i].new) {
      this.issueTickets[i].visibility = false;
      this.issueTickets[i].new = false;
      this.issueTickets[i].pending = true;
    }
    this.closeDependencyModal(i);
  }

  onDependencySelect(i, task) {
    this.taskTicketInfo[task.id].dependency = i;
  }

  onIssueDependencySelect(i, task) {
    this.issueTickets[task.id].dependency = i;
  }

  onPrioritySelect(event, task) {
    this.taskTicketInfo[task.id].priority = event;
  }

  addTicket() {
    const date = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const newId = Math.max(...this.taskTicketInfo.map(t => t.id)) + 1;
    const newDate = new Intl.DateTimeFormat('en-US', options).format(date);
    const newProduct = {
      id: newId,
      description: '',
      status: 'notStarted',
      estimateHour: '',
      estimateMin: '',
      priority: 'level1',
      createdDate: newDate,
      visibility: false,
      new: true
    };
    newProduct.new = true;
    this.notStarted.push(newProduct);
    this.taskTicketInfo.push(newProduct);
  }

  addIssueTicket() {
    let newId = 0;
    const date = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    if (this.issueTickets.length === 0) {
      newId = 0;
    } else {
      newId = Math.max(...this.issueTickets.map(t => t.id ? t.id : 0)) + 1;
    }
    const newDate = new Intl.DateTimeFormat('en-US', options).format(date);
    const newIssue = {
      id: newId,
      description: '',
      createdDate: newDate,
      visibility: false,
      new: true
    };
    this.issueTickets.push(newIssue);
  }

  downloadAttachment(issue) {
    window.alert('Download Attachment');
  }

  addAttachment(index, issue) {
  }
}

