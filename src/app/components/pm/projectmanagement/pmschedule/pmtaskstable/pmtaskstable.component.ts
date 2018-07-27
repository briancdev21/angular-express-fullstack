import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonComponent } from '../../../../common/common.component';
import { ProjectManagementService } from '../../projectmanagement.service';
import { DragulaService } from 'ng2-dragula';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TaskStableMapToKeysPipe} from './map-to-keys.pipe';

import * as _ from 'lodash';
import * as moment from 'moment';
import { PmTasksService } from '../../../../../services/pmtasks.service';
import { SharedService } from '../../../../../services/shared.service';
@Component({
  selector: 'app-pmtaskstable',
  templateUrl: './pmtaskstable.component.html',
  styleUrls: [
    './pmtaskstable.component.css',
    '../../../../../../../node_modules/dragula/dist/dragula.css'
  ],
  entryComponents: [
    CommonComponent
  ],
})
export class PmTasksTableComponent implements OnInit {

  @Output() updatedGanttData = new EventEmitter;

  milestones = [];
  copyMilestones = [];
  menuCollapsed = true;
  newMilestoneTitle = '';
  addMilestoneClicked = false;
  ownerModalCollapsed = [[]];
  dependencyModalCollapsed = [[]];
  showSettingsModal = [[]];
  showDeleteConfirmModal = [[]];
  selectedOwner: any;
  customForm: any;
  heroForm: FormGroup;
  tasksTotalCount = 0;
  allTasks: any;
  inputChanged: any;
  selectedItem: any;
  isAutocompleteUpdated = false;
  tasksTemp = [];
  dependencyList = [];
  showTaskGroupDeleteConfirmModal = [];
  currentTaskDependency = [];

  config2: any = {'placeholder': 'Type here', 'sourceField': ''};
  colors = ['#F0D7BD', '#DFE5B0', '#F0C9C9', '#CBE0ED', '#E0BBCC', '#C4BBE0', '#BBC0E0', '#BBE0CC', '#E0BBBB', '#E8E3A7'];

  defaultTaskOwner = {
    name: '',
    imgUrl: ''
  };
  taskOwners = [
  ];

  currentProjectId: any;
  usersList = [];
  contactsList = [];

  constructor( private dragulaService: DragulaService, private projectManagementService: ProjectManagementService,
     private fb: FormBuilder, private sharedService: SharedService, private pmTasksService: PmTasksService ) {
    this.currentProjectId = localStorage.getItem('current_projectId');


    this.sharedService.getContacts().subscribe(contacts => {
      this.contactsList = contacts;
      this.addContactName(this.contactsList);

      this.sharedService.getUsers().subscribe(users => {
        this.usersList = users;
        this.taskOwners = users;
        this.refreshTable();
      });
    });
  }


  ngOnInit() {

    // this.milestones.map(m => m.tasks.map(t => t.ownerModalCollapsed = false));

    for (let i = 0; i < this.milestones.length; i++) {
       this.ownerModalCollapsed[i] = new Array();
        //  color selection
        const pickColorId = i % 10;
        this.milestones[i].color = this.colors[pickColorId];

        // count total tasks
        this.tasksTotalCount += this.milestones[i].tasks.length;

        this.dependencyModalCollapsed[i] = new Array();

      for (let j = 0; j < this.milestones[i].tasks.length; j++) {
        this.ownerModalCollapsed[i][j] = false;
        this.dependencyModalCollapsed[i][j] = false;
        const date = new Date (this.milestones[i].tasks[j].startDate);
        this.milestones[i].tasks[j].startDate = moment(this.milestones[i].tasks[j].startDate).format('MMMM DD, YYYY');
      }
    }
    this.selectedOwner = 0;
    // this.allTasks = _.range(1, this.tasksTotalCount + 1).map(t => t.toString());
  }

  getTaskId (milestone, task) {
    let foreTaskCount;
    if (milestone !== 0 ) {
      for (let i = 0; i <= milestone - 1; i++) {
        if (i !== 0 ) {
          this.milestones[i].tasks = this.milestones[i].tasks === undefined ? [] : this.milestones[i].tasks;
          foreTaskCount = foreTaskCount +  this.milestones[i].tasks.length;
        } else {
          foreTaskCount = this.milestones[0].tasks === undefined ? 0 : this.milestones[0].tasks.length;
        }
      }
    } else {
      foreTaskCount = 0;
    }
    return foreTaskCount + this.milestones[milestone].tasks[task].id;
  }

  selectStartDate(event) {
    const milestoneId = event.input.parentElement.querySelector('input.taskGroupId').value;
    const taskId = event.input.parentElement.querySelector('input.taskId').value;
    const sourcePanelData = this.copyMilestones.filter(milestone => milestone.id.toString() === milestoneId.toString()).pop();
    const selectedTaskData = sourcePanelData.tasks.filter(task => task.id.toString() === taskId.toString()).pop();
    // Update Milestones data
    // const options = { year: 'numeric', month: 'long', day: 'numeric' };
    // const dDate = new Intl.DateTimeFormat('en-US', options).format(event.value);
    // Add dDate field to panel info and update it with formatted date.
    selectedTaskData.startDate = moment(event.value).utc();
    console.log('event value:', event.value);
    this.updateTask(milestoneId, taskId, selectedTaskData);
  }

  private onDropModel(args) {
    const [sourceItem, targetContainer, sourceContainer, targetItem] = args;
    console.log('drop model called', args);
    const sourceItemIndex = parseInt(sourceItem.id, 10);
    // const targetItemIndex = parseInt(targetItem.id, 10);

    const targetPanelIndex = parseInt(targetContainer.id, 10);
    const sourcePanelIndex = parseInt(sourceContainer.id, 10);
    console.log('on drop happened:', targetPanelIndex, sourcePanelIndex);
    // const selectedPanel = this.panels.filter(p => p.id === parseInt(source.id, 10))[0];
    // const selectedTask = selectedPanel.tasks.filter( t => t.id === parseInt(el.id, 10));
    const sourcePanelData = this.copyMilestones.filter(milestone => milestone.id.toString() === sourcePanelIndex.toString()).pop();
    const selectedTaskData = sourcePanelData.tasks.filter(task => task.id.toString() === sourceItemIndex.toString()).pop();
    console.log('selected drag data: ', sourceItemIndex, sourcePanelIndex, selectedTaskData);
    if (targetContainer !== sourceContainer) {
    }

    // const savingData = {
    //   'assignee': selectedTaskData.assigneeInfo ? selectedTaskData.assigneeInfo.username : selectedTaskData.assignee,
    //   'title': selectedTaskData.taskTitle ? selectedTaskData.taskTitle : selectedTaskData.title,
    //   'isImportant': selectedTaskData.isImportant,
    //   'isComplete': selectedTaskData.isComplete,
    //   'startDate': moment(selectedTaskData.startDate).utc().format('YYYY-MM-DD'),
    // };
    selectedTaskData.followers = selectedTaskData.followers  !== null ? selectedTaskData.followers : [];
    selectedTaskData.dependencyIds = selectedTaskData.dependencyIds  !== null ? selectedTaskData.dependencyIds : [];
    selectedTaskData.keywordIds = selectedTaskData.keywordIds  !== null ? selectedTaskData.keywordIds : [];
    selectedTaskData.subtaskIds = selectedTaskData.subtaskIds  !== null ? selectedTaskData.subtaskIds : [];
    selectedTaskData.note = selectedTaskData.note !== null ? selectedTaskData.note : '';
    selectedTaskData.startDate = moment(selectedTaskData.startDate).format('YYYY-MM-DD');
    console.log('selected task data', selectedTaskData);
    if (sourceItemIndex.toString() !== localStorage.getItem('sourceItemIndex')) {
      localStorage.setItem('sourceItemIndex', sourceItemIndex.toString());
      this.pmTasksService.createTask(targetPanelIndex, selectedTaskData).subscribe(res => {
        console.log('task created: ', res);
        // tslint:disable-next-line:max-line-length
        const inputTaskElements = document.getElementById('' + sourceItemIndex).querySelectorAll('input.taskId') as NodeListOf<HTMLInputElement>;
        for (let i = 0; i < inputTaskElements.length; i++) {
          inputTaskElements[i].value = res.data.id;
        }
        // tslint:disable-next-line:max-line-length
        const inputTaskGroupElements = document.getElementById('' + sourceItemIndex).querySelectorAll('input.taskGroupId') as NodeListOf<HTMLInputElement>;
        for (let i = 0; i < inputTaskElements.length; i++) {
          inputTaskGroupElements[i].value = res.data.taskGroupId;
        }
        document.getElementById('' + sourceItemIndex).id = res.data.id;
        this.updateDataForGanttChart();
        this.pmTasksService
        .deleteIndividualtask(sourcePanelIndex, sourceItemIndex)
        .subscribe();
      });
    }
  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }

  addTask(milestone) {
    // const newTask = {
    //   id: 1 + milestone.tasks.length,
    //   taskTitle: '',
    //   profile: {
    //     name: '',
    //     imgUrl: '',
    //     userId: undefined
    //   },
    //   progress: 0,
    //   dueDate: '',
    //   duration: 0,
    //   dependency: [],
    //   like: false,
    //   attachment: false,
    //   attachmentImg: '',
    // };
    // this.milestones.filter(m => m.title === milestone.title)[0].tasks.push(newTask);
    const newMockTask = {
      title: ''
    };
    this.pmTasksService.createTask(milestone.id, newMockTask).subscribe(res => {

      this.refreshTable();
    });
  }

  addNewMilestone() {
    if (!this.addMilestoneClicked) {
      this.addMilestoneClicked = !this.addMilestoneClicked;
    }
  }

  handleKeyDown(event) {
    const newMilestone = {
      title: this.newMilestoneTitle,
      projectId: this.currentProjectId
    };
    if (event.key === 'Enter' && this.newMilestoneTitle ) {
      this.milestones.push(newMilestone);
      this.newMilestoneTitle = '';
      this.addMilestoneClicked = !this.addMilestoneClicked;
      this.pmTasksService.createTaskGroup(newMilestone).subscribe(res => {
        this.refreshTable();
      });
    }
  }

  refreshTable() {
    console.log('refresh table:');
    this.tasksTemp = [];
    this.pmTasksService.getTaskGroupsWithParams({projectId: this.currentProjectId}).subscribe(data => {
      this.milestones = data.results;
      for (let i = 0; i < this.milestones.length; i++) {
        this.milestones[i].color = this.colors[i];
        this.milestones[i].editTitle = false;
        this.ownerModalCollapsed[i] = new Array();
        this.showTaskGroupDeleteConfirmModal[i] = false;
        this.dependencyModalCollapsed[i] = new Array();
        this.showSettingsModal[i] = new Array();
        this.showDeleteConfirmModal[i] = new Array();
        console.log('milestones length:', this.milestones[i]);
        if (this.milestones[i].taskIds !== null) {
          for (let j = 0; j < this.milestones[i].taskIds.length; j++) {
            this.ownerModalCollapsed[i][j] = false;
            this.dependencyModalCollapsed[i][j] = false;
            this.showSettingsModal[i][j] = false;
            this.showDeleteConfirmModal[i][j] = false;
          }
          this.pmTasksService.getTasks(this.milestones[i].id).subscribe(taskData => {
            this.milestones[i].tasks = taskData.results;
            this.dependencyList = this.dependencyList.concat(taskData.results);
            console.log('fetching dat all tasks a:', i);
            this.milestones[i].tasks.forEach(element => {
              element.assigneeInfo = this.getUserInfo(element.assignee);
              element.startDate = moment(element.startDate).format('MMMM DD, YYYY');
              element.taskTitle = element.title;
              element.dependency = element.dependencyIds ? element.dependencyIds : [];
            });
            this.addTasksFromPmBoardData(this.milestones[i], i, this.milestones.length);
          });
        } else {
          this.milestones[i].taskIds = [];
          this.addTasksFromPmBoardData(this.milestones[i], i, this.milestones.length);
        }
      }
    });
  }

  updateDataForGanttChart() {
    console.log('update Gantt Chart:');
    this.tasksTemp = [];
    this.pmTasksService.getTaskGroupsWithParams({projectId: this.currentProjectId}).subscribe(data => {
      const milestones = data.results;
      for (let i = 0; i < milestones.length; i++) {
        if (milestones[i].taskIds !== null) {
          this.pmTasksService.getTasks(milestones[i].id).subscribe(taskData => {
            milestones[i].tasks = taskData.results;
            this.dependencyList = this.dependencyList.concat(taskData.results);
            milestones[i].tasks.forEach(element => {
              element.assigneeInfo = this.getUserInfo(element.assignee);
              element.startDate = moment(element.startDate).format('MMMM DD, YYYY');
              element.taskTitle = element.title;
              element.dependency = element.dependencyIds ? element.dependencyIds : [];
            });
            this.addTasksFromPmBoardData(milestones[i], i, milestones.length);
          });
        } else {
          milestones[i].taskIds = [];
          this.addTasksFromPmBoardData(milestones[i], i, milestones.length);
        }
      }
    });
  }

  addTasksFromPmBoardData(tableDataAtIndex: any, i, milestoneLength) {
    this.tasksTemp.push(tableDataAtIndex);

      if (this.tasksTemp.length === milestoneLength) {
        this.allTasks = this.dependencyList.map(dependency => dependency.id);
        this.allTasks = _.uniq(this.allTasks);
        console.log('all tasks:', this.allTasks);
        this.copyMilestones = this.tasksTemp;
        this.updateTaskOrderNumber();
        // set draggable class
        // const bag: any = this.dragulaService.find('dragTask');
        // if (bag !== undefined ) {
        //   this.dragulaService.destroy('dragTask');
        // }
        // this.dragulaService.setOptions('dragTask', {
        //   moves: function (el, container, handle) {
        //     return handle.className === 'task-content';
        //   }
        // });
        // this.dragulaService.setOptions('dragTask', {
        //   revertOnSpill: true,
        //   moves: function (el, container, handle) {
        //     return handle.className === 'task-content';
        //   }
        // });
        this.dragulaService.drop.subscribe((value) => {
          this.onDropModel(value.slice(1));
        });
        this.updatedGanttData.emit({'data': this.sortById(this.tasksTemp)});
      }
  }

  sortById(arr) {
    return arr.sort((a, b) => a.id - b.id);
  }

  clickOutside() {
    this.addMilestoneClicked = false;
  }

  closeOwnerModal(event) {
    const modalElement = event.srcElement.parentElement.querySelector('.owner-modal') as HTMLDivElement;
    modalElement.className = modalElement.className.replace('show-modal', 'hide-modal');
    const modalWrapperElement = event.srcElement.parentElement.querySelector('.owner-modal-wrapper') as HTMLDivElement;
    modalWrapperElement.className = modalWrapperElement.className.replace('show-modal', 'hide-modal');
  }

  // onOwnerSelect(milestoneId, taskId, task) {
  //   task.assignee = this.selectedOwner;
  //   this.updateTask(milestoneId, taskId, task);
  // }
  onOwnerSelect(event) {
    const milestoneId = event.srcElement.parentElement.querySelector('input.taskGroupId').value;
    const taskId = event.srcElement.parentElement.querySelector('input.taskId').value;
     const sourcePanelData = this.copyMilestones.filter(milestone => milestone.id.toString() === milestoneId.toString()).pop();
     const selectedTaskData = sourcePanelData.tasks.filter(task => task.id.toString() === taskId.toString()).pop();
     selectedTaskData.assignee = this.selectedOwner;
    this.updateTask(milestoneId, taskId, selectedTaskData);
  }

  openOwnerModal(event) {
    const milestoneId = event.srcElement.parentElement.querySelector('input.taskGroupId').value;
    const taskId = event.srcEltonesement.parentElement.querySelector('input.taskId').value;
     const sourcePanelData = this.copyMilestones.filter(milestone => milestone.id.toString() === milestoneId.toString()).pop();
     const selectedTaskData = sourcePanelData.tasks.filter(task => task.id.toString() === taskId.toString()).pop();
    // this.ownerModalCollapsed = this.ownerModalCollapsed.map(m => m.map(t => t = false));
    // this.ownerModalCollapsed[i][j] = true;
    this.selectedOwner = selectedTaskData.assigneeInfo.username;
    const modalElement = event.srcElement.parentElement.querySelector('.owner-modal') as HTMLDivElement;
    modalElement.className = modalElement.className.replace('hide-modal', 'show-modal');
    const modalWrapperElement = event.srcElement.parentElement.querySelector('.owner-modal-wrapper') as HTMLDivElement;
    modalWrapperElement.className = modalWrapperElement.className.replace('hide-modal', 'show-modal');
  }

  openDependencyModal(event) {
    const modalElement = event.srcElement.parentElement.querySelector('.dependency-modal') as HTMLDivElement;
    modalElement.className = modalElement.className.replace('hide-modal', 'show-modal');
    const modalWrapperElement = event.srcElement.parentElement.querySelector('.dependency-modal-wrapper') as HTMLDivElement;
    modalWrapperElement.className = modalWrapperElement.className.replace('hide-modal', 'show-modal');
    const milestoneId = event.srcElement.parentElement.querySelector('input.taskGroupId').value;
    const taskId = event.srcElement.parentElement.querySelector('input.taskId').value;
     const sourcePanelData = this.copyMilestones.filter(milestone => milestone.id.toString() === milestoneId.toString()).pop();
     const selectedTaskData = sourcePanelData.tasks.filter(task => task.id.toString() === taskId.toString()).pop();
    this.currentTaskDependency = selectedTaskData.dependency;
  }

  closeDependencyModal(event) {
    const modalElement = event.srcElement.parentElement.querySelector('.dependency-modal') as HTMLDivElement;
    modalElement.className = modalElement.className.replace('show-modal', 'hide-modal');
    const modalWrapperElement = event.srcElement.parentElement.querySelector('.dependency-modal-wrapper') as HTMLDivElement;
    modalWrapperElement.className = modalWrapperElement.className.replace('show-modal', 'hide-modal');
    const milestoneId = event.srcElement.parentElement.querySelector('input.taskGroupId').value;
    const taskId = event.srcElement.parentElement.querySelector('input.taskId').value;
     const sourcePanelData = this.copyMilestones.filter(milestone => milestone.id.toString() === milestoneId.toString()).pop();
     const selectedTaskData = sourcePanelData.tasks.filter(task => task.id.toString() === taskId.toString()).pop();
    this.updateTask(milestoneId, taskId, selectedTaskData);
  }

  removeDependency(event) {
    const milestoneId = event.srcElement.parentElement.querySelector('input.taskGroupId').value;
    const taskId = event.srcElement.parentElement.querySelector('input.taskId').value;
    const dependencyId = event.srcElement.parentElement.querySelector('input.dependencyId').value;
    const sourcePanelData = this.copyMilestones.filter(milestone => milestone.id.toString() === milestoneId.toString()).pop();
    const selectedTaskData = sourcePanelData.tasks.filter(task => task.id.toString() === taskId.toString()).pop();
    const item = selectedTaskData.dependency[dependencyId];
    this.allTasks.push(item);
    this.allTasks = _.uniq(this.allTasks);
    selectedTaskData.dependency.splice(dependencyId, 1);
    selectedTaskData.dependencyIds = selectedTaskData.dependency;
    this.isAutocompleteUpdated = !this.isAutocompleteUpdated;
    this.updateTask(milestoneId, taskId, selectedTaskData);
  }

  onInputChangedEvent(val: string) {
    this.inputChanged = val;
  }

  onSelect(i, j, item) {
    this.selectedItem = item;
    this.allTasks = this.allTasks.filter(function( obj ) {
      return obj !== item;
    });
    const dependency = this.milestones[i].tasks[j].dependency as any[];
    if (this.milestones[i].tasks[j].dependency.length < 3) {
      dependency.push(item);
      this.milestones[i].tasks[j].dependencyIds = dependency;
      // this.updateTask(this.milestones[i].id, this.milestones[i].tasks[j].id, this.milestones[i].tasks[j]);
    }
  }

  uploadAttachment() {
    window.alert('Upload Files');
  }

  openDetailedModal(task, i, j) {
    this.projectManagementService.sendTaskData(
      {
        'task': task,
        'milestone': [i, j],
        'openModal': true
      }
    );
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
      progressSum += element.progress;
    });
    return progressSum / (arr.length * 100);
  }


  changePercent(percent, panel, task) {
    this.milestones[panel][task] = parseInt(percent, 10);
    // send changed data to parent to update gantt chart
    this.updatedGanttData.emit({'data': this.milestones});
  }

  getContactNameFromId(id) {
    const selectedContact = this.contactsList.filter(c => c.id === id)[0];
    return selectedContact.name;
  }

  addContactName(data) {
    data.forEach(element => {
      if (element.type === 'PERSON') {
        element.name = element.person.firstName + ' ' + element.person.lastName;
      } else {
        element.name = element.business.name;
      }
    });
    return data;
  }

  getUserInfo(username) {
    const selectedUser = this.usersList.filter(u => u.username === username)[0];
    return selectedUser;
  }

  updateInfoTask (task) {
        // const newTask = {
    //   id: 1 + milestone.tasks.length,
    //   taskTitle: '',
    //   profile: {
    //     name: '',
    //     imgUrl: '',
    //     userId: undefined
    //   },
    //   progress: 0,
    //   dueDate: '',
    //   duration: 0,
    //   dependency: [],
    //   like: false,
    //   attachment: false,
    //   attachmentImg: '',
    // };
    // this.milestones.filter(m => m.title === milestone.title)[0].tasks.push(newTask);
  }

  checkValidation() {
    console.log('validatioan checking');
    // Model
    //   id: 1 + milestone.tasks.length,
    //   taskTitle: '',
    //   profile: {
    //     name: '',
    //     imgUrl: '',
    //     userId: undefined
    //   },
    //   progress: 0,
    //   dueDate: '',
    //   duration: 0,
    //   dependency: [],
    //   like: false,
    //   attachment: false,
    //   attachmentImg: '',
  }
  updateMilestoneTitle(index) {
    console.log('milestone index,', index);
    this.milestones[index].editTitle = false;
    const body =  {
      owner: this.milestones[index].owner,
      title: this.milestones[index].title,
      order: this.milestones[index].order,
      permission: this.milestones[index].permission,
    };
    this.pmTasksService.updateIndividualTaskGroup(this.milestones[index].id, body).subscribe(res => {
      this.updateDataForGanttChart();
    });
  }

  taskTitleChanged(event) {
    // tslint:disable-next-line:max-line-length
    // console.log('task title changed:', event.srcElement.parentElement.querySelector('input.taskId').value,  event.srcElement.parentElement.querySelector('input.taskGroupId').value);
    const milestoneId = event.srcElement.parentElement.querySelector('input.taskGroupId').value;
    const taskId = event.srcElement.parentElement.querySelector('input.taskId').value;
     const sourcePanelData = this.copyMilestones.filter(milestone => milestone.id.toString() === milestoneId.toString()).pop();
     const selectedTaskData = sourcePanelData.tasks.filter(task => task.id.toString() === taskId.toString()).pop();
     selectedTaskData.title = event.target.value;
    this.updateTask(milestoneId, taskId, selectedTaskData);
  }

  taskDurationChanged(event) {
    const milestoneId = event.srcElement.parentElement.querySelector('input.taskGroupId').value;
    const taskId = event.srcElement.parentElement.querySelector('input.taskId').value;
     const sourcePanelData = this.copyMilestones.filter(milestone => milestone.id.toString() === milestoneId.toString()).pop();
     const selectedTaskData = sourcePanelData.tasks.filter(task => task.id.toString() === taskId.toString()).pop();
     selectedTaskData.duration = parseInt(event.target.value, 10);
    this.updateTask(milestoneId, taskId, selectedTaskData);
  }
  updateTask(milestoneId, taskId, taskData) {
    console.log('task data: ', taskData);
    taskData.startDate = moment(taskData.startDate).format('YYYY-MM-DD');
    taskData.dependencyIds = taskData.dependency ? taskData.dependency : [];
    taskData.followers = taskData.followers ? taskData.followers : [];
    taskData.keywordIds = taskData.keywordIds ? taskData.keywordIds : [];
    taskData.note = taskData.note ? taskData.note : '';

    this.pmTasksService.updateIndividualTask(milestoneId, taskId, taskData).subscribe(res => {
      console.log('task updated:', res);
      this.updateDataForGanttChart();
    });
  }

  confirmDeleteMainTask(event) {
    console.log('delete main task:,', event);
    const milestoneId = parseInt(event.srcElement.parentElement.querySelector('input.taskGroupId').value, 10);
    const taskId = parseInt(event.srcElement.parentElement.querySelector('input.taskId').value, 10);
    this.pmTasksService.deleteIndividualtask(milestoneId, taskId).subscribe(res => {
      console.log('task deleted:');
      const taskElement = document.getElementById('' + taskId) as HTMLDivElement;
      taskElement.style.display = 'none';
      this.updateDataForGanttChart();
    });
  }

  confirmDeleteTaskGroup(milestoneId) {
    // console.log('taskgroup deleted');
    this.pmTasksService.deleteIndividualTaskGroup(milestoneId).subscribe(res => {
      // console.log('taskgroup deleted:');
      const taskGroupElement = document.getElementById('' + milestoneId).parentElement as HTMLDivElement;
      taskGroupElement.style.display = 'none';
      this.updateDataForGanttChart();
    });
  }

  updateImportantTask(event) {
    const milestoneId = event.srcElement.parentElement.querySelector('input.taskGroupId').value;
    const taskId = event.srcElement.parentElement.querySelector('input.taskId').value;
    const sourcePanelData = this.copyMilestones.filter(milestone => milestone.id.toString() === milestoneId.toString()).pop();
    const selectedTaskData = sourcePanelData.tasks.filter(task => task.id.toString() === taskId.toString()).pop();
    selectedTaskData.isImportant = !selectedTaskData.isImportant;
    event.srcElement.className = selectedTaskData.isImportant ? 'blured' : '';
    this.updateTask(milestoneId, taskId, selectedTaskData);
  }

  getDependencyList(milestoneId, taskId) {
    const sourcePanelData = this.copyMilestones.filter(milestone => milestone.id.toString() === milestoneId.toString()).pop();
    const selectedTaskData = sourcePanelData.tasks.filter(task => task.id.toString() === taskId.toString()).pop();
    return selectedTaskData.dependency;
  }

  updateTaskOrderNumber() {
    for ( let i = 0; i < this.copyMilestones.length; i++) {
      for ( let j = 0; j < this.copyMilestones[i].tasks.length; j++) {
        const task = this.copyMilestones[i].tasks[j];
        const element = document.getElementById('' + task.id) as HTMLDivElement;
        if (element === null) {
          console.log('element order', task.id, element);
        } else {
          element.querySelector('.task-id-value').innerHTML = `${task.order}. `;
        }
      }
    }
  }

  copyTask(event) {
    const milestoneId = event.srcElement.parentElement.querySelector('input.taskGroupId').value;
    const taskId = event.srcElement.parentElement.querySelector('input.taskId').value;

    const sourcePanelData = this.copyMilestones.filter(milestone => milestone.id.toString() === milestoneId.toString()).pop();
    const selectedTaskData = sourcePanelData.tasks.filter(task => task.id.toString() === taskId.toString()).pop();

    selectedTaskData.followers = selectedTaskData.followers  !== null ? selectedTaskData.followers : [];
    selectedTaskData.dependencyIds = selectedTaskData.dependencyIds  !== null ? selectedTaskData.dependencyIds : [];
    selectedTaskData.keywordIds = selectedTaskData.keywordIds  !== null ? selectedTaskData.keywordIds : [];
    selectedTaskData.subtaskIds = selectedTaskData.subtaskIds  !== null ? selectedTaskData.subtaskIds : [];
    selectedTaskData.note = selectedTaskData.note !== null ? selectedTaskData.note : '';
    selectedTaskData.startDate = moment(selectedTaskData.startDate).format('YYYY-MM-DD');
    console.log('selected task data', selectedTaskData);
    this.pmTasksService.createTask(milestoneId, selectedTaskData).subscribe(res => {
      // tslint:disable-next-line:max-line-lengt
      const inputTaskElements = document.getElementById('' + taskId).querySelectorAll('input.taskId') as NodeListOf<HTMLInputElement>;
      for (let i = 0; i < inputTaskElements.length; i++) {
        inputTaskElements[i].value = res.data.id;
      }
      // tslint:disable-next-line:max-line-length
      const inputTaskGroupElements = document.getElementById('' + taskId).querySelectorAll('input.taskGroupId') as NodeListOf<HTMLInputElement>;
      for (let i = 0; i < inputTaskElements.length; i++) {
        inputTaskGroupElements[i].value = res.data.taskGroupId;
      }
      document.getElementById('' + taskId).id = res.data.id;
      this.refreshTable();
    });
  }

  openShowSettingModal(i, j) {
    for (let ki = 0; ki < this.milestones.length; ki++) {
      for (let kj = 0; kj < this.milestones[ki].tasks.length; kj++) {
        this.showSettingsModal[ki][kj] = false;
      }
    }
    this.showSettingsModal[i][j] = true;
  }

  completionChanged(event) {
    console.log('comoplete: ', event);
    const milestoneId = event.srcElement.parentElement.querySelector('input.taskGroupId').value;
    const taskId = event.srcElement.parentElement.querySelector('input.taskId').value;
    const sourcePanelData = this.copyMilestones.filter(milestone => milestone.id.toString() === milestoneId.toString()).pop();
    const selectedTaskData = sourcePanelData.tasks.filter(task => task.id.toString() === taskId.toString()).pop();
    selectedTaskData.title = event.target.value;
    this.updateTask(milestoneId, taskId, selectedTaskData);
  }
}
