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

  selectStartDate(event, milestoneId, taskId, task) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dDate = new Intl.DateTimeFormat('en-US', options).format(event.value);
    // Add dDate field to panel info and update it with formatted date.
    task.startDate = dDate;
    this.updateTask(milestoneId, taskId, task);
  }

  private onDropModel(args) {
    const [sourceItem, targetContainer, sourceContainer, targetItem] = args;
    console.log('drop model called', args);
    const sourceItemIndex = parseInt(sourceItem.id, 10);
    const targetItemIndex = parseInt(targetItem.id, 10);

    const targetPanelIndex = parseInt(targetContainer.id, 10);
    const sourcePanelIndex = parseInt(sourceContainer.id, 10);
    console.log('on drop happened:', targetPanelIndex, sourcePanelIndex);
    // const selectedPanel = this.panels.filter(p => p.id === parseInt(source.id, 10))[0];
    // const selectedTask = selectedPanel.tasks.filter( t => t.id === parseInt(el.id, 10));
    const sourcePanelData = this.copyMilestones.filter(milestone => milestone.id === sourcePanelIndex).pop();
    const selectedTaskData = sourcePanelData.tasks.filter(task => task.id === sourceItemIndex).pop();
    console.log('selected drag data: ', sourceItemIndex, sourcePanelIndex, selectedTaskData);
    if (targetContainer !== sourceContainer) {
    }
    this.pmTasksService
    .deleteIndividualtask(sourcePanelIndex, sourceItemIndex)
    .subscribe(res => {
      console.log('task deleted: ', res);
    });
    const savingData = {
      'assignee': selectedTaskData.assigneeInfo ? selectedTaskData.assigneeInfo.username : selectedTaskData.assignee,
      'title': selectedTaskData.taskTitle ? selectedTaskData.taskTitle : selectedTaskData.title,
      'isImportant': selectedTaskData.isImportant,
      'isComplete': selectedTaskData.isComplete,
      'startDate': moment(selectedTaskData.startDate).format('YYYY-MM-DD'),
    };
    this.pmTasksService.createTask(targetPanelIndex, savingData).subscribe(res => {
      console.log('task created: ', res);
      document.getElementById('' + sourceItemIndex).id = res.data.id;
      document.getElementById('' + sourceItemIndex).dataset.taskgroupid = res.data.taskGroupId;
      this.updateDataForGanttChart();
    });
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

      this.updateDataForGanttChart();
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
        this.copyMilestones = this.milestones;

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

  closeOwnerModal(i, j) {
    this.ownerModalCollapsed[i][j] = false;
  }

  onOwnerSelect(milestoneId, taskId, task ) {
    task.assignee = this.selectedOwner;
    this.updateTask(milestoneId, taskId, task);
  }

  openOwnerModal(i, j) {
    this.ownerModalCollapsed = this.ownerModalCollapsed.map(m => m.map(t => t = false));
    this.ownerModalCollapsed[i][j] = true;
    this.selectedOwner = this.milestones[i].tasks[j].assigneeInfo.username;
  }

  openDependencyModal(i, j) {
    this.dependencyModalCollapsed = this.ownerModalCollapsed.map(m => m.map(t => t = false));
    this.dependencyModalCollapsed[i][j] = true;
  }

  closeDependencyModal(i, j) {
    this.dependencyModalCollapsed[i][j] = false;
    this.updateTask(this.milestones[i].id, this.milestones[i].tasks[j].id, this.milestones[i].tasks[j]);
  }

  removeDependency(i, j, k) {
    const item = this.milestones[i].tasks[j].dependency[k];
    this.allTasks.push(item);
    this.allTasks = _.uniq(this.allTasks);
    this.milestones[i].tasks[j].dependency.splice(k, 1);
    this.isAutocompleteUpdated = !this.isAutocompleteUpdated;
    this.milestones[i].tasks[j].dependencyIds = this.milestones[i].tasks[j].dependency;
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
  updateMilestoneTitle(index, event) {
    console.log('milestone index,', index);
    if (event.key === 'Enter') {
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
  }

  taskTitleChanged(milestoneId, taskId, taskData) {
    taskData.title = taskData.taskTitle;
    this.updateTask(milestoneId, taskId, taskData);
  }

  taskDurationChanged(milestoneId, taskId, taskData) {
    this.updateTask(milestoneId, taskId, taskData);
  }
  updateTask(milestoneId, taskId, taskData) {
    taskData.startDate = moment(taskData.startDate).format('YYYY-MM-DD');
    taskData.dependencyIds = taskData.dependency ? taskData.dependency : [];
    taskData.followers = taskData.followers ? taskData.followers : [];
    taskData.keywordIds = taskData.keywordIds ? taskData.keywordIds : [];
    taskData.note = taskData.note ? taskData.note : '';

    this.pmTasksService.updateIndividualTask(milestoneId, taskId, taskData).subscribe(res => {
      console.log('task updated:');
      this.updateDataForGanttChart();
    });
  }

  confirmDeleteMainTask(milestoneId, taskId) {
    this.pmTasksService.deleteIndividualtask(milestoneId, taskId).subscribe(res => {
      console.log('task deleted:');
      this.updateDataForGanttChart();
    });
  }

  confirmDeleteTaskGroup(milestoneId) {
    // console.log('taskgroup deleted');
    this.pmTasksService.deleteIndividualTaskGroup(milestoneId).subscribe(res => {
      // console.log('taskgroup deleted:');
      this.updateDataForGanttChart();
    });
  }
}
