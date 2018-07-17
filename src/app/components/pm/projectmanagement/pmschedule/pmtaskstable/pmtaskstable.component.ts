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
  menuCollapsed = true;
  newMilestoneTitle = '';
  addMilestoneClicked = false;
  ownerModalCollapsed = [[]];
  dependencyModalCollapsed = [[]];
  selectedOwner: any;
  customForm: any;
  heroForm: FormGroup;
  tasksTotalCount = 0;
  allTasks: any;
  inputChanged: any;
  selectedItem: any;
  isAutocompleteUpdated = false;
  tasksTemp = [];

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
    dragulaService.dropModel.subscribe((value) => {
      this.onDropModel(value.slice(1));
    });

    // set draggable class
    const bag: any = this.dragulaService.find('dragMilestone');
    if (bag !== undefined ) {
      this.dragulaService.destroy('dragMilestone');
    }

    dragulaService.setOptions('dragMilestone', {
      moves: function (el, container, handle) {
        return handle.className.includes('milestone-title');
      }
    });

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
        const date = new Date (this.milestones[i].tasks[j].start);
        this.milestones[i].tasks[j].start = moment(this.milestones[i].tasks[j].start).format('MMMM DD, YYYY');
      }
    }
    this.selectedOwner = 0;
    this.allTasks = _.range(1, this.tasksTotalCount + 1).map(t => t.toString());
  }

  getTaskId (milestone, task) {
    let foreTaskCount;
    if (milestone !== 0 ) {
      for (let i = 0; i <= milestone - 1; i++) {
        if (i !== 0 ) {
          foreTaskCount = foreTaskCount + this.milestones[i].tasks.length;
        } else {
          foreTaskCount = this.milestones[0].tasks.length;
        }
      }
    } else {
      foreTaskCount = 0;
    }
    return foreTaskCount + this.milestones[milestone].tasks[task].id;
  }

  selectStartDate(event, i, j) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dDate = new Intl.DateTimeFormat('en-US', options).format(event.value);
    // Add dDate field to panel info and update it with formatted date.
    this.milestones[i].tasks[j].start = dDate;
  }

  private onDropModel(args) {
    const [el, target, source] = args;
    const taskIndex = parseInt(el.id, 10);
    const targetPanelIndex = parseInt(target.id, 10);
    const sourcePanelIndex = parseInt(source.id, 10);
    // const selectedPanel = this.panels.filter(p => p.id === parseInt(source.id, 10))[0];
    // const selectedTask = selectedPanel.tasks.filter( t => t.id === parseInt(el.id, 10));
    const selectedTaskData = this.milestones[sourcePanelIndex].tasks[taskIndex];
    console.log('selected drag data: ', selectedTaskData, this.milestones);
    if (target !== source) {
      this.milestones[targetPanelIndex].tasks.push(selectedTaskData);
    }
    this.pmTasksService
    .deleteIndividualtask(this.milestones[sourcePanelIndex].id, this.milestones[sourcePanelIndex].tasks[taskIndex].id).subscribe(res => {
      console.log('task deleted: ', res);
    });
    const savingData = {
      'assignee': selectedTaskData.assigneeInfo ? selectedTaskData.assigneeInfo.username : selectedTaskData.assignee,
      'title': selectedTaskData.taskTitle ? selectedTaskData.taskTitle : selectedTaskData.title,
      'isImportant': selectedTaskData.isImportant,
      'isComplete': selectedTaskData.isComplete,
      'startDate': moment(selectedTaskData.startDate).format('YYYY-MM-DD'),
    };
    this.pmTasksService.createTask(this.milestones[targetPanelIndex].id, savingData).subscribe(res => {
      console.log('task created: ', res);
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
    this.pmTasksService.getTaskGroupsWithParams({projectId: this.currentProjectId}).subscribe(data => {
      this.milestones = data.results;
      for (let i = 0; i < this.milestones.length; i++) {
        this.milestones[i].color = this.colors[i];
        this.milestones[i].editTitle = false;
        this.ownerModalCollapsed[i] = new Array();
        this.dependencyModalCollapsed[i] = new Array();

        if (this.milestones[i].taskIds !== null) {
          for (let j = 0; j < this.milestones[i].taskIds.length; j++) {
            this.pmTasksService.getTasks(this.milestones[i].id).subscribe(taskData => {
              this.milestones[i].tasks = taskData.results;

              this.ownerModalCollapsed[i][j] = false;
              this.dependencyModalCollapsed[i][j] = false;
              this.milestones[i].tasks.forEach(element => {
                element.assigneeInfo = this.getUserInfo(element.assignee);
                element.startDate = moment(element.startDate).format('MMMM DD, YYYY');
                element.taskTitle = element.title;
                element.dependency = element.dependencyIds ? element.dependencyIds : [];
              });
              this.addTasksFromPmBoardData(this.milestones[i], i);
            });
          }
        }
      }
    });
  }

  addTasksFromPmBoardData(tableDataAtIndex: any, i) {
    this.tasksTemp[i] = tableDataAtIndex;
      if (this.tasksTemp.length === this.milestones.length) {
        console.log('test: milestones length:', this.tasksTemp);
        this.updatedGanttData.emit({'data': this.tasksTemp});
      }
  }

  clickOutside() {
    this.addMilestoneClicked = false;
  }

  closeOwnerModal(i, j) {
    this.ownerModalCollapsed[i][j] = false;
  }

  onOwnerSelect(event, milestone, task ) {
    this.milestones[milestone].tasks[task].profile = this.taskOwners[this.selectedOwner - 1];
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
  }

  removeDependency(i, j, k) {
    const item = this.milestones[i].tasks[j].dependency[k];
    this.allTasks.push(item);
    this.milestones[i].tasks[j].dependency.splice(k, 1);
    this.isAutocompleteUpdated = !this.isAutocompleteUpdated;
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
        title: this.milestones[index].title
      };
      this.pmTasksService.updateIndividualTaskGroup(this.milestones[index].id, body).subscribe(res => {
        this.refreshTable();
      });
    }
  }
}
