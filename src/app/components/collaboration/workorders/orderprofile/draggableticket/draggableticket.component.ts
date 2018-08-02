import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DragulaService } from 'ng2-dragula';
import { OrderService } from '../order.service';
import { CollaboratorsService } from '../../../../../services/collaborators.service';
import * as moment from 'moment';

@Component({
  selector: 'app-draggableticket',
  templateUrl: './draggableticket.component.html',
  styleUrls: [
    './draggableticket.component.css',
    '../../../../../../../node_modules/dragula/dist/dragula.css'
  ]
})
export class DraggableTicketComponent implements OnInit {

  @Input() orderProfileInfo;

  taskTicketInfo = [];
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
  issueTicket: any;
  currentWorkOrderId: any;
  workOrderTasks = [];
  selectedTask: any;

  constructor(private dragulaService: DragulaService, private orderService: OrderService,
    private collaboratorsService: CollaboratorsService, private router: Router, private route: ActivatedRoute) {
    dragulaService.dropModel.subscribe((value) => {
      this.onDropModel(value.slice(1));
    });

    this.currentWorkOrderId = parseInt(this.route.snapshot.paramMap.get('id'), 10);

    this.collaboratorsService.getWorkOrderTasks(this.currentWorkOrderId).subscribe(res => {
      this.workOrderTasks = res.results;
      this.taskTicketInfo = res.results;
      this.taskTicketInfo.forEach(ele => {
        ele.estimateHour = Math.floor(ele.duration / 60);
        ele.estimateMin = ele.duration % 60;
        ele.createdAt = moment(ele.createdAt).format('YYYY-MM-DD');

      });
      console.log('work order tasks: ', res);
      this.notStarted = this.taskTicketInfo.filter(t => t.status === 'NOT_STARTED');
      this.inProgress = this.taskTicketInfo.filter(t => t.status === 'IN_PROGRESS');
      this.complete = this.taskTicketInfo.filter(t => t.status === 'COMPLETE');
      this.notComplete = this.taskTicketInfo.filter(t => t.status === 'NOT_COMPLETE');
      this.taskTicketInfo.map(t => t.visibility = true);
      this.notStarted.map(t => t.visibility = true);
      this.issueTickets.map(t => t.visibility = true);
    });
  }

  private onDropModel(args) {
    const [el, target, source] = args;
    const selectedTaskId = parseInt(el.firstElementChild.id, 10);
    const targetParentClassName = target.parentElement.className;
    let selectedColumn;

    if (targetParentClassName === 'not-started-content') {
      this.notStarted.map(t => t.status = 'NOT_STARTED');
      selectedColumn = this.notStarted;
    } else if (targetParentClassName === 'in-progress-content') {
      this.inProgress.map(t => t.status = 'IN_PROGRESS');
      selectedColumn = this.inProgress;
    } else if (targetParentClassName === 'complete-content') {
      this.complete.map(t => t.status = 'COMPLETE');
      selectedColumn = this.complete;
    } else if (targetParentClassName === 'not-complete-content') {
      this.notComplete.map(t => t.status = 'NOT_COMPLETE');
      selectedColumn = this.notComplete;
    }

    const task = selectedColumn.filter(c => c.id === selectedTaskId)[0];
    const updatingData = {
      'name': task.name,
      'status': task.status,
      'duration': (task.estimateHour * 60) + (task.estimateMin),
      'priority': task.priority,
    };
    this.collaboratorsService.updateIndividualWorkOrderTask(this.currentWorkOrderId, selectedTaskId, updatingData).subscribe(res => {
      console.log('updated task: ', res);
    });
  }


  ngOnInit() {

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
    if (task.priority === '1') {
      return 'green';
    } else if (task.priority === '2') {
      return 'orange';
    } else {
      return 'red';
    }
  }

  deleteTicket(task) {
    this.selectedTask = task;
    this.checkColumnIn(task);
    const currentTask = this.taskTicketInfo.filter(t => t.id === task.id);
    this.currentInfoId = this.taskTicketInfo.map(t => t.id).indexOf(currentTask[0].id);
    this.currentColumnId = this.selectedColumn.map(t => t.id).indexOf(currentTask[0].id);
    this.showDeleteConfirmModal = true;
  }

  confirmDelete() {
    console.log('seleted task: ', this.selectedTask);
    this.collaboratorsService.deleteIndividualWorkOrderTask(this.currentWorkOrderId, this.selectedTask.id).subscribe(res => {
      console.log('deleted ', res);
      this.taskTicketInfo.splice(this.currentInfoId, 1);
      this.selectedColumn.splice(this.currentColumnId, 1);
      this.showDeleteConfirmModal = false;
    });
  }

  changeVisibility(task) {
    this.checkColumnIn(task);
    const currentTask = this.selectedColumn.filter(t => t.id === task.id);
    this.currentColumnId = this.selectedColumn.map(t => t.id).indexOf(currentTask[0].id);
    this.selectedColumn[this.currentColumnId].visibility = false;
  }

  checkColumnIn(task) {
    switch (task.status) {
      case 'NOT_STARTED':
        this.selectedColumn = this.notStarted;
        break;
      case 'IN_PROGRESS':
        this.selectedColumn = this.inProgress;
        break;
      case 'COMPLETE':
        this.selectedColumn = this.complete;
        break;
      case 'NOT_COMPLETE':
        this.selectedColumn = this.notComplete;
        break;
    }
  }

  changeIssueVisibility(issue, i) {
    this.issueTickets[i].visibility = false;
  }

  onClickedOutside(i, task) {
    const updatingData = {
      'name': task.name,
      'status': task.status,
      'duration': (task.estimateHour * 60) + (task.estimateMin),
      'priority': task.priority,
    };
    this.collaboratorsService.updateIndividualWorkOrderTask(this.currentWorkOrderId, task.id, updatingData).subscribe(res => {
      console.log('updated task: ', res);
    });
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
    // this.taskTicketInfo[task.id].priority = event;
  }

  addTicket() {
    const date = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const newId = Math.max(...this.taskTicketInfo.map(t => t.id)) + 1;
    const newDate = new Intl.DateTimeFormat('en-US', options).format(date);
    const savingTask = {
      name: ``,
      duration: 0,
      priority: '1'
    };
    let newTask;
    this.collaboratorsService.createWorkOrderTask(this.currentWorkOrderId, savingTask).subscribe(res => {
      newTask = res.data;
      newTask.new = true;
      newTask.createdAt = moment(newTask.createdAt).format('YYYY-MM-DD');
      this.notStarted.push(newTask);
      this.taskTicketInfo.push(newTask);
    });
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

